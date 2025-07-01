# TravelTurkey - Physical Device Troubleshooting Guide

## ❌ "Device Not Found" Errors

### Problem: `adb devices` shows no devices

**Solutions:**

```powershell
# 1. Restart ADB server
adb kill-server
adb start-server
adb devices

# 2. Check USB connection mode
# On device: Switch to "File Transfer" or "PTP" mode

# 3. Install/Update device drivers
# Windows: Device Manager → Update driver for your phone

# 4. Try different USB cable/port
# Use original cable, avoid USB hubs
```

### Problem: Device shows as "unauthorized"

**Solutions:**

```powershell
# 1. Revoke and re-authorize
adb kill-server
# Disconnect and reconnect device
# Allow USB debugging popup on device
adb devices

# 2. Clear ADB keys
rm $env:USERPROFILE\.android\adbkey*
adb kill-server
adb start-server
```

## ❌ "Failed to Install APK" Errors

### Problem: Installation failures

**Solutions:**

```powershell
# 1. Clear app data if previously installed
adb shell pm uninstall com.travelturkey

# 2. Check storage space
adb shell df

# 3. Enable "Install via USB" in Developer Options

# 4. Disable "Verify apps over USB"

# 5. Clean and rebuild
npx react-native clean
rm -rf node_modules
npm install
npx react-native run-android
```

### Problem: "App not installed" or signing conflicts

**Solutions:**

```powershell
# 1. Check debug keystore
ls android/app/debug.keystore

# 2. Generate new debug keystore if missing
keytool -genkey -v -keystore android/app/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

# 3. Clear package installer data
adb shell pm clear com.google.android.packageinstaller
```

## ❌ Metro/Bundler Connection Issues

### Problem: "Could not connect to development server"

**Solutions:**

```powershell
# 1. Check Metro is running
# Should see "Metro waiting on http://localhost:8081"

# 2. Configure network manually
# In app dev menu → Settings → Change Bundle Location
# Enter: YOUR_IP:8081

# 3. Use reverse port forwarding
adb reverse tcp:8081 tcp:8081

# 4. Reset Metro cache
npx react-native start --reset-cache
```

### Problem: White screen or app crashes

**Solutions:**

```powershell
# 1. Check logs
adb logcat "*:S" ReactNative:V ReactNativeJS:V

# 2. Clear app data
adb shell pm clear com.travelturkey

# 3. Reload JS bundle
# Shake device → Reload
# Or: adb shell input keyevent 82  # Opens dev menu
```

## ❌ Build/Gradle Issues

### Problem: Gradle build failures

**Solutions:**

```powershell
# 1. Clean all builds
cd android
./gradlew clean
cd ..
npx react-native clean

# 2. Check Java version (should be JDK 11 or 17)
java -version

# 3. Update Gradle wrapper
cd android
./gradlew wrapper --gradle-version=8.5

# 4. Clear Gradle cache
rm -rf $env:USERPROFILE\.gradle\caches
```

## ❌ Permission and Security Issues

### Problem: Permission denied errors

**Solutions:**

```powershell
# 1. Run as administrator
# Right-click PowerShell → Run as Administrator

# 2. Check file permissions
# Ensure project folder isn't in restricted location

# 3. Disable antivirus temporarily
# Some antivirus software blocks ADB
```

## 🔍 Debug Commands Reference

```powershell
# Device info
adb shell getprop ro.build.version.release  # Android version
adb shell getprop ro.product.model          # Device model

# App info
adb shell pm list packages | grep turkey    # Check if app installed
adb shell am start -n com.travelturkey/.MainActivity  # Start app manually

# Performance monitoring
adb shell top | grep turkey                 # CPU usage
adb shell dumpsys meminfo com.travelturkey  # Memory usage

# Clear everything and start fresh
adb shell pm uninstall com.travelturkey
npx react-native clean
rm -rf node_modules
npm install
npx react-native run-android
```
