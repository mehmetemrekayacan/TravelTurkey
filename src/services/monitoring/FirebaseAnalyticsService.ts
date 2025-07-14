/**
 * TravelTurkey - Firebase Analytics Configuration (2025)
 * User behavior tracking and app analytics
 */

import analytics from '@react-native-firebase/analytics';
import { Platform } from 'react-native';

/**
 * Analytics events enum for type safety
 */
export enum AnalyticsEvents {
  // Screen views
  SCREEN_VIEW = 'screen_view',

  // User actions
  SEARCH_PERFORMED = 'search_performed',
  PLACE_VIEWED = 'place_viewed',
  PLACE_FAVORITED = 'place_favorited',
  PLAN_CREATED = 'plan_created',
  PLAN_SHARED = 'plan_shared',

  // Navigation
  TAB_SWITCHED = 'tab_switched',
  DEEP_LINK_OPENED = 'deep_link_opened',

  // Performance
  APP_LAUNCH = 'app_launch',
  SEARCH_PERFORMANCE = 'search_performance',

  // Errors
  ERROR_OCCURRED = 'error_occurred',
}

/**
 * Initialize Firebase Analytics
 */
export const initializeAnalytics = async () => {
  try {
    await analytics().setAnalyticsCollectionEnabled(!__DEV__);

    if (!__DEV__) {
      console.log('Firebase Analytics initialized');
    }
  } catch (error) {
    console.warn('Failed to initialize Firebase Analytics:', error);
  }
};

/**
 * Track screen views
 */
export const trackScreenView = async (
  screenName: string,
  screenClass?: string,
) => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  } catch (error) {
    console.warn('Failed to track screen view:', error);
  }
};

/**
 * Track custom events with parameters
 */
export const trackEvent = async (
  eventName: AnalyticsEvents | string,
  parameters?: Record<string, any>,
) => {
  try {
    await analytics().logEvent(eventName, {
      ...parameters,
      platform: Platform.OS,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.warn('Failed to track event:', error);
  }
};

/**
 * Set user properties
 */
export const setUserProperties = async (properties: Record<string, string>) => {
  try {
    for (const [key, value] of Object.entries(properties)) {
      await analytics().setUserProperty(key, value);
    }
  } catch (error) {
    console.warn('Failed to set user properties:', error);
  }
};

/**
 * Set user ID for tracking
 */
export const setUserId = async (userId: string) => {
  try {
    await analytics().setUserId(userId);
  } catch (error) {
    console.warn('Failed to set user ID:', error);
  }
};

/**
 * Track search performance
 */
export const trackSearchPerformance = async (
  query: string,
  resultCount: number,
  duration: number,
) => {
  await trackEvent(AnalyticsEvents.SEARCH_PERFORMANCE, {
    search_term: query,
    result_count: resultCount,
    duration_ms: duration,
    category: 'performance',
  });
};

/**
 * Track user engagement
 */
export const trackUserEngagement = async (
  action: string,
  details?: Record<string, any>,
) => {
  await trackEvent('user_engagement', {
    engagement_type: action,
    ...details,
  });
};

/**
 * Track app performance metrics
 */
export const trackAppPerformance = async (
  metric: string,
  value: number,
  unit: string = 'ms',
) => {
  await trackEvent('app_performance', {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
  });
};

/**
 * Track errors for analytics (non-crash)
 */
export const trackAnalyticsError = async (
  errorType: string,
  errorMessage: string,
  errorContext?: Record<string, any>,
) => {
  await trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
    error_type: errorType,
    error_message: errorMessage,
    error_context: JSON.stringify(errorContext),
    is_fatal: false,
  });
};

/**
 * Enable/disable analytics collection
 */
export const setAnalyticsEnabled = async (enabled: boolean) => {
  try {
    await analytics().setAnalyticsCollectionEnabled(enabled);
  } catch (error) {
    console.warn('Failed to set analytics enabled:', error);
  }
};

export default analytics;
