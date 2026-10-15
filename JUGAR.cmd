@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Se necesita Node.js 22.12 o superior. Instálalo desde https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  call npm.cmd install
  if errorlevel 1 exit /b 1
)
echo NEXO LIFE 3D - Abre http://127.0.0.1:5173 en tu navegador.
echo Mantén esta ventana abierta mientras juegas.
start "" "http://127.0.0.1:5173"
call npm.cmd run dev -- --port 5173 --strictPort
