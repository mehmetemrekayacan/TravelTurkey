# TravelTurkey Physical Device Testing Checklist

## 📱 Device Testing Setup

### Prerequisites

```powershell
# Enable Developer Options on Android device
# 1. Go to Settings > About Phone
# 2. Tap "Build Number" 7 times
# 3. Go to Settings > Developer Options
# 4. Enable "USB Debugging"
# 5. Connect device via USB

# Verify device connection
adb devices
# Should show your device with "device" status

# Install app on device
npx react-native run-android --device
```

## 🧪 Feature Testing Checklist

### ✅ Navigation & UI Testing

- [ ] **Bottom Tab Navigation**

  - [ ] Tap each tab (Keşfet, Planlarım, Profil)
  - [ ] Verify tab switching animations
  - [ ] Check tab icons and labels
  - [ ] Test back button behavior

- [ ] **Screen Transitions**
  - [ ] Place detail navigation
  - [ ] Modal screens (Search, Settings)
  - [ ] Smooth animations (60fps)
  - [ ] No frame drops or stuttering

### ✅ Search Functionality

- [ ] **Basic Search**

  - [ ] Type in search input
  - [ ] Verify autocomplete/suggestions
  - [ ] Test search results display
  - [ ] Check empty state handling

- [ ] **Performance Testing**
  - [ ] Search response time < 500ms
  - [ ] No lag during typing
  - [ ] Memory usage stable during search
  - [ ] Test with long search queries

### ✅ FlatList Performance

- [ ] **Scrolling Performance**

  - [ ] Smooth scrolling through tourist places
  - [ ] No white flashes during scroll
  - [ ] Image loading optimization
  - [ ] Test with 100+ items

- [ ] **Pull-to-Refresh**
  - [ ] Pull down to refresh
  - [ ] Loading indicator appears
  - [ ] Content updates properly
  - [ ] No duplicate items

### ✅ Camera Integration

- [ ] **Photo Capture**

  - [ ] Open camera from profile
  - [ ] Take photo successfully
  - [ ] Photo appears in preview
  - [ ] Save photo to app directory

- [ ] **Permissions**

  - [ ] Camera permission request
  - [ ] Storage permission request
  - [ ] Handle permission denied gracefully
  - [ ] Settings redirect for permissions

- [ ] **Gallery Selection**
  - [ ] Open gallery picker
  - [ ] Select photo from gallery
  - [ ] Handle large image files
  - [ ] Image compression working

### ✅ AI Recommendations

- [ ] **Recommendation Generation**

  - [ ] View AI recommendations in profile
  - [ ] Recommendations update after visiting places
  - [ ] Confidence scores displayed
  - [ ] Relevant recommendations shown

- [ ] **User Preference Learning**
  - [ ] Mark places as visited
  - [ ] Favorite places/categories
  - [ ] Search history tracked
  - [ ] Preferences persist across app restarts

### ✅ Maps Integration

- [ ] **Map Display**

  - [ ] Map loads on detail screen
  - [ ] Correct location markers
  - [ ] Zoom and pan functionality
  - [ ] Satellite/terrain view options

- [ ] **Performance**
  - [ ] Map loads < 3 seconds
  - [ ] Smooth map interactions
  - [ ] No memory leaks with map
  - [ ] Location services accuracy

### ✅ Offline Functionality

- [ ] **Data Persistence**

  - [ ] App works without internet
  - [ ] Cached tourist places display
  - [ ] AsyncStorage data retrieval
  - [ ] Sync when internet returns

- [ ] **Error Handling**
  - [ ] Network error messages
  - [ ] Retry mechanism works
  - [ ] Graceful degradation
  - [ ] Offline indicator shown

## 🔍 Performance Testing

### Memory Usage

```powershell
# Monitor memory usage during testing
adb shell dumpsys meminfo com.travelturkey

# Check for memory leaks:
# 1. Open app
# 2. Navigate through all screens
# 3. Return to home
# 4. Check memory usage
# 5. Repeat 10 times
# Memory should stabilize, not continuously increase
```

### CPU Usage

```powershell
# Monitor CPU usage
adb shell top | grep com.travelturkey

# Test scenarios:
# - Idle app (should be <5% CPU)
# - Scrolling FlatList (should be <30% CPU)
# - Map interactions (should be <50% CPU)
# - Camera operations (acceptable spikes)
```

