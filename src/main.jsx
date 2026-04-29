import { App } from "./App.jsx";

const React = window.React;
const ReactDOM = window.ReactDOM;

// #region agent log
fetch("http://127.0.0.1:7805/ingest/c0b94b87-2c59-4de6-a3fa-d4868f6ce696", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "2993a7" },
  body: JSON.stringify({
    sessionId: "2993a7",
    runId: "initial",
    hypothesisId: "H1",
    location: "src/main.jsx:6",
    message: "App bootstrap location context",
    data: { href: window.location.href, host: window.location.host, protocol: window.location.protocol },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

// #region agent log
fetch("http://127.0.0.1:7805/ingest/c0b94b87-2c59-4de6-a3fa-d4868f6ce696", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "2993a7" },
  body: JSON.stringify({
    sessionId: "2993a7",
    runId: "initial",
    hypothesisId: "H2",
    location: "src/main.jsx:20",
    message: "React globals availability",
    data: { hasReact: !!React, hasReactDOM: !!ReactDOM, reactDOMKeys: ReactDOM ? Object.keys(ReactDOM).slice(0, 5) : [] },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

const rootEl = document.getElementById("root");
// #region agent log
fetch("http://127.0.0.1:7805/ingest/c0b94b87-2c59-4de6-a3fa-d4868f6ce696", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "2993a7" },
  body: JSON.stringify({
    sessionId: "2993a7",
    runId: "initial",
    hypothesisId: "H3",
    location: "src/main.jsx:34",
    message: "Root element lookup",
    data: { hasRoot: !!rootEl },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

try {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
  // #region agent log
  fetch("http://127.0.0.1:7805/ingest/c0b94b87-2c59-4de6-a3fa-d4868f6ce696", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "2993a7" },
    body: JSON.stringify({
      sessionId: "2993a7",
      runId: "initial",
      hypothesisId: "H4",
      location: "src/main.jsx:49",
      message: "createRoot/render executed",
      data: { rendered: true },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
} catch (error) {
  // #region agent log
  fetch("http://127.0.0.1:7805/ingest/c0b94b87-2c59-4de6-a3fa-d4868f6ce696", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "2993a7" },
    body: JSON.stringify({
      sessionId: "2993a7",
      runId: "initial",
      hypothesisId: "H4",
      location: "src/main.jsx:65",
      message: "createRoot/render failed",
      data: { error: String(error?.message || error) },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  throw error;
}
