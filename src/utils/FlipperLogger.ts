/**
 * TravelTurkey - Flipper Configuration
 * Development debugging and performance monitoring setup
 */

// Only include Flipper in development builds
if (__DEV__) {
  const flipper = require('react-native-flipper');

  // Network inspector - automatically logs all network requests
  flipper.flipperPerformancePlugin?.();

  // Custom TravelTurkey performance logger
  flipper.addPlugin({
    getId() {
      return 'TravelTurkeyPerformance';
    },
    onConnect(connection: any) {
      // Log app startup metrics
      connection.send('startup', {
        timestamp: Date.now(),
        platform: require('react-native').Platform.OS,
        version: require('../../package.json').version,
      });

      // Performance monitoring integration
      (globalThis as any).logPerformanceMetric = (
        metric: string,
        value: number,
        metadata?: any,
      ) => {
        connection.send('performance', {
          metric,
          value,
          metadata,
          timestamp: Date.now(),
        });
      };

      // AsyncStorage operations logger
      (globalThis as any).logStorageOperation = (
        operation: string,
        key: string,
        success: boolean,
        duration?: number,
      ) => {
        connection.send('storage', {
          operation,
          key,
          success,
          duration,
          timestamp: Date.now(),
        });
      };

      console.log('🔍 TravelTurkey Flipper plugin connected');
    },
    onDisconnect() {
      (globalThis as any).logPerformanceMetric = undefined;
      (globalThis as any).logStorageOperation = undefined;
      console.log('🔍 TravelTurkey Flipper plugin disconnected');
    },
    runInBackground() {
      return false;
    },
  });

  // Redux DevTools integration (if using Redux)
  if ((globalThis as any).__REDUX_DEVTOOLS_EXTENSION__) {
    flipper.addPlugin({
      getId() {
        return 'ReduxDevTools';
      },
      onConnect(_connection: any) {
        // Forward Redux actions to Flipper
        console.log('🔄 Redux DevTools connected via Flipper');
      },
      onDisconnect() {
        console.log('🔄 Redux DevTools disconnected');
      },
      runInBackground() {
        return true;
      },
    });
  }
}

// Type declarations for global functions
declare global {
  var logPerformanceMetric:
    | ((metric: string, value: number, metadata?: any) => void)
    | undefined;
  var logStorageOperation:
    | ((
        operation: string,
        key: string,
        success: boolean,
        duration?: number,
      ) => void)
    | undefined;
}

export const FlipperLogger = {
  logPerformance: (metric: string, value: number, metadata?: any) => {
    if (__DEV__ && (globalThis as any).logPerformanceMetric) {
      (globalThis as any).logPerformanceMetric(metric, value, metadata);
    }
  },

  logStorage: (
    operation: string,
    key: string,
    success: boolean,
    duration?: number,
  ) => {
    if (__DEV__ && (globalThis as any).logStorageOperation) {
      (globalThis as any).logStorageOperation(
        operation,
        key,
        success,
        duration,
      );
    }
  },

  logNavigation: (fromScreen: string, toScreen: string, duration: number) => {
    if (__DEV__ && (globalThis as any).logPerformanceMetric) {
      (globalThis as any).logPerformanceMetric('navigation', duration, {
        from: fromScreen,
        to: toScreen,
      });
    }
  },

  logSearchPerformance: (
    query: string,
    resultCount: number,
    duration: number,
  ) => {
    if (__DEV__ && (globalThis as any).logPerformanceMetric) {
      (globalThis as any).logPerformanceMetric('search', duration, {
        query,
        resultCount,
      });
    }
  },
};
