# 🚨 USB Debugging Authorization Troubleshooting

## Issue: Device R5CXC2C3JPE remains "unauthorized"

This is a common issue. Here are step-by-step solutions:

## 🔧 Solution 1: Developer Options Check

1. **Verify Developer Options are properly enabled:**

   - Go to **Settings** → **About Phone**
   - Tap **Build Number** 7 times (until you see "You are now a developer")
   - Go back to **Settings** → **Developer Options**

2. **Check these specific settings:**
   - ✅ **USB Debugging** (should be ON)
   - ✅ **Install via USB** (should be ON)
   - ❌ **Verify apps over USB** (should be OFF)
   - ✅ **USB Debugging (Security settings)** (if available, should be ON)

## 🔧 Solution 2: USB Connection Mode

1. **Change USB connection mode:**
   - Pull down notification panel
   - Look for "USB" notification
   - Tap and select **"File Transfer"** or **"PTP"**
   - Avoid "Charging only" mode

## 🔧 Solution 3: Revoke All USB Authorizations

1. **On your phone:**

   - Settings → Developer Options
   - Find **"Revoke USB debugging authorizations"**
   - Tap it to clear all previous authorizations

2. **On computer:**

   ```powershell
   # Clear computer-side authorization keys
   Remove-Item "$env:USERPROFILE\.android\adbkey*" -Force -ErrorAction SilentlyContinue

   # Restart ADB completely
   adb kill-server
   adb start-server

   # Disconnect and reconnect USB cable
   # Check for popup on phone
   adb devices
   ```

## 🔧 Solution 4: Different USB Port/Cable

1. **Try different USB port** (preferably USB 2.0, avoid USB hubs)
2. **Use original USB cable** (some cables are charge-only)
3. **Try USB-C to USB-A adapter** if needed

## 🔧 Solution 5: Windows Driver Issues

1. **Check Device Manager:**

   - Right-click "This PC" → Properties → Device Manager
   - Look for your phone under "Portable Devices" or "Other devices"
   - If yellow warning icon, right-click → Update driver

2. **Install Universal ADB Driver:**
   - Download from: https://adb.clockworkmod.com/
   - Install and restart computer

## 🔧 Solution 6: Samsung-Specific (if your device is Samsung)

1. **Install Samsung USB Driver:**

   - Download Samsung Smart Switch
   - This includes proper USB drivers

2. **Enable Samsung-specific options:**
   - Developer Options → **"USB configuration"**
   - Select **"MTP (Media Transfer Protocol)"**

## 🔧 Solution 7: Alternative Authorization Method

Try WiFi debugging (Android 11+):

```powershell
# Enable wireless debugging in Developer Options first
adb tcpip 5555
adb connect YOUR_PHONE_IP:5555
```

## 🔄 Quick Reset Procedure

Run this complete reset:

```powershell
# 1. Kill all ADB processes
taskkill /f /im adb.exe 2>$null

# 2. Clear authorization files
Remove-Item "$env:USERPROFILE\.android\adbkey*" -Force -ErrorAction SilentlyContinue

# 3. Restart ADB
adb kill-server
Start-Sleep 2
adb start-server

# 4. Check devices (should prompt for authorization)
adb devices
```

## 📱 What to Look For on Your Phone

When you run `adb devices`, immediately check your phone for:

1. **Popup window** with title like:

   - "Allow USB debugging?"
   - "Allow this computer to debug?"
   - "Trust this computer?"

2. **The popup should contain:**

   - Checkbox: "Always allow from this computer"
   - Buttons: "Cancel" and "OK" (or "Allow")

3. **If no popup:**
   - Check notification panel
   - Try different USB mode
   - Restart phone and try again

## 🆘 Last Resort

If nothing works:

1. Restart your phone
2. Restart your computer
3. Try a different computer to verify it's not a device issue
4. Check if your phone has any security software blocking USB debugging

---

**After authorization works, you should see:**

```
List of devices attached
R5CXC2C3JPE     device
```

Then you can proceed with:

```powershell
.\run-on-device.ps1
```
