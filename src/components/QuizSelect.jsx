import { MODULES } from "../data/modules.js";

const React = window.React;

export function QuizSelect({ setView, setActiveQuiz }) {
  return (
    <div className="content">
      <div className="home-hero" style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,212,255,0.05))", borderColor: "rgba(168,85,247,0.2)", marginBottom: 24 }}>
        <div className="hero-tag" style={{ background: "rgba(168,85,247,0.15)", color: "var(--purple)" }}>
          📝 Zona de evaluación
        </div>
        <div className="hero-title">Evaluaciones del OVA</div>
        <div className="hero-desc">Selecciona un quiz para comprobar lo que aprendiste. Cada pregunta incluye retroalimentación inmediata.</div>
      </div>
      <div className="quiz-selector">
        {MODULES[2].quizzes.map((quiz, i) => (
          <div
            key={quiz.id}
            className="quiz-sel-card"
            onClick={() => {
              setActiveQuiz(quiz);
              setView("quiz");
            }}
          >
            <div className="quiz-sel-icon">{i === 0 ? "🤖" : "💻"}</div>
            <div className="quiz-sel-title">{quiz.module}</div>
            <div className="quiz-sel-sub">{quiz.questions.length} preguntas de selección múltiple</div>
            <div className="quiz-sel-meta">📝 Iniciar evaluación →</div>
          </div>
        ))}
      </div>
    </div>
  );
}
