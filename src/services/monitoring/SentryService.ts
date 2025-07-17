/**
 * TravelTurkey - Sentry Configuration (2025)
 * Production-ready crash reporting and performance monitoring
 */

import * as Sentry from '@sentry/react-native';

// Sentry DSN - Replace with your actual DSN
const SENTRY_DSN = __DEV__
  ? null // Don't send errors in development
  : 'YOUR_SENTRY_DSN_HERE';

/**
 * Initialize Sentry for crash reporting
 */
export const initializeSentry = () => {
  if (!SENTRY_DSN || __DEV__) {
    console.log('Sentry disabled in development');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: __DEV__ ? 'development' : 'production',

    // Performance Monitoring
    tracesSampleRate: 0.1, // 10% of transactions
    enableAppStartTracking: true,
    enableNativeFramesTracking: true,
    enableStallTracking: true,
    enableUserInteractionTracing: true,

    // Session tracking
    autoSessionTracking: true,
    sessionTrackingIntervalMillis: 10000,

    // Error filtering
    beforeSend(event: any) {
      // Filter out development errors
      if (__DEV__) return null;

      // Filter out network errors (they're usually not app bugs)
      if (event.exception?.values?.[0]?.type === 'NetworkError') {
        return null;
      }

      return event;
    },

    // Custom integrations
    integrations: [
      // Note: ReactNativeTracing may not be available in newer versions
      // Replace with appropriate performance monitoring integration
    ],
  });
};

/**
 * Set user context for error tracking
 */
export const setSentryUser = (user: {
  id: string;
  email?: string;
  username?: string;
}) => {
  Sentry.setUser(user);
};

/**
 * Add custom context to error reports
 */
export const setSentryContext = (key: string, context: Record<string, any>) => {
  Sentry.setContext(key, context);
};

/**
 * Track custom events
 */
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message: eventName,
    level: 'info',
    data,
  });
};

/**
 * Report custom errors
 */
export const reportError = (error: Error, context?: Record<string, any>) => {
  Sentry.withScope((scope: any) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

/**
 * Performance transaction wrapper
 */
export const withPerformanceTransaction = async <T>(
  name: string,
  operation: () => Promise<T> | T,
  description?: string,
): Promise<T> => {
  return await Sentry.startSpan(
    {
      name,
      op: description || 'function',
    },
    operation,
  );
};

/**
 * Network request tracking
 */
export const trackNetworkRequest = (
  url: string,
  method: string,
  statusCode: number,
  duration: number,
) => {
  Sentry.addBreadcrumb({
    category: 'http',
    message: `${method} ${url}`,
    level: statusCode >= 400 ? 'error' : 'info',
    data: {
      url,
      method,
      status_code: statusCode,
      duration,
    },
  });
};

export default Sentry;
