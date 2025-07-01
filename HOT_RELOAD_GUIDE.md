# Hot Reload & Dev Menu Guide for TravelTurkey

## 🔥 Fast Refresh (Hot Reload) Setup

### How Fast Refresh Works

Fast Refresh is enabled by default in React Native 0.80.0 (your current version). It:

- Preserves component state during code changes
- Re-renders components when you save files
- Provides instant feedback for UI changes
- Handles most TypeScript errors gracefully

### Optimizing Fast Refresh for TravelTurkey

#### 1. Component Structure for Better Hot Reload

```typescript
// ✅ Good: Named export with hooks
export const ExploreScreen = () => {
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [loading, setLoading] = useState(false);

  // State is preserved during Fast Refresh
  const loadPlaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTouristPlaces();
      setPlaces(data);
    } finally {
      setLoading(false);
    }
  }, []);

  return <View>{/* Component JSX */}</View>;
};

// ❌ Avoid: Complex default exports
export default function ComplexComponent() {
  // Less reliable for Fast Refresh
}
```

#### 2. Metro Configuration for Faster Reloads

```javascript
// metro.config.js - already in your project, optimize it:
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// Enhance for faster development
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true, // Faster bundle loading
  },
});

// Enable symlinks for faster file watching
config.resolver.unstable_enableSymlinks = true;

module.exports = config;
```

#### 3. TypeScript Configuration for Hot Reload

```json
// tsconfig.json - ensure these settings for fast compilation:
{
  "compilerOptions": {
    // ... existing options
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  },
  "ts-node": {
    "transpileOnly": true
  }
}
```

## 📱 Dev Menu Mastery

### Accessing Dev Menu

```powershell
# Physical Device Methods:
# 1. Shake the device vigorously
# 2. Press volume up + down simultaneously (some devices)
# 3. Use ADB command:
adb shell input keyevent 82

# Programmatic access (for custom debug buttons):
adb shell am broadcast -a "com.facebook.react.devsupport.RELOAD"
```

### Dev Menu Options Explained

#### 🔄 Reload

- **Purpose**: Restart the JavaScript bundle
- **When to use**: After making configuration changes
- **Keyboard shortcut**: R+R (double tap R)

```powershell
# Command line reload
adb shell am broadcast -a "com.facebook.react.devsupport.RELOAD"
```

#### 🐛 Debug

- **Purpose**: Connect to Chrome DevTools
- **Features**: Console, Network, Elements, Sources
- **Setup**: Opens Chrome at `http://localhost:8081/debugger-ui`

#### ⚙️ Settings

Key settings for TravelTurkey development:

- **JS Dev Mode**: Enable for better error messages
- **Hot Reloading**: Toggle Fast Refresh
- **Live Reload**: Reload on file changes (prefer Fast Refresh)
- **Start Sampling Profiler on Init**: Performance monitoring

#### 🌐 Change Bundle Location

- **Purpose**: Connect to different Metro server
- **Usage**: Enter your computer's IP for WiFi debugging
- **Format**: `192.168.1.100:8081`

### Custom Dev Menu Items

```typescript
// src/utils/DevMenu.ts
interface DevMenuOptions {
  clearCache: () => void;
  loadMockData: () => void;
  togglePerformanceOverlay: () => void;
  resetNavigation: () => void;
}

export const setupCustomDevMenu = (options: DevMenuOptions) => {
  if (__DEV__) {
    const DevMenu = require('react-native-dev-menu');

    DevMenu.addItem('🗑️ Clear TravelTurkey Cache', options.clearCache);
    DevMenu.addItem('🎭 Load Mock Tourist Data', options.loadMockData);
    DevMenu.addItem('📊 Toggle Performance Overlay', options.togglePerformanceOverlay);
    DevMenu.addItem('🏠 Reset to Home Screen', options.resetNavigation);
  }
};

// Usage in App.tsx
import { setupCustomDevMenu } from './src/utils/DevMenu';

const App = () => {
  useEffect(() => {
    setupCustomDevMenu({
      clearCache: async () => {
        // Clear AsyncStorage, image cache, etc.
        await AsyncStorage.clear();
        console.log('TravelTurkey cache cleared');
      },
      loadMockData: () => {
        // Load test data for development
        loadMockTouristPlaces();
      },
      togglePerformanceOverlay: () => {
        // Show/hide performance metrics
        setShowPerformanceOverlay(prev => !prev);
      },
      resetNavigation: () => {
        // Reset navigation stack
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    });
  }, []);

  return (
    // Your app JSX
  );
};
```

## ⚡ Development Workflow Optimization

### 1. Multi-Terminal Setup

```powershell
# Terminal 1: Metro Bundler
cd "C:\Users\emrem\Desktop\TravelTurkey"
npm start

# Terminal 2: Build and Install (as needed)
npx react-native run-android

# Terminal 3: ADB Logs
adb logcat "*:S" ReactNative:V ReactNativeJS:V

# Terminal 4: File Watching (optional)
# Watch for specific file changes
```

### 2. Rapid Development Commands

```powershell
# Quick reload without rebuilding
adb shell am broadcast -a "com.facebook.react.devsupport.RELOAD"

# Force restart with cache clear
npx react-native start --reset-cache

# Rebuild only if needed
npx react-native run-android --no-packager

# Monitor performance during development
adb shell dumpsys gfxinfo com.travelturkey framestats
```

