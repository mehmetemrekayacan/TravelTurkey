# 📱 TravelTurkey - Physical Device Quick Reference

## 🚀 Quick Start Commands

```powershell
# Basic run on device
npx react-native run-android

# Using the custom script
.\run-on-device.ps1

# Clean build and run
.\run-on-device.ps1 -Clean

# Run release build
.\run-on-device.ps1 -Release

# Target specific device
.\run-on-device.ps1 -DeviceId YOUR_DEVICE_ID
```

## 🔧 Essential ADB Commands

```powershell
adb devices                                 # List connected devices
adb shell input keyevent 82                # Open dev menu
adb reverse tcp:8081 tcp:8081              # Port forwarding
adb logcat "*:S" ReactNative:V ReactNativeJS:V  # View app logs
adb shell pm uninstall com.travelturkey    # Uninstall app
adb shell am start -n com.travelturkey/.MainActivity  # Launch app
```

## 🐛 Troubleshooting Checklist

### Device Not Found

- [ ] USB Debugging enabled in Developer Options
- [ ] Device connected in File Transfer mode
- [ ] USB debugging popup allowed on device
- [ ] Try different USB cable/port

### Build Failures

- [ ] Run `npx react-native clean`
- [ ] Clear Metro cache: `npx react-native start --reset-cache`
- [ ] Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- [ ] Check Android Studio SDK installation

### App Won't Connect

- [ ] Metro bundler running on port 8081
- [ ] Port forwarding: `adb reverse tcp:8081 tcp:8081`
- [ ] Device and computer on same WiFi
- [ ] Dev menu → Settings → Change Bundle Location to your IP:8081

## 📊 Performance Monitoring

```powershell
# Memory usage
adb shell dumpsys meminfo com.travelturkey

# CPU usage
adb shell top | grep turkey

# FPS monitoring
adb shell dumpsys gfxinfo com.travelturkey framestats

# Network monitoring (with Flipper running)
# View in Flipper desktop app
```

## ⚡ Development Workflow

1. **Start Metro**: `npm start`
2. **Connect Device**: Enable USB debugging
3. **Run App**: `npx react-native run-android`
4. **Develop**: Edit code, Fast Refresh updates automatically
5. **Debug**: Shake device → Dev Menu → Debug/Settings
6. **Test**: Use physical device gestures and features

## 🛠️ 2025 Debug Tools Setup

### Flipper (Recommended)

1. Download from https://fbflipper.com/
2. Install React Native plugin
3. Connect to your running app
4. Monitor network, logs, performance

### React Native Debugger

1. `npm install -g react-native-debugger`
2. Start debugger: `react-native-debugger`
3. Enable "Debug JS Remotely" in dev menu

### Chrome DevTools

1. Open dev menu → Debug
2. Chrome opens at localhost:8081/debugger-ui
3. Use Console, Network, Sources tabs

## 🔥 Hot Reload Best Practices

- Use named exports for components
- Avoid anonymous functions in render
- Keep component state simple
- Use useCallback for event handlers
- Test on multiple screen sizes

## 📞 Emergency Commands

```powershell
# App completely broken?
adb shell pm clear com.travelturkey         # Clear app data
npx react-native clean                      # Clean builds
rm -rf node_modules && npm install          # Fresh dependencies

# Device issues?
adb kill-server && adb start-server         # Restart ADB
adb disconnect && adb connect               # Reconnect device

# Metro issues?
npx react-native start --reset-cache        # Clear Metro cache
pkill -f metro                              # Kill Metro process
```

## 💡 Pro Tips

- Keep Metro terminal open during development
- Use physical device for testing gestures, camera, GPS
- Enable "Show layout bounds" in Developer Options for UI debugging
- Test on different Android versions and screen sizes
- Use Flipper's Layout Inspector for complex UI issues
- Set up WiFi debugging for wireless development
