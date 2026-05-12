export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #060b18; --surface: #0d1526; --surface2: #111c34;
    --border: rgba(0,212,255,0.12); --text: #e2e8f8; --muted: #7a8ab5;
    --cyan: #00d4ff; --orange: #ff6b35; --purple: #a855f7;
    --green: #22c55e; --red: #ef4444;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; }
  .ova-root { display: flex; height: 100vh; width: 100vw; overflow: hidden; position: relative; }
  .ova-root::before {
    content: ''; position: fixed; inset: 0;
    background-image: radial-gradient(circle at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168,85,247,0.04) 0%, transparent 40%),
      radial-gradient(circle at 60% 80%, rgba(255,107,53,0.04) 0%, transparent 40%);
    pointer-events: none; z-index: 0;
  }
  .sidebar { width: 260px; min-width: 260px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; z-index: 10; overflow-y: auto; }
  .sidebar-logo { padding: 24px 20px 20px; border-bottom: 1px solid var(--border); }
  .logo-badge { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.1)); border: 1px solid rgba(0,212,255,0.25); border-radius: 10px; padding: 8px 14px; font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700; color: var(--cyan); letter-spacing: 0.5px; margin-bottom: 10px; }
  .logo-title { font-size: 14px; font-weight: 700; color: var(--text); line-height: 1.3; }
  .logo-sub { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .sidebar-section { padding: 16px 12px 8px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; margin: 2px 8px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 500; color: var(--muted); border: 1px solid transparent; }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: var(--text); }
  .nav-item.active { background: rgba(0,212,255,0.08); border-color: rgba(0,212,255,0.2); color: var(--cyan); }
  .nav-item .nav-icon { font-size: 16px; width: 22px; text-align: center; }
  .nav-item .nav-badge { margin-left: auto; background: rgba(0,212,255,0.15); color: var(--cyan); font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
  .nav-sub { display: flex; align-items: center; gap: 10px; padding: 7px 16px 7px 46px; margin: 1px 8px; border-radius: 6px; cursor: pointer; font-size: 12px; color: var(--muted); transition: all 0.15s; border-left: 2px solid transparent; }
  .nav-sub:hover { color: var(--text); background: rgba(255,255,255,0.03); }
  .nav-sub.active { color: var(--cyan); border-left-color: var(--cyan); }
  .progress-bar-mini { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; margin: 3px 0 0; overflow: hidden; }
  .progress-bar-mini-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
  .sidebar-footer { margin-top: auto; padding: 16px 12px; border-top: 1px solid var(--border); }
  .student-card { display: flex; align-items: center; gap: 10px; padding: 10px; background: var(--surface2); border-radius: 10px; border: 1px solid var(--border); }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--cyan), var(--purple)); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .student-name { font-size: 13px; font-weight: 600; }
  .student-pts { font-size: 11px; color: var(--cyan); }
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; z-index: 1; position: relative; }
  .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 28px; border-bottom: 1px solid var(--border); background: rgba(6,11,24,0.8); backdrop-filter: blur(10px); flex-shrink: 0; }
  .topbar-title { font-size: 17px; font-weight: 700; }
  .topbar-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }
  .btn { padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s; }
  .btn-primary { background: linear-gradient(135deg, var(--cyan), #0099cc); color: #000; }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }
  .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); }
  .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); }
  .btn-ai { white-space: nowrap; }
  .ai-panel-backdrop { position: fixed; inset: 0; background: rgba(2, 6, 16, 0.45); backdrop-filter: blur(2px); z-index: 35; }
  .ai-panel { position: fixed; top: 0; right: 0; width: min(420px, 100vw); height: 100vh; background: linear-gradient(180deg, rgba(13,21,38,0.98), rgba(9,15,28,0.98)); border-left: 1px solid var(--border); box-shadow: -20px 0 60px rgba(0,0,0,0.45); z-index: 40; display: flex; flex-direction: column; animation: aiPanelIn 0.22s ease-out; }
  .ai-panel-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 18px 18px 14px; border-bottom: 1px solid var(--border); }
  .ai-panel-title { font-size: 16px; font-weight: 800; }
  .ai-panel-subtitle { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .ai-panel-close { width: 34px; height: 34px; border-radius: 10px; border: 1px solid var(--border); background: transparent; color: var(--text); cursor: pointer; }
  .ai-panel-close:hover { border-color: var(--cyan); color: var(--cyan); }
  .ai-panel-actions { padding: 14px 18px 0; display: flex; justify-content: flex-end; }
  .ai-panel-action { padding: 7px 12px; font-size: 12px; }
  .ai-panel-messages { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
  .ai-message { display: flex; flex-direction: column; gap: 6px; max-width: 100%; }
  .ai-message.user { align-items: flex-end; }
  .ai-message.assistant { align-items: flex-start; }
  .ai-message-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
  .ai-message-bubble { max-width: 88%; padding: 12px 14px; border-radius: 14px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
  .ai-message.user .ai-message-bubble { background: rgba(0,212,255,0.12); border: 1px solid rgba(0,212,255,0.18); color: var(--text); border-bottom-right-radius: 4px; }
  .ai-message.assistant .ai-message-bubble { background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: #dfe7fb; border-bottom-left-radius: 4px; }
  .ai-message.loading .ai-message-bubble { opacity: 0.7; }
  .ai-typing-indicator { display: inline-block; animation: aiTypeAnimation 1.4s infinite; font-style: italic; color: var(--cyan); }
  @keyframes aiTypeAnimation { 0%, 60%, 100% { opacity: 0.5; } 30% { opacity: 1; } }
  .ai-status { color: var(--cyan); background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.14); font-size: 12px; padding: 10px 12px; border-radius: 10px; }
  .ai-error { color: #fecaca; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.14); font-size: 12px; padding: 10px 12px; border-radius: 10px; }
  .ai-panel-form { padding: 16px 18px 18px; border-top: 1px solid var(--border); background: rgba(5, 10, 20, 0.62); }
  .ai-panel-hint { font-size: 11px; color: var(--muted); margin-bottom: 10px; }
  .ai-panel-input { width: 100%; resize: none; border-radius: 14px; border: 1px solid var(--border); background: var(--surface2); color: var(--text); padding: 12px 14px; font: inherit; outline: none; }
  .ai-panel-input:focus { border-color: rgba(0,212,255,0.4); box-shadow: 0 0 0 3px rgba(0,212,255,0.08); }
  .ai-panel-footer { display: flex; justify-content: space-between; gap: 10px; margin-top: 12px; }
  .ai-panel-footer .btn { flex: 1; }
  @keyframes aiPanelIn { from { transform: translateX(16px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .content { flex: 1; overflow-y: auto; padding: 28px; scrollbar-width: thin; scrollbar-color: rgba(0,212,255,0.2) transparent; }
  .home-hero { background: linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.05) 100%); border: 1px solid rgba(0,212,255,0.15); border-radius: 20px; padding: 32px 36px; margin-bottom: 28px; position: relative; overflow: hidden; }
  .home-hero::after { content: '🤖'; position: absolute; right: 36px; top: 50%; transform: translateY(-50%); font-size: 72px; opacity: 0.15; }
  .hero-tag { display: inline-block; background: rgba(0,212,255,0.15); color: var(--cyan); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 14px; font-family: 'Space Mono', monospace; }
  .hero-title { font-size: 28px; font-weight: 800; line-height: 1.2; margin-bottom: 10px; background: linear-gradient(135deg, #fff 40%, var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-desc { font-size: 14px; color: var(--muted); line-height: 1.6; max-width: 520px; }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; display: flex; align-items: center; gap: 14px; }
  .stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .stat-value { font-size: 22px; font-weight: 800; font-family: 'Space Mono', monospace; }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .section-title { font-size: 16px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); margin-left: 8px; }
  .modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .module-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
  .module-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
  .module-icon { font-size: 32px; margin-bottom: 14px; display: block; }
  .module-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .module-sub { font-size: 12px; color: var(--muted); margin-bottom: 16px; line-height: 1.4; }
  .module-meta { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--muted); }
  .module-progress { height: 4px; background: rgba(255,255,255,0.08); border-radius: 4px; margin-top: 12px; overflow: hidden; }
  .module-progress-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
  .lesson-header { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 28px; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 20px; }
  .lesson-number { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 18px; font-weight: 700; flex-shrink: 0; }
  .lesson-title-main { font-size: 20px; font-weight: 800; margin-bottom: 6px; }
  .lesson-meta-row { display: flex; gap: 16px; font-size: 12px; color: var(--muted); }
  .lesson-meta-item { display: flex; align-items: center; gap: 5px; }
  .lesson-body { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
  .lesson-content-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
  .lesson-text { font-size: 14px; line-height: 1.8; color: #c5d0e8; white-space: pre-line; margin-bottom: 24px; }
  .key-points { background: rgba(0,212,255,0.04); border: 1px solid rgba(0,212,255,0.12); border-radius: 12px; padding: 18px; }
  .key-points-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--cyan); margin-bottom: 12px; font-family: 'Space Mono', monospace; }
  .key-point { display: flex; gap: 10px; margin-bottom: 10px; font-size: 13px; line-height: 1.5; color: #c5d0e8; }
  .key-point::before { content: '▸'; color: var(--cyan); flex-shrink: 0; margin-top: 1px; }
  .lesson-sidebar-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px; height: fit-content; }
  .code-block { background: #020810; border: 1px solid rgba(0,212,255,0.15); border-radius: 12px; padding: 18px; font-family: 'Space Mono', monospace; font-size: 11px; line-height: 1.7; color: #8be0ff; white-space: pre-wrap; overflow-x: auto; margin-top: 12px; }
  .code-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .code-lang { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--orange); font-family: 'Space Mono', monospace; }
  .code-dots { display: flex; gap: 5px; }
  .code-dot { width: 10px; height: 10px; border-radius: 50%; }
  .lesson-nav { display: flex; gap: 12px; margin-top: 20px; justify-content: space-between; }
  .lesson-list { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
  .lesson-item { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s; font-size: 13px; font-weight: 500; }
  .lesson-item:last-child { border-bottom: none; }
  .lesson-item:hover { background: rgba(255,255,255,0.03); }
  .lesson-item.active { background: rgba(0,212,255,0.06); }
  .lesson-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; font-weight: 700; }
  .quiz-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 32px; max-width: 720px; margin: 0 auto; }
  .quiz-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
  .quiz-tag { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--purple); background: rgba(168,85,247,0.1); padding: 4px 12px; border-radius: 20px; margin-bottom: 10px; display: inline-block; }
  .quiz-q-title { font-size: 18px; font-weight: 700; line-height: 1.4; }
  .quiz-counter { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--muted); white-space: nowrap; background: var(--surface2); padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); }
  .quiz-progress { height: 6px; background: rgba(255,255,255,0.07); border-radius: 6px; margin-bottom: 28px; overflow: hidden; }
  .quiz-progress-fill { height: 100%; background: linear-gradient(90deg, var(--purple), #c084fc); border-radius: 6px; transition: width 0.4s ease; }
  .quiz-options { display: grid; gap: 12px; margin-bottom: 24px; }
  .quiz-option { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 12px; border: 2px solid var(--border); cursor: pointer; transition: all 0.2s; font-size: 14px; background: var(--surface2); }
  .quiz-option:hover:not(.disabled) { border-color: rgba(168,85,247,0.4); background: rgba(168,85,247,0.05); }
  .quiz-option.selected { border-color: var(--purple); background: rgba(168,85,247,0.1); }
  .quiz-option.correct { border-color: var(--green); background: rgba(34,197,94,0.1); }
  .quiz-option.wrong { border-color: var(--red); background: rgba(239,68,68,0.1); }
  .quiz-option.disabled { cursor: default; }
  .option-letter { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; background: rgba(255,255,255,0.06); flex-shrink: 0; transition: all 0.2s; }
  .quiz-option.correct .option-letter { background: var(--green); color: #000; }
  .quiz-option.wrong .option-letter { background: var(--red); color: #fff; }
  .quiz-option.selected:not(.correct):not(.wrong) .option-letter { background: var(--purple); color: #fff; }
  .explanation { background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.2); border-radius: 12px; padding: 16px; font-size: 13px; line-height: 1.6; color: #a7f3d0; margin-bottom: 20px; display: flex; gap: 10px; align-items: flex-start; }
  .explanation-icon { font-size: 18px; flex-shrink: 0; }
  .results-card { text-align: center; padding: 40px 20px; }
  .results-emoji { font-size: 64px; margin-bottom: 16px; display: block; }
  .results-score { font-size: 52px; font-weight: 800; font-family: 'Space Mono', monospace; background: linear-gradient(135deg, var(--purple), #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
  .results-label { font-size: 16px; color: var(--muted); margin-bottom: 28px; }
  .results-breakdown { display: flex; justify-content: center; gap: 24px; margin-bottom: 32px; flex-wrap: wrap; }
  .breakdown-item { text-align: center; padding: 14px 20px; background: var(--surface2); border-radius: 12px; border: 1px solid var(--border); min-width: 90px; }
  .breakdown-val { font-size: 24px; font-weight: 800; font-family: 'Space Mono', monospace; }
  .breakdown-lbl { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .quiz-selector { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
  .quiz-sel-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px; cursor: pointer; transition: all 0.2s; }
  .quiz-sel-card:hover { border-color: rgba(168,85,247,0.4); transform: translateY(-2px); }
  .quiz-sel-icon { font-size: 36px; margin-bottom: 12px; }
  .quiz-sel-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
  .quiz-sel-sub { font-size: 12px; color: var(--muted); }
  .quiz-sel-meta { margin-top: 14px; font-size: 11px; color: var(--purple); font-weight: 600; display: flex; align-items: center; gap: 5px; }
  .ai-panel-suggestions { margin-bottom: 14px; }
  .ai-suggestions-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
  .ai-suggestions-list { display: flex; flex-direction: column; gap: 8px; }
  .ai-suggestion-btn { width: 100%; padding: 10px 12px; border: 1px solid rgba(0,212,255,0.25); background: rgba(0,212,255,0.08); color: var(--cyan); border-radius: 10px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s; text-align: left; }
  .ai-suggestion-btn:hover { border-color: rgba(0,212,255,0.5); background: rgba(0,212,255,0.15); transform: translateX(2px); }
  .ai-suggestion-btn:active { transform: translateX(0); }
`;
