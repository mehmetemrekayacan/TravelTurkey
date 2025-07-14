# TravelTurkey 2025 Troubleshooting Guide

## 🔧 Common Issues & Solutions

### 1. Dependency Update Issues

#### React Native Update Failures

```powershell
# Issue: Build failures after React Native update
# Solution: Clean everything and rebuild

# Clean Metro cache
npx react-native start --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clear node modules
Remove-Item -Recurse -Force node_modules
npm install

# Rebuild
npx react-native run-android
```

#### TypeScript Compilation Errors

```powershell
# Issue: Type errors after TypeScript update
# Solution: Update type definitions

npm install @types/react@latest @types/react-native@latest
npm run type-check

# Fix common type issues:
# 1. Update import statements
# 2. Add missing type annotations
# 3. Update deprecated APIs
```

### 2. Camera Integration Issues

#### Permission Denied Errors

```typescript
// Issue: Camera permission denied on Android
// Solution: Check AndroidManifest.xml and request runtime permissions

// Add to android/app/src/main/AndroidManifest.xml:
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

// Runtime permission handling:
import { PermissionsAndroid } from 'react-native';

const requestPermissions = async () => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ];

  const granted = await PermissionsAndroid.requestMultiple(permissions);
  return Object.values(granted).every(status => status === 'granted');
};
```

#### Image Picker Crashes

```powershell
# Issue: App crashes when opening camera/gallery
# Solution: Update react-native-image-picker and configure properly

npm install react-native-image-picker@latest
npx react-native run-android

# Check for conflicting dependencies
npm ls react-native-image-picker
```

### 3. Push Notifications Issues

#### FCM Token Not Received

```typescript
// Issue: FCM token is null or undefined
// Solution: Check Firebase configuration

// 1. Verify google-services.json is in android/app/
// 2. Check Firebase project configuration
// 3. Ensure correct package name in Firebase Console

// Debug FCM token:
import messaging from '@react-native-firebase/messaging';

const checkFCMToken = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Auth status:', authStatus);

  const token = await messaging().getToken();
  console.log('FCM Token:', token);
};
```

#### Notifications Not Appearing

```powershell
# Issue: Notifications not showing on device
# Solution: Check notification settings and Firebase setup

# Test notification from Firebase Console
# Check device notification settings
adb shell settings get global notification_enabled

# Debug notification handling:
# 1. Add logging to message handlers
# 2. Test in foreground and background
# 3. Verify payload format
```

### 4. AI Recommendations Issues

#### Poor Recommendation Quality

```typescript
// Issue: AI recommendations not relevant
// Solution: Improve data collection and algorithm

// Check user preference data:
import { exportUserData } from '../services/ai/RecommendationEngine';

const debugRecommendations = async () => {
  const userData = await exportUserData();
  console.log('User data:', userData);

  // Verify:
  // 1. Sufficient visited places (>5)
  // 2. Category preferences recorded
  // 3. Search history available
};

// Manual preference seeding for testing:
await updateUserPreferences('visit', {
  placeId: 'hagia-sophia',
  place: { category: 'historical', address: { city: 'Istanbul' } },
});
```

### 5. Performance Issues

#### App Launch Slow (>3 seconds)

```typescript
// Issue: Slow app startup
// Solutions:

// 1. Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// 2. Optimize bundle size
npx @react-native-community/cli bundle --platform android --dev false

// 3. Use Hermes engine (already enabled)
// Check android/app/build.gradle:
// enableHermes: true

// 4. Reduce initial render complexity
// Move heavy operations to useEffect
```

#### Memory Leaks

```powershell
# Issue: App memory usage increasing over time
# Solution: Check for memory leaks

# Monitor memory usage:
adb shell dumpsys meminfo com.travelturkey

# Common causes:
# 1. Event listeners not removed
# 2. Timers not cleared
# 3. Large images not optimized
# 4. Unnecessary re-renders
```

### 6. E2E Testing Issues

#### Detox Build Failures

