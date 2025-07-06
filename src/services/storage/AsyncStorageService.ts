/**
 * TravelTurkey - AsyncStorage Service (2025)
 * Comprehensive offline storage service with error handling and data validation
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouristPlace, Category, City } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';

// Storage keys configuration
export const STORAGE_KEYS = {
  // Main data keys
  TOURIST_PLACES: '@travel_turkey:tourist_places',
  ENHANCED_PLACES: '@travel_turkey:enhanced_places',
  CATEGORIES: '@travel_turkey:categories',
  CITIES: '@travel_turkey:cities',

  // Cache and metadata keys
  CACHE_METADATA: '@travel_turkey:cache_metadata',
  USER_PREFERENCES: '@travel_turkey:user_preferences',
  SEARCH_HISTORY: '@travel_turkey:search_history',
  FAVORITES: '@travel_turkey:favorites',
  VISITED_PLACES: '@travel_turkey:visited_places',

  // Sync and offline keys
  LAST_SYNC: '@travel_turkey:last_sync',
  OFFLINE_QUEUE: '@travel_turkey:offline_queue',
  SYNC_STATUS: '@travel_turkey:sync_status',
  DATA_VERSION: '@travel_turkey:data_version',
} as const;

// Storage configuration
export interface StorageConfig {
  maxCacheSize: number; // MB
  cacheTtl: number; // seconds
  enableCompression: boolean;
  enableEncryption: boolean;
  batchSize: number;
  retryAttempts: number;
  enableMetrics: boolean;
}

// Default storage configuration
const DEFAULT_CONFIG: StorageConfig = {
  maxCacheSize: 50, // 50MB
  cacheTtl: 24 * 60 * 60, // 24 hours
  enableCompression: true,
  enableEncryption: false,
  batchSize: 100,
  retryAttempts: 3,
  enableMetrics: true,
};

// Cache metadata interface
export interface CacheMetadata {
  key: string;
  size: number; // bytes
  lastAccessed: string;
  lastModified: string;
  ttl: number;
  version: string;
  checksum?: string;
}

// Storage result interface
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  fromCache?: boolean;
  metadata?: CacheMetadata;
}

// Batch operation interface
export interface BatchOperation {
  type: 'set' | 'get' | 'remove';
  key: string;
  value?: any;
}

/**
 * Enhanced AsyncStorage Service with 2025 best practices
 */
