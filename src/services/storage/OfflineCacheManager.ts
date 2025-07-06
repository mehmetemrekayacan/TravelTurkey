/**
 * TravelTurkey - Offline-First Caching Strategy (2025)
 * Advanced caching strategy with intelligent preloading and sync management
 */

import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { asyncStorageService, StorageResult } from './AsyncStorageService';
import { touristPlaces, categories, cities } from '../../data/touristPlaces';
import { enhancedTouristPlaces } from '../../data/enhanced/sampleDataset2025';

// Cache strategy configuration
export interface CacheStrategyConfig {
  // Preloading strategy
  preloadStrategy: 'essential' | 'user-based' | 'location-based' | 'all';
  preloadPercentage: number; // 0-100

  // Sync strategy
  syncStrategy: 'immediate' | 'background' | 'manual' | 'wifi-only';
  syncInterval: number; // minutes

  // Storage limits
  maxStorageSize: number; // MB
  emergencyCleanupThreshold: number; // percentage (90%)

  // Network optimization
  networkOptimization: boolean;
  lowBandwidthMode: boolean;

  // User preferences
  respectUserPreferences: boolean;
  allowMeteredConnection: boolean;
}

// Cache status interface
export interface CacheStatus {
  isOnline: boolean;
  lastSync: string | null;
  cacheSize: number; // MB
  itemCount: number;
  syncInProgress: boolean;
  pendingOperations: number;
  needsUpdate: boolean;
  healthScore: number; // 0-100
}

// User context for personalized caching
export interface UserContext {
  userId?: string;
  preferences?: {
    favoriteCategories: string[];
    visitedPlaces: string[];
    plannedTrips: string[];
    language: string;
    region: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  deviceInfo?: {
    storageAvailable: number;
    connectionType: 'wifi' | 'cellular' | 'none';
    batteryLevel?: number;
  };
}

// Sync result interface
export interface SyncResult {
  success: boolean;
  itemsSynced: number;
  errors: string[];
  timeElapsed: number; // ms
  nextSyncTime?: string;
}

/**
 * Offline-First Cache Manager with intelligent strategies
 */
export class OfflineCacheManager {
  private config: CacheStrategyConfig;
  private cacheStatus: CacheStatus;
  private syncInProgress = false;
  private syncQueue: Array<() => Promise<void>> = [];
  private observers: Set<(status: CacheStatus) => void> = new Set();

  constructor(config: Partial<CacheStrategyConfig> = {}) {
    this.config = {
      preloadStrategy: 'essential',
      preloadPercentage: 70,
      syncStrategy: 'background',
      syncInterval: 30,
      maxStorageSize: 100,
      emergencyCleanupThreshold: 90,
      networkOptimization: true,
      lowBandwidthMode: false,
      respectUserPreferences: true,
      allowMeteredConnection: false,
      ...config,
    };

    this.cacheStatus = {
      isOnline: true,
      lastSync: null,
      cacheSize: 0,
      itemCount: 0,
      syncInProgress: false,
      pendingOperations: 0,
      needsUpdate: false,
      healthScore: 100,
    };

    this.initializeCache();
  }

  /**
   * Initialize cache on app startup
   */
  async initializeCache(userContext?: UserContext): Promise<void> {
    try {
      console.log('🚀 Initializing offline cache...');

      // Check existing cache
      await this.updateCacheStatus();

      // Load essential data first
      const hasEssentialData = await this.hasEssentialData();

      if (!hasEssentialData) {
        console.log('📦 Loading essential data for first-time use...');
        await this.loadEssentialData();
      }

      // Preload based on strategy
      if (userContext && this.config.preloadStrategy !== 'essential') {
        await this.intelligentPreload(userContext);
      }

      // Start background sync if enabled
      if (this.config.syncStrategy === 'background') {
        this.startBackgroundSync();
      }

      console.log('✅ Cache initialization complete');
    } catch (error) {
      console.error('❌ Cache initialization failed:', error);
    }
  }

