-- OVA: esquema mínimo para registrar estudiantes y su actividad.
-- SQLite 3.x. Para PostgreSQL: cambiar AUTOINCREMENT por SERIAL/BIGSERIAL,
-- TEXT por VARCHAR según necesidad, y revisar tipos de fecha si usas TIMESTAMPTZ.

PRAGMA foreign_keys = ON;

-- Estudiante que ingresa al OVA (identidad académica + contacto opcional).
CREATE TABLE IF NOT EXISTS students (
  id            TEXT PRIMARY KEY,  -- UUID v4 recomendado (generado en app o API)
  document_id   TEXT UNIQUE,       -- documento institucional opcional (único si existe)
  full_name     TEXT NOT NULL,
  email         TEXT UNIQUE,       -- NULL permitido si no todos tienen correo
  grade_or_group TEXT,             -- ej. "10-A", "Robótica 2026"
  institution   TEXT,              -- colegio / sede
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at  TEXT,
  notes         TEXT
);

-- Cada vez que un estudiante "entra" o inicia sesión en el OVA (auditoría ligera).
CREATE TABLE IF NOT EXISTS student_visits (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id  TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  visited_at  TEXT NOT NULL DEFAULT (datetime('now')),
  source      TEXT                 -- ej. "web", "scorm", "aula_virtual"
);

-- Progreso por lección (sincronizable con tu estado actual en React: modId + lessonId).
CREATE TABLE IF NOT EXISTS lesson_progress (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id   TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  module_id    INTEGER NOT NULL,
  lesson_id    TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (student_id, module_id, lesson_id)
);

-- Resultados de evaluaciones (opcional; enlaza con tus quizzes por id lógico).
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id   TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  quiz_key     TEXT NOT NULL,      -- identificador estable en tu data (ej. slug o id)
  score        REAL,               -- 0..1 o porcentaje según convención
  max_score    REAL,
  passed       INTEGER,            -- 0/1 en SQLite
  attempted_at TEXT NOT NULL DEFAULT (datetime('now')),
  answers_json TEXT               -- JSON con respuestas si lo necesitas (evitar PII)
);

CREATE INDEX IF NOT EXISTS idx_visits_student ON student_visits(student_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id);
