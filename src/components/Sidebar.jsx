import { MODULES } from "../data/modules.js";

const React = window.React;

export function Sidebar({ view, setView, activeModule, setActiveModule, activeLesson, setActiveLesson, progress }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-badge">⚙ OVA · v1.0</div>
        <div className="logo-title">Robótica Educativa</div>
        <div className="logo-sub">Gestión del Conocimiento STEM</div>
      </div>
      <div className="sidebar-section">Navegación</div>
      <div className={`nav-item ${view === "home" ? "active" : ""}`} onClick={() => setView("home")}>
        <span className="nav-icon">🏠</span> Inicio
      </div>
      <div className="sidebar-section">Módulos</div>
      {MODULES.slice(0, 2).map((mod) => {
        const isOpen = activeModule === mod.id;
        const done = progress[mod.id]?.done || 0;
        const total = mod.lessons?.length || 0;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        return (
          <div key={mod.id}>
            <div
              className={`nav-item ${isOpen && view === "lesson" ? "active" : ""}`}
              onClick={() => {
                setActiveModule(mod.id);
                setActiveLesson(mod.lessons[0]);
                setView("lesson");
              }}
            >
              <span className="nav-icon">{mod.icon}</span>
              <span style={{ flex: 1, lineHeight: 1.3 }}>{mod.title}</span>
              <span className="nav-badge">{pct}%</span>
            </div>
            <div className="progress-bar-mini" style={{ margin: "-4px 20px 6px" }}>
              <div className="progress-bar-mini-fill" style={{ width: `${pct}%`, background: mod.color }} />
            </div>
            {isOpen &&
              view === "lesson" &&
              mod.lessons.map((lesson, i) => {
                const isDone = (progress[mod.id]?.lessons || {})[lesson.id];
                return (
                  <div
                    key={lesson.id}
                    className={`nav-sub ${activeLesson?.id === lesson.id ? "active" : ""}`}
                    onClick={() => {
                      setActiveLesson(lesson);
                      setView("lesson");
                    }}
                  >
                    {isDone ? "✓" : `${i + 1}.`} {lesson.title}
                  </div>
                );
              })}
          </div>
        );
      })}
      <div className="sidebar-section">Evaluación</div>
      <div className={`nav-item ${view === "quiz-select" || view === "quiz" ? "active" : ""}`} onClick={() => setView("quiz-select")}>
        <span className="nav-icon">📝</span> Evaluaciones
        <span className="nav-badge">2</span>
      </div>
      <div className="sidebar-footer">
        <div className="student-card">
          <div className="avatar">👩</div>
          <div>
            <div className="student-name">Jennsi Suárez</div>
            <div className="student-pts">⭐ {Object.values(progress).reduce((a, b) => a + (b.done || 0), 0) * 10} pts</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
