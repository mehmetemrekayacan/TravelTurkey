# Android Device Setup for Development

## Step 1: Enable Developer Options

1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times rapidly
3. You'll see "You are now a developer!" message
4. Go back to **Settings** → **Developer Options** (now visible)

## Step 2: Enable USB Debugging

1. In **Developer Options**, enable:
   - **USB Debugging** ✅
   - **Install via USB** ✅
   - **USB Debugging (Security settings)** ✅ (if available)
   - **Verify apps over USB** ❌ (disable this)

## Step 3: USB Connection Setup

1. Connect your device via USB cable
2. When prompted on device, select:
   - **File Transfer (MTP)** or **PTP** mode
   - **Allow USB Debugging** when popup appears
   - Check "Always allow from this computer" ✅

## Step 4: Verify ADB Connection

Run in terminal:

```powershell
adb devices
```

You should see your device listed with "device" status.

## Step 5: Network Setup (for Hot Reload)

If using WiFi debugging:

1. Ensure both device and computer are on same network
2. In app, shake device → **Settings** → **Change Bundle Location**
3. Enter your computer's IP address with port 8081
   Example: `192.168.1.100:8081`
