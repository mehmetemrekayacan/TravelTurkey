/**
 * TravelTurkey - Türkiye Turizm Uygulaması
 * Enhanced React Navigation 6 setup with 2025 best practices
 * Features: Gesture handling, deep linking, persistence, performance optimization
 *
 * @format
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  StatusBar,
  StyleSheet,
  Platform,
  AppState,
  AppStateStatus,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  NavigationState,
  InitialState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import theme and types
import { Theme } from './src/styles/theme';
import type {
  RootStackParamList,
  LinkingOptions,
} from './src/types/navigation';

// Import navigators and screens
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

import { BadgeProvider } from './src/context/BadgeContext';

import SearchScreen from './src/screens/search/SearchScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import AboutScreen from './src/screens/about/AboutScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import PlaceDetailScreen from './src/screens/detail/PlaceDetailScreen';
import ImageViewerScreen from './src/screens/gallery/ImageViewerScreen';
import ShareModalScreen from './src/screens/share/ShareModalScreen';

// Import performance monitoring and error boundary
import ErrorBoundary from './src/components/common/ErrorBoundary';
import SplashScreen from './src/components/common/SplashScreen';
import { usePerformanceMonitor } from './src/hooks/usePerformanceMonitor';

// Constants
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';
const STATE_VERSION = 1;

// Create the root stack navigator
const RootStack = createStackNavigator<RootStackParamList>();

// Deep linking configuration
const linking: LinkingOptions = {
  prefixes: ['travelturkey://', 'https://travelturkey.app'],
  config: {
    screens: {
      Main: 'main',
      PlaceDetail: 'place/:placeId',
      Search: 'search',
      Settings: 'settings',
      About: 'about',
      Onboarding: 'onboarding',
      Login: 'auth/login',
      Register: 'auth/register',
      ImageViewer: 'gallery',
      ShareModal: 'share',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App(): React.JSX.Element {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [initialState, setInitialState] = useState<InitialState>();
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);

  // Memoize navigation theme to prevent unnecessary re-renders
  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: Theme.colors.primary[500],
        background: Theme.colors.neutral[50],
        card: Theme.colors.neutral[100],
        text: Theme.colors.neutral[900],
        border: Theme.colors.neutral[200],
        notification: Theme.colors.accent.turquoise[500],
      },
    }),
    [],
  );

  // Memoize stack screen options
  const stackScreenOptions = useMemo(
    () => ({
      headerShown: false,
      // Enable gesture navigation
      gestureEnabled: true,
      gestureDirection: 'horizontal' as const,
      // Performance optimization
      presentation: 'card' as const,
      // Optimize animations
      animationEnabled: true,
    }),
    [],
  );

  // Handle app state changes for navigation persistence
  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        appStateVisible.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground
        console.log('App has come to the foreground!');
      }
      setAppStateVisible(nextAppState);
    },
    [appStateVisible],
  );

  // Restore navigation state
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        if (savedStateString) {
          const savedState = JSON.parse(savedStateString);

          // Check state version for compatibility
          if (savedState.stateVersion === STATE_VERSION) {
            setInitialState(savedState.state);
          }
        }
      } catch (e) {
        console.warn('Failed to restore navigation state:', e);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }

    // Add app state listener
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => subscription?.remove();
  }, [isReady, handleAppStateChange]);

  // Save navigation state
  const onStateChange = useCallback(
    async (state: NavigationState | undefined) => {
      try {
        const stateToSave = {
          stateVersion: STATE_VERSION,
          state,
        };
        await AsyncStorage.setItem(
          PERSISTENCE_KEY,
          JSON.stringify(stateToSave),
        );
      } catch (e) {
        console.warn('Failed to save navigation state:', e);
      }
    },
    [],
  );

  // Add performance monitoring
  const { trackScreenLoad, reportCrash, getPerformanceReport } =
    usePerformanceMonitor();

  // Performance monitoring effect
  useEffect(() => {
    const cleanup = trackScreenLoad('App');

    // Log performance report in development
    if (__DEV__) {
      setTimeout(() => {
        console.log(getPerformanceReport());
      }, 5000);
    }

    return cleanup;
  }, [trackScreenLoad, getPerformanceReport]);

  // Error handler for error boundary
  const handleGlobalError = useCallback(
    (error: Error, errorInfo: any) => {
      reportCrash(error);
      console.error('Global error caught:', error, errorInfo);
    },
    [reportCrash],
  );

  // Show loading screen while restoring state
  if (!isReady) {
    return <></>;
  }

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <BadgeProvider>
            <NavigationContainer
              linking={linking}
              theme={navigationTheme}
              initialState={initialState}
              onStateChange={onStateChange}
              onReady={() => {
                // Navigation is ready - good place for analytics, crashlytics, etc.
                console.log('Navigation is ready');
              }}
              fallback={null} // Custom loading component
            >
              <StatusBar
                barStyle={
                  Platform.OS === 'ios' ? 'dark-content' : 'light-content'
                }
                backgroundColor={Theme.colors.primary[500]}
                translucent={false}
              />

              <RootStack.Navigator screenOptions={stackScreenOptions}>
                {/* Main App */}
                <RootStack.Screen
                  name='Main'
                  component={BottomTabNavigator}
                  options={{
                    headerShown: false,
                  }}
                />

                {/* Modal Screens */}
                <RootStack.Group
                  screenOptions={{
                    presentation: 'modal',
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                  }}
                >
                  <RootStack.Screen
                    name='Search'
                    component={SearchScreen}
                    options={{
                      title: 'Arama',
                      headerShown: true,
                    }}
                  />
                  <RootStack.Screen
                    name='ImageViewer'
                    component={ImageViewerScreen}
                    options={{
                      title: 'Galeri',
                      headerShown: false,
                    }}
                  />
                  <RootStack.Screen
                    name='ShareModal'
                    component={ShareModalScreen}
                    options={{
                      title: 'Paylaş',
                      headerShown: true,
                    }}
                  />
                </RootStack.Group>

                {/* Full Screen Modals */}
                <RootStack.Group
                  screenOptions={{
                    presentation: 'modal',
                    gestureEnabled: true,
                  }}
                >
                  <RootStack.Screen
                    name='Settings'
                    component={SettingsScreen}
                    options={{
                      title: 'Ayarlar',
                      headerShown: true,
                    }}
                  />
                  <RootStack.Screen
                    name='About'
                    component={AboutScreen}
                    options={{
                      title: 'Hakkında',
                      headerShown: true,
                    }}
                  />
                </RootStack.Group>

                {/* Auth Screens */}
                <RootStack.Group
                  screenOptions={{
                    headerShown: false,
                    gestureEnabled: false, // Disable gestures for auth screens
                  }}
                >
                  <RootStack.Screen
                    name='Onboarding'
                    component={OnboardingScreen}
                  />
                  <RootStack.Screen name='Login' component={LoginScreen} />
                  <RootStack.Screen
                    name='Register'
                    component={RegisterScreen}
                  />
                </RootStack.Group>

                {/* Detail Screens */}
                <RootStack.Screen
                  name='PlaceDetail'
                  component={PlaceDetailScreen}
                  options={{
                    headerShown: false,
                    gestureEnabled: true,
                  }}
                />
              </RootStack.Navigator>

              {/* Performance Monitor - only in development */}
            </NavigationContainer>
          </BadgeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

export default App;
