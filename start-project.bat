@echo off
chcp 65001 >nul
echo.
echo ================================
echo  TravelTurkey Project Starter
echo ================================
echo.

cd /d "c:\Users\emrem\Desktop\TravelTurkey"

echo Checking dependencies...
call npm install --ignore-scripts
echo.

echo Installing iOS dependencies (if needed)...
if exist "ios\" (
    echo Note: CocoaPods not available on Windows. iOS build will require macOS.
    echo Skipping iOS pod installation...
) else (
    echo No iOS directory found.
)
echo.

echo Checking Android device...
adb devices | findstr "device$" >nul
if %errorlevel% equ 0 (
    echo ✓ Android device connected
) else (
    echo ✗ No Android device found! Check USB connection.
    pause
)
echo.

echo Starting React Native application...
call npx react-native run-android

echo.
echo ✓ Project started!
echo To start screen mirroring, run: scrcpy.bat
pause
