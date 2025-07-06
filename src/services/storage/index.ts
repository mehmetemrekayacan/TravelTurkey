/**
 * TravelTurkey - Storage Services Index (2025)
 * Centralized exports for AsyncStorage integration
 */

// Core storage services
export {
  AsyncStorageService,
  asyncStorageService,
  STORAGE_KEYS,
  type StorageConfig,
  type CacheMetadata,
  type StorageResult,
  type BatchOperation,
} from './AsyncStorageService';

export {
  OfflineCacheManager,
  offlineCacheManager,
  type CacheStrategyConfig,
  type CacheStatus,
  type UserContext,
  type SyncResult as CacheSyncResult,
} from './OfflineCacheManager';

export {
  DataSyncService,
  dataSyncService,
  type SyncOperation,
  type SyncQueueItem,
  type ConflictResolution,
  type SyncConfig,
  type SyncStatus,
  type SyncResult,
} from './DataSyncService';

/**
 * Quick setup function for production use
 */
export const setupOfflineStorage = async (
  userContext?: import('./OfflineCacheManager').UserContext,
) => {
  const { offlineCacheManager } = await import('./OfflineCacheManager');
  const { dataSyncService } = await import('./DataSyncService');

  try {
    console.log('🚀 Setting up TravelTurkey offline storage...');

    // Initialize cache manager with production settings
    await offlineCacheManager.initializeCache(userContext);

    // Start background sync
    await dataSyncService.syncAll(userContext);

    console.log('✅ Offline storage setup complete');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to setup offline storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Get storage health status
 */
export const getStorageHealth = async () => {
  const { asyncStorageService } = await import('./AsyncStorageService');
  const { offlineCacheManager } = await import('./OfflineCacheManager');
  const { dataSyncService } = await import('./DataSyncService');

  try {
    const cacheStats = await asyncStorageService.getCacheStats();
    const cacheStatus = offlineCacheManager.getCacheStatus();
    const syncStatus = await dataSyncService.getSyncStatus();

    return {
      overall: 'healthy',
      cache: {
        size: cacheStats.totalSize,
        hitRate: cacheStats.hitRate,
        healthScore: cacheStatus.healthScore,
      },
      sync: {
        isOnline: syncStatus.isOnline,
        queueSize: syncStatus.queueSize,
        conflicts: syncStatus.conflicts,
      },
      recommendations: [
        cacheStats.hitRate < 0.8 ? 'Consider adjusting cache strategy' : null,
        cacheStatus.healthScore < 70 ? 'Cache cleanup recommended' : null,
        syncStatus.conflicts > 0 ? 'Resolve sync conflicts' : null,
      ].filter(Boolean),
    };
  } catch (error) {
    return {
      overall: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Production-ready caching strategies
 */
export const PRODUCTION_CONFIGS = {
  // Essential only - for limited storage devices
  essential: {
    preloadStrategy: 'essential' as const,
    preloadPercentage: 30,
    syncStrategy: 'wifi-only' as const,
    maxStorageSize: 25, // 25MB
    emergencyCleanupThreshold: 85,
  },

  // Balanced - good for most users
  balanced: {
    preloadStrategy: 'user-based' as const,
    preloadPercentage: 60,
    syncStrategy: 'background' as const,
    maxStorageSize: 75, // 75MB
    emergencyCleanupThreshold: 90,
  },

  // Aggressive - for power users with good connection
  aggressive: {
    preloadStrategy: 'all' as const,
    preloadPercentage: 90,
    syncStrategy: 'immediate' as const,
    maxStorageSize: 150, // 150MB
    emergencyCleanupThreshold: 95,
  },
} as const;

/**
 * Default configuration for 2025 React Native CLI standards
 */
export const DEFAULT_2025_CONFIG = {
  storage: {
    maxCacheSize: 100, // MB
    cacheTtl: 24 * 60 * 60, // 24 hours
    enableCompression: true,
    enableEncryption: false,
    batchSize: 100,
    retryAttempts: 3,
    enableMetrics: true,
  },
  sync: {
    autoSync: true,
    conflictResolution: 'smart' as const,
    batchSize: 50,
    retryLimit: 3,
    networkTimeout: 30000,
    enableCompression: true,
    enableDeltaSync: true,
  },
  cache: {
    preloadStrategy: 'user-based' as const,
    preloadPercentage: 70,
    syncStrategy: 'background' as const,
    syncInterval: 30,
    maxStorageSize: 100,
    emergencyCleanupThreshold: 90,
    networkOptimization: true,
    lowBandwidthMode: false,
    respectUserPreferences: true,
    allowMeteredConnection: false,
  },
} as const;
