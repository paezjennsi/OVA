const React = window.React;
const { useState } = React;

export function QuizView({ quiz, setView, addScore }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = quiz.questions[current];
  const pct = Math.round((current / quiz.questions.length) * 100);

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.ans;
    setAnswers((a) => [...a, { selected: i, correct }]);
  };

  const next = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
      addScore();
    }
  };

  if (done) {
    const total = quiz.questions.length;
    const correct = answers.filter((a) => a.correct).length;
    const pctScore = Math.round((correct / total) * 100);
    return (
      <div className="content">
        <div className="quiz-card">
          <div className="results-card">
            <span className="results-emoji">{pctScore >= 70 ? "🎉" : "📚"}</span>
            <div className="results-score">{pctScore}%</div>
            <div className="results-label">{pctScore >= 70 ? "¡Excelente trabajo! Dominas este tema." : "Sigue practicando, ¡puedes mejorar!"}</div>
            <div className="results-breakdown">
              <div className="breakdown-item">
                <div className="breakdown-val" style={{ color: "var(--green)" }}>
                  {correct}
                </div>
                <div className="breakdown-lbl">Correctas</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-val" style={{ color: "var(--red)" }}>
                  {total - correct}
                </div>
                <div className="breakdown-lbl">Incorrectas</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-val" style={{ color: "var(--purple)" }}>
                  {total}
                </div>
                <div className="breakdown-lbl">Total</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setCurrent(0);
                  setSelected(null);
                  setAnswered(false);
                  setDone(false);
                  setAnswers([]);
                }}
              >
                🔁 Intentar de nuevo
              </button>
              <button className="btn btn-primary" onClick={() => setView("quiz-select")}>
                Ver otras evaluaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="quiz-card">
        <div className="quiz-header">
          <div>
            <div className="quiz-tag">📝 {quiz.module}</div>
            <div className="quiz-q-title">{q.q}</div>
          </div>
          <div className="quiz-counter">
            {current + 1} / {quiz.questions.length}
          </div>
        </div>
        <div className="quiz-progress">
          <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="quiz-options">
          {q.opts.map((opt, i) => {
            let cls = "quiz-option";
            if (answered) {
              cls += " disabled";
              if (i === q.ans) cls += " correct";
              else if (i === selected) cls += " wrong";
            } else if (i === selected) cls += " selected";

            return (
              <div key={i} className={cls} onClick={() => handleSelect(i)}>
                <div className="option-letter">{["A", "B", "C", "D"][i]}</div>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>
        {answered && (
          <div className="explanation">
            <span className="explanation-icon">💡</span>
            <span>
              <strong>Explicación:</strong> {q.exp}
            </span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn btn-ghost" onClick={() => setView("quiz-select")}>
            ← Salir
          </button>
          {answered && (
            <button className="btn btn-primary" onClick={next}>
              {current < quiz.questions.length - 1 ? "Siguiente pregunta →" : "Ver resultados"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
