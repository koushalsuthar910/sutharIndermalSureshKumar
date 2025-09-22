@echo off
echo Starting local server for Suthar Indermal Suresh Kumar Website...
echo.
echo Server will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
cd /d %~dp0
powershell -Command "& {Start-Process 'http://localhost:8000'; $Runspace = [runspacefactory]::CreateRunspace(); $PowerShell = [powershell]::Create(); $PowerShell.Runspace = $Runspace; $Runspace.Open(); $code = { param($port) python3 -m http.server $port }; $PowerShell.AddScript($code).AddArgument(8000); $PowerShell.BeginInvoke() }"
if %errorlevel% neq 0 (
    echo Python3 not found. Trying with Python...
    python -m http.server 8000
)
pause
