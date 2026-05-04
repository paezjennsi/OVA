@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo No se encontro Node.js. Instalalo desde https://nodejs.org y vuelve a ejecutar este archivo.
  pause
  exit /b 1
)

if not exist "dist\app.js" (
  echo Compilando el OVA ^(primera vez^)...
  call npm.cmd run build
  if errorlevel 1 (
    echo Fallo el build.
    pause
    exit /b 1
  )
)

echo.
echo Servidor OVA en http://localhost:3765
echo Prueba salud: http://localhost:3765/api/health
echo Deja esta ventana abierta. Cierrala para detener el servidor.
echo.
node server\index.js
if errorlevel 1 pause
