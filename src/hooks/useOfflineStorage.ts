/**
 * TravelTurkey - Offline Storage Hook (2025)
 * React hook for managing offline data with AsyncStorage
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { TouristPlace } from '../types/touristPlaces';
import { EnhancedTouristPlace } from '../types/enhanced/touristPlace2025';
import {
  offlineCacheManager,
  CacheStatus,
  UserContext,
} from '../services/storage/OfflineCacheManager';
import {
  dataSyncService,
  SyncStatus,
  SyncResult,
} from '../services/storage/DataSyncService';
import { StorageResult } from '../services/storage/AsyncStorageService';

// Hook configuration interface
export interface UseOfflineStorageConfig {
  enableAutoSync: boolean;
  enableRealTimeUpdates: boolean;
  syncInterval: number; // minutes
  preloadStrategy: 'essential' | 'user-based' | 'location-based' | 'all';
  enableMetrics: boolean;
  enableBackground: boolean;
}

// Hook return interface
export interface UseOfflineStorageReturn {
  // Data state
  touristPlaces: TouristPlace[];
  enhancedPlaces: EnhancedTouristPlace[];
  isLoading: boolean;
  isInitialized: boolean;
  error: Error | null;

  // Cache status
  cacheStatus: CacheStatus;
  syncStatus: SyncStatus;

  // Data operations
  getTouristPlaces: (
    forceRefresh?: boolean,
  ) => Promise<StorageResult<TouristPlace[]>>;
  getEnhancedPlaces: () => Promise<StorageResult<EnhancedTouristPlace[]>>;
  refreshData: () => Promise<SyncResult>;
  clearCache: () => Promise<void>;

  // Sync operations
  syncWithRemote: () => Promise<SyncResult>;
  forceSyncPlaces: () => Promise<SyncResult>;

  // Cache management
  getCacheStats: () => Promise<any>;
  cleanupCache: (aggressive?: boolean) => Promise<any>;

  // Status
  isOnline: boolean;
  syncInProgress: boolean;
  needsUpdate: boolean;
}

/**
 * Custom hook for offline storage management
 */
