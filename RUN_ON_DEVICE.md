# Running TravelTurkey on Physical Android Device

## 1. Pre-flight Checks

```powershell
# Navigate to your project directory
cd "C:\Users\emrem\Desktop\TravelTurkey"

# Check device connection
adb devices
# Expected output: device serial number with "device" status

# Check if Metro bundler port is free
netstat -an | findstr :8081
```

## 2. Start Metro Bundler (Terminal 1)

```powershell
npm start
# or
npx react-native start

# Keep this terminal running - it serves your JS bundle
```

## 3. Build and Install App (Terminal 2)

```powershell
# Clean build (if you had previous issues)
npx react-native clean

# Build and install on connected device
npx react-native run-android

# Alternative: Specify device if multiple connected
npx react-native run-android --deviceId YOUR_DEVICE_ID
```

## 4. Launch Options

```powershell
# Debug build (default)
npx react-native run-android --mode debug

# Release build (for performance testing)
npx react-native run-android --mode release

# Target specific device
adb devices  # Get device ID
npx react-native run-android --deviceId DEVICE_ID
```

## 5. First Launch Troubleshooting

If app opens but shows white screen:

1. Shake device to open developer menu
2. Tap "Settings"
3. Tap "Change Bundle Location"
4. Enter: `YOUR_COMPUTER_IP:8081`
5. Go back and tap "Reload"
