/**
 * TravelTurkey Navigation Types
 * React Navigation 6 için TypeScript type definitions
 */

// Navigation prop types
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: undefined;
  Places: undefined;
  PlaceDetail: { placeId: string; placeName: string };
  Hotels: undefined;
  HotelDetail: { hotelId: string; hotelName: string };
  Guide: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  PlacesTab: undefined;
  HotelsTab: undefined;
  GuideTab: undefined;
  ProfileTab: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type BottomTabScreenProps<Screen extends keyof BottomTabParamList> =
  RNBottomTabScreenProps<BottomTabParamList, Screen>;

// Global navigation types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
