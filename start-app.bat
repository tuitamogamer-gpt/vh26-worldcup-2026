@echo off
title SP 2026 Dashboard
cd /d "%~dp0"

echo ============================================
echo    SP 2026 - Dashboard
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [GRESKA] Node.js nije pronadjen.
  echo Instaliraj Node.js sa https://nodejs.org pa pokreni ponovo.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Prvo pokretanje - instaliram zavisnosti ^(moze potrajati minut^)...
  echo.
  call npm install
  echo.
)

echo Pokrecem aplikaciju... preglednik ce se otvoriti automatski.
echo Za zaustavljanje pritisni Ctrl+C u ovom prozoru.
echo.
call npm run dev
pause
