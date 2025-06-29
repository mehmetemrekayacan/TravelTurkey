/**
 * TravelTurkey Navigation Types
 * 3 tab'lı yapı için optimize edilmiş
 */

import type { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Bottom Tab Navigator parametreleri
export type BottomTabParamList = {
  ExploreTab: undefined;
  PlansTab: undefined;
  ProfileTab: undefined;
};

// Tab screen props type
export type BottomTabScreenProps<Screen extends keyof BottomTabParamList> =
  RNBottomTabScreenProps<BottomTabParamList, Screen>;
