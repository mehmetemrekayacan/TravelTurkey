# TravelTurkey Dependency Update Guide (2025)

## 1. Pre-Update Preparation

```powershell
# Backup current state
git add . && git commit -m "backup: before dependency updates"
git checkout -b feature/dependency-updates

# Clean existing builds
cd android
./gradlew clean
cd ..
npm run clean
```

## 2. React Native Update (0.80 → 0.81+)

```powershell
# Update React Native CLI
npm install -g @react-native-community/cli@latest

# Update React Native core
npm install react-native@0.81.6
npm install @react-native/metro-config@0.81.6
npm install @react-native/babel-preset@0.81.6

# Update related packages
npm install @react-native-community/cli@19.1.0
npm install @react-native-community/cli-platform-android@19.1.0
```

## 3. TypeScript Update (5.0.4 → 5.3+)

```powershell
npm install typescript@5.3.3
npm install @types/react@19.1.0
npm install @types/react-test-renderer@19.1.0
npm install @typescript-eslint/eslint-plugin@7.18.0
npm install @typescript-eslint/parser@7.18.0
```

## 4. Testing Dependencies Update

```powershell
npm install @testing-library/react-native@12.5.1
npm install jest@29.7.0
npm install @types/jest@29.5.13
```

## 5. Android-Specific Updates

### Update android/build.gradle

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 23
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
        kotlinVersion = "1.9.22"
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.2.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

### Update android/gradle/wrapper/gradle-wrapper.properties

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.6-all.zip
```

## 6. Post-Update Steps

```powershell
# Clear caches
npx react-native start --reset-cache
npm run clean

# Rebuild
cd android
./gradlew clean
./gradlew assembleDebug
cd ..

# Test on device
npx react-native run-android
```

## 7. Troubleshooting Common Issues

### Build Errors

```powershell
# Clear Metro cache
npx react-native start --reset-cache

# Clean and rebuild
cd android && ./gradlew clean && cd ..
npx react-native run-android --reset-cache
```

### Type Errors

- Update TypeScript configurations
- Run `npm run type-check` to identify issues
- Update import statements if needed

### Native Module Compatibility

- Check library compatibility with React Native 0.81
- Update react-native-maps, react-native-reanimated if needed
