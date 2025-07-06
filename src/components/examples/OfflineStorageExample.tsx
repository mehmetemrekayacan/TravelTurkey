/**
 * TravelTurkey - AsyncStorage Integration Examples (2025)
 * Practical examples of using the offline storage system
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useOfflineStorage } from '../../hooks/useOfflineStorage';
import { Colors } from '../../constants/Colors';

/**
 * Example component demonstrating AsyncStorage integration
 */
export const OfflineStorageExample: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [userContext] = useState({
    userId: 'demo-user-123',
    preferences: {
      favoriteCategories: ['historical', 'natural'],
      visitedPlaces: ['hagia-sophia', 'cappadocia'],
      plannedTrips: ['pamukkale', 'ephesus'],
      language: 'tr',
      region: 'marmara',
    },
    location: {
      latitude: 41.0082,
      longitude: 28.9784,
      accuracy: 100,
    },
    deviceInfo: {
      storageAvailable: 1024 * 1024 * 500, // 500MB
      connectionType: 'wifi' as const,
      batteryLevel: 80,
    },
  });

  // Use the offline storage hook
  const {
    touristPlaces,
    enhancedPlaces,
    isLoading,
    isInitialized,
    error,
    cacheStatus,
    syncStatus,
    getTouristPlaces,
    getEnhancedPlaces,
    refreshData,
    clearCache,
    syncWithRemote,
    forceSyncPlaces,
    getCacheStats,
    cleanupCache,
    isOnline,
    syncInProgress,
    needsUpdate,
  } = useOfflineStorage(userContext, {
    enableAutoSync: true,
    enableRealTimeUpdates: true,
    syncInterval: 5, // 5 minutes for demo
    preloadStrategy: 'user-based',
    enableMetrics: true,
    enableBackground: true,
  });

  // Add log function
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  // Monitor cache and sync status
  useEffect(() => {
    addLog(
      `Cache Status: ${cacheStatus.cacheSize.toFixed(2)}MB, ${
        cacheStatus.itemCount
      } items`,
    );
  }, [cacheStatus]);

  useEffect(() => {
    addLog(
      `Sync Status: ${
        syncStatus.syncInProgress ? 'Syncing...' : 'Idle'
      }, Queue: ${syncStatus.queueSize}`,
    );
  }, [syncStatus]);

  useEffect(() => {
    if (error) {
      addLog(`Error: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    if (isInitialized) {
      addLog('✅ Offline storage initialized successfully');
    }
  }, [isInitialized]);

  // Demo functions
  const handleLoadTouristPlaces = async () => {
    try {
      addLog('📱 Loading tourist places from cache...');
      const result = await getTouristPlaces();
      if (result.success) {
        addLog(`✅ Loaded ${result.data?.length || 0} tourist places`);
      } else {
        addLog(`❌ Failed to load tourist places: ${result.error?.message}`);
      }
    } catch (err) {
      addLog(
        `❌ Error loading tourist places: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleLoadEnhancedPlaces = async () => {
    try {
      addLog('🚀 Loading enhanced places...');
      const result = await getEnhancedPlaces();
      if (result.success) {
        addLog(`✅ Loaded ${result.data?.length || 0} enhanced places`);
      } else {
        addLog(`❌ Failed to load enhanced places: ${result.error?.message}`);
      }
    } catch (err) {
      addLog(
        `❌ Error loading enhanced places: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleRefreshData = async () => {
    try {
      addLog('🔄 Refreshing all data...');
      const result = await refreshData();
      addLog(
        `${result.success ? '✅' : '❌'} Refresh result: ${result.message}`,
      );
    } catch (err) {
      addLog(
        `❌ Refresh error: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleSyncWithRemote = async () => {
    try {
      addLog('🌐 Syncing with remote...');
      const result = await syncWithRemote();
      addLog(`${result.success ? '✅' : '❌'} Sync result: ${result.message}`);
    } catch (err) {
      addLog(
        `❌ Sync error: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleForceSyncPlaces = async () => {
    try {
      addLog('⚡ Force syncing tourist places...');
      const result = await forceSyncPlaces();
      addLog(
        `${result.success ? '✅' : '❌'} Force sync result: ${result.message}`,
      );
    } catch (err) {
      addLog(
        `❌ Force sync error: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleGetCacheStats = async () => {
    try {
      addLog('📊 Getting cache statistics...');
      const stats = await getCacheStats();
      if (stats) {
        addLog(
          `📊 Cache Stats - Cleaned: ${stats.cleaned}, Size freed: ${(
            stats.sizeFreed /
            1024 /
            1024
          ).toFixed(2)}MB`,
        );
      } else {
        addLog('❌ Failed to get cache stats');
      }
    } catch (err) {
      addLog(
        `❌ Cache stats error: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleCleanupCache = async () => {
    try {
      addLog('🧹 Cleaning up cache...');
      const result = await cleanupCache(false);
      if (result) {
        addLog(
          `🧹 Cleanup complete - Cleaned: ${result.cleaned}, Size freed: ${(
            result.sizeFreed /
            1024 /
            1024
          ).toFixed(2)}MB`,
        );
      }
    } catch (err) {
      addLog(
        `❌ Cleanup error: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              addLog('🗑️ Clearing all cache...');
              await clearCache();
              addLog('✅ Cache cleared successfully');
            } catch (err) {
              addLog(
                `❌ Clear cache error: ${
                  err instanceof Error ? err.message : 'Unknown error'
                }`,
              );
            }
          },
        },
      ],
    );
  };

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Initializing Offline Storage...</Text>
        {isLoading && <Text style={styles.subtitle}>Loading...</Text>}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AsyncStorage Integration Demo</Text>

      {/* Status Cards */}
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: isOnline
                ? Colors.secondary.golden
                : Colors.neutral.grayMedium,
            },
          ]}
        >
          <Text style={styles.statusText}>
            {isOnline ? '🌐 Online' : '📱 Offline'}
          </Text>
        </View>

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: syncInProgress
                ? Colors.accent.bosphorusBlue
                : Colors.neutral.grayLight,
            },
          ]}
        >
          <Text style={styles.statusText}>
            {syncInProgress ? '🔄 Syncing' : '✅ Synced'}
          </Text>
        </View>

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: needsUpdate
                ? Colors.primary.blue
                : Colors.neutral.grayLight,
            },
          ]}
        >
          <Text style={styles.statusText}>
            {needsUpdate ? '🔔 Update Available' : '📱 Up to Date'}
          </Text>
        </View>
      </View>

      {/* Data Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Data Summary</Text>
        <Text style={styles.summaryText}>
          Tourist Places: {touristPlaces.length}
        </Text>
        <Text style={styles.summaryText}>
          Enhanced Places: {enhancedPlaces.length}
        </Text>
        <Text style={styles.summaryText}>
          Cache Size: {cacheStatus.cacheSize.toFixed(2)} MB
        </Text>
        <Text style={styles.summaryText}>
          Health Score: {cacheStatus.healthScore}/100
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLoadTouristPlaces}
        >
          <Text style={styles.buttonText}>Load Tourist Places</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLoadEnhancedPlaces}
        >
          <Text style={styles.buttonText}>Load Enhanced Places</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRefreshData}>
          <Text style={styles.buttonText}>Refresh All Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSyncWithRemote}>
          <Text style={styles.buttonText}>Sync with Remote</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleForceSyncPlaces}>
          <Text style={styles.buttonText}>Force Sync Places</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGetCacheStats}>
          <Text style={styles.buttonText}>Get Cache Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCleanupCache}>
          <Text style={styles.buttonText}>Cleanup Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={handleClearCache}
        >
          <Text style={styles.buttonText}>Clear All Cache</Text>
        </TouchableOpacity>
      </View>

      {/* Logs */}
      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Activity Logs</Text>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>
            {log}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.neutral.charcoal,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusCard: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral.white,
  },
  summaryContainer: {
    backgroundColor: Colors.neutral.grayLight,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral.charcoal,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    marginBottom: 4,
  },
  buttonsContainer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary.blue,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
  logsContainer: {
    backgroundColor: Colors.neutral.charcoal,
    padding: 16,
    borderRadius: 8,
    minHeight: 200,
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.neutral.white,
    marginBottom: 8,
  },
  logText: {
    fontSize: 12,
    color: Colors.neutral.grayLight,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});

