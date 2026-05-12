@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo No se encontro Node.js. Instalalo desde https://nodejs.org y vuelve a ejecutar este archivo.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo            INICIANDO OVA CON IA GEMINI
echo ============================================================
echo.

echo [1/3] Liberando puerto 3765...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3765') do (
  taskkill /PID %%a /F >nul 2>&1
)

echo [2/3] Compilando frontend...
call npm.cmd run build
if errorlevel 1 (
  echo Fallo el build.
  pause
  exit /b 1
)

echo [3/3] Iniciando servidor en http://localhost:3765
echo Abre: http://localhost:3765
echo Prueba salud: http://localhost:3765/api/health
echo.

node server\index.js

echo.
echo Servidor detenido.
pause
