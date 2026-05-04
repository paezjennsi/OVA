const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const express = require("express");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT) || 3765;
const DB_PATH = process.env.OVA_DB_PATH || path.join(ROOT, "database", "ova.sqlite");
const DEBUG_LOG = path.join(ROOT, "debug-2993a7.log");

function agentLog(payload) {
  try {
    fs.appendFileSync(DEBUG_LOG, `${JSON.stringify({ ...payload, timestamp: Date.now() })}\n`);
  } catch (_) {}
}

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

let db;
let saveTimer;

function saveDbImmediate() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function schedulePersist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      saveDbImmediate();
    } catch (e) {
      console.error(e);
    }
  }, 150);
}

function getOne(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  if (!stmt.step()) {
    stmt.free();
    return null;
  }
  const row = stmt.getAsObject();
  stmt.free();
  return row;
}

function getAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function run(sql, params = []) {
  db.run(sql, params);
}

function isUniqueViolation(e) {
  return e && e.message && /UNIQUE constraint failed/i.test(e.message);
}

function lastInsertRowid() {
  const row = getOne("SELECT last_insert_rowid() AS id", []);
  return row ? row.id : null;
}

const app = express();

// Permite registrar desde file://, Live Server u otro puerto (API siempre en :3765 por defecto).
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

app.use(express.json({ limit: "128kb" }));

function emptyToNull(v) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, db: path.basename(DB_PATH) });
});

app.post("/api/students", (req, res) => {
  const full_name = emptyToNull(req.body?.full_name);
  if (!full_name) {
    agentLog({ hypothesisId: "H_reg", message: "reject missing full_name" });
    return res.status(400).json({ error: "full_name es obligatorio" });
  }

  const id = crypto.randomUUID();
  const document_id = emptyToNull(req.body?.document_id);
  const email = emptyToNull(req.body?.email);
  const grade_or_group = emptyToNull(req.body?.grade_or_group);
  const institution = emptyToNull(req.body?.institution);
  const notes = emptyToNull(req.body?.notes);

  try {
    run(
      `INSERT INTO students (id, document_id, full_name, email, grade_or_group, institution, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, document_id, full_name, email, grade_or_group, institution, notes]
    );
    schedulePersist();

    const row = getOne(`SELECT id, document_id, full_name, email, grade_or_group, institution, created_at FROM students WHERE id = ?`, [id]);
    if (!row || row.id == null || row.id === "") {
      agentLog({ hypothesisId: "H_row", message: "insert ok but select returned no row", data: { id } });
      console.error("POST /api/students: fila no encontrada tras INSERT", id);
      return res.status(500).json({ error: "Error interno al leer el estudiante creado" });
    }
    agentLog({ hypothesisId: "H_ok", message: "student created", data: { id: String(row.id) } });
    return res.status(201).json(row);
  } catch (e) {
    if (isUniqueViolation(e)) {
      agentLog({ hypothesisId: "H_unique", message: String(e.message) });
      return res.status(409).json({ error: "Documento o correo ya registrado" });
    }
    agentLog({ hypothesisId: "H_err", message: String(e.message) });
    console.error(e);
    return res.status(500).json({ error: "No se pudo crear el estudiante" });
  }
});

app.get("/api/students/:id", (req, res) => {
  const row = getOne(`SELECT id, document_id, full_name, email, grade_or_group, institution, created_at, last_seen_at FROM students WHERE id = ?`, [
    req.params.id,
  ]);
  if (!row) return res.status(404).json({ error: "No encontrado" });
  res.json(row);
});

app.post("/api/students/:id/visits", (req, res) => {
  const student = getOne(`SELECT id FROM students WHERE id = ?`, [req.params.id]);
  if (!student) return res.status(404).json({ error: "Estudiante no encontrado" });

  const source = emptyToNull(req.body?.source) || "web";
  try {
    run(`UPDATE students SET last_seen_at = datetime('now') WHERE id = ?`, [req.params.id]);
    run(`INSERT INTO student_visits (student_id, source) VALUES (?, ?)`, [req.params.id, source]);
    schedulePersist();
    const rid = lastInsertRowid();
    res.status(201).json({ id: rid, student_id: req.params.id, source });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudo registrar la visita" });
  }
});

app.get("/api/students/:id/progress/lessons", (req, res) => {
  const student = getOne(`SELECT id FROM students WHERE id = ?`, [req.params.id]);
  if (!student) return res.status(404).json({ error: "Estudiante no encontrado" });

  const lessons = getAll(
    `SELECT module_id, lesson_id, completed_at FROM lesson_progress WHERE student_id = ? ORDER BY completed_at`,
    [req.params.id]
  );
  res.json({ lessons });
});

app.post("/api/students/:id/progress/lessons", (req, res) => {
  const student = getOne(`SELECT id FROM students WHERE id = ?`, [req.params.id]);
  if (!student) return res.status(404).json({ error: "Estudiante no encontrado" });

  const module_id = Number(req.body?.module_id);
  const lesson_id = emptyToNull(req.body?.lesson_id);
  if (!Number.isInteger(module_id) || !lesson_id) {
    return res.status(400).json({ error: "module_id y lesson_id son obligatorios" });
  }

  try {
    run(`INSERT OR IGNORE INTO lesson_progress (student_id, module_id, lesson_id) VALUES (?, ?, ?)`, [req.params.id, module_id, lesson_id]);
    schedulePersist();
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudo guardar el progreso" });
  }
});

app.use(express.static(path.join(ROOT, "dist")));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(ROOT, "dist", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

(async function main() {
  const initSqlJs = require("sql.js");
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(ROOT, "node_modules", "sql.js", "dist", file),
  });

  if (fs.existsSync(DB_PATH)) {
    db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    db = new SQL.Database();
  }

  const schemaPath = path.join(ROOT, "database", "schema.sql");
  if (fs.existsSync(schemaPath)) {
    db.exec(fs.readFileSync(schemaPath, "utf8"));
    schedulePersist();
  }

  process.on("exit", () => saveDbImmediate());
  process.on("SIGINT", () => {
    saveDbImmediate();
    process.exit(0);
  });

  const HOST = process.env.OVA_HOST || "0.0.0.0";
  app.listen(PORT, HOST, () => {
    console.log(`OVA servidor escuchando en http://127.0.0.1:${PORT} y http://localhost:${PORT}`);
    console.log(`SQLite: ${DB_PATH}`);
  });
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
