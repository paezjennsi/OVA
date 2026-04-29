import { MODULES } from "../data/modules.js";

const React = window.React;

export function Home({ setView, setActiveModule, setActiveLesson, progress }) {
  const totalLessons = MODULES.slice(0, 2).reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = Object.values(progress).reduce((a, b) => a + (b.done || 0), 0);

  return (
    <div className="content">
      <div className="home-hero">
        <div className="hero-tag">🤖 OVA · Robótica Educativa</div>
        <div className="hero-title">
          Aprende robótica,
          <br />
          transforma tu comunidad
        </div>
        <div className="hero-desc">Un objeto virtual de aprendizaje diseñado para fortalecer competencias STEM en contextos rurales colombianos, con enfoque en equidad de género.</div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(0,212,255,0.1)" }}>
            📚
          </div>
          <div>
            <div className="stat-value" style={{ color: "var(--cyan)" }}>
              {doneLessons}/{totalLessons}
            </div>
            <div className="stat-label">Lecciones completadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(255,107,53,0.1)" }}>
            ⚡
          </div>
          <div>
            <div className="stat-value" style={{ color: "var(--orange)" }}>
              {totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0}%
            </div>
            <div className="stat-label">Progreso total</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(168,85,247,0.1)" }}>
            🏆
          </div>
          <div>
            <div className="stat-value" style={{ color: "var(--purple)" }}>
              {doneLessons * 10}
            </div>
            <div className="stat-label">Puntos obtenidos</div>
          </div>
        </div>
      </div>

      <div className="section-title">Módulos del OVA</div>
      <div className="modules-grid">
        {MODULES.map((mod) => {
          const done = progress[mod.id]?.done || 0;
          const total = mod.lessons?.length || mod.quizzes?.length || 0;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <div
              key={mod.id}
              className="module-card"
              onClick={() => {
                if (mod.id === 3) {
                  setView("quiz-select");
                  return;
                }
                setActiveModule(mod.id);
                setActiveLesson(mod.lessons[0]);
                setView("lesson");
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: mod.color, borderRadius: "16px 16px 0 0" }} />
              <span className="module-icon">{mod.icon}</span>
              <div className="module-title">{mod.title}</div>
              <div className="module-sub">{mod.subtitle}</div>
              <div className="module-meta">
                <span style={{ color: mod.color, fontWeight: 700, fontSize: 12 }}>{pct}% completado</span>
                <span>{total} {mod.lessons ? "lecciones" : "quizzes"}</span>
              </div>
              <div className="module-progress">
                <div className="module-progress-fill" style={{ width: `${pct}%`, background: mod.color }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title">Lecciones recientes</div>
      <div className="lesson-list">
        {MODULES.slice(0, 2).flatMap((m) =>
          m.lessons.slice(0, 2).map((l) => {
            const isDone = (progress[m.id]?.lessons || {})[l.id];
            return (
              <div
                key={l.id}
                className="lesson-item"
                onClick={() => {
                  setActiveModule(m.id);
                  setActiveLesson(l);
                  setView("lesson");
                }}
              >
                <div
                  className="lesson-check"
                  style={{
                    borderColor: isDone ? "var(--green)" : m.color,
                    color: isDone ? "var(--green)" : m.color,
                    background: isDone ? "rgba(34,197,94,0.1)" : "transparent",
                  }}
                >
                  {isDone ? "✓" : m.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                    {m.title} · {l.duration}
                  </div>
                </div>
                <span style={{ color: "var(--muted)", fontSize: 18 }}>›</span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
