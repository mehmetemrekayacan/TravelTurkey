import { StyleProp, TextStyle } from 'react-native';
import { ReactNode } from 'react';

/**
 * Typography component types and interfaces
 */

export type TypographyVariant = 
  | 'heading1' 
  | 'heading2' 
  | 'heading3' 
  | 'bodyLarge' 
  | 'bodyMedium' 
  | 'bodySmall' 
  | 'caption' 
  | 'label';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextColor = 'primary' | 'secondary' | 'disabled' | 'inverse' | 'error' | 'success' | 'warning';

export interface TypographyProps {
  /** Text content */
  children: ReactNode;
  
  /** Typography variant */
  variant?: TypographyVariant;
  
  /** Text color */
  color?: TextColor;
  
  /** Text alignment */
  align?: TextAlign;
  
  /** Custom text style */
  style?: StyleProp<TextStyle>;
  
  /** Number of lines (for truncation) */
  numberOfLines?: number;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID */
  testID?: string;
  
  /** Selectable text */
  selectable?: boolean;
  
  /** Font weight override */
  weight?: 'light' | 'normal' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
  
  /** Font family override */
  fontFamily?: 'primary' | 'secondary' | 'accent';
  
  /** Press handler (for interactive text) */
  onPress?: () => void;
  
  /** Underline text */
  underline?: boolean;
  
  /** Italic text */
  italic?: boolean;
}

// Convenience component props for semantic variants
export interface HeadingProps extends Omit<TypographyProps, 'variant'> {}
export interface BodyProps extends Omit<TypographyProps, 'variant'> {}
export interface CaptionProps extends Omit<TypographyProps, 'variant'> {}
export interface LabelProps extends Omit<TypographyProps, 'variant'> {}