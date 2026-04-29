const { useState } = React;

// ─── DATA ───────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    icon: "🤖",
    title: "Introducción a la Robótica",
    subtitle: "¿Qué es y para qué sirve?",
    color: "#00d4ff",
    accent: "#0a4a6b",
    lessons: [
      {
        id: "1-1",
        title: "¿Qué es la robótica educativa?",
        duration: "10 min",
        content: `La robótica educativa es una disciplina que combina el diseño, construcción y programación de robots como estrategia pedagógica. Su objetivo es desarrollar habilidades de pensamiento computacional, resolución de problemas y trabajo colaborativo en los estudiantes.\n\nEn contextos rurales, la robótica educativa representa una oportunidad única para acercar la tecnología a comunidades con menos acceso, usando materiales de bajo costo como Arduino y sensores reciclados.`,
        keyPoints: [
          "Integra ciencia, tecnología, ingeniería y matemáticas (STEM)",
          "Fomenta el aprendizaje activo y colaborativo",
          "Desarrolla pensamiento computacional desde edades tempranas",
          "Puede adaptarse a contextos rurales con kits económicos",
        ],
      },
      {
        id: "1-2",
        title: "Componentes básicos de un robot",
        duration: "15 min",
        content: `Un robot educativo está compuesto por tres sistemas fundamentales: sensores (entrada), procesador (lógica) y actuadores (salida). Esta estructura básica permite al estudiante comprender cómo interactúa la máquina con su entorno.\n\nLos robots más usados en educación básica incluyen plataformas como Arduino Uno, microbit y LEGO Mindstorms, cada una con diferentes niveles de complejidad.`,
        keyPoints: [
          "Sensores: reciben información del entorno (luz, temperatura, distancia)",
          "Procesador: interpreta los datos y toma decisiones (Arduino, microbit)",
          "Actuadores: generan movimiento o sonido (motores, LEDs, buzzer)",
          "Fuente de energía: baterías o USB",
        ],
      },
      {
        id: "1-3",
        title: "Robótica y equidad de género en STEM",
        duration: "12 min",
        content: `Históricamente, las áreas STEM han presentado una subrepresentación de mujeres. Según datos del DANE (2023), menos del 28% de los graduados en ingeniería y tecnología en Colombia son mujeres.\n\nLas actividades de robótica con enfoque de género intencional —usando referentes femeninos, lenguaje inclusivo y roles de liderazgo técnico para niñas— han demostrado aumentar la participación femenina hasta en un 41% (Patiño et al., 2023).`,
        keyPoints: [
          "Usar narrativas diversas e inclusivas en los proyectos",
          "Asignar roles técnicos de liderazgo a las estudiantes",
          "Visibilizar referentes femeninas en ciencia y tecnología",
          "Diseñar actividades colaborativas que valoren distintas formas de contribución",
        ],
      },
    ],
  },
  {
    id: 2,
    icon: "💻",
    title: "Programación Básica",
    subtitle: "Arduino y Scratch paso a paso",
    color: "#ff6b35",
    accent: "#6b2510",
    lessons: [
      {
        id: "2-1",
        title: "Primeros pasos con Scratch",
        duration: "20 min",
        content: `Scratch es un lenguaje de programación visual desarrollado por el MIT, ideal para estudiantes de básica primaria y secundaria. Usa bloques de colores que se ensamblan como piezas de rompecabezas, eliminando la barrera de la sintaxis.\n\nCon Scratch puedes crear animaciones, juegos y simulaciones de robots sin necesidad de hardware físico, lo que lo hace ideal para instituciones con recursos limitados.`,
        keyPoints: [
          "Interfaz de bloques visual, sin errores de sintaxis",
          "Gratuito y disponible en español en scratch.mit.edu",
          "Permite simular comportamientos robóticos sin hardware",
          "Compatible con extensiones para conectar Arduino y microbit",
        ],
        code: {
          lang: "Scratch (pseudocódigo)",
          snippet: `// Simular un robot que sigue una línea en Scratch\n\ncuando [bandera verde] sea presionada\n  por siempre\n    si <sensor de color detecta [negro]> entonces\n      mover (10) pasos\n      girar ↺ (15) grados\n    si no\n      mover (10) pasos\n    fin\n  fin`,
        },
      },
      {
        id: "2-2",
        title: "Introducción a Arduino",
        duration: "25 min",
        content: `Arduino es una plataforma de hardware y software de código abierto, basada en el lenguaje C++. Es el estándar mundial en educación tecnológica por su bajo costo (aprox. $15.000 COP), amplia comunidad y documentación disponible en español.\n\nEl flujo de trabajo es simple: escribir código en Arduino IDE → cargarlo al microcontrolador → el robot ejecuta las instrucciones. Este ciclo de prueba y error es el corazón del aprendizaje por proyectos.`,
        keyPoints: [
          "Lenguaje C++ simplificado, fácil de aprender",
          "Arduino IDE gratuito para Windows, Mac y Linux",
          "Comunidad mundial con miles de proyectos open-source",
          "Precio accesible: Arduino Uno cuesta aprox. $15.000 - $25.000 COP",
        ],
        code: {
          lang: "Arduino C++",
          snippet: `// Hacer parpadear un LED - primer programa Arduino\n\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}`,
        },
      },
      {
        id: "2-3",
        title: "Proyecto: Robot esquiva-obstáculos",
        duration: "30 min",
        content: `En este proyecto construirás un robot que detecta obstáculos usando un sensor ultrasónico HC-SR04 y los evita girando. Este es uno de los proyectos más motivadores para estudiantes porque el resultado es inmediatamente visible y emocionante.\n\nEl sensor ultrasónico funciona como el sonar de los murciélagos: emite un pulso de sonido y mide el tiempo que tarda en rebotar. Con esa información, calcula la distancia al obstáculo.`,
        keyPoints: [
          "Materiales: Arduino Uno, sensor HC-SR04, 2 motores DC, driver L298N",
          "Costo aproximado total: $35.000 - $50.000 COP",
          "El sensor mide distancias de 2cm a 400cm con 3mm de precisión",
          "El proyecto completo toma 2-3 horas de clase",
        ],
        code: {
          lang: "Arduino C++",
          snippet: `#define TRIG_PIN 9\n#define ECHO_PIN 10\n#define MOTOR_IZQ 5\n#define MOTOR_DER 6\n\nvoid setup() {\n  pinMode(TRIG_PIN, OUTPUT);\n  pinMode(ECHO_PIN, INPUT);\n  pinMode(MOTOR_IZQ, OUTPUT);\n  pinMode(MOTOR_DER, OUTPUT);\n  Serial.begin(9600);\n}\n\nlong medirDistancia() {\n  digitalWrite(TRIG_PIN, LOW);\n  delayMicroseconds(2);\n  digitalWrite(TRIG_PIN, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG_PIN, LOW);\n  long duracion = pulseIn(ECHO_PIN, HIGH);\n  return duracion * 0.034 / 2;\n}\n\nvoid loop() {\n  long distancia = medirDistancia();\n  if (distancia < 20) {\n    analogWrite(MOTOR_IZQ, 200);\n    analogWrite(MOTOR_DER, 0);\n    delay(500);\n  } else {\n    analogWrite(MOTOR_IZQ, 200);\n    analogWrite(MOTOR_DER, 200);\n  }\n}`,
        },
      },
    ],
  },
  {
    id: 3,
    icon: "📝",
    title: "Evaluaciones",
    subtitle: "Comprueba lo que aprendiste",
    color: "#a855f7",
    accent: "#3b0764",
    quizzes: [
      {
        id: "q1",
        module: "Robótica General",
        questions: [
          {
            q: "¿Cuál es la función principal de los SENSORES en un robot?",
            opts: ["Mover las ruedas del robot","Recibir información del entorno","Almacenar el programa","Suministrar energía al sistema"],
            ans: 1,
            exp: "Los sensores son los 'órganos sensoriales' del robot: captan información del ambiente (luz, temperatura, distancia) y la envían al procesador.",
          },
          {
            q: "¿Qué porcentaje de graduados en ingeniería y tecnología en Colombia son mujeres, según el DANE 2023?",
            opts: ["Menos del 28%","Aproximadamente el 50%","Más del 60%","El 35%"],
            ans: 0,
            exp: "Según datos del DANE (2023), menos del 28% de los graduados en programas de ingeniería y tecnología en Colombia son mujeres, evidenciando la brecha de género en STEM.",
          },
          {
            q: "¿Qué herramienta es ideal para comenzar a programar robots SIN hardware físico?",
            opts: ["Arduino IDE","Scratch","MongoDB","Node.js"],
            ans: 1,
            exp: "Scratch permite simular comportamientos robóticos usando bloques visuales, sin necesidad de hardware, ideal para contextos con recursos limitados.",
          },
        ],
      },
      {
        id: "q2",
        module: "Programación Arduino",
        questions: [
          {
            q: "¿Qué función de Arduino se ejecuta UNA SOLA VEZ al encender el dispositivo?",
            opts: ["loop()","setup()","delay()","pinMode()"],
            ans: 1,
            exp: "setup() se ejecuta una única vez al inicio. Se usa para configurar los pines y la comunicación serial. loop() se repite infinitamente después.",
          },
          {
            q: "¿Qué hace la instrucción digitalWrite(13, HIGH) en Arduino?",
            opts: ["Lee el voltaje del pin 13","Envía energía al pin 13 (enciende un LED)","Espera 13 milisegundos","Define el pin 13 como entrada"],
            ans: 1,
            exp: "digitalWrite(pin, HIGH) envía 5V al pin indicado, lo que enciende un LED conectado allí. digitalWrite(pin, LOW) lo apaga enviando 0V.",
          },
          {
            q: "¿Cuánto cuesta aproximadamente un Arduino Uno en Colombia?",
            opts: ["$5.000 COP","$15.000 - $25.000 COP","$200.000 COP","$500.000 COP"],
            ans: 1,
            exp: "El Arduino Uno tiene un costo accesible de entre $15.000 y $25.000 COP, lo que lo hace viable para instituciones educativas con presupuestos limitados.",
          },
        ],
      },
    ],
  },
];

