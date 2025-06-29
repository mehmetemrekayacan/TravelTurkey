# TravelTurkey Project Starter Script
# Proje baslatma icin tek komut

# PowerShell encoding ayarları
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🚀 TravelTurkey Projesi Baslatiliyor..." -ForegroundColor Green

# Proje dizinine git
Set-Location "c:\Users\emrem\Desktop\TravelTurkey"

# Bagimlilikari kontrol et ve yukle
Write-Host "📦 Bagimliliklar kontrol ediliyor..." -ForegroundColor Yellow
npm install

# Android cihaz kontrolu
Write-Host "📱 Android cihaz kontrolu..." -ForegroundColor Yellow
$devices = adb devices
if ($devices -match "device$") {
    Write-Host "✅ Android cihaz bagli" -ForegroundColor Green
} else {
    Write-Host "❌ Android cihaz bulunamadi! USB baglantisini kontrol edin." -ForegroundColor Red
    Read-Host "Devam etmek icin Enter'a basin"
}

# React Native uygulamasini baslat
Write-Host "🏃‍♂️ React Native uygulamasi baslatiliyor..." -ForegroundColor Yellow
npx react-native run-android

Write-Host "✅ Proje baslatildi! scrcpy icin ayri terminal acin: .\scrcpy.bat" -ForegroundColor Green
