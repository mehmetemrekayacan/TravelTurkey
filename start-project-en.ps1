# TravelTurkey Project Starter Script
# Project startup script

# Set PowerShell encoding to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🚀 Starting TravelTurkey Project..." -ForegroundColor Green

# Navigate to project directory
Set-Location "c:\Users\emrem\Desktop\TravelTurkey"

# Check and install dependencies
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
npm install

# Android device check
Write-Host "📱 Checking Android device..." -ForegroundColor Yellow
$devices = adb devices
if ($devices -match "device$") {
    Write-Host "✅ Android device connected" -ForegroundColor Green
} else {
    Write-Host "❌ No Android device found! Check USB connection." -ForegroundColor Red
    Read-Host "Press Enter to continue"
}

# Start React Native application
Write-Host "🏃‍♂️ Starting React Native application..." -ForegroundColor Yellow
npx react-native run-android

Write-Host "✅ Project started! Open separate terminal for scrcpy: .\scrcpy.bat" -ForegroundColor Green
