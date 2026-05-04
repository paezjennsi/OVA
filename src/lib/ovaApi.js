const STORAGE_KEY = "ova_student_id";
const API_PORT = "3765";

/** Hostname listo para URL (IPv6 necesita corchetes, p. ej. [::1]). */
function hostForApiUrl(hostname) {
  if (!hostname) return "127.0.0.1";
  if (hostname.includes(":") && !hostname.startsWith("[")) {
    return `[${hostname}]`;
  }
  return hostname;
}

/** Origen del API: vacío = misma página (servidor OVA). Si no, apunta al puerto del API en este equipo. */
export function getApiOrigin() {
  try {
    if (typeof window !== "undefined" && window.OVA_API_ORIGIN) {
      return String(window.OVA_API_ORIGIN).replace(/\/$/, "");
    }
    const loc = window.location;
    if (loc.protocol === "http:" || loc.protocol === "https:") {
      if (loc.port === API_PORT || (loc.protocol === "http:" && !loc.port && API_PORT === "80")) {
        return "";
      }
      const h = hostForApiUrl(loc.hostname);
      return `${loc.protocol}//${h}:${API_PORT}`;
    }
  } catch (_) {}
  return `http://127.0.0.1:${API_PORT}`;
}

function apiUrl(path) {
  const origin = getApiOrigin();
  return origin ? `${origin}${path}` : path;
}

export function getStoredStudentId() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredStudentId(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch (_) {}
}

async function readJson(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    const parsed = JSON.parse(text);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

export async function registerStudent(payload) {
  const res = await fetch(apiUrl("/api/students"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(data.error || res.statusText || "Error al registrar");
  const id = data && data.id != null ? String(data.id) : "";
  if (!id) {
    throw new Error(
      "Respuesta inválida del servidor (sin id). Comprueba que el servidor esté en marcha y que la consola del servidor no muestre errores."
    );
  }
  return { ...data, id };
}

export async function recordVisit(studentId, source = "web") {
  const res = await fetch(apiUrl(`/api/students/${encodeURIComponent(studentId)}/visits`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source }),
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(data.error || res.statusText);
}

export async function fetchLessonProgress(studentId) {
  const res = await fetch(apiUrl(`/api/students/${encodeURIComponent(studentId)}/progress/lessons`));
  const data = await readJson(res);
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

export async function syncLessonComplete(studentId, moduleId, lessonId) {
  const res = await fetch(apiUrl(`/api/students/${encodeURIComponent(studentId)}/progress/lessons`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ module_id: moduleId, lesson_id: String(lessonId) }),
  });
  if (!res.ok && res.status !== 204) {
    const data = await readJson(res);
    throw new Error(data.error || res.statusText);
  }
}

export function lessonsRowsToProgressShape(lessonsRows, preserveQuizProgress) {
  const quiz =
    preserveQuizProgress && typeof preserveQuizProgress === "object" ? preserveQuizProgress : { done: 0 };
  const next = {
    1: { done: 0, lessons: {} },
    2: { done: 0, lessons: {} },
    3: quiz,
  };
  for (const row of lessonsRows || []) {
    const mid = Number(row.module_id);
    if (mid !== 1 && mid !== 2) continue;
    next[mid].lessons[row.lesson_id] = true;
    next[mid].done = Object.keys(next[mid].lessons).length;
  }
  return next;
}
