/**
 * TravelTurkey Bottom Tab Navigator
 * 3 Tab'lı navigasyon sistemi: Keşfet, Planlarım, Profil
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { AppColors } from '../constants/Colors';

// Screens
import HomeScreen from '../screens/home';
import ExploreScreen from '../screens/explore';
import PlansScreen from '../screens/plans';
import ProfileScreen from '../screens/profile';

// Icon components
import {
  HomeTabIcon,
  ExploreTabIcon,
  PlansTabIcon,
  ProfileTabIcon,
} from '../components/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.PRIMARY,
        tabBarInactiveTintColor: AppColors.TEXT_SECONDARY,
        tabBarStyle: {
          backgroundColor: AppColors.BG_PRIMARY,
          borderTopColor: AppColors.BG_LIGHT,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name='HomeTab'
        component={HomeScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: HomeTabIcon,
        }}
      />

      <Tab.Screen
        name='ExploreTab'
        component={ExploreScreen}
        options={{
          title: 'Keşfet',
          tabBarIcon: ExploreTabIcon,
        }}
      />

      <Tab.Screen
        name='PlansTab'
        component={PlansScreen}
        options={{
          title: 'Planlarım',
          tabBarIcon: PlansTabIcon,
        }}
      />

      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}