const css = `
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
`;

function Sidebar({ view, setView, activeModule, setActiveModule, activeLesson, setActiveLesson, progress }) {
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
              onClick={() => { setActiveModule(mod.id); setActiveLesson(mod.lessons[0]); setView("lesson"); }}
            >
              <span className="nav-icon">{mod.icon}</span>
              <span style={{ flex: 1, lineHeight: 1.3 }}>{mod.title}</span>
              <span className="nav-badge">{pct}%</span>
            </div>
            <div className="progress-bar-mini" style={{ margin: "-4px 20px 6px" }}>
              <div className="progress-bar-mini-fill" style={{ width: `${pct}%`, background: mod.color }} />
            </div>
            {isOpen && view === "lesson" && mod.lessons.map((lesson, i) => {
              const isDone = (progress[mod.id]?.lessons || {})[lesson.id];
              return (
                <div
                  key={lesson.id}
                  className={`nav-sub ${activeLesson?.id === lesson.id ? "active" : ""}`}
                  onClick={() => { setActiveLesson(lesson); setView("lesson"); }}
                >
                  {isDone ? "✓" : `${i + 1}.`} {lesson.title}
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="sidebar-section">Evaluación</div>
      <div
        className={`nav-item ${view === "quiz-select" || view === "quiz" ? "active" : ""}`}
        onClick={() => setView("quiz-select")}
      >
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

function Home({ setView, setActiveModule, setActiveLesson, progress }) {
  const totalLessons = MODULES.slice(0, 2).reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = Object.values(progress).reduce((a, b) => a + (b.done || 0), 0);
  return (
    <div className="content">
      <div className="home-hero">
        <div className="hero-tag">🤖 OVA · Robótica Educativa</div>
        <div className="hero-title">Aprende robótica,<br />transforma tu comunidad</div>
        <div className="hero-desc">Un objeto virtual de aprendizaje diseñado para fortalecer competencias STEM en contextos rurales colombianos, con enfoque en equidad de género.</div>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(0,212,255,0.1)" }}>📚</div>
          <div>
            <div className="stat-value" style={{ color: "var(--cyan)" }}>{doneLessons}/{totalLessons}</div>
            <div className="stat-label">Lecciones completadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(255,107,53,0.1)" }}>⚡</div>
          <div>
            <div className="stat-value" style={{ color: "var(--orange)" }}>{totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0}%</div>
            <div className="stat-label">Progreso total</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(168,85,247,0.1)" }}>🏆</div>
          <div>
            <div className="stat-value" style={{ color: "var(--purple)" }}>{doneLessons * 10}</div>
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
            <div key={mod.id} className="module-card"
              onClick={() => { if (mod.id === 3) { setView("quiz-select"); return; } setActiveModule(mod.id); setActiveLesson(mod.lessons[0]); setView("lesson"); }}
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
        {MODULES.slice(0, 2).flatMap((m) => m.lessons.slice(0, 2).map((l) => {
          const isDone = (progress[m.id]?.lessons || {})[l.id];
          return (
            <div key={l.id} className="lesson-item" onClick={() => { setActiveModule(m.id); setActiveLesson(l); setView("lesson"); }}>
              <div className="lesson-check" style={{ borderColor: isDone ? "var(--green)" : m.color, color: isDone ? "var(--green)" : m.color, background: isDone ? "rgba(34,197,94,0.1)" : "transparent" }}>
                {isDone ? "✓" : m.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{l.title}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{m.title} · {l.duration}</div>
              </div>
              <span style={{ color: "var(--muted)", fontSize: 18 }}>›</span>
            </div>
          );
        }))}
      </div>
    </div>
  );
}

function LessonView({ mod, lesson, lessons, setActiveLesson, markDone, progress, setView }) {
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const isDone = (progress[mod.id]?.lessons || {})[lesson.id];
  return (
    <div className="content">
      <div className="lesson-header">
        <div className="lesson-number" style={{ background: `${mod.color}20`, color: mod.color }}>{idx + 1}</div>
        <div>
          <div className="lesson-title-main">{lesson.title}</div>
          <div className="lesson-meta-row">
            <span className="lesson-meta-item">⏱ {lesson.duration}</span>
            <span className="lesson-meta-item">📦 {mod.title}</span>
            {isDone && <span className="lesson-meta-item" style={{ color: "var(--green)" }}>✓ Completada</span>}
          </div>
        </div>
      </div>
      <div className="lesson-body">
        <div className="lesson-content-card">
          <div className="lesson-text">{lesson.content}</div>
          <div className="key-points">
            <div className="key-points-title">Puntos clave</div>
            {lesson.keyPoints.map((kp, i) => <div className="key-point" key={i}>{kp}</div>)}
          </div>
          <div className="lesson-nav">
            {idx > 0 ? <button className="btn btn-ghost" onClick={() => setActiveLesson(lessons[idx - 1])}>← Anterior</button> : <div />}
            <button
              className="btn btn-primary"
              style={isDone ? { background: "var(--green)", color: "#000" } : {}}
              onClick={() => { markDone(mod.id, lesson.id); if (idx < lessons.length - 1) setActiveLesson(lessons[idx + 1]); }}
            >
              {isDone ? "✓ Completada" : idx < lessons.length - 1 ? "Completar y seguir →" : "Finalizar módulo"}
            </button>
          </div>
        </div>
        <div>
          {lesson.code && (
            <div className="lesson-sidebar-card" style={{ marginBottom: 16 }}>
              <div className="code-header">
                <span className="code-lang">💻 {lesson.code.lang}</span>
                <div className="code-dots">
                  <div className="code-dot" style={{ background: "#ef4444" }} />
                  <div className="code-dot" style={{ background: "#f59e0b" }} />
                  <div className="code-dot" style={{ background: "#22c55e" }} />
                </div>
              </div>
              <div className="code-block">{lesson.code.snippet}</div>
            </div>
          )}
          <div className="lesson-sidebar-card">
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--muted)", marginBottom: 12 }}>Lecciones del módulo</div>
            {lessons.map((l, i) => {
              const d = (progress[mod.id]?.lessons || {})[l.id];
              return (
                <div key={l.id} className={`lesson-item ${l.id === lesson.id ? "active" : ""}`}
                  style={{ borderBottom: i < lessons.length - 1 ? "1px solid var(--border)" : "none", padding: "10px 4px" }}
                  onClick={() => setActiveLesson(l)}
                >
                  <div className="lesson-check" style={{ width: 20, height: 20, fontSize: 10, borderColor: d ? "var(--green)" : l.id === lesson.id ? mod.color : "var(--border)", color: d ? "var(--green)" : l.id === lesson.id ? mod.color : "var(--muted)", background: d ? "rgba(34,197,94,0.1)" : "transparent" }}>
                    {d ? "✓" : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{l.title}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{l.duration}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizSelect({ setView, setActiveQuiz }) {
  return (
    <div className="content">
      <div className="home-hero" style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,212,255,0.05))", borderColor: "rgba(168,85,247,0.2)", marginBottom: 24 }}>
        <div className="hero-tag" style={{ background: "rgba(168,85,247,0.15)", color: "var(--purple)" }}>📝 Zona de evaluación</div>
        <div className="hero-title">Evaluaciones del OVA</div>
        <div className="hero-desc">Selecciona un quiz para comprobar lo que aprendiste. Cada pregunta incluye retroalimentación inmediata.</div>
      </div>
      <div className="quiz-selector">
        {MODULES[2].quizzes.map((quiz, i) => (
          <div key={quiz.id} className="quiz-sel-card" onClick={() => { setActiveQuiz(quiz); setView("quiz"); }}>
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

function QuizView({ quiz, setView, addScore }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = quiz.questions[current];
  const pct = Math.round((current / quiz.questions.length) * 100);

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.ans;
    if (correct) setScore((s) => s + 1);
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
                <div className="breakdown-val" style={{ color: "var(--green)" }}>{correct}</div>
                <div className="breakdown-lbl">Correctas</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-val" style={{ color: "var(--red)" }}>{total - correct}</div>
                <div className="breakdown-lbl">Incorrectas</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-val" style={{ color: "var(--purple)" }}>{total}</div>
                <div className="breakdown-lbl">Total</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn btn-ghost" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); setAnswers([]); }}>🔁 Intentar de nuevo</button>
              <button className="btn btn-primary" onClick={() => setView("quiz-select")}>Ver otras evaluaciones</button>
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
          <div className="quiz-counter">{current + 1} / {quiz.questions.length}</div>
        </div>
        <div className="quiz-progress">
          <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="quiz-options">
          {q.opts.map((opt, i) => {
            let cls = "quiz-option";
            if (answered) { cls += " disabled"; if (i === q.ans) cls += " correct"; else if (i === selected) cls += " wrong"; }
            else if (i === selected) cls += " selected";
            return (
              <div key={i} className={cls} onClick={() => handleSelect(i)}>
                <div className="option-letter">{["A","B","C","D"][i]}</div>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>
        {answered && (
          <div className="explanation">
            <span className="explanation-icon">💡</span>
            <span><strong>Explicación:</strong> {q.exp}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn btn-ghost" onClick={() => setView("quiz-select")}>← Salir</button>
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

function App() {
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
        <Sidebar view={view} setView={setView} activeModule={activeModule} setActiveModule={setActiveModule} activeLesson={activeLesson} setActiveLesson={setActiveLesson} progress={progress} />
        <div className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">{info.title}</div>
              <div className="topbar-sub">{info.sub}</div>
            </div>
            <div className="topbar-actions">
              {view !== "home" && <button className="btn btn-ghost" onClick={() => setView("home")}>🏠 Inicio</button>}
              <button className="btn btn-primary">⬇ Exportar SCORM</button>
            </div>
          </div>
          {view === "home" && <Home setView={setView} setActiveModule={setActiveModule} setActiveLesson={setActiveLesson} progress={progress} />}
          {view === "lesson" && currentMod && activeLesson && <LessonView mod={currentMod} lesson={activeLesson} lessons={currentMod.lessons} setActiveLesson={setActiveLesson} markDone={markDone} progress={progress} setView={setView} />}
          {view === "quiz-select" && <QuizSelect setView={setView} setActiveQuiz={setActiveQuiz} />}
          {view === "quiz" && activeQuiz && <QuizView quiz={activeQuiz} setView={setView} addScore={addScore} />}
        </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
