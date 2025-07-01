/**
 * TravelTurkey - Performance Monitor Component
 * Development-only component for monitoring app performance
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../constants/Colors';
import { dataManager } from '../../services/api';

interface PerformanceStats {
  memoryUsage: number;
  renderTime: number;
  searchPerformance: {
    averageTime: number;
    cacheHitRate: number;
  };
  dataStats: {
    totalPlaces: number;
    cacheSize: number;
  };
}

const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!__DEV__) return; // Only show in development

    const updateStats = () => {
      const dataStats = dataManager.getStatistics();

      // Simulate performance metrics (in real app, these would come from actual measurements)
      const newStats: PerformanceStats = {
        memoryUsage: Math.random() * 100, // MB
        renderTime: Math.random() * 16, // ms
        searchPerformance: {
          averageTime: Math.random() * 50, // ms
          cacheHitRate: Math.random() * 100, // %
        },
        dataStats: {
          totalPlaces: dataStats.totalPlaces,
          cacheSize: dataStats.cacheSize,
        },
      };

      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!__DEV__ || !stats) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.toggleText}>{isVisible ? '📊 ▼' : '📊 ▶'}</Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.statsContainer}>
          <Text style={styles.title}>Performance Monitor</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Memory:</Text>
            <Text style={styles.statValue}>
              {stats.memoryUsage.toFixed(1)} MB
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Render:</Text>
            <Text style={styles.statValue}>
              {stats.renderTime.toFixed(1)} ms
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Search Avg:</Text>
            <Text style={styles.statValue}>
              {stats.searchPerformance.averageTime.toFixed(1)} ms
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Cache Hit:</Text>
            <Text style={styles.statValue}>
              {stats.searchPerformance.cacheHitRate.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Places:</Text>
            <Text style={styles.statValue}>{stats.dataStats.totalPlaces}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Cache Size:</Text>
            <Text style={styles.statValue}>{stats.dataStats.cacheSize}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 16,
    zIndex: 1000,
  },
  toggleButton: {
    backgroundColor: AppColors.BG_SECONDARY,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.PRIMARY,
  },
  toggleText: {
    fontSize: 12,
    color: AppColors.PRIMARY,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: AppColors.BG_PRIMARY,
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    minWidth: 180,
    borderWidth: 1,
    borderColor: AppColors.BG_LIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: AppColors.TEXT_SECONDARY,
  },
  statValue: {
    fontSize: 10,
    color: AppColors.TEXT_PRIMARY,
    fontWeight: '500',
  },
});

export default PerformanceMonitor;
