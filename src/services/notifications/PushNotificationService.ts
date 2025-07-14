/**
 * TravelTurkey - Push Notifications Service (2025)
 * Firebase Cloud Messaging integration for travel reminders and updates
 */

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  trackEvent,
  AnalyticsEvents,
} from '../monitoring/FirebaseAnalyticsService';

export interface NotificationData {
  type: 'travel_reminder' | 'place_recommendation' | 'app_update' | 'general';
  title: string;
  body: string;
  data?: Record<string, any>;
  placeId?: string;
  planId?: string;
}

export interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  scheduledTime: number;
  type: string;
  data?: Record<string, any>;
}

const STORAGE_KEYS = {
  FCM_TOKEN: '@travel_turkey:fcm_token',
  NOTIFICATION_PERMISSIONS: '@travel_turkey:notification_permissions',
  SCHEDULED_NOTIFICATIONS: '@travel_turkey:scheduled_notifications',
} as const;

/**
 * Initialize push notifications
 */
export const initializePushNotifications = async (): Promise<void> => {
  try {
    // Request permission
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      console.log('Notification permission not granted');
      return;
    }

    // Get FCM token
    const token = await messaging().getToken();
    await AsyncStorage.setItem(STORAGE_KEYS.FCM_TOKEN, token);
    console.log('FCM Token:', token);

    // Set up message handlers
    setupMessageHandlers();

    // Track initialization
    await trackEvent(AnalyticsEvents.APP_LAUNCH, {
      push_notifications_enabled: true,
      fcm_token_received: !!token,
    });
  } catch (error) {
    console.error('Error initializing push notifications:', error);
  }
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATION_PERMISSIONS,
      JSON.stringify({ enabled, authStatus, timestamp: Date.now() }),
    );

    return enabled;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Setup message handlers
 */
const setupMessageHandlers = (): void => {
  // Foreground message handler
  messaging().onMessage(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Foreground message received:', remoteMessage);

      // Show custom alert for foreground messages
      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title || 'TravelTurkey',
          remoteMessage.notification.body || '',
          [
            { text: 'Tamam', style: 'default' },
            {
              text: 'Aç',
              style: 'default',
              onPress: () => handleNotificationOpen(remoteMessage),
            },
          ],
        );
      }

      // Track foreground notification
      await trackEvent('notification_received_foreground', {
        notification_type: remoteMessage.data?.type || 'unknown',
      });
    },
  );

  // Background message handler
  messaging().setBackgroundMessageHandler(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Background message received:', remoteMessage);

      // Track background notification
      await trackEvent('notification_received_background', {
        notification_type: remoteMessage.data?.type || 'unknown',
      });
    },
  );

  // Notification opened handler
  messaging().onNotificationOpenedApp(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Notification opened app:', remoteMessage);
      handleNotificationOpen(remoteMessage);
    },
  );

  // Initial notification (app opened from killed state)
  messaging()
    .getInitialNotification()
    .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (remoteMessage) {
        console.log('Initial notification:', remoteMessage);
        handleNotificationOpen(remoteMessage);
      }
    });

  // Token refresh handler
  messaging().onTokenRefresh(async (token: string) => {
    console.log('FCM Token refreshed:', token);
    await AsyncStorage.setItem(STORAGE_KEYS.FCM_TOKEN, token);
    // Here you would typically send the new token to your backend
  });
};

/**
 * Handle notification open/click
 */
const handleNotificationOpen = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  const { data } = remoteMessage;

  // Track notification open
  await trackEvent('notification_opened', {
    notification_type: data?.type || 'unknown',
    place_id: data?.placeId,
    plan_id: data?.planId,
  });

  // Handle different notification types
  switch (data?.type) {
    case 'travel_reminder':
      // Navigate to plan details
      if (data.planId) {
        // Navigation logic here
        console.log('Navigate to plan:', data.planId);
      }
      break;

    case 'place_recommendation':
      // Navigate to place details
      if (data.placeId) {
        console.log('Navigate to place:', data.placeId);
      }
      break;

    case 'app_update':
      // Open app store or settings
      const storeUrl =
        Platform.OS === 'ios'
          ? 'https://apps.apple.com/app/travelturkey'
          : 'https://play.google.com/store/apps/details?id=com.travelturkey';
      Linking.openURL(storeUrl);
      break;

    default:
      // General notification - open app home
      console.log('Open app home');
      break;
  }
};

