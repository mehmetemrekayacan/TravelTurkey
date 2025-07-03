/**
 * TravelTurkey Bottom Tab Navigator
 * Enhanced with 2025 React Navigation best practices
 * Features: Lazy loading, gesture optimization, accessibility, performance
 */

import React, { useMemo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types and theme
import { BottomTabParamList } from '../types/navigation';
import { Theme } from '../styles/theme';

// Direct imports for better performance
import HomeScreen from '../screens/home/HomeScreen';
import OptimizedExploreScreen from '../screens/explore/OptimizedExploreScreen';
import PlansScreen from '../screens/plans/PlansScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Icon components
import {
  HomeTabIcon,
  ExploreTabIcon,
  PlansTabIcon,
  ProfileTabIcon,
} from '../components/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Theme.colors.neutral[100],
    borderTopColor: Theme.colors.neutral[200],
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: Theme.colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingTop: Theme.spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? Theme.spacing.md : Theme.spacing.sm,
    height: Platform.OS === 'ios' ? 84 : 64,
  },
  tabBarLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.semiBold,
    fontFamily: Theme.typography.fonts.primary,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
  },
});

const BottomTabNavigator = React.memo(() => {
  const insets = useSafeAreaInsets();

  // Memoize tab bar style to prevent unnecessary re-renders
  const tabBarStyle = useMemo(() => [
    styles.tabBar,
    {
      paddingBottom:
        Platform.OS === 'ios'
          ? insets.bottom + Theme.spacing.sm
          : Theme.spacing.sm,
    },
  ], [insets.bottom]);

  // Memoize screen options to prevent re-renders
  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarActiveTintColor: Theme.colors.primary[500],
    tabBarInactiveTintColor: Theme.colors.neutral[500],
    tabBarStyle,
    tabBarLabelStyle: styles.tabBarLabel,

    // Performance optimizations
    lazy: false, // Disable lazy loading for faster tab switching
    unmountOnBlur: false, // Keep screens mounted for faster switching
    tabBarHideOnKeyboard: Platform.OS === 'android',

    // Accessibility
    tabBarAccessibilityLabel: 'Ana navigasyon',
  }), [tabBarStyle]);

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName='HomeTab'
    >
      <Tab.Screen
        name='HomeTab'
        component={HomeScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: HomeTabIcon,
          tabBarAccessibilityLabel: 'Ana Sayfa sekmesi',
        }}
      />

      <Tab.Screen
        name='ExploreTab'
        component={OptimizedExploreScreen}
        options={{
          title: 'Keşfet',
          tabBarIcon: ExploreTabIcon,
          tabBarAccessibilityLabel: 'Keşfet sekmesi',
        }}
      />

      <Tab.Screen
        name='PlansTab'
        component={PlansScreen}
        options={{
          title: 'Planlarım',
          tabBarIcon: PlansTabIcon,
          tabBarAccessibilityLabel: 'Planlarım sekmesi',
        }}
      />

      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ProfileTabIcon,
          tabBarAccessibilityLabel: 'Profil sekmesi',
        }}
      />
    </Tab.Navigator>
  );
});

BottomTabNavigator.displayName = 'BottomTabNavigator';

export default BottomTabNavigator;
