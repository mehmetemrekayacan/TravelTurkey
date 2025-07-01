# Device Authorization Troubleshooter for TravelTurkey
# PowerShell script to help resolve USB debugging authorization

Write-Host "🔧 TravelTurkey - Device Authorization Helper" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check current device status
Write-Host "📱 Checking device status..." -ForegroundColor Yellow
$devices = adb devices | Select-String -Pattern "\t"

if ($devices.Count -eq 0) {
    Write-Host "❌ No devices detected" -ForegroundColor Red
    Write-Host "   Please connect your device via USB" -ForegroundColor Yellow
    exit 1
}

foreach ($device in $devices) {
    $parts = $device.ToString().Split("`t")
    $deviceId = $parts[0].Trim()
    $status = $parts[1].Trim()
    
    Write-Host "Device: $deviceId" -ForegroundColor Cyan
    Write-Host "Status: $status" -ForegroundColor $(if ($status -eq "device") { "Green" } else { "Yellow" })
    
    if ($status -eq "unauthorized") {
        Write-Host ""
        Write-Host "🚨 AUTHORIZATION REQUIRED" -ForegroundColor Red
        Write-Host "=========================" -ForegroundColor Red
        Write-Host ""
        Write-Host "👀 CHECK YOUR PHONE SCREEN NOW!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "You should see a popup asking:" -ForegroundColor White
        Write-Host "   'Allow USB debugging?'" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ Check the box: 'Always allow from this computer'" -ForegroundColor Green
        Write-Host "✅ Tap 'OK' or 'Allow'" -ForegroundColor Green
        Write-Host ""
        Write-Host "If no popup appears:" -ForegroundColor Yellow
        Write-Host "   1. Disconnect and reconnect USB cable" -ForegroundColor White
        Write-Host "   2. Change USB mode to 'File Transfer' or 'PTP'" -ForegroundColor White
        Write-Host "   3. Check notification panel for USB options" -ForegroundColor White
        Write-Host ""
        
        # Offer to retry
        $retry = Read-Host "Press ENTER after authorizing on device, or 'q' to quit"
        if ($retry -eq 'q') {
            exit 0
        }
        
        Write-Host "🔄 Checking again..." -ForegroundColor Yellow
        adb devices
        
    } elseif ($status -eq "device") {
        Write-Host ""
        Write-Host "✅ Device authorized and ready!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Ready to run TravelTurkey!" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "   1. .\run-on-device.ps1" -ForegroundColor Green
        Write-Host "   2. Or: npm start (then npx react-native run-android)" -ForegroundColor Green
        Write-Host ""
        
        # Offer to run immediately
        $run = Read-Host "Run TravelTurkey now? (y/n)"
        if ($run -eq 'y' -or $run -eq 'Y') {
            Write-Host "🚀 Starting TravelTurkey..." -ForegroundColor Green
            & ".\run-on-device.ps1"
        }
    }
}
