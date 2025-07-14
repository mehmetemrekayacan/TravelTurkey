# TravelTurkey Production Monitoring Setup (2025)

## 1. Sentry Installation & Setup

### Install Sentry

```powershell
npm install @sentry/react-native@5.20.0

# For React Native 0.81+
npx @sentry/wizard -p reactnative -i
```

### Android Configuration

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
  <!-- Sentry configuration -->
  <meta-data
    android:name="io.sentry.dsn"
    android:value="YOUR_SENTRY_DSN_HERE" />
  <meta-data
    android:name="io.sentry.auto-init"
    android:value="false" />
</application>
```

Add to `android/app/build.gradle`:

```gradle
apply plugin: "io.sentry.android.gradle"

sentry {
  uploadNativeSymbols = true
  includeNativeSources = true
}
```

Add to `android/build.gradle`:

```gradle
buildscript {
  dependencies {
    classpath 'io.sentry:sentry-android-gradle-plugin:4.5.0'
  }
}
```

## 2. Firebase Analytics Installation

### Install Firebase

```powershell
npm install @react-native-firebase/app@19.2.2
npm install @react-native-firebase/analytics@19.2.2
```

### Android Configuration

1. Download `google-services.json` from Firebase Console
2. Place in `android/app/google-services.json`

Add to `android/app/build.gradle`:

```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
  implementation platform('com.google.firebase:firebase-bom:32.8.1')
  implementation 'com.google.firebase:firebase-analytics'
}
```

Add to `android/build.gradle`:

```gradle
buildscript {
  dependencies {
    classpath 'com.google.gms:google-services:4.4.1'
  }
}
```

## 3. Integration in App.tsx

Update your `App.tsx`:

```typescript
import { initializeSentry } from './src/services/monitoring/SentryService';
import { initializeAnalytics } from './src/services/monitoring/FirebaseAnalyticsService';

function App(): React.JSX.Element {
  useEffect(() => {
    // Initialize monitoring services
    initializeSentry();
    initializeAnalytics();
  }, []);

  // Rest of your app
}
```

## 4. Usage Examples

### Tracking Screen Views

```typescript
import { trackScreenView } from '@/services/monitoring/FirebaseAnalyticsService';

const ExploreScreen = () => {
  useFocusEffect(
    useCallback(() => {
      trackScreenView('ExploreScreen');
    }, []),
  );
};
```

### Error Reporting

```typescript
import { reportError } from '@/services/monitoring/SentryService';

try {
  // Some operation
} catch (error) {
  reportError(error as Error, {
    screen: 'ExploreScreen',
    action: 'loadPlaces',
  });
}
```

### Performance Tracking

```typescript
import { trackSearchPerformance } from '@/services/monitoring/FirebaseAnalyticsService';

const performSearch = async (query: string) => {
  const startTime = Date.now();

  try {
    const results = await searchPlaces(query);
    const duration = Date.now() - startTime;

    await trackSearchPerformance(query, results.length, duration);

    return results;
  } catch (error) {
    reportError(error as Error);
    throw error;
  }
};
```

## 5. Android Permissions

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## 6. Release Configuration

### Proguard Rules (android/app/proguard-rules.pro)

```proguard
# Sentry
-dontwarn io.sentry.**
-keep class io.sentry.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**
```

## 7. Testing Setup

```powershell
# Test Sentry integration
npx sentry-react-native debug-symbols upload --force

# Test Firebase Analytics (check Firebase Console after 24 hours)
npx react-native run-android --variant=release
```

## 8. Environment Configuration

Create `.env` file:

```bash
SENTRY_DSN=your_sentry_dsn_here
FIREBASE_PROJECT_ID=your_firebase_project_id
ANALYTICS_ENABLED=true
```

## 9. Monitoring Dashboard Setup

### Sentry Alerts

- Create alerts for error rate > 5%
- Set up notifications for new issues
- Configure performance thresholds

### Firebase Analytics

- Set up custom dashboards
- Track user engagement metrics
- Monitor app performance metrics

## 10. Privacy Compliance

Update Privacy Policy to include:

- Data collection practices
- Third-party services (Sentry, Firebase)
- User data retention policies
- Opt-out mechanisms
