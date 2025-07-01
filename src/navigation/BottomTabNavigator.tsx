/**
 * TravelTurkey Bottom Tab Navigator
 * 3 Tab'lı navigasyon sistemi: Keşfet, Planlarım, Profil
 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { AppColors } from '../constants/Colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import PlansScreen from '../screens/PlansScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Icon component
const TabIcon = ({ name, size }: { name: string; size: number }) => {
  const getIcon = () => {
    switch (name) {
      case 'home':
        return '🏠';
      case 'explore':
        return '🧭';
      case 'plans':
        return '📋';
      case 'profile':
        return '👤';
      default:
        return '❓';
    }
  };
  return <Text style={{ fontSize: size * 0.8 }}>{getIcon()}</Text>;
};

// Icon render functions
const renderHomeIcon = ({ size }: { size: number }) => (
  <TabIcon name='home' size={size} />
);
const renderExploreIcon = ({ size }: { size: number }) => (
  <TabIcon name='explore' size={size} />
);
const renderPlansIcon = ({ size }: { size: number }) => (
  <TabIcon name='plans' size={size} />
);
const renderProfileIcon = ({ size }: { size: number }) => (
  <TabIcon name='profile' size={size} />
);

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
          tabBarIcon: renderHomeIcon,
        }}
      />

      <Tab.Screen
        name='ExploreTab'
        component={ExploreScreen}
        options={{
          title: 'Keşfet',
          tabBarIcon: renderExploreIcon,
        }}
      />

      <Tab.Screen
        name='PlansTab'
        component={PlansScreen}
        options={{
          title: 'Planlarım',
          tabBarIcon: renderPlansIcon,
        }}
      />

      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
