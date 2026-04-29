export const MODULES = [
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
            opts: ["Mover las ruedas del robot", "Recibir información del entorno", "Almacenar el programa", "Suministrar energía al sistema"],
            ans: 1,
            exp: "Los sensores son los 'órganos sensoriales' del robot: captan información del ambiente (luz, temperatura, distancia) y la envían al procesador.",
          },
          {
            q: "¿Qué porcentaje de graduados en ingeniería y tecnología en Colombia son mujeres, según el DANE 2023?",
            opts: ["Menos del 28%", "Aproximadamente el 50%", "Más del 60%", "El 35%"],
            ans: 0,
            exp: "Según datos del DANE (2023), menos del 28% de los graduados en programas de ingeniería y tecnología en Colombia son mujeres, evidenciando la brecha de género en STEM.",
          },
          {
            q: "¿Qué herramienta es ideal para comenzar a programar robots SIN hardware físico?",
            opts: ["Arduino IDE", "Scratch", "MongoDB", "Node.js"],
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
            opts: ["loop()", "setup()", "delay()", "pinMode()"],
            ans: 1,
            exp: "setup() se ejecuta una única vez al inicio. Se usa para configurar los pines y la comunicación serial. loop() se repite infinitamente después.",
          },
          {
            q: "¿Qué hace la instrucción digitalWrite(13, HIGH) en Arduino?",
            opts: ["Lee el voltaje del pin 13", "Envía energía al pin 13 (enciende un LED)", "Espera 13 milisegundos", "Define el pin 13 como entrada"],
            ans: 1,
            exp: "digitalWrite(pin, HIGH) envía 5V al pin indicado, lo que enciende un LED conectado allí. digitalWrite(pin, LOW) lo apaga enviando 0V.",
          },
          {
            q: "¿Cuánto cuesta aproximadamente un Arduino Uno en Colombia?",
            opts: ["$5.000 COP", "$15.000 - $25.000 COP", "$200.000 COP", "$500.000 COP"],
            ans: 1,
            exp: "El Arduino Uno tiene un costo accesible de entre $15.000 y $25.000 COP, lo que lo hace viable para instituciones educativas con presupuestos limitados.",
          },
        ],
      },
    ],
  },
];
