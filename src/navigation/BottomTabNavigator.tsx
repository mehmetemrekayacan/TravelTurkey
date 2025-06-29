/**
 * TravelTurkey Bottom Tab Navigator
 * Ana navigasyon sistemi
 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { AppColors } from '../constants/Colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import PlacesScreen from '../screens/PlacesScreen';
import HotelsScreen from '../screens/HotelsScreen';
import GuideScreen from '../screens/GuideScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Tab Navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Icon component (ESLint hatası için dışarı alındı)
const TabIcon = React.memo(({ name, size }: { name: string; size: number }) => {
  const getIcon = () => {
    switch (name) {
      case 'home':
        return '🏠';
      case 'place':
        return '📍';
      case 'hotel':
        return '🏨';
      case 'support-agent':
        return '👨‍💼';
      case 'person':
        return '👤';
      default:
        return '❓';
    }
  };

  return <Text style={{ fontSize: size * 0.8 }}>{getIcon()}</Text>;
});

TabIcon.displayName = 'TabIcon';

// Tab icon render fonksiyonları
const renderHomeIcon = ({ size }: { size: number }) => (
  <TabIcon name="home" size={size} />
);

const renderPlaceIcon = ({ size }: { size: number }) => (
  <TabIcon name="place" size={size} />
);

const renderHotelIcon = ({ size }: { size: number }) => (
  <TabIcon name="hotel" size={size} />
);

const renderGuideIcon = ({ size }: { size: number }) => (
  <TabIcon name="support-agent" size={size} />
);

const renderProfileIcon = ({ size }: { size: number }) => (
  <TabIcon name="person" size={size} />
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
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: renderHomeIcon,
        }}
      />

      <Tab.Screen
        name="PlacesTab"
        component={PlacesScreen}
        options={{
          title: 'Yerler',
          tabBarIcon: renderPlaceIcon,
        }}
      />

      <Tab.Screen
        name="HotelsTab"
        component={HotelsScreen}
        options={{
          title: 'Oteller',
          tabBarIcon: renderHotelIcon,
        }}
      />

      <Tab.Screen
        name="GuideTab"
        component={GuideScreen}
        options={{
          title: 'Rehber',
          tabBarIcon: renderGuideIcon,
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