  /**
   * Get tourist places with offline-first strategy
   */
  async getTouristPlaces(
    forceRefresh = false,
    _userContext?: UserContext,
  ): Promise<StorageResult<TouristPlace[]>> {
    try {
      // Try cache first unless force refresh
      if (!forceRefresh) {
        const cachedResult = await asyncStorageService.getTouristPlaces();
        if (cachedResult.success && cachedResult.data) {
          console.log('📱 Serving tourist places from cache');
          return cachedResult;
        }
      }

      // Load from local data (fallback)
      console.log('💾 Loading tourist places from local data');
      const result = await asyncStorageService.storeTouristPlaces(
        touristPlaces,
      );

      if (result.success) {
        return { success: true, data: touristPlaces };
      }

      return {
        success: false,
        error: new Error('Failed to load tourist places'),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }

  /**
   * Get enhanced places with intelligent caching
   */
  async getEnhancedPlaces(
    _userContext?: UserContext,
  ): Promise<StorageResult<EnhancedTouristPlace[]>> {
    try {
      // Check cache first
      const cachedResult = await asyncStorageService.getEnhancedPlaces();
      if (cachedResult.success && cachedResult.data) {
        console.log('📱 Serving enhanced places from cache');
        return cachedResult;
      }

      // Load and cache enhanced data
      console.log('🔄 Caching enhanced places data');
      const storeResult = await asyncStorageService.storeEnhancedPlaces(
        enhancedTouristPlaces,
      );

      if (storeResult.success) {
        return { success: true, data: enhancedTouristPlaces };
      }

      return {
        success: false,
        error: new Error('Failed to load enhanced places'),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }

  /**
   * Sync data with remote source (mock implementation)
   */
  async syncWithRemote(_userContext?: UserContext): Promise<SyncResult> {
    if (this.syncInProgress) {
      return {
        success: false,
        itemsSynced: 0,
        errors: ['Sync already in progress'],
        timeElapsed: 0,
      };
    }

    this.syncInProgress = true;
    this.cacheStatus.syncInProgress = true;
    this.notifyObservers();

    const startTime = Date.now();
    let itemsSynced = 0;
    const errors: string[] = [];

    try {
      console.log('🔄 Starting sync with remote...');

      // Simulate network delay
      await this.delay(1000);

      // Mock: Check for updates (in real app, this would be API calls)
      const mockUpdates = await this.checkForUpdates();

      if (mockUpdates.placesNeedUpdate) {
        console.log('📱 Syncing tourist places...');
        const result = await asyncStorageService.storeTouristPlaces(
          touristPlaces,
          { version: new Date().toISOString() },
        );
        if (result.success) itemsSynced += touristPlaces.length;
        else errors.push('Failed to sync tourist places');
      }

      if (mockUpdates.categoriesNeedUpdate) {
        console.log('🏷️ Syncing categories...');
        const result = await asyncStorageService.storeCategories(categories);
        if (result.success) itemsSynced += categories.length;
        else errors.push('Failed to sync categories');
      }

      if (mockUpdates.citiesNeedUpdate) {
        console.log('🏙️ Syncing cities...');
        const result = await asyncStorageService.storeCities(cities);
        if (result.success) itemsSynced += cities.length;
        else errors.push('Failed to sync cities');
      }

      // Update sync timestamp
      this.cacheStatus.lastSync = new Date().toISOString();

      console.log(`✅ Sync completed: ${itemsSynced} items synced`);

      return {
        success: errors.length === 0,
        itemsSynced,
        errors,
        timeElapsed: Date.now() - startTime,
        nextSyncTime: new Date(
          Date.now() + this.config.syncInterval * 60000,
        ).toISOString(),
      };
    } catch (error) {
      errors.push(
        error instanceof Error ? error.message : 'Unknown sync error',
      );
      return {
        success: false,
        itemsSynced,
        errors,
        timeElapsed: Date.now() - startTime,
      };
    } finally {
      this.syncInProgress = false;
      this.cacheStatus.syncInProgress = false;
      await this.updateCacheStatus();
      this.notifyObservers();
    }
  }

  /**
   * Intelligent preloading based on user context
   */
  async intelligentPreload(userContext: UserContext): Promise<void> {
    try {
      console.log(
        `🤖 Starting intelligent preload (${this.config.preloadStrategy})`,
      );

      switch (this.config.preloadStrategy) {
        case 'user-based':
          await this.preloadUserBasedData(userContext);
          break;
        case 'location-based':
          await this.preloadLocationBasedData(userContext);
          break;
        case 'all':
          await this.preloadAllData();
          break;
        default:
          // Essential data already loaded
          break;
      }

      console.log('✅ Intelligent preload completed');
    } catch (error) {
      console.error('❌ Intelligent preload failed:', error);
    }
  }

  /**
   * Clean up cache when storage is low
   */
  async cleanupCache(
    aggressive = false,
  ): Promise<{ cleaned: number; sizeFreed: number }> {
    console.log('🧹 Starting cache cleanup...');

    const stats = await asyncStorageService.getCacheStats();
    const sizeMB = stats.totalSize / (1024 * 1024);

    if (!aggressive && sizeMB < this.config.maxStorageSize * 0.8) {
      return { cleaned: 0, sizeFreed: 0 };
    }

    // Sort by last accessed time and remove oldest items
    const sortedMetadata = stats.metadata.sort(
      (a, b) =>
        new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime(),
    );

    let cleaned = 0;
    let sizeFreed = 0;

    // Remove non-essential items first
    for (const meta of sortedMetadata) {
      if (this.isEssentialCacheKey(meta.key)) continue;

      // Remove old cache items
      const ageHours =
        (Date.now() - new Date(meta.lastAccessed).getTime()) / (1000 * 60 * 60);
      if (ageHours > 24 || aggressive) {
        try {
          await asyncStorageService.clearAllCache(); // This would be more selective in real implementation
          cleaned++;
          sizeFreed += meta.size;
        } catch (error) {
          console.error(`Failed to remove cache item ${meta.key}:`, error);
        }
      }
    }

    console.log(
      `🧹 Cache cleanup completed: ${cleaned} items removed, ${(
        sizeFreed /
        1024 /
        1024
      ).toFixed(2)}MB freed`,
    );

    await this.updateCacheStatus();
    return { cleaned, sizeFreed };
  }

  /**
   * Get current cache status
   */
  getCacheStatus(): CacheStatus {
    return { ...this.cacheStatus };
  }

  /**
   * Subscribe to cache status updates
   */
  subscribeToCacheUpdates(callback: (status: CacheStatus) => void): () => void {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  /**
   * Force a cache refresh
   */
  async refreshCache(userContext?: UserContext): Promise<SyncResult> {
    console.log('🔄 Force refreshing cache...');
    return await this.syncWithRemote(userContext);
  }

  /**
   * Private helper methods
   */
  private async loadEssentialData(): Promise<void> {
    // Load essential tourist places (top 20)
    const essentialPlaces = touristPlaces
      .filter(place => place.isFeatured || place.popularityScore > 85)
      .slice(0, 20);

    await asyncStorageService.storeTouristPlaces(essentialPlaces, {
      version: '1.0.0',
    });

    // Load all categories (small dataset)
    await asyncStorageService.storeCategories(categories);

    // Load major cities
    const majorCities = cities.filter(city => city.isPopular);
    await asyncStorageService.storeCities(majorCities);
  }

  private async preloadUserBasedData(userContext: UserContext): Promise<void> {
    if (!userContext.preferences) return;

    // Filter places by user's favorite categories
    const userPlaces = touristPlaces.filter(place =>
      userContext.preferences!.favoriteCategories.includes(place.category),
    );

    const preloadCount = Math.floor(
      userPlaces.length * (this.config.preloadPercentage / 100),
    );
    const placesToPreload = userPlaces.slice(0, preloadCount);

    await asyncStorageService.storeTouristPlaces(placesToPreload);
  }

  private async preloadLocationBasedData(
    userContext: UserContext,
  ): Promise<void> {
    if (!userContext.location) return;

    // Calculate distance and preload nearby places
    const nearbyPlaces = touristPlaces.filter(place => {
      const distance = this.calculateDistance(
        userContext.location!,
        place.coordinates,
      );
      return distance < 100; // 100km radius
    });

    await asyncStorageService.storeTouristPlaces(nearbyPlaces);
  }

  private async preloadAllData(): Promise<void> {
    await asyncStorageService.storeTouristPlaces(touristPlaces);
    await asyncStorageService.storeCategories(categories);
    await asyncStorageService.storeCities(cities);
    await asyncStorageService.storeEnhancedPlaces(enhancedTouristPlaces);
  }

  private async hasEssentialData(): Promise<boolean> {
    const placesResult = await asyncStorageService.getTouristPlaces();
    const categoriesResult = await asyncStorageService.getCategories();

    return (
      placesResult.success &&
      categoriesResult.success &&
      placesResult.data!.length > 0 &&
      categoriesResult.data!.length > 0
    );
  }

  private async updateCacheStatus(): Promise<void> {
    const stats = await asyncStorageService.getCacheStats();

    this.cacheStatus = {
      ...this.cacheStatus,
      cacheSize: stats.totalSize / (1024 * 1024), // Convert to MB
      itemCount: stats.itemCount,
      healthScore: this.calculateHealthScore(stats),
    };
  }

  private calculateHealthScore(stats: any): number {
    // Simple health calculation based on hit rate and cache age
    const hitRate = stats.hitRate * 100;
    const sizeRatio =
      stats.totalSize / (1024 * 1024) / this.config.maxStorageSize;

    let score = hitRate;
    if (sizeRatio > 0.9) score -= 20; // Penalty for high storage usage
    if (sizeRatio > 0.95) score -= 30; // Higher penalty for very high usage

    return Math.max(0, Math.min(100, score));
  }

  private startBackgroundSync(): void {
    setInterval(async () => {
      if (!this.syncInProgress && this.cacheStatus.isOnline) {
        await this.syncWithRemote();
      }
    }, this.config.syncInterval * 60 * 1000);
  }

  private async checkForUpdates(): Promise<{
    placesNeedUpdate: boolean;
    categoriesNeedUpdate: boolean;
    citiesNeedUpdate: boolean;
  }> {
    // Mock implementation - in real app, this would check API versions/timestamps
    const lastSync = this.cacheStatus.lastSync;
    const hoursSinceSync = lastSync
      ? (Date.now() - new Date(lastSync).getTime()) / (1000 * 60 * 60)
      : 24;

    return {
      placesNeedUpdate: hoursSinceSync > 6, // Update places every 6 hours
      categoriesNeedUpdate: hoursSinceSync > 24, // Update categories daily
      citiesNeedUpdate: hoursSinceSync > 48, // Update cities every 2 days
    };
  }

  private isEssentialCacheKey(key: string): boolean {
    // Essential keys that should not be removed during cleanup
    return [
      '@travel_turkey:tourist_places',
      '@travel_turkey:categories',
    ].includes(key);
  }

  private calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number },
  ): number {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(point2.latitude - point1.latitude);
    const dLon = this.deg2rad(point2.longitude - point1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(point1.latitude)) *
        Math.cos(this.deg2rad(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private notifyObservers(): void {
    this.observers.forEach(callback => callback(this.cacheStatus));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const offlineCacheManager = new OfflineCacheManager();
export default offlineCacheManager;
