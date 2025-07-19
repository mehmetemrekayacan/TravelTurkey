/**
 * TravelTurkey - Push Notifications Service (2025)
 * Local notification functionality for travel reminders and updates
 */

import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  NOTIFICATION_PERMISSIONS: '@travel_turkey:notification_permissions',
  SCHEDULED_NOTIFICATIONS: '@travel_turkey:scheduled_notifications',
} as const;

/**
 * Initialize push notifications (stub implementation)
 */
export const initializePushNotifications = async (): Promise<void> => {
  try {
    console.log('Local notifications initialized');

    // Store permission status
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATION_PERMISSIONS,
      JSON.stringify(true),
    );
  } catch (error) {
    console.error('Failed to initialize notifications:', error);
  }
};

/**
 * Request notification permission (stub implementation)
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      // On iOS, we would request permission here
      console.log('Notification permission would be requested on iOS');
      return true;
    } else {
      // On Android, permissions are handled by the system
      console.log('Notification permission granted on Android');
      return true;
    }
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

/**
 * Setup message handlers (stub implementation)
 */
export const setupMessageHandlers = (): void => {
  console.log('Message handlers setup (local notifications only)');
};

/**
 * Show local notification
 */
export const showLocalNotification = (
  title: string,
  message: string,
  data?: Record<string, any>,
): void => {
  Alert.alert(title, message, [{ text: 'Tamam', style: 'default' }]);
  console.log('Local notification shown:', { title, message, data });
};

/**
 * Handle notification tap
 */
export const handleNotificationTap = (data: Record<string, any>): void => {
  console.log('Notification tapped:', data);

  // Handle different notification types
  if (data.type === 'place_recommendation' && data.placeId) {
    // Navigate to place detail
    console.log('Navigate to place:', data.placeId);
  } else if (data.type === 'travel_reminder' && data.planId) {
    // Navigate to travel plan
    console.log('Navigate to plan:', data.planId);
  }
};

/**
 * Schedule a local notification
 */
export const scheduleLocalNotification = async (
  notification: ScheduledNotification,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
    );
    const notifications = stored ? JSON.parse(stored) : [];

    notifications.push(notification);
    await AsyncStorage.setItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
      JSON.stringify(notifications),
    );

    console.log('Notification scheduled:', notification);
  } catch (error) {
    console.error('Failed to schedule notification:', error);
  }
};

/**
 * Cancel scheduled notification
 */
export const cancelScheduledNotification = async (
  id: string,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
    );
    const notifications = stored ? JSON.parse(stored) : [];

    const filtered = notifications.filter(
      (n: ScheduledNotification) => n.id !== id,
    );
    await AsyncStorage.setItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
      JSON.stringify(filtered),
    );

    console.log('Notification cancelled:', id);
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
};

/**
 * Get scheduled notifications
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
    console.error('Failed to get scheduled notifications:', error);
    return [];
  }
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.SCHEDULED_NOTIFICATIONS);
    console.log('All notifications cleared');
  } catch (error) {
    console.error('Failed to clear notifications:', error);
  }
};

/**
 * Send travel reminder notification
 */
export const sendTravelReminder = (
  destination: string,
  date: string,
  planId?: string,
): void => {
  const title = 'Seyahat Hatırlatması';
  const message = `${destination} seyahatiniz ${date} tarihinde başlıyor!`;

  showLocalNotification(title, message, {
    type: 'travel_reminder',
    destination,
    date,
    planId,
  });
};

/**
 * Send place recommendation notification
 */
export const sendPlaceRecommendation = (
  placeName: string,
  placeId: string,
): void => {
  const title = 'Yeni Öneri!';
  const message = `${placeName} adlı mekanı keşfetmeye ne dersiniz?`;

  showLocalNotification(title, message, {
    type: 'place_recommendation',
    placeName,
    placeId,
  });
};

/**
 * Send app update notification
 */
export const sendAppUpdateNotification = (): void => {
  const title = 'Güncelleme Mevcut';
  const message = 'TravelTurkey uygulamasının yeni sürümü mevcut!';

  showLocalNotification(title, message, {
    type: 'app_update',
  });
};

/**
 * Check and process scheduled notifications
 */
export const processScheduledNotifications = async (): Promise<void> => {
  try {
    const notifications = await getScheduledNotifications();
    const now = Date.now();

    const dueNotifications = notifications.filter(n => n.scheduledTime <= now);

    for (const notification of dueNotifications) {
      showLocalNotification(
        notification.title,
        notification.body,
        notification.data,
      );

      // Remove from scheduled list
      await cancelScheduledNotification(notification.id);
    }
  } catch (error) {
    console.error('Failed to process scheduled notifications:', error);
  }
};

// Notification helper functions for travel app
export const NotificationHelpers = {
  /**
   * Schedule reminder for upcoming trip
   */
  scheduleTrip: async (
    destination: string,
    departureDate: Date,
    planId?: string,
  ): Promise<void> => {
    const reminderTime = departureDate.getTime() - 24 * 60 * 60 * 1000; // 1 day before

    await scheduleLocalNotification({
      id: `trip_${planId || Date.now()}`,
      title: 'Seyahat Hatırlatması',
      body: `Yarın ${destination} seyahatiniz başlıyor!`,
      scheduledTime: reminderTime,
      type: 'travel_reminder',
      data: { destination, planId },
    });
  },

  /**
   * Schedule check-in reminder
   */
  scheduleCheckIn: async (
    placeName: string,
    checkInTime: Date,
    placeId?: string,
  ): Promise<void> => {
    await scheduleLocalNotification({
      id: `checkin_${placeId || Date.now()}`,
      title: 'Check-in Hatırlatması',
      body: `${placeName} için check-in zamanı geldi!`,
      scheduledTime: checkInTime.getTime(),
      type: 'travel_reminder',
      data: { placeName, placeId },
    });
  },

  /**
   * Schedule daily exploration reminder
   */
  scheduleDailyReminder: async (): Promise<void> => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    await scheduleLocalNotification({
      id: 'daily_reminder',
      title: 'Keşfet!',
      body: 'Bugün hangi güzel yerleri keşfedeceksiniz?',
      scheduledTime: tomorrow.getTime(),
      type: 'general',
      data: { type: 'daily_exploration' },
    });
  },
};
