import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/**
 * Input component types and interfaces
 */

export type InputType = 'text' | 'email' | 'password' | 'search';
export type ValidationState = 'default' | 'error' | 'success' | 'warning';

export interface InputProps {
  /** Input value */
  value: string;
  
  /** Value change handler */
  onChangeText: (text: string) => void;
  
  /** Input type */
  type?: InputType;
  
  /** Placeholder text (with Turkish support) */
  placeholder?: string;
  
  /** Floating label text */
  label?: string;
  
  /** Validation state */
  validationState?: ValidationState;
  
  /** Error message */
  errorMessage?: string;
  
  /** Success message */
  successMessage?: string;
  
  /** Warning message */
  warningMessage?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Required field indicator */
  required?: boolean;
  
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  
  /** Custom input style */
  inputStyle?: StyleProp<TextStyle>;
  
  /** Show/hide password toggle (for password type) */
  showPasswordToggle?: boolean;
  
  /** Left icon */
  leftIcon?: string;
  
  /** Right icon */
  rightIcon?: string;
  
  /** Right icon press handler */
  onRightIconPress?: () => void;
  
  /** Focus handler */
  onFocus?: () => void;
  
  /** Blur handler */
  onBlur?: () => void;
  
  /** Submit handler (for search) */
  onSubmit?: () => void;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID */
  testID?: string;
  
  /** Auto focus */
  autoFocus?: boolean;
  
  /** Max length */
  maxLength?: number;
  
  /** Multiline support */
  multiline?: boolean;
  
  /** Number of lines (for multiline) */
  numberOfLines?: number;
}