@echo off
chcp 65001 >nul
REM scrcpy launcher for TravelTurkey development
echo Starting scrcpy for React Native development...

set SCRCPY_PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Genymobile.scrcpy_Microsoft.Winget.Source_8wekyb3d8bbwe\scrcpy-win64-v3.3.1

REM Check if device is connected
adb devices | findstr "device$" >nul
if %errorlevel% neq 0 (
    echo ERROR: No Android device detected. Please check USB connection.
    pause
    exit /b 1
)

REM Start scrcpy with optimized settings for development
"%SCRCPY_PATH%\scrcpy.exe" --max-size 1024 --video-bit-rate 8M --stay-awake --turn-screen-off

pause
