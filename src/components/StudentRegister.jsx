import { registerStudent, setStoredStudentId, getApiOrigin } from "../lib/ovaApi.js";

const React = window.React;
const { useState } = React;

function isLikelyNetworkFailure(message) {
  const s = (message || "").toLowerCase();
  return (
    s === "failed to fetch" ||
    s.includes("networkerror") ||
    s.includes("load failed") ||
    s.includes("network request failed")
  );
}

export function StudentRegister({ onRegistered }) {
  const [fullName, setFullName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [gradeOrGroup, setGradeOrGroup] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Escribe tu nombre completo.");
      return;
    }
    setLoading(true);
    try {
      const row = await registerStudent({
        full_name: fullName.trim(),
        document_id: documentId.trim() || undefined,
        grade_or_group: gradeOrGroup.trim() || undefined,
        institution: institution.trim() || undefined,
        email: email.trim() || undefined,
      });
      setStoredStudentId(row.id);
      onRegistered(row.id);
    } catch (err) {
      const m = err && err.message ? String(err.message) : "";
      if (isLikelyNetworkFailure(m)) {
        const base = getApiOrigin() || `${window.location.protocol}//${window.location.host}`;
        setError(
          [
            "No se alcanza el servidor del OVA (no hay respuesta en el puerto del API).",
            "",
            "Qué hacer:",
            "1) En la carpeta del proyecto, doble clic en start-ova.cmd —o— en PowerShell: npm.cmd run serve",
            "2) No abras dist/index.html con doble clic; usa el navegador en http://localhost:3765",
            `3) Comprueba en otra pestaña: ${base.replace(/\/$/, "")}/api/health  (debe mostrar \"ok\": true)`,
          ].join("\n")
        );
      } else {
        setError(m || "No se pudo registrar. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "linear-gradient(160deg, rgba(0,212,255,0.08), rgba(168,85,247,0.06))",
      }}
    >
      <form
        onSubmit={submit}
        className="content"
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "28px 24px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <div className="hero-tag" style={{ marginBottom: 12 }}>
          Acceso al OVA
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>Identificación del estudiante</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.5 }}>
          Completa los datos para crear tu registro local. La información se guarda en la base SQLite del servidor (solo en esta computadora o red local).
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--cyan)",
            marginBottom: 16,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,212,255,0.25)",
            background: "rgba(0,212,255,0.06)",
            lineHeight: 1.5,
          }}
        >
          El servidor del OVA debe estar en marcha en el puerto{" "}
          <strong style={{ color: "var(--text)" }}>3765</strong>. Usa{" "}
          <strong style={{ color: "var(--text)" }}>start-ova.cmd</strong>, o en VS Code depura con{" "}
          <strong style={{ color: "var(--text)" }}>OVA: Chrome + servidor (SQLite)</strong>. No abras{" "}
          <code style={{ fontSize: 11 }}>dist/index.html</code> con doble clic.
        </div>

        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Nombre completo *</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
          autoComplete="name"
          placeholder="Ej. María López"
        />

        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", margin: "14px 0 6px" }}>Documento (opcional)</label>
        <input value={documentId} onChange={(e) => setDocumentId(e.target.value)} style={inputStyle} placeholder="Sin puntos ni espacios" />

        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", margin: "14px 0 6px" }}>Curso o grupo (opcional)</label>
        <input value={gradeOrGroup} onChange={(e) => setGradeOrGroup(e.target.value)} style={inputStyle} placeholder="Ej. 10-A" />

        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", margin: "14px 0 6px" }}>Institución (opcional)</label>
        <input value={institution} onChange={(e) => setInstitution(e.target.value)} style={inputStyle} placeholder="Colegio o sede" />

        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", margin: "14px 0 6px" }}>Correo (opcional)</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} type="email" autoComplete="email" placeholder="correo@ejemplo.edu" />

        {error && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(255,107,53,0.12)",
              color: "var(--orange)",
              fontSize: 13,
              whiteSpace: "pre-line",
              lineHeight: 1.45,
            }}
          >
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", marginTop: 20 }}>
          {loading ? "Guardando…" : "Entrar al OVA"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  boxSizing: "border-box",
};
