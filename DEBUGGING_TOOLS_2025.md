# Modern Debugging Tools for TravelTurkey (2025)

## 🔥 Flipper - Facebook's Mobile Debugging Platform

### Installation & Setup

```powershell
# Install Flipper desktop app
# Download from: https://fbflipper.com/

# Add Flipper to your React Native project
npm install --save-dev react-native-flipper
# For React Native 0.70+, Flipper is included by default
```

### Flipper Capabilities

- **Network Inspector**: Monitor API calls, responses, and timing
- **Layout Inspector**: View and modify component hierarchy in real-time
- **Logs**: Filter and search through console logs and crash reports
- **Database Browser**: Inspect SQLite, AsyncStorage, and other databases
- **Performance Monitor**: CPU, memory, and FPS tracking
- **Crash Reporter**: Detailed crash logs with stack traces

### Usage for TravelTurkey

```javascript
// In your API calls, logs will automatically appear in Flipper
console.log('TravelTurkey: Loading tourist places');

// Network requests through fetch/axios are automatically tracked
fetch('https://api.example.com/places')
  .then(response => response.json())
  .then(data => console.log('Places loaded:', data));
```

## 🐛 React Native Debugger - Enhanced Chrome DevTools

### Installation

```powershell
# Install via npm
npm install -g react-native-debugger

# Or download standalone app
# From: https://github.com/jhen0409/react-native-debugger
```

### Features

- **Redux DevTools**: Track state changes in your app
- **React DevTools**: Inspect component props and state
- **Network Tab**: Monitor network requests
- **Console**: Enhanced logging with better formatting
- **Element Inspector**: Select and inspect UI elements

### Usage

```powershell
# Start React Native Debugger
react-native-debugger

# In your app dev menu, enable "Debug JS Remotely"
# Shake device → Debug → Debug with Chrome
```

## 📱 Built-in React Native DevTools

### Dev Menu Access

```powershell
# Physical device: Shake the device
# Or programmatically:
adb shell input keyevent 82

# Available options:
# - Reload: Restart the app
# - Debug: Open Chrome debugger
# - Change Bundle Location: Point to different Metro server
# - Settings: Configure dev options
```

### Performance Monitor

```javascript
// Enable performance monitor in dev menu
// Shows:
// - RAM usage
// - JSC heap size
// - Views count
// - FPS (UI/JS threads)

// Add to your TravelTurkey app for monitoring
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']); // Filter warnings
```

## 🔍 Android Studio Profiler

### Setup

```powershell
# Open Android Studio
# Tools → Android → Android Device Monitor
# Or: View → Tool Windows → Profiler

# Connect to your running TravelTurkey app
```

### Profiling Capabilities

- **CPU Profiler**: Method tracing and CPU usage
- **Memory Profiler**: Heap dumps and memory leaks detection
- **Network Profiler**: Network usage and timing
- **Energy Profiler**: Battery usage analysis

## 📊 Performance Monitoring Tools

### React Native Performance Monitor

```javascript
// Add to your TravelTurkey project
npm install --save-dev @react-native-community/cli-plugin-metro

// Create performance monitoring utility
// src/utils/PerformanceMonitor.ts
export class PerformanceMonitor {
  static measureRender(componentName: string) {
    const start = Date.now();
    return () => {
      const end = Date.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    };
  }
}

// Usage in components
const stopMeasuring = PerformanceMonitor.measureRender('ExploreScreen');
// ... component logic
stopMeasuring();
```

### Systrace for Advanced Profiling

```powershell
# Generate systrace for your app
cd android
python $ANDROID_HOME/platform-tools/systrace/systrace.py --time=10 -o myTrace.html sched gfx view -a com.travelturkey

# Open myTrace.html in Chrome browser
```

## 🌐 Network Debugging

### Network Inspector Tools

```javascript
// For TravelTurkey API monitoring
// Install network inspector
npm install --save-dev react-native-network-logger

// Add to your App.tsx
import { startNetworkLogging } from 'react-native-network-logger';

if (__DEV__) {
  startNetworkLogging();
}

// View network logs in Flipper or dev menu
```

### Charles Proxy / Proxyman

```powershell
# Configure device to use computer as proxy
# Device WiFi → Advanced → Proxy
# Set to your computer's IP with proxy port (usually 8888)

# Monitor all network traffic including HTTPS
# Useful for API debugging and response inspection
```

## 🚀 Hot Reload & Fast Refresh Optimization

### Configure for Best Performance

```javascript
// metro.config.js - optimize for faster reloads
const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    // Add file extensions for faster resolution
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
  },
  transformer: {
    // Enable faster transforms
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
```

### Fast Refresh Best Practices

```javascript
// Components that preserve state during Fast Refresh
export default function ExploreScreen() {
  // State is preserved during Fast Refresh
  const [places, setPlaces] = useState([]);

  // Effects re-run during Fast Refresh
  useEffect(() => {
    loadTouristPlaces();
  }, []);

  return (
    // Component JSX
  );
}

// Avoid default exports for better Fast Refresh
export const TravelCard = () => { /* ... */ };
```

## 📱 Device-Specific Testing Tools

### Multiple Device Testing

```powershell
# List all connected devices
adb devices

# Install on specific device
npx react-native run-android --deviceId DEVICE_ID

# Run multiple instances for different screen sizes
# Useful for responsive design testing
```

### Remote Debugging Setup

```javascript
// For testing on remote devices
// Configure IP-based debugging
adb connect DEVICE_IP:5555  # If using WiFi debugging

// Set up tunnel for remote Metro access
adb reverse tcp:8081 tcp:8081
```

## 🔧 Custom Debug Configuration

### Add Debug Menu Items

```javascript
// Create custom debug utilities for TravelTurkey
// src/utils/DebugUtils.ts
export const DebugUtils = {
  clearCache: () => {
    // Clear app cache
    console.log('Cache cleared for TravelTurkey');
  },

  loadMockData: () => {
    // Load test data
    console.log('Mock tourist data loaded');
  },

  resetToDefaultState: () => {
    // Reset app state
    console.log('App reset to default state');
  },
};

// Add to dev menu in App.tsx
if (__DEV__) {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Clear TravelTurkey Cache', DebugUtils.clearCache);
  DevMenu.addItem('Load Mock Data', DebugUtils.loadMockData);
}
```

## 📈 Performance Metrics Dashboard

```javascript
// Create performance dashboard for TravelTurkey
// src/components/PerformanceDashboard.tsx (dev only)
import { PerformanceObserver } from 'react-native-performance';

export const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    networkCalls: 0,
  });

  // Monitor and display real-time performance metrics
  // Only shown in development builds

  return __DEV__ ? (
    <View style={styles.dashboard}>
      <Text>Render: {metrics.renderTime}ms</Text>
      <Text>Memory: {metrics.memoryUsage}MB</Text>
      <Text>Network: {metrics.networkCalls}</Text>
    </View>
  ) : null;
};
```
