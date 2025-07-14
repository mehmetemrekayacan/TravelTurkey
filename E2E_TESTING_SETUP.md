# TravelTurkey E2E Testing with Detox Setup

## Installation

```powershell
# Install Detox CLI globally
npm install -g detox-cli

# Install Detox as dev dependency
npm install --save-dev detox@20.20.2
npm install --save-dev jest-circus@29.7.0
```

## Configuration

### 1. Create detox.config.js

```javascript
/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [8081],
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
    },
  },
  devices: {
    simulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_30_x86',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*', // Any attached device
      },
    },
  },
  configurations: {
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug',
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release',
    },
  },
};
```

### 2. Create e2e/jest.config.js

```javascript
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
```

## TypeScript-Compatible Test Examples

### 3. Create e2e/firstTest.e2e.ts

```typescript
import { device, expect, element, by, waitFor } from 'detox';

describe('TravelTurkey E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have explore screen', async () => {
    await expect(element(by.text('Keşfet'))).toBeVisible();
  });

  it('should navigate through bottom tabs', async () => {
    // Test Explore tab
    await element(by.text('Keşfet')).tap();
    await expect(element(by.text('Keşfet'))).toBeVisible();

    // Test Plans tab
    await element(by.text('Planlarım')).tap();
    await expect(element(by.text('Planlarım'))).toBeVisible();

    // Test Profile tab
    await element(by.text('Profil')).tap();
    await expect(element(by.text('Profil'))).toBeVisible();
  });

  it('should test search functionality', async () => {
    await element(by.text('Keşfet')).tap();

    // Find search input
    await waitFor(element(by.id('search-input')))
      .toBeVisible()
      .withTimeout(5000);

    // Type in search
    await element(by.id('search-input')).typeText('Istanbul');

    // Wait for results
    await waitFor(element(by.id('search-results')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should test FlatList scrolling', async () => {
    await element(by.text('Keşfet')).tap();

    // Find the tourist places list
    await waitFor(element(by.id('tourist-places-list')))
      .toBeVisible()
      .withTimeout(5000);

    // Scroll down
    await element(by.id('tourist-places-list')).scroll(300, 'down');

    // Scroll back up
    await element(by.id('tourist-places-list')).scroll(300, 'up');
  });

  it('should test place detail navigation', async () => {
    await element(by.text('Keşfet')).tap();

    // Wait for first item to be visible
    await waitFor(element(by.id('place-card-0')))
      .toBeVisible()
      .withTimeout(5000);

    // Tap on first place
    await element(by.id('place-card-0')).tap();

    // Check if detail screen opens
    await expect(element(by.id('place-detail-screen'))).toBeVisible();

    // Go back
    await element(by.id('back-button')).tap();
  });
});
```

### 4. Create e2e/mapTest.e2e.ts

```typescript
import { device, expect, element, by, waitFor } from 'detox';

describe('Maps Integration Tests', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should load map on detail screen', async () => {
    // Navigate to explore and select a place
    await element(by.text('Keşfet')).tap();
    await element(by.id('place-card-0')).tap();

    // Wait for map to load
    await waitFor(element(by.id('place-map')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('place-map'))).toBeVisible();
  });
});
```

## Package.json Scripts

Add to your package.json:

```json
{
  "scripts": {
    "e2e:build:android": "detox build --configuration android.att.debug",
    "e2e:test:android": "detox test --configuration android.att.debug",
    "e2e:test:android:release": "detox test --configuration android.att.release"
  }
}
```

## Running Tests

```powershell
# Build the app for testing
npm run e2e:build:android

# Run tests on connected device
npm run e2e:test:android

# Check connected devices
adb devices
```

## Android Setup

### Add to android/app/build.gradle:

```gradle
android {
  ...
  defaultConfig {
    ...
    testBuildType System.getProperty('testBuildType', 'debug')
    testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
  }
}

dependencies {
  androidTestImplementation('com.wix:detox:+')
  implementation 'androidx.appcompat:appcompat:1.6.1'
}
```

### Add to android/app/src/main/java/com/travelturkey/MainApplication.java:

```java
@Override
public void onCreate() {
  super.onCreate();
  // For Detox
  if (BuildConfig.DEBUG) {
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
```
