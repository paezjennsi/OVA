# ✅ SOLUCIÓN - Error de Localhost (PUERTO 3765 OCUPADO)

## ❌ PROBLEMA ENCONTRADO
El **puerto 3765 ya estaba siendo usado por otro proceso** (posiblemente un node.js anterior que no se cerró correctamente).

## ✅ SOLUCIONES

### **Opción 1: Script Automático (Recomendado)**
Actualicé el archivo `start-ova.cmd` para limpiar el puerto automáticamente:

```bash
# Simplemente ejecuta:
start-ova.cmd
```

Este script:
1. ✅ Limpia el puerto 3765
2. ✅ Compila el frontend
3. ✅ Inicia el servidor
4. ✅ Muestra mensajes claros

### **Opción 2: Limpiar Puerto Manualmente**

Si eso no funciona, ejecuta en **PowerShell como Administrador**:

```powershell
# Detener todos los procesos node
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# O si necesitas el proceso específico de puerto 3765:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3765).OwningProcess | Stop-Process -Force

# Luego iniciar normalmente:
npm run serve
```

### **Opción 3: Usar Puerto Diferente**

Si prefieres otro puerto, edita `server/index.js`:

```javascript
const PORT = process.env.PORT || 3765;  // Cambiar 3765 por otro puerto
```

## 🧪 VERIFICAR QUE FUNCIONA

Después de ejecutar `start-ova.cmd`, verifica:

**En navegador:**
```
http://localhost:3765
```

**Test de API (PowerShell):**
```powershell
Invoke-RestMethod http://localhost:3765/api/health
```

Debe retornar:
```json
{
  "ok": true,
  "db": "ova.sqlite",
  "ai": true,
  "model": "gemini-flash-latest"
}
```

## 📋 SI SIGUE HABIENDO PROBLEMA

1. ✅ Ejecuta: `Start-Process powershell -ArgumentList "Get-NetTCPConnection -LocalPort 3765"`
   - Mostrará qué proceso usa el puerto

2. ✅ Intenta otro puerto - edita `server/index.js`:
   ```javascript
   const PORT = 3766;  // O 3767, 3768...
   ```

3. ✅ Reinicia la máquina (último recurso)

---

**Estado Actual:** El servidor está corriendo en http://localhost:3765 con Gemini API configurada ✅
