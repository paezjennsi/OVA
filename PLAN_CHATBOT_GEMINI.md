# Planning de implementación: chatbot IA con Gemini

## 1. Análisis del proyecto

### 1.1 Stack detectado
- Frontend en React con componentes JSX bajo `src/`.
- Empaquetado con `esbuild` mediante `npm run build` y `npm run build:watch`.
- Backend en Node.js con Express bajo `server/index.js`.
- Persistencia local con `sql.js` y archivo SQLite en `database/`.
- El proyecto usa CommonJS en servidor y módulos ES en el frontend.

### 1.2 Arquitectura actual
- Arquitectura separada en cliente y servidor, pero dentro del mismo repositorio.
- El frontend renderiza la experiencia OVA y consume APIs internas del servidor.
- El servidor expone endpoints REST para estudiantes, visitas y progreso.
- La UI principal se controla desde `src/App.jsx` y se compone con sidebar, topbar y vistas de contenido.

### 1.3 Observaciones relevantes para el chatbot
- Existe una barra superior con acciones donde cabe el botón “Asistente AI”.
- Ya hay un sidebar lateral en la app, por lo que el chatbot debe integrarse como panel plegable del lado derecho sin romper la navegación actual.
- La integración de Gemini debe hacerse por servidor para no exponer la clave en el navegador.
- La clave API indicada en el prompt debe moverse a un archivo `.env` y quedar fuera del repositorio.

## 2. Objetivo funcional

Implementar un chatbot text-to-text con Gemini, accesible desde un botón “Asistente AI” ubicado en la esquina superior derecha, junto al botón “Exportar SCORM”. Al pulsarlo, debe abrirse un sidebar derecho plegable/desplegable dedicado a la conversación con IA.

## 3. Principios de implementación

- No modificar la lógica base del OVA sin autorización adicional.
- Encapsular la funcionalidad de IA en módulos nuevos o en puntos de extensión controlados.
- Proteger secretos con `.env` y excluirlos en `.gitignore`.
- Usar el servidor como proxy hacia Gemini para mantener la API key segura.
- Mantener el chatbot desacoplado del flujo principal de lecciones, quizzes y registro.

## 4. Fases de implementación

### Fase 0 - Preparación y seguridad
**Objetivo:** dejar lista la base para integrar Gemini sin exponer credenciales.

**Actividades:**
- Crear variables de entorno para la API de Gemini.
- Registrar `.env` en `.gitignore`.
- Definir nombre de variables como `GEMINI_API_KEY`, `GEMINI_MODEL` y `GEMINI_API_URL`.
- Validar que la app falle de forma controlada si la clave no está configurada.

**Entregables:**
- Archivo `.env` local.
- Actualización de `.gitignore`.
- Documento breve de configuración local.

**Criterio de aceptación:**
- La clave no aparece en el frontend ni en el código versionado.

### Fase 1 - Backend Gemini
**Objetivo:** crear la capa de servidor que conecte el OVA con Gemini.

**Actividades:**
- Crear endpoint REST para recibir mensajes del chatbot.
- Enviar la petición a Gemini con el formato equivalente al cURL proporcionado.
- Normalizar el prompt de entrada y la respuesta de salida.
- Manejar errores de red, cuota, credenciales inválidas y respuestas vacías.
- Añadir validación básica de payload para evitar entradas inválidas.

**Entregables:**
- Endpoint tipo `POST /api/ai/chat` o equivalente.
- Cliente interno para llamar a Gemini desde `server/index.js` o un módulo nuevo.
- Manejo de errores con mensajes claros para UI.

**Criterio de aceptación:**
- El servidor responde con texto generado por Gemini y no expone la clave.

### Fase 2 - UI/UX del asistente
**Objetivo:** integrar el chatbot dentro de la interfaz actual sin afectar el flujo pedagógico.

**Actividades:**
- Agregar el botón “Asistente AI” a la derecha de la topbar, antes de “Exportar SCORM”.
- Crear un sidebar derecho plegable/desplegable dedicado al chat.
- Definir un historial visual de mensajes usuario/asistente.
- Incluir estado de carga, error y reconexión visual.
- Asegurar uso cómodo en escritorio y adaptación razonable en tablet.

**Entregables:**
- Nuevo componente de chatbot o panel lateral.
- Estilos específicos para el drawer/chat.
- Integración visual con el layout actual.

**Criterio de aceptación:**
- El panel se abre y se cierra desde el botón sin romper la navegación actual.

### Fase 3 - Flujo conversacional text-to-text
**Objetivo:** garantizar interacción útil y estable con Gemini.

**Actividades:**
- Permitir escribir preguntas libres sobre el contenido del OVA.
- Enviar contexto mínimo cuando convenga, sin sobrecargar el prompt.
- Mostrar respuesta por turnos en formato conversacional.
- Mantener una ventana de contexto simple para conversación continua.
- Permitir limpiar conversación o iniciar una nueva sesión.

**Entregables:**
- Estado local del chat.
- Lógica de envío y recepción de mensajes.
- UX básica de conversación continua.

**Criterio de aceptación:**
- El usuario puede preguntar y recibir respuestas consecutivas en una sesión fluida.

### Fase 4 - Integración con el OVA
**Objetivo:** conectar el asistente al contexto pedagógico del aplicativo.

**Actividades:**
- Definir prompts de sistema con tono educativo y soporte contextual.
- Hacer que el asistente pueda responder sobre módulos, lecciones y quizzes sin alterar el contenido base.
- Considerar accesos rápidos a temas frecuentes del OVA.
- Mantener separación entre contenido del curso y respuesta generada.

**Entregables:**
- Prompt de sistema del asistente.
- Reglas de contexto por módulo o sección.

**Criterio de aceptación:**
- El asistente responde con coherencia sobre el contenido del OVA y su navegación.

### Fase 5 - Calidad, pruebas y cierre
**Objetivo:** asegurar estabilidad antes de publicar.

**Actividades:**
- Probar casos de error de Gemini y falta de red.
- Verificar que `.env` no se suba al repositorio.
- Validar que `npm run build` sigue funcionando.
- Probar apertura/cierre del sidebar en el layout real.
- Revisar accesibilidad mínima: foco, contraste y teclado.

**Entregables:**
- Checklist de validación.
- Ajustes finales de UI y backend.

**Criterio de aceptación:**
- El chatbot funciona localmente, el build sigue estable y la clave permanece protegida.

## 5. Orden recomendado de ejecución
1. Seguridad y variables de entorno.
2. Endpoint de servidor para Gemini.
3. Componente UI del botón y sidebar.
4. Flujo de conversación text-to-text.
5. Ajustes de UX, errores y validación final.

## 6. Riesgos y mitigaciones
- Riesgo: exponer la API key en frontend. Mitigación: usar solo backend como proxy.
- Riesgo: romper el layout actual. Mitigación: encapsular el asistente como panel aislado.
- Riesgo: respuestas lentas o errores de Gemini. Mitigación: estados de carga, timeout y manejo de error.
- Riesgo: mezclar lógica nueva con código base sensible. Mitigación: cambios mínimos y componentes nuevos.

## 7. Criterios globales de aceptación
- El botón “Asistente AI” aparece junto a “Exportar SCORM”.
- El sidebar derecho se abre y cierra correctamente.
- La conversación funciona text-to-text con Gemini.
- La API key vive en `.env` y no se versiona.
- El proyecto conserva su build y su arquitectura base.