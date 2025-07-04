/**
 * TravelTurkey Bottom Tab Navigator
 * Enhanced with 2025 React Navigation best practices
 * Features: Modern vector icons, smooth animations, Turkey-themed design, accessibility
 */

import React, { useMemo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types and theme
import { BottomTabParamList } from '../types/navigation';
import { AppColors } from '../constants/Colors';

// Direct imports for better performance
import OptimizedExploreScreen from '../screens/explore/OptimizedExploreScreen';
import PlansScreen from '../screens/plans/PlansScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Modern vector icons (Material Icons)
import {
  ExploreTabIcon,
  PlansTabIcon,
  ProfileTabIcon,
} from '../components/navigation/VectorTabIcons';

// Custom tab bar component
import CustomTabBar from '../components/navigation/CustomTabBar';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderTopColor: AppColors.BORDER_LIGHT,
    borderTopWidth: 1,
    elevation: 12,
    shadowColor: AppColors.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 88 : 68,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
    marginTop: 2,
  },
});

const BottomTabNavigator = React.memo(() => {
  const insets = useSafeAreaInsets();

  // Memoize custom tab bar to prevent re-renders
  const renderCustomTabBar = React.useCallback(
    (props: any) => <CustomTabBar {...props} />,
    []
  );

  // Memoize tab bar style to prevent unnecessary re-renders
  const tabBarStyle = useMemo(
    () => [
      styles.tabBar,
      {
        paddingBottom: Platform.OS === 'ios' ? insets.bottom + 12 : 8,
      },
    ],
    [insets.bottom],
  );

  // Memoize screen options to prevent re-renders
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: AppColors.PRIMARY, // Turkish red
      tabBarInactiveTintColor: AppColors.TEXT_SECONDARY,
      tabBarStyle,
      tabBarLabelStyle: styles.tabBarLabel,

      // Performance optimizations
      lazy: false, // Disable lazy loading for faster tab switching
      unmountOnBlur: false, // Keep screens mounted for faster switching
      tabBarHideOnKeyboard: Platform.OS === 'android',

      // Enhanced visual effects - removed for now to avoid render issues

      // Accessibility
      tabBarAccessibilityLabel: 'Ana navigasyon',
      tabBarItemStyle: {
        paddingVertical: 4,
      },
    }),
    [tabBarStyle],
  );

  return (
    <Tab.Navigator 
      screenOptions={screenOptions} 
      initialRouteName='ExploreTab'
      tabBar={renderCustomTabBar}
    >
      <Tab.Screen
        name='ExploreTab'
        component={OptimizedExploreScreen}
        options={{
          title: 'Keşfet',
          tabBarIcon: ExploreTabIcon,
          tabBarAccessibilityLabel:
            "Keşfet sekmesi - Türkiye'deki güzel yerleri keşfedin",
        }}
      />

      <Tab.Screen
        name='PlansTab'
        component={PlansScreen}
        options={{
          title: 'Planlarım',
          tabBarIcon: PlansTabIcon,
          tabBarAccessibilityLabel:
            'Planlarım sekmesi - Seyahat planlarınızı görüntüleyin',
        }}
      />

      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ProfileTabIcon,
          tabBarAccessibilityLabel:
            'Profil sekmesi - Hesap ayarları ve profil bilgileri',
        }}
      />
    </Tab.Navigator>
  );
});

BottomTabNavigator.displayName = 'BottomTabNavigator';

export default BottomTabNavigator;