/**
 * Schedule local notification for travel reminder
 */
export const scheduleLocalNotification = async (
  planId: string,
  title: string,
  body: string,
  scheduledTime: Date,
  type: string = 'travel_reminder',
): Promise<string> => {
  try {
    const notificationId = `${planId}_${Date.now()}`;

    // For React Native, we'll store scheduled notifications and handle them differently
    // In a full implementation, you'd use a library like @react-native-async-storage/async-storage
    // and a background task scheduler

    const notification: ScheduledNotification = {
      id: notificationId,
      title,
      body,
      scheduledTime: scheduledTime.getTime(),
      type,
      data: { planId },
    };

    // Store scheduled notification
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
    );
    const notifications: ScheduledNotification[] = stored
      ? JSON.parse(stored)
      : [];
    notifications.push(notification);

    await AsyncStorage.setItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
      JSON.stringify(notifications),
    );

    console.log('Scheduled notification:', notification);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
};

/**
 * Cancel scheduled notification
 */
export const cancelScheduledNotification = async (
  notificationId: string,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
    );
    if (!stored) return;

    const notifications: ScheduledNotification[] = JSON.parse(stored);
    const filtered = notifications.filter(n => n.id !== notificationId);

    await AsyncStorage.setItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
      JSON.stringify(filtered),
    );

    console.log('Cancelled notification:', notificationId);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
};

/**
 * Get all scheduled notifications
 */
export const getScheduledNotifications = async (): Promise<
  ScheduledNotification[]
> => {
  try {
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
    );
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
};

/**
 * Check and trigger due notifications (call this periodically)
 */
export const checkPendingNotifications = async (): Promise<void> => {
  try {
    const notifications = await getScheduledNotifications();
    const now = Date.now();
    const dueNotifications = notifications.filter(n => n.scheduledTime <= now);

    for (const notification of dueNotifications) {
      // In a real app, you'd show the notification here
      console.log('Due notification:', notification);

      // Remove from scheduled list
      await cancelScheduledNotification(notification.id);
    }
  } catch (error) {
    console.error('Error checking pending notifications:', error);
  }
};

/**
 * Subscribe to topic for general updates
 */
export const subscribeToTopic = async (topic: string): Promise<void> => {
  try {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to topic: ${topic}`);
  } catch (error) {
    console.error(`Error subscribing to topic ${topic}:`, error);
  }
};

/**
 * Unsubscribe from topic
 */
export const unsubscribeFromTopic = async (topic: string): Promise<void> => {
  try {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from topic: ${topic}`);
  } catch (error) {
    console.error(`Error unsubscribing from topic ${topic}:`, error);
  }
};

/**
 * Get FCM token
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.FCM_TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Check if notifications are enabled
 */
export const areNotificationsEnabled = async (): Promise<boolean> => {
  try {
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.NOTIFICATION_PERMISSIONS,
    );
    if (!stored) return false;

    const { enabled } = JSON.parse(stored);
    return enabled;
  } catch (error) {
    console.error('Error checking notification status:', error);
    return false;
  }
};

/**
 * Open notification settings
 */
export const openNotificationSettings = (): void => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

/**
 * Sample notification templates
 */
export const NotificationTemplates = {
  travelReminder: (placeName: string, date: string) => ({
    title: 'Seyahat Hatırlatması 🎒',
    body: `${placeName} ziyaretiniz için ${date} tarihinde hazır olun!`,
  }),

  placeRecommendation: (placeName: string) => ({
    title: 'Yeni Öneri! ✨',
    body: `${placeName} sizin için mükemmel bir yer olabilir. Şimdi keşfedin!`,
  }),

  weatherAlert: (placeName: string, weather: string) => ({
    title: 'Hava Durumu Uyarısı 🌤️',
    body: `${placeName} için bugün ${weather} bekleniyor. Planınızı gözden geçirin.`,
  }),

  nearbyPlace: (placeName: string, distance: string) => ({
    title: 'Yakınınızda! 📍',
    body: `${placeName} sadece ${distance} uzakta. Uğramak ister misiniz?`,
  }),
};