### Battery Consumption

```powershell
# Check battery usage
adb shell dumpsys batterystats | grep com.travelturkey

# Test for 30 minutes of normal usage
# Battery drain should be reasonable (<10% for normal usage)
```

## 📊 Accessibility Testing

### Screen Reader Testing

- [ ] Enable TalkBack (Android)
- [ ] Navigate app using gestures only
- [ ] Verify all elements have proper labels
- [ ] Check reading order is logical
- [ ] Test form interactions with TalkBack

### Touch Target Testing

- [ ] All buttons minimum 44px touch target
- [ ] Easy to tap without precision
- [ ] No overlapping touch areas
- [ ] Consistent spacing between elements

### Color Contrast Testing

- [ ] Test in bright sunlight
- [ ] Test with different system themes
- [ ] Verify text readability
- [ ] Check color-blind accessibility

## 🌐 Network Condition Testing

### Different Network Speeds

```powershell
# Simulate slow network using Android Developer Options
# Settings > Developer Options > Networking > Simulate slow network

# Test scenarios:
# - 2G speed (EDGE)
# - 3G speed
# - Wi-Fi
# - No network connection
```

### Network Interruption Testing

- [ ] Disconnect internet during app usage
- [ ] Switch between Wi-Fi and mobile data
- [ ] Test in areas with poor signal
- [ ] Verify graceful handling of timeouts

## 🔒 Security Testing

### Data Storage

- [ ] Sensitive data encrypted
- [ ] No data in plain text logs
- [ ] Secure AsyncStorage usage
- [ ] No credentials in memory dumps

### Network Security

- [ ] HTTPS connections only
- [ ] Certificate pinning (if applicable)
- [ ] No sensitive data in URLs
- [ ] Proper API authentication

## 🎯 User Experience Testing

### First Launch Experience

- [ ] App launches quickly (<3 seconds)
- [ ] Onboarding flow intuitive
- [ ] Permission requests clear
- [ ] No crashes on first launch

### Real Usage Scenarios

- [ ] **Tourist Planning Session**

  - Browse places for 15 minutes
  - Search for specific locations
  - View place details
  - Add to favorites

- [ ] **Photo Documentation**

  - Take photos of visited places
  - Save to profile
  - View photo gallery
  - Share photos (if implemented)

- [ ] **Offline Usage**
  - Use app in airplane mode
  - Browse cached content
  - Test when network returns
  - Verify data synchronization

## 📝 Bug Reporting Template

When testing, report bugs using this format:

```
**Bug Title**: [Clear, descriptive title]

**Device Info**:
- Device: [Samsung Galaxy S21, etc.]
- Android Version: [11, 12, etc.]
- App Version: [1.0.0]

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happened]

**Screenshots/Video**:
[Attach if possible]

**Additional Notes**:
[Any other relevant information]
```

## 🚀 Performance Benchmarks

### Target Performance Metrics

- **App Launch**: < 3 seconds cold start
- **Navigation**: < 200ms between screens
- **Search**: < 500ms response time
- **Image Loading**: < 2 seconds for high-res images
- **Memory Usage**: < 150MB during normal usage
- **Battery**: < 5% drain per hour of active use

### Testing Commands

```powershell
# App launch time
adb shell am start -W com.travelturkey/.MainActivity

# Memory usage monitoring
adb shell dumpsys meminfo com.travelturkey

# Frame rate monitoring (requires Android 7+)
adb shell dumpsys SurfaceFlinger --latency

# Network request timing
adb shell dumpsys netstats | grep com.travelturkey
```

## ✅ Final Verification Checklist

Before marking testing complete:

- [ ] All critical user flows tested
- [ ] No crashes observed during 30-minute session
- [ ] Performance meets target benchmarks
- [ ] Accessibility requirements met
- [ ] Battery usage acceptable
- [ ] Memory usage stable
- [ ] All new features working
- [ ] Regression testing completed
- [ ] Different device orientations tested
- [ ] Edge cases handled gracefully

---

**Testing Duration**: Plan for 2-3 hours of comprehensive testing per major release.

**Test Frequency**:

- Daily builds: Smoke testing (30 minutes)
- Weekly builds: Full regression testing (2-3 hours)
- Release candidates: Complete testing cycle (4-6 hours)
