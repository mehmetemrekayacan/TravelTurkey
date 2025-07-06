/**
 * TravelTurkey - AsyncStorage Search History Hook
 * Hook for managing search history and favorites with AsyncStorage
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';

// Storage keys
const STORAGE_KEYS = {
  SEARCH_HISTORY: '@TravelTurkey:searchHistory',
  RECENT_SEARCHES: '@TravelTurkey:recentSearches',
  FAVORITE_PLACES: '@TravelTurkey:favoritePlaces',
  SEARCH_PREFERENCES: '@TravelTurkey:searchPreferences',
} as const;

// Types
export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  resultCount: number;
}

export interface SearchPreferences {
  maxHistoryItems: number;
  enableSuggestions: boolean;
  enableAutoComplete: boolean;
  searchRadius: number; // in km
  preferredCategories: string[];
}

export interface FavoritePlace {
  place: TouristPlace | EnhancedTouristPlace;
  addedAt: number;
  notes?: string;
}

const DEFAULT_PREFERENCES: SearchPreferences = {
  maxHistoryItems: 50,
  enableSuggestions: true,
  enableAutoComplete: true,
  searchRadius: 10,
  preferredCategories: [],
};

export const useSearchStorage = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);
  const [preferences, setPreferences] =
    useState<SearchPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      setIsLoading(true);

      const [historyData, recentData, favoritesData, preferencesData] =
        await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY),
          AsyncStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES),
          AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_PLACES),
          AsyncStorage.getItem(STORAGE_KEYS.SEARCH_PREFERENCES),
        ]);

      if (historyData) {
        setSearchHistory(JSON.parse(historyData));
      }

      if (recentData) {
        setRecentSearches(JSON.parse(recentData));
      }

      if (favoritesData) {
        setFavoritePlaces(JSON.parse(favoritesData));
      }

      if (preferencesData) {
        setPreferences({
          ...DEFAULT_PREFERENCES,
          ...JSON.parse(preferencesData),
        });
      }
    } catch (error) {
      console.error('Error loading search storage data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add search to history
  const addSearchToHistory = useCallback(
    async (query: string, resultCount: number) => {
      try {
        const newItem: SearchHistoryItem = {
          id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          query: query.trim(),
          timestamp: Date.now(),
          resultCount,
        };

        const updatedHistory = [newItem, ...searchHistory]
          .filter(
            (item, index, arr) =>
              arr.findIndex(
                h => h.query.toLowerCase() === item.query.toLowerCase(),
              ) === index,
          )
          .slice(0, preferences.maxHistoryItems);

        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem(
          STORAGE_KEYS.SEARCH_HISTORY,
          JSON.stringify(updatedHistory),
        );

        // Update recent searches (last 10)
        const updatedRecent = [query, ...recentSearches]
          .filter((item, index, arr) => arr.indexOf(item) === index)
          .slice(0, 10);

        setRecentSearches(updatedRecent);
        await AsyncStorage.setItem(
          STORAGE_KEYS.RECENT_SEARCHES,
          JSON.stringify(updatedRecent),
        );
      } catch (error) {
        console.error('Error adding search to history:', error);
      }
    },
    [searchHistory, recentSearches, preferences.maxHistoryItems],
  );

  // Clear search history
  const clearSearchHistory = useCallback(async () => {
    try {
      setSearchHistory([]);
      setRecentSearches([]);
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY),
        AsyncStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES),
      ]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }, []);

  // Remove specific search from history
  const removeSearchFromHistory = useCallback(
    async (searchId: string) => {
      try {
        const updatedHistory = searchHistory.filter(
          item => item.id !== searchId,
        );
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem(
          STORAGE_KEYS.SEARCH_HISTORY,
          JSON.stringify(updatedHistory),
        );
      } catch (error) {
        console.error('Error removing search from history:', error);
      }
    },
    [searchHistory],
  );

  // Add place to favorites
  const addToFavorites = useCallback(
    async (place: TouristPlace | EnhancedTouristPlace, notes?: string) => {
      try {
        // Check if already in favorites
        const existingIndex = favoritePlaces.findIndex(
          fav => fav.place.id === place.id,
        );

        if (existingIndex >= 0) {
          // Update existing favorite
          const updatedFavorites = [...favoritePlaces];
          updatedFavorites[existingIndex] = {
            ...updatedFavorites[existingIndex],
            notes,
          };
          setFavoritePlaces(updatedFavorites);
          await AsyncStorage.setItem(
            STORAGE_KEYS.FAVORITE_PLACES,
            JSON.stringify(updatedFavorites),
          );
        } else {
          // Add new favorite
          const newFavorite: FavoritePlace = {
            place,
            addedAt: Date.now(),
            notes,
          };

          const updatedFavorites = [newFavorite, ...favoritePlaces];
          setFavoritePlaces(updatedFavorites);
          await AsyncStorage.setItem(
            STORAGE_KEYS.FAVORITE_PLACES,
            JSON.stringify(updatedFavorites),
          );
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    },
    [favoritePlaces],
  );

  // Remove from favorites
  const removeFromFavorites = useCallback(
    async (placeId: string) => {
      try {
        const updatedFavorites = favoritePlaces.filter(
          fav => fav.place.id !== placeId,
        );
        setFavoritePlaces(updatedFavorites);
        await AsyncStorage.setItem(
          STORAGE_KEYS.FAVORITE_PLACES,
          JSON.stringify(updatedFavorites),
        );
      } catch (error) {
        console.error('Error removing from favorites:', error);
      }
    },
    [favoritePlaces],
  );

  // Check if place is favorite
  const isFavorite = useCallback(
    (placeId: string) => {
      return favoritePlaces.some(fav => fav.place.id === placeId);
    },
    [favoritePlaces],
  );

  // Update preferences
  const updatePreferences = useCallback(
    async (newPreferences: Partial<SearchPreferences>) => {
      try {
        const updatedPreferences = { ...preferences, ...newPreferences };
        setPreferences(updatedPreferences);
        await AsyncStorage.setItem(
          STORAGE_KEYS.SEARCH_PREFERENCES,
          JSON.stringify(updatedPreferences),
        );
      } catch (error) {
        console.error('Error updating preferences:', error);
      }
    },
    [preferences],
  );

  // Get search suggestions based on history
  const getHistoryBasedSuggestions = useCallback(
    (query: string) => {
      if (!query.trim()) return [];

      const lowerQuery = query.toLowerCase();
      return searchHistory
        .filter(
          item =>
            item.query.toLowerCase().includes(lowerQuery) &&
            item.resultCount > 0,
        )
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5)
        .map(item => item.query);
    },
    [searchHistory],
  );

  // Get popular searches
  const getPopularSearches = useCallback(() => {
    const searchCounts = searchHistory.reduce((acc, item) => {
      acc[item.query] = (acc[item.query] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(searchCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query]) => query);
  }, [searchHistory]);

  // Export data (for backup/sharing)
  const exportData = useCallback(async () => {
    try {
      const data = {
        searchHistory,
        recentSearches,
        favoritePlaces,
        preferences,
        exportDate: new Date().toISOString(),
        version: '1.0',
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }, [searchHistory, recentSearches, favoritePlaces, preferences]);

  // Import data (from backup)
  const importData = useCallback(async (dataString: string) => {
    try {
      const data = JSON.parse(dataString);

      if (data.version !== '1.0') {
        throw new Error('Unsupported data version');
      }

      // Validate data structure
      if (
        !Array.isArray(data.searchHistory) ||
        !Array.isArray(data.recentSearches)
      ) {
        throw new Error('Invalid data format');
      }

      // Import data
      setSearchHistory(data.searchHistory || []);
      setRecentSearches(data.recentSearches || []);
      setFavoritePlaces(data.favoritePlaces || []);
      setPreferences({ ...DEFAULT_PREFERENCES, ...(data.preferences || {}) });

      // Save to AsyncStorage
      await Promise.all([
        AsyncStorage.setItem(
          STORAGE_KEYS.SEARCH_HISTORY,
          JSON.stringify(data.searchHistory || []),
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.RECENT_SEARCHES,
          JSON.stringify(data.recentSearches || []),
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.FAVORITE_PLACES,
          JSON.stringify(data.favoritePlaces || []),
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.SEARCH_PREFERENCES,
          JSON.stringify(data.preferences || DEFAULT_PREFERENCES),
        ),
      ]);

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }, []);

  // Clear all data
  const clearAllData = useCallback(async () => {
    try {
      setSearchHistory([]);
      setRecentSearches([]);
      setFavoritePlaces([]);
      setPreferences(DEFAULT_PREFERENCES);

      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY),
        AsyncStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES),
        AsyncStorage.removeItem(STORAGE_KEYS.FAVORITE_PLACES),
        AsyncStorage.removeItem(STORAGE_KEYS.SEARCH_PREFERENCES),
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }, []);

  return {
    // State
    searchHistory,
    recentSearches,
    favoritePlaces,
    preferences,
    isLoading,

    // History actions
    addSearchToHistory,
    clearSearchHistory,
    removeSearchFromHistory,
    getHistoryBasedSuggestions,
    getPopularSearches,

    // Favorites actions
    addToFavorites,
    removeFromFavorites,
    isFavorite,

    // Preferences actions
    updatePreferences,

    // Data management
    exportData,
    importData,
    clearAllData,
  };
};

export default useSearchStorage;
