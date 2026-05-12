#!/usr/bin/env pwsh
# Script PowerShell para iniciar OVA con diagnóstico completo

$ErrorActionPreference = "Continue"

Write-Host "`n" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "     🚀 INICIANDO OVA CON IA GEMINI" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Verificar carpeta
$projectPath = "C:\Users\paezj\Downloads\OVA\OVA"
if ((Get-Location).Path -ne $projectPath) {
    Write-Host "`n[!] Cambiando a carpeta del proyecto..." -ForegroundColor Yellow
    Set-Location $projectPath
}

# Verificar que existe package.json
if (-not (Test-Path "package.json")) {
    Write-Host "`n❌ ERROR: No se encontró package.json" -ForegroundColor Red
    Write-Host "    Carpeta actual: $(Get-Location)" -ForegroundColor Red
    Write-Host "    Asegúrate de estar en: $projectPath" -ForegroundColor Red
    Read-Host "`nPresiona Enter para salir"
    exit 1
}

Write-Host "`n✅ Carpeta correcta: $projectPath" -ForegroundColor Green

# Step 1: Verificar Node.js
Write-Host "`n[1/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "     Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    Read-Host "`nPresiona Enter para salir"
    exit 1
}

# Step 2: Verificar dependencias
Write-Host "`n[2/4] Verificando dependencias..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "     Instalando npm packages..." -ForegroundColor White
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ npm install falló" -ForegroundColor Red
        Read-Host "`nPresiona Enter para salir"
        exit 1
    }
}
Write-Host "     ✅ Dependencias OK" -ForegroundColor Green

# Step 3: Compilar Frontend
Write-Host "`n[3/4] Compilando frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm run build falló" -ForegroundColor Red
    Read-Host "`nPresiona Enter para salir"
    exit 1
}
Write-Host "     ✅ Build OK (dist/app.js)" -ForegroundColor Green

# Step 4: Iniciar Servidor
Write-Host "`n[4/4] Iniciando servidor..." -ForegroundColor Yellow
Write-Host "`n============================================================" -ForegroundColor Cyan

try {
    node server/index.js
} catch {
    Write-Host "`n❌ Error al iniciar servidor: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nIntenta lo siguiente:" -ForegroundColor Yellow
    Write-Host "1. Verifica que .env existe" -ForegroundColor White
    Write-Host "2. Ejecuta: npm install" -ForegroundColor White
    Write-Host "3. Ejecuta: npm run build" -ForegroundColor White
    Read-Host "`nPresiona Enter para salir"
    exit 1
}