### 3. Code Change Workflow

```typescript
// Typical development flow for TravelTurkey features:

// 1. Start with component structure
export const NewFeatureScreen = () => {
  // Basic structure first
  return (
    <View>
      <Text>New Feature</Text>
    </View>
  );
};

// 2. Add state management (Fast Refresh preserves state)
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

// 3. Implement functionality incrementally
// Each save triggers Fast Refresh, preserving your work

// 4. Add styling last (Fast Refresh shows changes instantly)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### 4. Error Recovery Strategies

```typescript
// Handle Fast Refresh errors gracefully
export const RobustComponent = () => {
  const [error, setError] = useState<string | null>(null);

  // Error boundary for development
  useEffect(() => {
    const errorHandler = (error: any) => {
      if (__DEV__) {
        setError(error.message);
        console.error('TravelTurkey Component Error:', error);
      }
    };

    // Reset error on successful renders
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (error && __DEV__) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Dev Error: {error}</Text>
        <Text>Fix the code and Fast Refresh will recover</Text>
      </View>
    );
  }

  return (
    // Normal component JSX
  );
};
```

## 🔧 Advanced Development Features

### 1. Performance Monitoring During Development

```typescript
// src/hooks/usePerformanceMonitor.ts
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    if (__DEV__) {
      const start = Date.now();
      console.log(`🚀 ${componentName} mounted`);

      return () => {
        const duration = Date.now() - start;
        console.log(`⏱️ ${componentName} unmounted after ${duration}ms`);
      };
    }
  }, [componentName]);
};

// Usage in TravelTurkey components
export const ExploreScreen = () => {
  usePerformanceMonitor('ExploreScreen');
  // Component logic...
};
```

### 2. Development State Persistence

```typescript
// src/utils/DevStatePersistence.ts
const DEV_STATE_KEY = '@TravelTurkey:devState';

export const saveDevState = async (state: any) => {
  if (__DEV__) {
    try {
      await AsyncStorage.setItem(DEV_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save dev state:', error);
    }
  }
};

export const loadDevState = async () => {
  if (__DEV__) {
    try {
      const state = await AsyncStorage.getItem(DEV_STATE_KEY);
      return state ? JSON.parse(state) : null;
    } catch (error) {
      console.warn('Failed to load dev state:', error);
      return null;
    }
  }
  return null;
};
```

### 3. Network Request Mocking for Development

```typescript
// src/utils/DevNetworkMock.ts
const MOCK_ENABLED = __DEV__ && false; // Toggle as needed

export const mockApiCall = <T>(
  originalCall: () => Promise<T>,
  mockData: T,
  delay: number = 1000,
): Promise<T> => {
  if (MOCK_ENABLED) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('🎭 Using mock data');
        resolve(mockData);
      }, delay);
    });
  }
  return originalCall();
};

// Usage in TravelTurkey API calls
const fetchTouristPlaces = () =>
  mockApiCall(
    () => fetch('/api/places').then(r => r.json()),
    MOCK_TOURIST_PLACES,
    500,
  );
```

## 🚨 Troubleshooting Fast Refresh

### Common Issues and Solutions

#### Fast Refresh Not Working

```powershell
# 1. Check Metro bundler is running
# Should see: "Metro waiting on http://localhost:8081"

# 2. Verify Fast Refresh is enabled
# Dev Menu → Settings → Fast Refresh (should be ON)

# 3. Check file extensions
# Ensure editing .js, .jsx, .ts, .tsx files

# 4. Restart Metro with cache clear
npx react-native start --reset-cache
```

#### State Not Preserving

```typescript
// ❌ Problematic patterns:
const BadComponent = () => {
  // Anonymous functions break Fast Refresh
  return <TouchableOpacity onPress={() => doSomething()} />;
};

// ✅ Fast Refresh friendly:
const GoodComponent = () => {
  const handlePress = useCallback(() => {
    doSomething();
  }, []);

  return <TouchableOpacity onPress={handlePress} />;
};
```

#### Syntax Errors Breaking Fast Refresh

```typescript
// Add error boundaries to prevent crashes
export const DevErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!__DEV__) return <>{children}</>;

  return (
    <ErrorBoundary
      fallback={<Text>⚠️ Component Error - Check console and fix syntax</Text>}
    >
      {children}
    </ErrorBoundary>
  );
};
```

## 📚 Quick Reference Commands

```powershell
# Essential development commands for TravelTurkey

# Start development
npm start                                    # Start Metro
npx react-native run-android               # Build & install

# Quick actions
adb shell input keyevent 82                # Open dev menu
adb shell am broadcast -a "com.facebook.react.devsupport.RELOAD"  # Reload

# Debugging
adb logcat "*:S" ReactNative:V ReactNativeJS:V  # View logs
adb shell dumpsys meminfo com.travelturkey      # Memory usage

# Performance
npx react-native start --reset-cache       # Clear cache
adb reverse tcp:8081 tcp:8081              # Port forwarding

# Cleanup
npx react-native clean                     # Clean build
rm -rf node_modules && npm install         # Fresh install
```

This comprehensive setup will give you a smooth development experience with instant feedback for your TravelTurkey app!
