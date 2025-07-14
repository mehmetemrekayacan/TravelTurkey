/**
 * TravelTurkey - Performance Monitor Hook
 * Hook for monitoring app performance metrics and user experience
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface PerformanceMetrics {
  // App lifecycle
  appStartTime: number;
  screenLoadTimes: Map<string, number>;

  // Navigation performance
  navigationLatency: number[];
  averageNavigationTime: number;

  // Memory and performance
  lastMemoryWarning?: number;
  crashCount: number;

  // User experience
  anrCount: number; // Application Not Responding
  slowFrameCount: number;
  totalFrameCount: number;
}

interface UsePerformanceMonitorReturn {
  metrics: PerformanceMetrics;
  trackScreenLoad: (screenName: string) => () => void;
  trackNavigation: (fromScreen: string, toScreen: string) => void;
  reportCrash: (error: Error) => void;
  getPerformanceReport: () => string;
}

export const usePerformanceMonitor = (): UsePerformanceMonitorReturn => {
  const appStartTimeRef = useRef(Date.now());
  const screenLoadTimesRef = useRef(new Map<string, number>());
  const navigationLatencyRef = useRef<number[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    appStartTime: appStartTimeRef.current,
    screenLoadTimes: new Map(),
    navigationLatency: [],
    averageNavigationTime: 0,
    crashCount: 0,
    anrCount: 0,
    slowFrameCount: 0,
    totalFrameCount: 0,
  });

  // Monitor app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        // Track background time for calculating engagement
        const backgroundTime = Date.now();
        console.log(
          '📱 App went to background at:',
          new Date(backgroundTime).toISOString(),
        );
      } else if (nextAppState === 'active') {
        console.log('📱 App became active');
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription?.remove();
  }, []);

  // Track screen load performance
  const trackScreenLoad = useCallback((screenName: string) => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const loadTime = endTime - startTime;

      screenLoadTimesRef.current.set(screenName, loadTime);

      setMetrics(prev => ({
        ...prev,
        screenLoadTimes: new Map(screenLoadTimesRef.current),
      }));

      console.log(`📊 Screen "${screenName}" loaded in ${loadTime}ms`);

      // Warn about slow screens
      if (loadTime > 1000) {
        console.warn(
          `⚠️ Slow screen load detected: ${screenName} took ${loadTime}ms`,
        );
      }
    };
  }, []);

  // Track navigation performance
  const trackNavigation = useCallback(
    (fromScreen: string, toScreen: string) => {
      const startTime = Date.now();

      // Simulate navigation completion (in real app, this would be triggered by navigation events)
      setTimeout(() => {
        const endTime = Date.now();
        const navigationTime = endTime - startTime;

        navigationLatencyRef.current.push(navigationTime);

        // Keep only last 20 navigation timings
        if (navigationLatencyRef.current.length > 20) {
          navigationLatencyRef.current.shift();
        }

        const averageTime =
          navigationLatencyRef.current.reduce((a, b) => a + b, 0) /
          navigationLatencyRef.current.length;

        setMetrics(prev => ({
          ...prev,
          navigationLatency: [...navigationLatencyRef.current],
          averageNavigationTime: averageTime,
        }));

        console.log(
          `🧭 Navigation ${fromScreen} → ${toScreen}: ${navigationTime}ms`,
        );
      }, 16); // Simulate one frame
    },
    [],
  );

  // Report crashes and errors
  const reportCrash = useCallback((error: Error) => {
    setMetrics(prev => ({
      ...prev,
      crashCount: prev.crashCount + 1,
    }));

    // In production, send to crash reporting service
    console.error('💥 Crash reported:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Generate performance report
  const getPerformanceReport = useCallback(() => {
    const uptime = Date.now() - metrics.appStartTime;
    const averageScreenLoad =
      Array.from(metrics.screenLoadTimes.values()).reduce((a, b) => a + b, 0) /
      Math.max(metrics.screenLoadTimes.size, 1);

    return `
📊 TravelTurkey Performance Report
================================
⏱️  App Uptime: ${(uptime / 1000).toFixed(1)}s
📱 Screens Loaded: ${metrics.screenLoadTimes.size}
⚡ Avg Screen Load: ${averageScreenLoad.toFixed(1)}ms
🧭 Avg Navigation: ${metrics.averageNavigationTime.toFixed(1)}ms
💥 Crashes: ${metrics.crashCount}
🐌 ANR Events: ${metrics.anrCount}

🎯 Performance Score: ${calculatePerformanceScore(metrics)}/100
    `.trim();
  }, [metrics]);

  return {
    metrics,
    trackScreenLoad,
    trackNavigation,
    reportCrash,
    getPerformanceReport,
  };
};

// Calculate overall performance score
function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  let score = 100;

  // Penalize slow screen loads
  const screenLoads = Array.from(metrics.screenLoadTimes.values());
  const avgScreenLoad =
    screenLoads.reduce((a, b) => a + b, 0) / Math.max(screenLoads.length, 1);
  if (avgScreenLoad > 1000) score -= 20;
  else if (avgScreenLoad > 500) score -= 10;

  // Penalize slow navigation
  if (metrics.averageNavigationTime > 300) score -= 15;
  else if (metrics.averageNavigationTime > 150) score -= 5;

  // Penalize crashes and ANRs
  score -= metrics.crashCount * 10;
  score -= metrics.anrCount * 5;

  return Math.max(0, score);
}
