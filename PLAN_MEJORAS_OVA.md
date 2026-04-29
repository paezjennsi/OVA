# Plan de mejoras OVA Robótica

## Objetivo general
Evolucionar el OVA hacia una versión más robusta, usable y mantenible, priorizando continuidad de aprendizaje, experiencia móvil y preparación para despliegue educativo.

## Estado actual (base)
- Código modularizado en `src/data`, `src/styles`, `src/components`, `src/App.jsx`, `src/main.jsx`.
- Compilación funcional con `esbuild` usando:
  - `npm run build`
  - `npm run build:watch`
- Salida generada en `dist/app.js`.

---

## Prioridades de mejora

## Fase 1 - Alto impacto (corto plazo)

### 1) Persistencia de progreso con `localStorage`
**Objetivo:** no perder avance al recargar navegador o cerrar sesión local.  
**Alcance sugerido:**
- Guardar `progress`.
- Guardar `view`.
- Guardar `activeModule`, `activeLesson` y `activeQuiz` (segun corresponda).
- Cargar estado inicial desde storage al iniciar la app.
- Incluir manejo de fallback cuando no exista data o este corrupta.

**Checklist**
- [ ] Crear utilidades `loadState()` y `saveState()`.
- [ ] Integrar guardado con `useEffect` en `App`.
- [ ] Validar restauracion correcta de leccion/quiz activos.
- [ ] Probar recarga en mitad de leccion y mitad de quiz.

---

### 2) Responsive real (mobile/tablet)
**Objetivo:** mejorar usabilidad en pantallas pequenas para uso en aula y dispositivos compartidos.  
**Alcance sugerido:**
- Sidebar colapsable o convertida a drawer.
- Grillas (`modules-grid`, `stats-row`, `lesson-body`) con breakpoints.
- Ajuste de padding, tipografia y botones para touch.
- Evitar desbordes horizontales.

**Checklist**
- [ ] Definir breakpoints (ej. 1024, 768, 480).
- [ ] Adaptar layout principal y topbar.
- [ ] Ajustar tarjetas de modulo y quiz.
- [ ] Verificar navegacion completa en movil.

---

## Fase 2 - Estandarizacion tecnica (mediano plazo)

### 3) Migracion a Vite (arquitectura React estandar)
**Objetivo:** mejorar experiencia de desarrollo y facilitar escalabilidad.
**Beneficios:** HMR, convenciones modernas, plugins y despliegue mas simple.

**Checklist**
- [ ] Inicializar proyecto Vite React.
- [ ] Migrar `src` actual sin romper funcionalidad.
- [ ] Configurar scripts `dev`, `build`, `preview`.
- [ ] Validar build y ejecucion local.

---

### 4) Implementar `Exportar SCORM`
**Objetivo:** habilitar uso directo en LMS (Moodle, Canvas u otros).  
**Alcance sugerido:**
- Generar estructura SCORM 1.2 basica.
- Crear `imsmanifest.xml`.
- Empaquetar ZIP descargable desde interfaz.

**Checklist**
- [ ] Definir metadatos del curso.
- [ ] Generar manifiesto dinamico.
- [ ] Incluir assets compilados en paquete.
- [ ] Probar importacion en LMS de prueba.

---

## Fase 3 - Calidad y sostenibilidad (mediano/largo plazo)

### 5) Accesibilidad (a11y)
**Objetivo:** asegurar inclusion y cumplimiento minimo de buenas practicas.

**Checklist**
- [ ] Mejorar navegacion por teclado.
- [ ] Agregar `aria-label` y roles donde aplique.
- [ ] Revisar contraste de colores.
- [ ] Validar focus states en botones/opciones.

---

### 6) Pruebas automatizadas
**Objetivo:** reducir regresiones al modificar logica o contenido.

**Checklist**
- [ ] Tests unitarios para progreso y quiz.
- [ ] Tests de flujo (navegacion entre modulos/lecciones).
- [ ] Prueba de persistencia en `localStorage`.
- [ ] Validacion de build en CI.

---

### 7) Gestion de contenido e i18n
**Objetivo:** facilitar edicion pedagogica y versionado por idioma/region.

**Checklist**
- [ ] Separar textos UI de logica.
- [ ] Estructurar contenido versionable (JSON/MD).
- [ ] Definir estrategia de internacionalizacion.

---

## Orden recomendado de ejecucion
1. Persistencia (`localStorage`).
2. Responsive movil/tablet.
3. Migracion a Vite.
4. Exportacion SCORM.
5. Accesibilidad.
6. Tests automatizados.
7. i18n y gestion avanzada de contenidos.

## Criterios de aceptacion global
- El usuario no pierde progreso al recargar.
- La interfaz es usable en celular sin zoom forzado.
- El proyecto compila en un flujo estandar (`dev/build`).
- El paquete SCORM se puede importar en LMS.
- Se dispone de pruebas minimas de regresion.
