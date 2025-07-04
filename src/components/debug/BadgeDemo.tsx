/**
 * TravelTurkey - Badge Demo Component
 * Test component for badge notification system
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useBadgeCount } from '../../context/BadgeContext';
import { AppColors } from '../../constants/Colors';

const BadgeDemo: React.FC = () => {
  const exploreCounter = useBadgeCount('ExploreTab');
  const plansCounter = useBadgeCount('PlansTab');
  const profileCounter = useBadgeCount('ProfileTab');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badge Demo</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Keşfet Tab: {exploreCounter.count}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={exploreCounter.increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={exploreCounter.decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={exploreCounter.clear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planlarım Tab: {plansCounter.count}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={plansCounter.increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={plansCounter.decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={plansCounter.clear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil Tab: {profileCounter.count}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={profileCounter.increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={profileCounter.decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={profileCounter.clear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: AppColors.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: AppColors.TEXT_SECONDARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.WHITE,
    fontWeight: 'bold',
  },
});

export default BadgeDemo;
