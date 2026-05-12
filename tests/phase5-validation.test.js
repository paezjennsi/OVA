/**
 * Fase 5 - Validación de Calidad
 * Checklist automatizado para pruebas de error, seguridad y accesibilidad
 */

const http = require("http");

const BASE_URL = "http://localhost:3765";
const API_ENDPOINT = "/api/ai/chat";
const HEALTH_ENDPOINT = "/api/health";

// Colores para output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function makeRequest(method, path, body = null, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      timeout,
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (_) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function test(name, fn) {
  try {
    await fn();
    log(`✓ ${name}`, "green");
    return true;
  } catch (err) {
    log(`✗ ${name}`, "red");
    log(`  Error: ${err.message}`, "red");
    return false;
  }
}

async function runTests() {
  log("\n=== FASE 5: Validación de Calidad ===\n", "cyan");

  const results = [];

  // Test 1: Health check
  results.push(
    await test("Servidor está activo", async () => {
      const res = await makeRequest("GET", HEALTH_ENDPOINT, null, 3000);
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.body.ok) throw new Error("Health check failed");
    })
  );

  // Test 2: API key está configurado
  results.push(
    await test("Gemini API está configurado", async () => {
      const res = await makeRequest("GET", HEALTH_ENDPOINT, null, 3000);
      if (!res.body.ai) throw new Error("GEMINI_API_KEY no está configurado");
    })
  );

  // Test 3: Mensaje válido obtiene respuesta
  results.push(
    await test("Chatbot responde a mensajes válidos", async () => {
      const res = await makeRequest("POST", API_ENDPOINT, {
        message: "¿Qué es la robótica educativa?",
        systemInstruction: "Eres un asistente educativo.",
      }, 30000); // Gemini puede ser lento
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.body.reply) throw new Error("No reply received");
      if (res.body.reply.length < 10) throw new Error("Reply too short");
    })
  );

  // Test 4: Mensaje vacío retorna error
  results.push(
    await test("Rechaza mensajes vacíos", async () => {
      const res = await makeRequest("POST", API_ENDPOINT, {
        message: "",
      }, 3000);
      if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    })
  );

  // Test 5: Sin message retorna error
  results.push(
    await test("Requiere campo 'message'", async () => {
      const res = await makeRequest("POST", API_ENDPOINT, {
        systemInstruction: "Test",
      }, 3000);
      if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    })
  );

  // Test 6: Contexto pedagógico se envía correctamente
  results.push(
    await test("Acepta contexto pedagógico", async () => {
      const res = await makeRequest("POST", API_ENDPOINT, {
        message: "¿Qué es Arduino?",
        systemInstruction: "Eres un asistente educativo.",
        view: "lesson",
        module: 2,
        lesson: "2-1",
        studentId: "test-student-123",
      }, 30000); // Gemini puede ser lento
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
    })
  );

  // Test 7: Mensaje válido con contenido previo
  results.push(
    await test("Maneja historial de conversación", async () => {
      const res = await makeRequest("POST", API_ENDPOINT, {
        message: "¿Y cómo lo instalo?",
        systemInstruction: "Eres un asistente educativo.",
        contents: [
          { role: "user", parts: [{ text: "¿Qué es Arduino?" }] },
          {
            role: "model",
            parts: [{ text: "Arduino es una plataforma de hardware abierto..." }],
          },
        ],
      }, 30000); // Gemini puede ser lento
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.body.reply) throw new Error("No reply received");
    })
  );

  // Test 8: Respuesta contiene metadata
  results.push(
    await test("Retorna metadata de uso de API", async () => {
      const res = await makeRequest("POST", API_ENDPOINT, {
        message: "¿Qué es la programación?",
        systemInstruction: "Eres un asistente educativo.",
      }, 30000); // Gemini puede ser lento
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.body.model) throw new Error("No model info");
    })
  );

  // Summary
  log("\n=== RESUMEN DE PRUEBAS ===\n", "cyan");
  const passed = results.filter((r) => r).length;
  const total = results.length;

  log(`Pruebas pasadas: ${passed}/${total}`, passed === total ? "green" : "yellow");

  if (passed === total) {
    log("\n✓ Todas las pruebas pasaron. Sistema listo para usar.", "green");
    return true;
  } else {
    log(`\n✗ ${total - passed} prueba(s) fallaron. Revisa los errores arriba.`, "red");
    return false;
  }
}

// Ejecutar
runTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    log(`\nError fatal: ${err.message}`, "red");
    process.exit(1);
  });
