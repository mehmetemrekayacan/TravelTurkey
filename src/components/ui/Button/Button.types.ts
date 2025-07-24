import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/**
 * Button component types and interfaces
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  /** Button text content */
  title: string;
  
  /** Button visual variant */
  variant?: ButtonVariant;
  
  /** Button size */
  size?: ButtonSize;
  
  /** Loading state */
  loading?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Press handler */
  onPress?: () => void;
  
  /** Custom button style */
  style?: StyleProp<ViewStyle>;
  
  /** Custom text style */
  textStyle?: StyleProp<TextStyle>;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID for testing */
  testID?: string;
  
  /** Icon name (optional) */
  icon?: string;
  
  /** Icon position */
  iconPosition?: 'left' | 'right';
  
  /** Full width button */
  fullWidth?: boolean;
}