const React = window.React;
const { useEffect, useMemo, useRef, useState } = React;

const WELCOME_MESSAGE = {
  role: "assistant",
  text: "Hola, soy tu asistente AI. Puedo ayudarte con módulos, lecciones, evaluaciones y conceptos de robótica.",
};

const STORAGE_KEY = "ova_ai_chat_history";
const MAX_HISTORY = 50;

function loadChatHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [WELCOME_MESSAGE];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME_MESSAGE];
  } catch (_) {
    return [WELCOME_MESSAGE];
  }
}

function saveChatHistory(messages) {
  try {
    const toSave = messages.slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (_) {}
}

function generateDynamicSystemInstruction(currentView, currentModule, currentLesson, allModules) {
  const baseInstruction = [
    "Eres un asistente educativo amable e integrado en un OVA de robótica educativa.",
    "Responde siempre en español con claridad, tono pedagógico y ejemplos breves cuando sea útil.",
    "Puedes ayudar sobre módulos, lecciones, evaluaciones, conceptos de robótica e IA.",
    "Si una pregunta es ambigua, pide una aclaración corta y específica.",
    "Mantén respuestas concisas: máximo 3-4 párrafos por mensaje.",
    "Si el usuario pregunta sobre tema fuera del OVA, sugiere enfocarse en robótica educativa.",
  ];

  // Contexto pedagógico dinámico
  if (currentView === "lesson" && currentModule && currentLesson) {
    baseInstruction.push(
      `El estudiante está actualmente estudiando la lección "${currentLesson.title}" del módulo "${currentModule.title}".`,
      `Puedes responder preguntas sobre esta lección, profundizar en conceptos mencionados, o sugerir ejercicios prácticos relacionados.`,
      `Si hace preguntas fuera de esta lección pero relacionadas con el módulo, responde como apoyo complementario.`
    );
  } else if (currentView === "quiz" || currentView === "quiz-select") {
    baseInstruction.push(
      "El estudiante está en la sección de evaluaciones.",
      "Puedes ayudar con conceptos de preguntas anteriores, pero no reveles respuestas de quizzes activos."
    );
  } else if (currentView === "home") {
    baseInstruction.push(
      "El estudiante está en el panel principal.",
      "Ofrece orientación sobre módulos disponibles y ayuda con la navegación del OVA."
    );
  }

  // Información de módulos disponibles
  if (allModules && allModules.length > 0) {
    const modulesList = allModules.map((m) => `${m.icon} ${m.title}`).join(", ");
    baseInstruction.push(
      `Módulos disponibles en el OVA: ${modulesList}.`,
      "Ayuda al estudiante a navegar entre módulos si lo solicita."
    );
  }

  return baseInstruction.join(" ");
}

function generateQuickSuggestions(currentView, currentModule, currentLesson) {
  const suggestions = [];

  if (currentView === "lesson" && currentLesson) {
    suggestions.push(
      `¿Cuáles son los conceptos clave de "${currentLesson.title}"?`,
      `¿Cómo aplico lo de ${currentLesson.title} en un proyecto real?`,
      "¿Podrías resumir esto de forma más simple?"
    );
  } else if (currentView === "quiz" || currentView === "quiz-select") {
    suggestions.push(
      "¿Cuál es la diferencia entre Arduino y Scratch?",
      "¿Cómo funciona un sensor ultrasónico?",
      "¿Qué es la robótica educativa?"
    );
  } else {
    suggestions.push(
      "¿Qué temas cubre el OVA?",
      "¿Por dónde debería empezar?",
      "¿Cuál es el proyecto más importante?"
    );
  }

  return suggestions.slice(0, 3);
}

export function AIChatPanel({ open, onClose, currentView, currentModule, currentLesson, allModules, studentId }) {
  const [messages, setMessages] = useState(() => loadChatHistory());
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [typingDot, setTypingDot] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, sending]);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (!sending) {
      setTypingDot(0);
      return;
    }
    const interval = setInterval(() => {
      setTypingDot((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, [sending]);

  const systemInstruction = useMemo(
    () => generateDynamicSystemInstruction(currentView, currentModule, currentLesson, allModules),
    [currentView, currentModule, currentLesson, allModules]
  );

  const quickSuggestions = useMemo(
    () => generateQuickSuggestions(currentView, currentModule, currentLesson),
    [currentView, currentModule, currentLesson]
  );

  const chatContents = useMemo(() => {
    return messages
      .slice(-10)
      .filter((msg) => !msg.loading)
      .map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.text }],
      }));
  }, [messages]);

  const sendMessage = async (retryCount = 0) => {
    const value = input.trim();
    if (!value || sending) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: value }, { role: "assistant", text: "", loading: true }]);
    setSending(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          systemInstruction,
          contents: [...chatContents, { role: "user", parts: [{ text: value }] }],
          // Contexto pedagógico para mejorar análisis de uso
          view: currentView,
          module: currentModule?.id,
          lesson: currentLesson?.id,
          studentId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || `Error ${response.status}`);
      }

      const reply = data?.reply || "Sin respuesta";
      setMessages((prev) => {
        const next = prev.slice(0, -1);
        return [...next, { role: "assistant", text: reply, loading: false }];
      });
      setError("");
    } catch (err) {
      const isTimeout = err?.name === "AbortError";
      const isNetworkError = err?.message?.includes("fetch") || err?.message?.includes("Network");
      const message = isTimeout ? "Timeout: Gemini tardó demasiado." : err?.message || "Error inesperado";

      if ((isNetworkError || isTimeout) && retryCount < 1) {
        setError(`${message} Reintentando...`);
        setTimeout(() => sendMessage(retryCount + 1), 2000);
        return;
      }

      setMessages((prev) => {
        const next = prev.slice(0, -1);
        return [...next, { role: "assistant", text: "No pude responder en este momento. Por favor, intenta más tarde.", loading: false }];
      });
      setError(message);
    } finally {
      setSending(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const clearChat = () => {
    if (window.confirm("¿Limpiar el historial de chat?")) {
      setMessages([WELCOME_MESSAGE]);
      setError("");
      setInput("");
      saveChatHistory([WELCOME_MESSAGE]);
    }
  };

  if (!open) return null;

  const typingIndicator = sending ? ".".repeat(typingDot || 1) : "";

  return (
    <>
      <div className="ai-panel-backdrop" onClick={onClose} />
      <aside className="ai-panel" aria-label="Asistente AI">
        <div className="ai-panel-header">
          <div>
            <div className="ai-panel-title">Asistente AI</div>
            <div className="ai-panel-subtitle">Gemini · soporte educativo</div>
          </div>
          <button className="ai-panel-close" onClick={onClose} aria-label="Cerrar asistente">
            ✕
          </button>
        </div>

        <div className="ai-panel-actions">
          <button className="btn btn-ghost ai-panel-action" onClick={clearChat} type="button">
            ↻ Nueva conversación
          </button>
        </div>

        <div className="ai-panel-messages" ref={listRef}>
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`ai-message ${message.role}${message.loading ? " loading" : ""}`}>
              <div className="ai-message-label">{message.role === "assistant" ? "🤖 AI" : "👤 Tú"}</div>
              <div className="ai-message-bubble">
                {message.loading ? (
                  <span className="ai-typing-indicator">Escribiendo{typingIndicator}</span>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
          {error && <div className="ai-error">⚠ {error}</div>}
        </div>

        <form className="ai-panel-form" onSubmit={handleSubmit}>
          {messages.length === 1 && (
            <div className="ai-panel-suggestions">
              <div className="ai-suggestions-label">Preguntas rápidas:</div>
              <div className="ai-suggestions-list">
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="ai-suggestion-btn"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="ai-panel-hint">Pregunta por una lección, concepto o evaluación.</div>
          <textarea
            ref={inputRef}
            className="ai-panel-input"
            rows="4"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribe tu pregunta..."
          />
          <div className="ai-panel-footer">
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cerrar
            </button>
            <button className="btn btn-primary" type="submit" disabled={sending || !input.trim()}>
              {sending ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}