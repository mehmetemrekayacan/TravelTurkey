/**
 * TravelTurkey Navigation Types
 * Enhanced with React Navigation 6 + TypeScript best practices for 2025
 */

import type {
  BottomTabScreenProps as RNBottomTabScreenProps,
  BottomTabNavigationProp as RNBottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type {
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';
import type { TouristPlace } from './touristPlaces';

// Root Stack Navigator (for modals, auth screens, etc.)
export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  PlaceDetail: {
    place: TouristPlace;
    heroImageIndex?: number;
  };
  Search: {
    initialQuery?: string;
    category?: string;
  };
  Settings: undefined;
  About: undefined;
  // Onboarding & Auth
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  // Modals
  ImageViewer: {
    images: string[];
    initialIndex?: number;
    title?: string;
  };
  ShareModal: {
    place: TouristPlace;
  };
};

// Bottom Tab Navigator parametreleri
export type BottomTabParamList = {
  ExploreTab: {
    initialCategory?: string;
    refreshKey?: string;
  };
  PlansTab: undefined;
  ProfileTab: undefined;
};

// Explore Stack Navigator (nested in ExploreTab)
export type ExploreStackParamList = {
  ExploreMain: {
    initialCategory?: string;
    refreshKey?: string;
  };
  CategoryPlaces: {
    category: string;
    title: string;
  };
  NearbyPlaces: {
    latitude: number;
    longitude: number;
    radius?: number;
  };
};

// Home Stack Navigator (nested in HomeTab)
export type HomeStackParamList = {
  HomeMain: undefined;
  FeaturedPlaces: undefined;
  PopularPlaces: undefined;
  RecentlyViewed: undefined;
};

// Plans Stack Navigator (nested in PlansTab)
export type PlansStackParamList = {
  PlansMain: undefined;
  CreatePlan: undefined;
  PlanDetail: {
    planId: string;
  };
  EditPlan: {
    planId: string;
  };
};

// Profile Stack Navigator (nested in ProfileTab)
export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Favorites: undefined;
  VisitedPlaces: undefined;
  Statistics: undefined;
};

// Screen Props Types for Root Stack
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

// Screen Props Types for Bottom Tabs
export type BottomTabScreenProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<
    RNBottomTabScreenProps<BottomTabParamList, Screen>,
    StackScreenProps<RootStackParamList>
  >;

// Screen Props Types for Nested Stacks
export type ExploreStackScreenProps<
  Screen extends keyof ExploreStackParamList,
> = CompositeScreenProps<
  StackScreenProps<ExploreStackParamList, Screen>,
  BottomTabScreenProps<'ExploreTab'>
>;

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, Screen>,
    BottomTabScreenProps<'ExploreTab'>
  >;

export type PlansStackScreenProps<Screen extends keyof PlansStackParamList> =
  CompositeScreenProps<
    StackScreenProps<PlansStackParamList, Screen>,
    BottomTabScreenProps<'PlansTab'>
  >;

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList,
> = CompositeScreenProps<
  StackScreenProps<ProfileStackParamList, Screen>,
  BottomTabScreenProps<'ProfileTab'>
>;

// Navigation Prop Types
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp =
  RNBottomTabNavigationProp<BottomTabParamList>;

// Route Prop Types
export type PlaceDetailRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;
export type SearchRouteProp = RouteProp<RootStackParamList, 'Search'>;
export type ImageViewerRouteProp = RouteProp<RootStackParamList, 'ImageViewer'>;

// Utility types for navigation hooks
export type UseNavigationType = RootStackNavigationProp;
export type UseRouteType<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Declaration merging for type safety
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Navigation state types for persistence
export interface NavigationState {
  stateVersion: number;
  state?: any;
}

// Deep linking types
export type LinkingOptions = {
  prefixes: string[];
  config: {
    screens: {
      [K in keyof RootStackParamList]:
        | string
        | {
            path: string;
            exact?: boolean;
          };
    };
  };
};

export default {};
