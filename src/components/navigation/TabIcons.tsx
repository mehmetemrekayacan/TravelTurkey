/**
 * TravelTurkey - Tab Icons Component
 * Centralized tab icon management with proper TypeScript types
 */

import React from 'react';
import { Text } from 'react-native';

export type TabIconName = 'home' | 'explore' | 'plans' | 'profile';

interface TabIconProps {
  name: TabIconName;
  size: number;
  focused?: boolean;
  color?: string;
}

interface StandardTabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const TAB_ICONS: Record<TabIconName, string> = {
  home: '🏠',
  explore: '🧭',
  plans: '📋',
  profile: '👤',
};

export const TabIcon: React.FC<TabIconProps> = ({ name, size }) => {
  const icon = TAB_ICONS[name] || '❓';

  return <Text style={{ fontSize: size * 0.8 }}>{icon}</Text>;
};

// Pre-configured icon components for each tab
export const HomeTabIcon = ({ size }: StandardTabIconProps) => (
  <TabIcon name='home' size={size} />
);

export const ExploreTabIcon = ({ size }: StandardTabIconProps) => (
  <TabIcon name='explore' size={size} />
);

export const PlansTabIcon = ({ size }: StandardTabIconProps) => (
  <TabIcon name='plans' size={size} />
);

export const ProfileTabIcon = ({ size }: StandardTabIconProps) => (
  <TabIcon name='profile' size={size} />
);
