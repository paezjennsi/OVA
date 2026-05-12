# ⚡ GUÍA RÁPIDA DE PRUEBA - CHATBOT IA GEMINI

## 🚀 EMPEZAR EN 5 MINUTOS

### Paso 1: Verificar que el servidor está corriendo
```powershell
# En PowerShell, verifica que el servidor está activo
curl http://localhost:3765/api/health
# Respuesta esperada: {"ok":true,"db":"ova.sqlite","ai":true,"model":"gemini-flash-latest"}
```

### Paso 2: Abrir el navegador
```
http://localhost:3765
```

### Paso 3: Registrar estudiante
- Nombre: *Tu nombre o "Prueba"*
- Haz clic en "Entrar al OVA"

### Paso 4: Probar el chatbot
1. **Desde Home**: 
   - Haz clic en "✨ Asistente AI" (topbar derecho)
   - Verás sugerencias generales
   - Pregunta: *"¿Qué es la robótica educativa?"*

2. **Dentro de una Lección**:
   - Haz clic en una lección (ej: "¿Qué es la robótica educativa?")
   - Abre el asistente
   - Verás sugerencias **contextualizadas** a esa lección
   - Pregunta: *"¿Cuáles son los conceptos clave?"*

### Paso 5: Validar funcionalidades
- ✅ Panel se abre/cierra
- ✅ Las sugerencias cambian según contexto
- ✅ Input acepta texto
- ✅ Botón "Enviar" envía mensaje
- ✅ Respuesta aparece en chat
- ✅ Historial persiste (recarga página)
- ✅ Botón "Nueva conversación" limpia chat

---

## 🎯 CASOS DE PRUEBA

### Caso 1: Desde Home (Contexto General)
```
Usuario: "¿Qué módulos hay en el OVA?"
Asistente: "El OVA contiene 3 módulos: 1. Introducción a la Robótica..."
```

### Caso 2: Dentro de Lección (Contexto Específico)
```
Ubicación: Lección 1 - "¿Qué es la robótica educativa?"
Usuario: "¿Resúmeme esta lección?"
Asistente: "La robótica educativa es una disciplina que combina..."
```

### Caso 3: Usando Sugerencias Rápidas
```
1. Haz clic en "Nueva conversación"
2. Haz clic en una sugerencia (ej: "¿Cuáles son los conceptos clave?")
3. La pregunta se completa automáticamente
```

### Caso 4: Error Esperado (Demanda Alta)
```
Si ves: "This model is currently experiencing high demand"
→ Es normal en peak hours de Gemini
→ El sistema reintenta automáticamente
→ Espera 2-3 segundos
```

---

## 🔍 QUÉ BUSCAR EN CADA PRUEBA

### Seguridad ✅
- [ ] .env no aparece en el navegador (F12 → Network)
- [ ] API key no está en el código (F12 → Sources)
- [ ] Logs no muestran credenciales

### Funcionalidad ✅
- [ ] Botón abre panel correctamente
- [ ] Mensajes se envían y reciben
- [ ] Historial persiste después de recargar
- [ ] "Nueva conversación" limpia todo

### Integración OVA ✅
- [ ] Botón está al lado izquierdo de "Exportar SCORM"
- [ ] Panel no interfiere con lecciones/quizzes
- [ ] Contexto cambia al navegar módulos/lecciones
- [ ] Sugerencias son relevantes

### UX ✅
- [ ] Indicador "Escribiendo..." aparece
- [ ] Scroll automático a nuevos mensajes
- [ ] Botones deshabilitados cuando corresponde
- [ ] Colores/contraste legible

---

## 🐛 SOLUCIÓN DE PROBLEMAS

| Problema | Solución |
|----------|----------|
| **Botón "Asistente AI" no aparece** | Recarga F5, verifica build (npm run build) |
| **"Gemini no está configurado"** | Verifica .env contiene GEMINI_API_KEY |
| **"This model is experiencing high demand"** | Espera 2-3 segundos, sistema reintenta |
| **Historial no persiste** | Verifica localStorage habilitado (DevTools) |
| **Panel no se abre** | Cierra navegador, borra caché (Ctrl+Shift+Del) |
| **Error 503 en server** | Restart con `npm run serve` |

---

## 📊 MÉTRICAS A VALIDAR

Después de probar, valida que:

```
✅ Tiempo respuesta: < 5 segundos (con Gemini)
✅ Tamaño bundle: 56.3kb (dist/app.js)
✅ Build time: < 100ms
✅ Panel ancho: 420px max
✅ Historial max: 50 mensajes
```

---

## ✨ PRÓXIMOS PASOS

Cuando estés satisfecho con las pruebas:

1. Documenta cualquier bug encontrado
2. Suggest mejoras UI/UX si es necesario
3. Valida con usuarios reales (estudiantes)
4. Deploy a producción
5. Monitorea logs en `debug-2993a7.log`

---

## 📝 CHECKLIST FINAL

- [ ] Servidor inicia correctamente
- [ ] OVA carga sin errores
- [ ] Chatbot abre/cierra
- [ ] Envía/recibe mensajes
- [ ] Contexto cambia dinámicamente
- [ ] Sugerencias son contextuales
- [ ] Historial persiste
- [ ] Errores se manejan correctamente
- [ ] Build compila sin warnings
- [ ] .env está protegido

**Si todos los checks están ✅, ¡el sistema está LISTO PARA PRODUCCIÓN!**

---

Fecha: **12 de mayo de 2026**  
Versión: **1.0 Final**  
Estado: **LISTO PARA PROBAR** ✅