export function useOfflineStorage(
  userContext?: UserContext,
  config: Partial<UseOfflineStorageConfig> = {},
): UseOfflineStorageReturn {
  // Configuration
  const finalConfig: UseOfflineStorageConfig = {
    enableAutoSync: true,
    enableRealTimeUpdates: true,
    syncInterval: 30,
    preloadStrategy: 'essential',
    enableMetrics: true,
    enableBackground: true,
    ...config,
  };

  // State management
  const [touristPlaces, setTouristPlaces] = useState<TouristPlace[]>([]);
  const [enhancedPlaces, setEnhancedPlaces] = useState<EnhancedTouristPlace[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>({
    isOnline: true,
    lastSync: null,
    cacheSize: 0,
    itemCount: 0,
    syncInProgress: false,
    pendingOperations: 0,
    needsUpdate: false,
    healthScore: 100,
  });
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    syncInProgress: false,
    lastSync: null,
    queueSize: 0,
    conflicts: 0,
  });

  // Refs for cleanup
  const cacheUnsubscribeRef = useRef<(() => void) | null>(null);
  const syncUnsubscribeRef = useRef<(() => void) | null>(null);
  const syncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Initialize offline storage
   */
  const initializeStorage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🚀 Initializing offline storage...');

      // Initialize cache manager
      await offlineCacheManager.initializeCache(userContext);

      // Subscribe to cache status updates
      cacheUnsubscribeRef.current = offlineCacheManager.subscribeToCacheUpdates(
        (status: CacheStatus) => {
          setCacheStatus(status);
        },
      );

      // Subscribe to sync status updates
      syncUnsubscribeRef.current = dataSyncService.subscribeToSyncUpdates(
        (status: SyncStatus) => {
          setSyncStatus(status);
        },
      );

      setIsInitialized(true);
      console.log('✅ Offline storage initialized successfully');
    } catch (err) {
      const initError =
        err instanceof Error ? err : new Error('Initialization failed');
      setError(initError);
      console.error('❌ Failed to initialize offline storage:', initError);
    } finally {
      setIsLoading(false);
    }
  }, [userContext]);

  /**
   * Load initial data from cache
   */
  const loadInitialData = useCallback(async () => {
    try {
      // Load tourist places
      const placesResult = await offlineCacheManager.getTouristPlaces(
        false,
        userContext,
      );
      if (placesResult.success && placesResult.data) {
        setTouristPlaces(placesResult.data);
      }

      // Load enhanced places
      const enhancedResult = await offlineCacheManager.getEnhancedPlaces(
        userContext,
      );
      if (enhancedResult.success && enhancedResult.data) {
        setEnhancedPlaces(enhancedResult.data);
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  }, [userContext]);

  /**
   * Get tourist places with caching
   */
  const getTouristPlaces = useCallback(
    async (forceRefresh = false): Promise<StorageResult<TouristPlace[]>> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await offlineCacheManager.getTouristPlaces(
          forceRefresh,
          userContext,
        );

        if (result.success && result.data) {
          setTouristPlaces(result.data);
        }

        return result;
      } catch (err) {
        const placesError =
          err instanceof Error
            ? err
            : new Error('Failed to get tourist places');
        setError(placesError);
        return { success: false, error: placesError };
      } finally {
        setIsLoading(false);
      }
    },
    [userContext],
  );

  /**
   * Get enhanced places
   */
  const getEnhancedPlaces = useCallback(async (): Promise<
    StorageResult<EnhancedTouristPlace[]>
  > => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await offlineCacheManager.getEnhancedPlaces(userContext);

      if (result.success && result.data) {
        setEnhancedPlaces(result.data);
      }

      return result;
    } catch (err) {
      const enhancedError =
        err instanceof Error ? err : new Error('Failed to get enhanced places');
      setError(enhancedError);
      return { success: false, error: enhancedError };
    } finally {
      setIsLoading(false);
    }
  }, [userContext]);

  /**
   * Refresh all data
   */
  const refreshData = useCallback(async (): Promise<SyncResult> => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Refreshing all data...');

      // Sync with remote
      const syncResult = await dataSyncService.syncAll(userContext);

      // Reload local data
      await loadInitialData();

      return syncResult;
    } catch (err) {
      const refreshError =
        err instanceof Error ? err : new Error('Failed to refresh data');
      setError(refreshError);
      return {
        success: false,
        message: refreshError.message,
        synced: 0,
        failed: 1,
        conflicts: 0,
      };
    } finally {
      setIsLoading(false);
    }
  }, [userContext, loadInitialData]);

  /**
   * Sync with remote server
   */
  const syncWithRemote = useCallback(async (): Promise<SyncResult> => {
    try {
      const result = await dataSyncService.syncAll(userContext);

      // Reload data after sync
      if (result.success) {
        await loadInitialData();
      }

      return result;
    } catch (err) {
      const syncError = err instanceof Error ? err : new Error('Sync failed');
      return {
        success: false,
        message: syncError.message,
        synced: 0,
        failed: 1,
        conflicts: 0,
      };
    }
  }, [userContext, loadInitialData]);

  /**
   * Force sync tourist places only
   */
  const forceSyncPlaces = useCallback(async (): Promise<SyncResult> => {
    try {
      const result = await dataSyncService.forceSyncTouristPlaces();

      if (result.success) {
        // Reload tourist places
        const placesResult = await getTouristPlaces(true);
        if (!placesResult.success) {
          console.warn('Failed to reload places after sync');
        }
      }

      return result;
    } catch (err) {
      const forceSyncError =
        err instanceof Error ? err : new Error('Force sync failed');
      return {
        success: false,
        message: forceSyncError.message,
        synced: 0,
        failed: 1,
        conflicts: 0,
      };
    }
  }, [getTouristPlaces]);

  /**
   * Clear all cache
   */
  const clearCache = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await offlineCacheManager.cleanupCache(true);

      // Reset state
      setTouristPlaces([]);
      setEnhancedPlaces([]);

      console.log('🗑️ Cache cleared successfully');
    } catch (err) {
      const clearError =
        err instanceof Error ? err : new Error('Failed to clear cache');
      setError(clearError);
      console.error('❌ Failed to clear cache:', clearError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get cache statistics
   */
  const getCacheStats = useCallback(async () => {
    try {
      return await offlineCacheManager.cleanupCache(false);
    } catch (err) {
      console.error('Failed to get cache stats:', err);
      return null;
    }
  }, []);

  /**
   * Cleanup cache with options
   */
  const cleanupCache = useCallback(async (aggressive = false) => {
    try {
      return await offlineCacheManager.cleanupCache(aggressive);
    } catch (err) {
      console.error('Failed to cleanup cache:', err);
      return null;
    }
  }, []);

  /**
   * Setup automatic sync interval
   */
  const setupAutoSync = useCallback(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
    }

    syncIntervalRef.current = setInterval(async () => {
      if (!syncStatus.syncInProgress && syncStatus.isOnline) {
        console.log('⏰ Auto-sync triggered');
        await syncWithRemote();
      }
    }, finalConfig.syncInterval * 60 * 1000);
  }, [finalConfig.syncInterval, syncStatus, syncWithRemote]);

  /**
   * Initialize on mount and handle setup
   */
  useEffect(() => {
    const initialize = async () => {
      await initializeStorage();

      // Load initial data after initialization
      await loadInitialData();

      // Setup auto-sync if enabled
      if (finalConfig.enableAutoSync && isInitialized) {
        setupAutoSync();
      }
    };

    initialize();

    // Cleanup function
    return () => {
      if (cacheUnsubscribeRef.current) {
        cacheUnsubscribeRef.current();
      }
      if (syncUnsubscribeRef.current) {
        syncUnsubscribeRef.current();
      }
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [
    initializeStorage,
    loadInitialData,
    setupAutoSync,
    finalConfig.enableAutoSync,
    isInitialized,
  ]);

  /**
   * Update sync interval when config changes
   */
  useEffect(() => {
    if (finalConfig.enableAutoSync && isInitialized) {
      setupAutoSync();
    }
  }, [
    finalConfig.enableAutoSync,
    finalConfig.syncInterval,
    isInitialized,
    setupAutoSync,
  ]);

  // Return hook interface
  return {
    // Data state
    touristPlaces,
    enhancedPlaces,
    isLoading,
    isInitialized,
    error,

    // Status
    cacheStatus,
    syncStatus,

    // Data operations
    getTouristPlaces,
    getEnhancedPlaces,
    refreshData,
    clearCache,

    // Sync operations
    syncWithRemote,
    forceSyncPlaces,

    // Cache management
    getCacheStats,
    cleanupCache,

    // Computed status
    isOnline: syncStatus.isOnline,
    syncInProgress: syncStatus.syncInProgress,
    needsUpdate: cacheStatus.needsUpdate,
  };
}

export default useOfflineStorage;
