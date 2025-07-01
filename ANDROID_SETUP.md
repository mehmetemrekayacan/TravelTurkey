# Android Development Environment Setup

## Prerequisites Check

Before running your app on a physical device, ensure you have:

### 1. Android Studio or Android SDK

```powershell
# Check if Android SDK is installed
$env:ANDROID_HOME
$env:ANDROID_SDK_ROOT

# If not set, typical locations:
# C:\Users\%USERNAME%\AppData\Local\Android\Sdk
# C:\Android\Sdk
```

### 2. Add Android SDK to PATH

Add these to your system PATH environment variables:

```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\emulator
```

### 3. Install Required SDK Components

In Android Studio SDK Manager, install:

- **Android SDK Platform 35** (matches your targetSdkVersion)
- **Android SDK Build-Tools 35.0.0**
- **Android SDK Platform-Tools**
- **Android SDK Command-line Tools**

### 4. Verify Installation

```powershell
# These commands should work:
adb version
javac -version
```

## Environment Variables Setup

Create/edit these in System Environment Variables:

```powershell
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
```
