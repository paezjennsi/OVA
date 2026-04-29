const React = window.React;

export function LessonView({ mod, lesson, lessons, setActiveLesson, markDone, progress }) {
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const isDone = (progress[mod.id]?.lessons || {})[lesson.id];

  return (
    <div className="content">
      <div className="lesson-header">
        <div className="lesson-number" style={{ background: `${mod.color}20`, color: mod.color }}>
          {idx + 1}
        </div>
        <div>
          <div className="lesson-title-main">{lesson.title}</div>
          <div className="lesson-meta-row">
            <span className="lesson-meta-item">⏱ {lesson.duration}</span>
            <span className="lesson-meta-item">📦 {mod.title}</span>
            {isDone && (
              <span className="lesson-meta-item" style={{ color: "var(--green)" }}>
                ✓ Completada
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="lesson-body">
        <div className="lesson-content-card">
          <div className="lesson-text">{lesson.content}</div>
          <div className="key-points">
            <div className="key-points-title">Puntos clave</div>
            {lesson.keyPoints.map((kp, i) => (
              <div className="key-point" key={i}>
                {kp}
              </div>
            ))}
          </div>
          <div className="lesson-nav">
            {idx > 0 ? (
              <button className="btn btn-ghost" onClick={() => setActiveLesson(lessons[idx - 1])}>
                ← Anterior
              </button>
            ) : (
              <div />
            )}
            <button
              className="btn btn-primary"
              style={isDone ? { background: "var(--green)", color: "#000" } : {}}
              onClick={() => {
                markDone(mod.id, lesson.id);
                if (idx < lessons.length - 1) setActiveLesson(lessons[idx + 1]);
              }}
            >
              {isDone ? "✓ Completada" : idx < lessons.length - 1 ? "Completar y seguir →" : "Finalizar módulo"}
            </button>
          </div>
        </div>

        <div>
          {lesson.code && (
            <div className="lesson-sidebar-card" style={{ marginBottom: 16 }}>
              <div className="code-header">
                <span className="code-lang">💻 {lesson.code.lang}</span>
                <div className="code-dots">
                  <div className="code-dot" style={{ background: "#ef4444" }} />
                  <div className="code-dot" style={{ background: "#f59e0b" }} />
                  <div className="code-dot" style={{ background: "#22c55e" }} />
                </div>
              </div>
              <div className="code-block">{lesson.code.snippet}</div>
            </div>
          )}
          <div className="lesson-sidebar-card">
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--muted)", marginBottom: 12 }}>Lecciones del módulo</div>
            {lessons.map((l, i) => {
              const d = (progress[mod.id]?.lessons || {})[l.id];
              return (
                <div
                  key={l.id}
                  className={`lesson-item ${l.id === lesson.id ? "active" : ""}`}
                  style={{ borderBottom: i < lessons.length - 1 ? "1px solid var(--border)" : "none", padding: "10px 4px" }}
                  onClick={() => setActiveLesson(l)}
                >
                  <div
                    className="lesson-check"
                    style={{
                      width: 20,
                      height: 20,
                      fontSize: 10,
                      borderColor: d ? "var(--green)" : l.id === lesson.id ? mod.color : "var(--border)",
                      color: d ? "var(--green)" : l.id === lesson.id ? mod.color : "var(--muted)",
                      background: d ? "rgba(34,197,94,0.1)" : "transparent",
                    }}
                  >
                    {d ? "✓" : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{l.title}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{l.duration}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
