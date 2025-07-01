# TravelTurkey - Run on Physical Device
# PowerShell script for easy device deployment

param(
    [switch]$Setup,
    [switch]$Clean,
    [switch]$Release,
    [string]$DeviceId = ""
)

Write-Host "🇹🇷 TravelTurkey - Physical Device Runner" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Function to check prerequisites
function Test-Prerequisites {
    Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
    
    # Check ADB
    try {
        $adbVersion = adb version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ ADB is available" -ForegroundColor Green
        } else {
            throw "ADB not found"
        }
    } catch {
        Write-Host "❌ ADB not found. Please install Android SDK Platform Tools" -ForegroundColor Red
        Write-Host "   Add to PATH: %ANDROID_HOME%\platform-tools" -ForegroundColor Yellow
        exit 1
    }
    
    # Check Node.js
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Node.js is available: $nodeVersion" -ForegroundColor Green
        } else {
            throw "Node.js not found"
        }
    } catch {
        Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
        exit 1
    }
    
    # Check if in project directory
    if (!(Test-Path "package.json")) {
        Write-Host "❌ Not in TravelTurkey project directory" -ForegroundColor Red
        Write-Host "   Please run from: C:\Users\emrem\Desktop\TravelTurkey" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "✅ All prerequisites met!" -ForegroundColor Green
}

# Function to check device connection
function Test-DeviceConnection {
    Write-Host "📱 Checking device connection..." -ForegroundColor Yellow
    
    $devices = adb devices | Select-String -Pattern "\t"
    
    if ($devices.Count -eq 0) {
        Write-Host "❌ No devices connected" -ForegroundColor Red
        Write-Host "   Please:" -ForegroundColor Yellow
        Write-Host "   1. Connect device via USB" -ForegroundColor Yellow
        Write-Host "   2. Enable USB Debugging in Developer Options" -ForegroundColor Yellow
        Write-Host "   3. Allow USB Debugging when prompted" -ForegroundColor Yellow
        exit 1
    }
    
    foreach ($device in $devices) {
        $parts = $device.ToString().Split("`t")
        $deviceId = $parts[0].Trim()
        $status = $parts[1].Trim()
        
        if ($status -eq "device") {
            Write-Host "✅ Device connected: $deviceId" -ForegroundColor Green
        } elseif ($status -eq "unauthorized") {
            Write-Host "⚠️ Device unauthorized: $deviceId" -ForegroundColor Yellow
            Write-Host "   Please allow USB debugging on your device" -ForegroundColor Yellow
        } else {
            Write-Host "⚠️ Device in unknown state: $deviceId ($status)" -ForegroundColor Yellow
        }
    }
}

# Function to setup development environment
function Setup-DevEnvironment {
    Write-Host "🛠️ Setting up development environment..." -ForegroundColor Yellow
    
    # Install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    
    # Setup ADB reverse port forwarding
    Write-Host "🔗 Setting up port forwarding..." -ForegroundColor Yellow
    adb reverse tcp:8081 tcp:8081
    
    # Clear any previous builds
    Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
    npx react-native clean
    
    Write-Host "✅ Development environment ready!" -ForegroundColor Green
}

# Function to clean build
function Clean-Build {
    Write-Host "🧹 Performing clean build..." -ForegroundColor Yellow
    
    # Clean React Native
    npx react-native clean
    
    # Clean Android
    if (Test-Path "android") {
        Set-Location android
        ./gradlew clean
        Set-Location ..
    }
    
    # Clear Metro cache
    npx react-native start --reset-cache --port 8081 &
    Start-Sleep 3
    
    Write-Host "✅ Clean build completed!" -ForegroundColor Green
}

# Function to run on device
function Start-OnDevice {
    param([string]$Mode = "debug", [string]$Device = "")
    
    Write-Host "🚀 Running TravelTurkey on device..." -ForegroundColor Yellow
    Write-Host "   Mode: $Mode" -ForegroundColor Cyan
    
    # Build command
    $buildCmd = "npx react-native run-android --mode $Mode"
    
    if ($Device -ne "") {
        $buildCmd += " --deviceId $Device"
        Write-Host "   Target device: $Device" -ForegroundColor Cyan
    }
    
    # Start Metro if not running
    $metroProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*metro*" }
    if (!$metroProcess) {
        Write-Host "📡 Starting Metro bundler..." -ForegroundColor Yellow
        Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Minimized
        Start-Sleep 5
    }
    
    # Run build
    Write-Host "🔨 Building and installing app..." -ForegroundColor Yellow
    Invoke-Expression $buildCmd
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ TravelTurkey successfully installed!" -ForegroundColor Green
        Write-Host "📱 App should be launching on your device..." -ForegroundColor Cyan
        Write-Host "" -ForegroundColor White
        Write-Host "🔧 Development Tips:" -ForegroundColor Yellow
        Write-Host "   • Shake device to open Developer Menu" -ForegroundColor White
        Write-Host "   • Double tap 'R' to reload" -ForegroundColor White
        Write-Host "   • Fast Refresh is enabled for instant updates" -ForegroundColor White
        Write-Host "   • Check logs: adb logcat '*:S' ReactNative:V ReactNativeJS:V" -ForegroundColor White
    } else {
        Write-Host "❌ Build failed. Check the output above for errors." -ForegroundColor Red
        Write-Host "💡 Common fixes:" -ForegroundColor Yellow
        Write-Host "   • Run with -Clean flag" -ForegroundColor White
        Write-Host "   • Check device connection" -ForegroundColor White
        Write-Host "   • Ensure USB Debugging is enabled" -ForegroundColor White
    }
}

# Main execution
try {
    Test-Prerequisites
    Test-DeviceConnection
    
    if ($Setup) {
        Setup-DevEnvironment
    }
    
    if ($Clean) {
        Clean-Build
    }
    
    $mode = if ($Release) { "release" } else { "debug" }
    Start-OnDevice -Mode $mode -Device $DeviceId
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "" -ForegroundColor White
Write-Host "🎉 TravelTurkey deployment complete!" -ForegroundColor Green
Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
