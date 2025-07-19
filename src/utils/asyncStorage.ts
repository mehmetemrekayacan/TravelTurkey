/**
 * TravelTurkey - AsyncStorage Utilities
 * Helper functions for user data and preferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER_NAME: '@travel_turkey:user_name',
  USER_PREFERENCES: '@travel_turkey:user_preferences',
  HERO_IMAGES_CACHE: '@travel_turkey:hero_images_cache',
  LAST_VISIT: '@travel_turkey:last_visit',
} as const;

// User name functions
export const getUserName = async (): Promise<string> => {
  try {
    const userName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
    return userName || 'Gezgin'; // Default name if not set
  } catch (error) {
    console.error('Error getting user name:', error);
    return 'Gezgin';
  }
};

export const setUserName = async (name: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    return true;
  } catch (error) {
    console.error('Error setting user name:', error);
    return false;
  }
};

// Cache hero images for offline use
export const cacheHeroImages = async (
  images: { id: string; uri: string }[],
): Promise<void> => {
  try {
    const cacheData = {
      images,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(
      STORAGE_KEYS.HERO_IMAGES_CACHE,
      JSON.stringify(cacheData),
    );
  } catch (error) {
    console.error('Error caching hero images:', error);
  }
};

export const getCachedHeroImages = async (): Promise<
  { id: string; uri: string }[] | null
> => {
  try {
    const cacheData = await AsyncStorage.getItem(
      STORAGE_KEYS.HERO_IMAGES_CACHE,
    );
    if (cacheData) {
      const parsed = JSON.parse(cacheData);
      // Check if cache is less than 24 hours old
      const isValid = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
      return isValid ? parsed.images : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting cached hero images:', error);
    return null;
  }
};

// User preferences
export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  location: boolean;
  favoriteCategories: string[];
}

export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const preferences = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PREFERENCES,
    );
    if (preferences) {
      return JSON.parse(preferences);
    }
    // Default preferences
    return {
      language: 'tr',
      theme: 'light',
      notifications: true,
      location: true,
      favoriteCategories: [],
    };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return {
      language: 'tr',
      theme: 'light',
      notifications: true,
      location: true,
      favoriteCategories: [],
    };
  }
};

export const setUserPreferences = async (
  preferences: UserPreferences,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences),
    );
    return true;
  } catch (error) {
    console.error('Error setting user preferences:', error);
    return false;
  }
};

// Track last visit for analytics
export const updateLastVisit = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_VISIT, Date.now().toString());
  } catch (error) {
    console.error('Error updating last visit:', error);
  }
};

export const getLastVisit = async (): Promise<Date | null> => {
  try {
    const lastVisit = await AsyncStorage.getItem(STORAGE_KEYS.LAST_VISIT);
    return lastVisit ? new Date(parseInt(lastVisit, 10)) : null;
  } catch (error) {
    console.error('Error getting last visit:', error);
    return null;
  }
};
