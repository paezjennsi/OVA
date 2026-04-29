import { MODULES } from "./data/modules.js";
import { css } from "./styles/ovaStyles.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { Home } from "./components/Home.jsx";
import { LessonView } from "./components/LessonView.jsx";
import { QuizSelect } from "./components/QuizSelect.jsx";
import { QuizView } from "./components/QuizView.jsx";

const React = window.React;
const { useState } = React;

export function App() {
  const [view, setView] = useState("home");
  const [activeModule, setActiveModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [progress, setProgress] = useState({ 1: { done: 0, lessons: {} }, 2: { done: 0, lessons: {} }, 3: { done: 0 } });

  const markDone = (modId, lessonId) => {
    setProgress((prev) => {
      const mod = prev[modId] || { done: 0, lessons: {} };
      if (mod.lessons[lessonId]) return prev;
      const newLessons = { ...mod.lessons, [lessonId]: true };
      return { ...prev, [modId]: { done: mod.done + 1, lessons: newLessons } };
    });
  };

  const addScore = () => {
    setProgress((prev) => ({ ...prev, 3: { done: (prev[3]?.done || 0) + 1 } }));
  };

  const currentMod = MODULES.find((m) => m.id === activeModule);
  const topbarInfo = {
    home: { title: "Panel Principal", sub: "Bienvenida al OVA de Robótica Educativa" },
    lesson: { title: activeLesson?.title || "Lección", sub: currentMod?.title },
    "quiz-select": { title: "Evaluaciones", sub: "Comprueba tu aprendizaje" },
    quiz: { title: activeQuiz?.module || "Quiz", sub: "Selección múltiple con retroalimentación" },
  };
  const info = topbarInfo[view] || topbarInfo.home;

  return (
    <>
      <style>{css}</style>
      <div className="ova-root">
        <Sidebar
          view={view}
          setView={setView}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          activeLesson={activeLesson}
          setActiveLesson={setActiveLesson}
          progress={progress}
        />
        <div className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">{info.title}</div>
              <div className="topbar-sub">{info.sub}</div>
            </div>
            <div className="topbar-actions">
              {view !== "home" && (
                <button className="btn btn-ghost" onClick={() => setView("home")}>
                  🏠 Inicio
                </button>
              )}
              <button className="btn btn-primary">⬇ Exportar SCORM</button>
            </div>
          </div>
          {view === "home" && <Home setView={setView} setActiveModule={setActiveModule} setActiveLesson={setActiveLesson} progress={progress} />}
          {view === "lesson" && currentMod && activeLesson && (
            <LessonView mod={currentMod} lesson={activeLesson} lessons={currentMod.lessons} setActiveLesson={setActiveLesson} markDone={markDone} progress={progress} />
          )}
          {view === "quiz-select" && <QuizSelect setView={setView} setActiveQuiz={setActiveQuiz} />}
          {view === "quiz" && activeQuiz && <QuizView quiz={activeQuiz} setView={setView} addScore={addScore} />}
        </div>
      </div>
    </>
  );
}
