import { StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { ReactNode } from 'react';

/**
 * Card component types and interfaces
 */

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'tourism';
export type CardSize = 'small' | 'medium' | 'large';
export type ImageLayout = 'top' | 'left' | 'right' | 'background';

export interface CardProps {
  /** Card content */
  children: ReactNode;
  
  /** Card visual variant */
  variant?: CardVariant;
  
  /** Card size */
  size?: CardSize;
  
  /** Custom card style */
  style?: StyleProp<ViewStyle>;
  
  /** Press handler */
  onPress?: () => void;
  
  /** Image source */
  imageSource?: { uri: string } | number;
  
  /** Image layout position */
  imageLayout?: ImageLayout;
  
  /** Custom image style */
  imageStyle?: StyleProp<ImageStyle>;
  
  /** Enable lazy loading for images */
  lazyLoad?: boolean;
  
  /** Gradient overlay */
  gradientOverlay?: boolean;
  
  /** Gradient colors */
  gradientColors?: string[];
  
  /** Tourism-specific layout */
  tourismLayout?: boolean;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID */
  testID?: string;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Badge content (for tourism cards) */
  badge?: string;
  
  /** Badge position */
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  /** Header content */
  header?: ReactNode;
  
  /** Footer content */
  footer?: ReactNode;
}