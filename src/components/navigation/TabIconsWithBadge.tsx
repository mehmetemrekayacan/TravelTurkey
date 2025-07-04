/**
 * TravelTurkey - Enhanced Tab Icons with Badge Support
 * Combines custom icons with badge notifications system
 */

import React from 'react';
import { 
  ExploreTabIcon as BaseExploreIcon,
  PlansTabIcon as BasePlansIcon,
  ProfileTabIcon as BaseProfileIcon,
} from './VectorTabIcons';
import { useBadgeCount } from '../../context/BadgeContext';

interface TabIconWithBadgeProps {
  focused: boolean;
  color: string;
  size: number;
}

export const ExploreTabIcon = (props: TabIconWithBadgeProps) => {
  const { count } = useBadgeCount('ExploreTab');
  return <BaseExploreIcon {...props} badge={count > 0 ? count : undefined} />;
};

export const PlansTabIcon = (props: TabIconWithBadgeProps) => {
  const { count } = useBadgeCount('PlansTab');
  return <BasePlansIcon {...props} badge={count > 0 ? count : undefined} />;
};

export const ProfileTabIcon = (props: TabIconWithBadgeProps) => {
  const { count } = useBadgeCount('ProfileTab');
  return <BaseProfileIcon {...props} badge={count > 0 ? count : undefined} />;
};
