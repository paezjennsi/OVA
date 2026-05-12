@echo off
REM Script mejorado para iniciar OVA con diagnóstico

echo.
echo ============================================================
echo            INICIANDO OVA CON IA GEMINI
echo ============================================================
echo.

REM Verificar que estamos en la carpeta correcta
if not exist "package.json" (
    echo ERROR: No se encontro package.json
    echo Debes estar en la carpeta C:\Users\paezj\Downloads\OVA\OVA
    pause
    exit /b 1
)

echo [1/3] Verificando dependencias...
if not exist "node_modules" (
    echo        Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install fallo
        pause
        exit /b 1
    )
)
echo        ✅ Dependencias OK

echo.
echo [2/3] Compilando frontend...
call npm run build
if errorlevel 1 (
    echo ERROR: npm run build fallo
    pause
    exit /b 1
)
echo        ✅ Build OK

echo.
echo [3/3] Iniciando servidor...
echo.
echo ============================================================
node server/index.js
echo.
echo ============================================================
echo Servidor detenido.
pause