/**
 * Quick Start Guide for AsyncStorage Integration
 */
export const AsyncStorageQuickStart = `
# TravelTurkey AsyncStorage Integration - Quick Start Guide

## 1. Basic Usage

\`\`\`typescript
import { useOfflineStorage } from '../hooks/useOfflineStorage';

export const MyComponent = () => {
  const {
    touristPlaces,
    isLoading,
    getTouristPlaces,
    syncWithRemote
  } = useOfflineStorage();

  useEffect(() => {
    // Load data on component mount
    getTouristPlaces();
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{touristPlaces.length} places loaded</Text>
          <Button title="Sync" onPress={syncWithRemote} />
        </>
      )}
    </View>
  );
};
\`\`\`

## 2. User Context Configuration

\`\`\`typescript
const userContext = {
  userId: 'user123',
  preferences: {
    favoriteCategories: ['historical', 'natural'],
    visitedPlaces: ['hagia-sophia'],
    plannedTrips: ['cappadocia'],
    language: 'tr',
    region: 'marmara',
  },
  location: {
    latitude: 41.0082,
    longitude: 28.9784,
  }
};

const { touristPlaces } = useOfflineStorage(userContext, {
  enableAutoSync: true,
  syncInterval: 30, // 30 minutes
  preloadStrategy: 'user-based',
});
\`\`\`

## 3. Manual Data Operations

\`\`\`typescript
// Force refresh from remote
const refreshResult = await refreshData();

// Sync specific data type
const syncResult = await forceSyncPlaces();

// Cache management
const stats = await getCacheStats();
await cleanupCache(false); // gentle cleanup
await clearCache(); // clear all
\`\`\`

## 4. Error Handling

\`\`\`typescript
const { error, isOnline, syncStatus } = useOfflineStorage();

if (error) {
  console.error('Storage error:', error.message);
}

if (!isOnline) {
  // Show offline indicator
}

if (syncStatus.conflicts > 0) {
  // Handle sync conflicts
}
\`\`\`

## 5. Production Configuration

\`\`\`typescript
// For production apps
const productionConfig = {
  enableAutoSync: true,
  enableRealTimeUpdates: true,
  syncInterval: 60, // 1 hour
  preloadStrategy: 'essential',
  enableMetrics: true,
  enableBackground: true,
};

const storage = useOfflineStorage(userContext, productionConfig);
\`\`\`
`;

export default OfflineStorageExample;