```powershell
# Issue: Detox tests failing to build
# Solution: Configure Detox properly

# Check Java version
java -version
# Should be Java 11 or 17

# Configure Android SDK
echo $ANDROID_HOME
# Should point to Android SDK

# Rebuild Detox
npx detox clean-framework-cache
npx detox build-framework-cache
npx detox build --configuration android.att.debug
```

#### Test Element Not Found

```typescript
// Issue: Detox can't find test elements
// Solution: Add proper testID attributes

// In components:
<TouchableOpacity testID='search-button'>
  <Text>Search</Text>
</TouchableOpacity>;

// In tests:
await element(by.id('search-button')).tap();

// Use accessibility labels as fallback:
await element(by.label('Search')).tap();
```

### 7. Production Build Issues

#### Release APK Crashes

```powershell
# Issue: Release build crashes but debug works
# Solution: Check ProGuard/R8 configuration

# Add to android/app/proguard-rules.pro:
-keep class com.travelturkey.** { *; }
-keep class * extends com.facebook.react.bridge.ReactContextBaseJavaModule { *; }

# Check for missing dependencies in release:
cd android && ./gradlew bundleRelease --stacktrace
```

#### Bundle Size Too Large

```powershell
# Issue: APK size > 50MB
# Solutions:

# 1. Enable APK splitting
# android/app/build.gradle:
android {
  splits {
    abi {
      enable true
      reset()
      include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
      universalApk false
    }
  }
}

# 2. Optimize images
# Use WebP format, compress images
# Remove unused assets

# 3. Analyze bundle
npx react-native bundle --platform android --dev false --bundle-output bundle.js
npx bundle-analyzer bundle.js
```

### 8. Network Issues

#### API Calls Failing

```typescript
// Issue: Network requests timing out or failing
// Solution: Add proper error handling and retry logic

const fetchWithRetry = async (url: string, options: any, retries = 3) => {
  try {
    const response = await fetch(url, {
      ...options,
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};
```

### 9. Development Environment Issues

#### Metro Bundler Errors

```powershell
# Issue: Metro bundler not starting or crashing
# Solutions:

# Clear Metro cache
npx react-native start --reset-cache

# Check for port conflicts
netstat -ano | findstr :8081

# Kill Metro process if stuck
taskkill /F /IM node.exe

# Restart Metro
npx react-native start
```

#### Android Emulator Issues

```powershell
# Issue: Emulator not starting or slow
# Solutions:

# Check virtualization enabled in BIOS
# Allocate more RAM to emulator
# Use hardware acceleration

# Create new AVD with recommended settings:
# API Level: 30 or 31
# RAM: 4GB
# VM Heap: 512MB
# Graphics: Hardware
```

### 10. Git Best Practices

#### Branch Naming Convention

```bash
# Feature branches
git checkout -b feature/camera-integration
git checkout -b feature/ai-recommendations
git checkout -b feature/push-notifications

# Bug fixes
git checkout -b bugfix/memory-leak-fix
git checkout -b bugfix/crash-on-startup

# Hotfix
git checkout -b hotfix/critical-security-patch
```

#### Commit Message Format

```bash
# Format: type(scope): description

git commit -m "feat(camera): add photo capture functionality"
git commit -m "fix(ai): resolve recommendation engine memory leak"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(e2e): add navigation flow tests"
git commit -m "ci(github): update Android build configuration"
```

## 🚨 Emergency Procedures

### App Store Rejection

1. Review rejection reason carefully
2. Fix identified issues
3. Test thoroughly on multiple devices
4. Update app description if needed
5. Resubmit with detailed changelog

### Production Crash

1. Check Sentry for crash reports
2. Identify root cause
3. Create hotfix branch
4. Test fix thoroughly
5. Deploy emergency update

### Performance Degradation

1. Monitor Firebase Analytics
2. Check memory usage patterns
3. Profile app with Flipper
4. Identify bottlenecks
5. Optimize critical paths

## 📞 Support Contacts

- **Development Team**: dev@travelturkey.com
- **DevOps Support**: devops@travelturkey.com
- **Emergency Hotline**: +90-XXX-XXX-XXXX

---

**Remember**: Always test fixes on multiple devices before deploying to production!