export class AsyncStorageService {
  private config: StorageConfig;
  private cacheMetadata: Map<string, CacheMetadata> = new Map();
  private operationQueue: Promise<any> = Promise.resolve();
  private metrics: {
    hits: number;
    misses: number;
    errors: number;
    operations: number;
  } = { hits: 0, misses: 0, errors: 0, operations: 0 };

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeService();
  }

  /**
   * Initialize the storage service
   */
  private async initializeService(): Promise<void> {
    try {
      await this.loadCacheMetadata();
      await this.cleanupExpiredCache();

      if (this.config.enableMetrics) {
        this.startMetricsTracking();
      }
    } catch (error) {
      console.error('Failed to initialize AsyncStorageService:', error);
    }
  }

  /**
   * Store tourist places data with validation and compression
   */
  async storeTouristPlaces(
    places: TouristPlace[],
    options: {
      version?: string;
      compress?: boolean;
      validate?: boolean;
    } = {},
  ): Promise<StorageResult<boolean>> {
    return this.executeWithRetry(async () => {
      // Validate data if enabled
      if (options.validate !== false) {
        const validationResult = this.validateTouristPlaces(places);
        if (!validationResult.isValid) {
          throw new Error(
            `Data validation failed: ${validationResult.errors.join(', ')}`,
          );
        }
      }

      // Prepare data for storage
      let dataToStore = places;

      // Apply compression if enabled
      if (options.compress ?? this.config.enableCompression) {
        dataToStore = this.compressData(places);
      }

      // Store with metadata
      const metadata: CacheMetadata = {
        key: STORAGE_KEYS.TOURIST_PLACES,
        size: JSON.stringify(dataToStore).length,
        lastAccessed: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        ttl: this.config.cacheTtl,
        version: options.version || '1.0.0',
        checksum: this.generateChecksum(dataToStore),
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.TOURIST_PLACES,
        JSON.stringify({
          data: dataToStore,
          metadata,
        }),
      );

      // Update cache metadata
      this.cacheMetadata.set(STORAGE_KEYS.TOURIST_PLACES, metadata);
      await this.saveCacheMetadata();

      this.metrics.operations++;
      return { success: true, data: true };
    });
  }

  /**
   * Retrieve tourist places data with cache validation
   */
  async getTouristPlaces(
    options: {
      allowExpired?: boolean;
      decompress?: boolean;
    } = {},
  ): Promise<StorageResult<TouristPlace[]>> {
    return this.executeWithRetry(async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.TOURIST_PLACES);

      if (!stored) {
        this.metrics.misses++;
        return {
          success: false,
          error: new Error('No tourist places data found'),
        };
      }

      const { data, metadata } = JSON.parse(stored);

      // Check expiration
      if (!options.allowExpired && this.isCacheExpired(metadata)) {
        this.metrics.misses++;
        return { success: false, error: new Error('Cache expired') };
      }

      // Validate checksum
      if (
        metadata.checksum &&
        this.generateChecksum(data) !== metadata.checksum
      ) {
        return {
          success: false,
          error: new Error('Data integrity check failed'),
        };
      }

      // Decompress if needed
      let resultData = data;
      if (options.decompress ?? this.config.enableCompression) {
        resultData = this.decompressData(data);
      }

      // Update access time
      metadata.lastAccessed = new Date().toISOString();
      this.cacheMetadata.set(STORAGE_KEYS.TOURIST_PLACES, metadata);

      this.metrics.hits++;
      return {
        success: true,
        data: resultData,
        fromCache: true,
        metadata,
      };
    });
  }

  /**
   * Store enhanced tourist places data
   */
  async storeEnhancedPlaces(
    places: EnhancedTouristPlace[],
    options: { version?: string } = {},
  ): Promise<StorageResult<boolean>> {
    return this.executeWithRetry(async () => {
      const compressedData = this.config.enableCompression
        ? this.compressData(places)
        : places;

      const metadata: CacheMetadata = {
        key: STORAGE_KEYS.ENHANCED_PLACES,
        size: JSON.stringify(compressedData).length,
        lastAccessed: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        ttl: this.config.cacheTtl,
        version: options.version || '2025.1.0',
        checksum: this.generateChecksum(compressedData),
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.ENHANCED_PLACES,
        JSON.stringify({ data: compressedData, metadata }),
      );

      this.cacheMetadata.set(STORAGE_KEYS.ENHANCED_PLACES, metadata);
      await this.saveCacheMetadata();

      this.metrics.operations++;
      return { success: true, data: true };
    });
  }

  /**
   * Retrieve enhanced tourist places data
   */
  async getEnhancedPlaces(): Promise<StorageResult<EnhancedTouristPlace[]>> {
    return this.executeWithRetry(async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.ENHANCED_PLACES);

      if (!stored) {
        this.metrics.misses++;
        return {
          success: false,
          error: new Error('No enhanced places data found'),
        };
      }

      const { data, metadata } = JSON.parse(stored);

      if (this.isCacheExpired(metadata)) {
        this.metrics.misses++;
        return {
          success: false,
          error: new Error('Enhanced places cache expired'),
        };
      }

      const resultData = this.config.enableCompression
        ? this.decompressData(data)
        : data;

      metadata.lastAccessed = new Date().toISOString();
      this.cacheMetadata.set(STORAGE_KEYS.ENHANCED_PLACES, metadata);

      this.metrics.hits++;
      return { success: true, data: resultData, fromCache: true, metadata };
    });
  }

  /**
   * Store categories data
   */
  async storeCategories(
    categories: Category[],
  ): Promise<StorageResult<boolean>> {
    return this.executeWithRetry(async () => {
      const metadata: CacheMetadata = {
        key: STORAGE_KEYS.CATEGORIES,
        size: JSON.stringify(categories).length,
        lastAccessed: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        ttl: this.config.cacheTtl * 2, // Categories change less frequently
        version: '1.0.0',
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.CATEGORIES,
        JSON.stringify({ data: categories, metadata }),
      );

      this.cacheMetadata.set(STORAGE_KEYS.CATEGORIES, metadata);
      await this.saveCacheMetadata();

      return { success: true, data: true };
    });
  }

  /**
   * Retrieve categories data
   */
  async getCategories(): Promise<StorageResult<Category[]>> {
    return this.executeWithRetry(async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);

      if (!stored) {
        return { success: false, error: new Error('No categories data found') };
      }

      const { data, metadata } = JSON.parse(stored);

      if (this.isCacheExpired(metadata)) {
        return { success: false, error: new Error('Categories cache expired') };
      }

      metadata.lastAccessed = new Date().toISOString();
      this.cacheMetadata.set(STORAGE_KEYS.CATEGORIES, metadata);

      return { success: true, data, fromCache: true, metadata };
    });
  }

  /**
   * Store cities data
   */
  async storeCities(cities: City[]): Promise<StorageResult<boolean>> {
    return this.executeWithRetry(async () => {
      const metadata: CacheMetadata = {
        key: STORAGE_KEYS.CITIES,
        size: JSON.stringify(cities).length,
        lastAccessed: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        ttl: this.config.cacheTtl * 3, // Cities change very rarely
        version: '1.0.0',
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.CITIES,
        JSON.stringify({ data: cities, metadata }),
      );

      this.cacheMetadata.set(STORAGE_KEYS.CITIES, metadata);
      await this.saveCacheMetadata();

      return { success: true, data: true };
    });
  }

  /**
   * Retrieve cities data
   */
  async getCities(): Promise<StorageResult<City[]>> {
    return this.executeWithRetry(async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.CITIES);

      if (!stored) {
        return { success: false, error: new Error('No cities data found') };
      }

      const { data, metadata } = JSON.parse(stored);

      if (this.isCacheExpired(metadata)) {
        return { success: false, error: new Error('Cities cache expired') };
      }

      metadata.lastAccessed = new Date().toISOString();
      this.cacheMetadata.set(STORAGE_KEYS.CITIES, metadata);

      return { success: true, data, fromCache: true, metadata };
    });
  }

  /**
   * Batch operations for performance optimization
   */
  async batchOperations(
    operations: BatchOperation[],
  ): Promise<StorageResult<any[]>> {
    return this.executeWithRetry(async () => {
      const results: any[] = [];
      const chunks = this.chunkArray(operations, this.config.batchSize);

      for (const chunk of chunks) {
        const chunkPromises = chunk.map(async operation => {
          try {
            switch (operation.type) {
              case 'get':
                return await AsyncStorage.getItem(operation.key);
              case 'set':
                await AsyncStorage.setItem(
                  operation.key,
                  JSON.stringify(operation.value),
                );
                return true;
              case 'remove':
                await AsyncStorage.removeItem(operation.key);
                return true;
              default:
                throw new Error(
                  `Unsupported operation type: ${operation.type}`,
                );
            }
          } catch (error) {
            console.error(
              `Batch operation failed for key ${operation.key}:`,
              error,
            );
            return null;
          }
        });

        const chunkResults = await Promise.all(chunkPromises);
        results.push(...chunkResults);
      }

      return { success: true, data: results };
    });
  }

  /**
   * Clear all cached data
   */
  async clearAllCache(): Promise<StorageResult<boolean>> {
    return this.executeWithRetry(async () => {
      const keys = Object.values(STORAGE_KEYS);

      for (const key of keys) {
        await AsyncStorage.removeItem(key);
      }

      this.cacheMetadata.clear();
      this.metrics = { hits: 0, misses: 0, errors: 0, operations: 0 };

      return { success: true, data: true };
    });
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{
    totalSize: number;
    itemCount: number;
    hitRate: number;
    metrics: {
      hits: number;
      misses: number;
      errors: number;
      operations: number;
    };
    metadata: CacheMetadata[];
  }> {
    const metadata = Array.from(this.cacheMetadata.values());
    const totalSize = metadata.reduce((sum, meta) => sum + meta.size, 0);
    const hitRate =
      this.metrics.hits / (this.metrics.hits + this.metrics.misses) || 0;

    return {
      totalSize,
      itemCount: metadata.length,
      hitRate,
      metrics: { ...this.metrics },
      metadata,
    };
  }

  /**
   * Private helper methods
   */
  private async executeWithRetry<T>(
    operation: () => Promise<StorageResult<T>>,
  ): Promise<StorageResult<T>> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === this.config.retryAttempts) {
          this.metrics.errors++;
          break;
        }

        // Exponential backoff
        await this.delay(Math.pow(2, attempt - 1) * 100);
      }
    }

    return {
      success: false,
      error: lastError || new Error('Operation failed after retries'),
    };
  }

  private validateTouristPlaces(places: TouristPlace[]): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!Array.isArray(places)) {
      errors.push('Places must be an array');
      return { isValid: false, errors };
    }

    for (let i = 0; i < places.length; i++) {
      const place = places[i];

      if (!place.id) errors.push(`Place at index ${i} missing ID`);
      if (!place.name) errors.push(`Place at index ${i} missing name`);
      if (!place.coordinates)
        errors.push(`Place at index ${i} missing coordinates`);
      if (!place.category) errors.push(`Place at index ${i} missing category`);
    }

    return { isValid: errors.length === 0, errors };
  }

  private compressData(data: any): any {
    // Simple compression simulation - in a real app, use a compression library
    return JSON.parse(JSON.stringify(data));
  }

  private decompressData(data: any): any {
    // Simple decompression simulation
    return data;
  }

  private generateChecksum(data: any): string {
    // Simple checksum - in production, use a proper hash function
    const dataString = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = (hash * 31 + char) % 1000000007; // Simple polynomial hash
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }

  private isCacheExpired(metadata: CacheMetadata): boolean {
    const now = Date.now();
    const lastModified = new Date(metadata.lastModified).getTime();
    return now - lastModified > metadata.ttl * 1000;
  }

  private async loadCacheMetadata(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.CACHE_METADATA);
      if (stored) {
        const metadata = JSON.parse(stored);
        this.cacheMetadata = new Map(Object.entries(metadata));
      }
    } catch (error) {
      console.error('Failed to load cache metadata:', error);
    }
  }

  private async saveCacheMetadata(): Promise<void> {
    try {
      const metadata = Object.fromEntries(this.cacheMetadata);
      await AsyncStorage.setItem(
        STORAGE_KEYS.CACHE_METADATA,
        JSON.stringify(metadata),
      );
    } catch (error) {
      console.error('Failed to save cache metadata:', error);
    }
  }

  private async cleanupExpiredCache(): Promise<void> {
    const expiredKeys: string[] = [];

    for (const [key, metadata] of this.cacheMetadata) {
      if (this.isCacheExpired(metadata)) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      await AsyncStorage.removeItem(key);
      this.cacheMetadata.delete(key);
    }

    if (expiredKeys.length > 0) {
      await this.saveCacheMetadata();
    }
  }

  private startMetricsTracking(): void {
    // Reset metrics daily
    setInterval(() => {
      this.metrics = { hits: 0, misses: 0, errors: 0, operations: 0 };
    }, 24 * 60 * 60 * 1000);
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const asyncStorageService = new AsyncStorageService();
export default asyncStorageService;
