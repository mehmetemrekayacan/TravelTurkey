import { StyleProp, TextStyle } from 'react-native';

/**
 * Icon component types and interfaces
 */

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconName = 
  | 'mosque'
  | 'beach' 
  | 'mountain'
  | 'historical'
  | 'food'
  | 'hotel'
  | 'transport'
  | 'culture'
  | 'nature'
  | 'shopping'
  | 'nightlife'
  | 'spa'
  | 'search'
  | 'heart'
  | 'share'
  | 'location'
  | 'calendar'
  | 'star'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'close'
  | 'menu'
  | 'home'
  | 'profile'
  | 'settings'
  | 'camera'
  | 'gallery'
  | 'phone'
  | 'email'
  | 'website'
  | 'info'
  | 'warning'
  | 'success'
  | 'error';

export interface IconProps {
  /** Icon name from the predefined set */
  name: IconName;
  
  /** Icon size */
  size?: IconSize | number;
  
  /** Icon color */
  color?: string;
  
  /** Custom style */
  style?: StyleProp<TextStyle>;
  
  /** Press handler (makes icon interactive) */
  onPress?: () => void;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID */
  testID?: string;
}