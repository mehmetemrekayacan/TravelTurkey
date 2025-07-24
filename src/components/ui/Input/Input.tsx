import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { InputProps } from './Input.types';
import { styles, getValidationStyles, getFocusStyles } from './Input.styles';

/**
 * Modern Input Component
 * 
 * A comprehensive input component with validation states, floating labels,
 * Turkish placeholder support, icon integration, and accessibility support.
 * 
 * Features:
 * - Various types: text, email, password, search
 * - Validation states: error, success, warning
 * - Floating labels with smooth animations
 * - Turkish character support
 * - Icon integration (left/right)
 * - Password visibility toggle
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Multiline support
 * 
 * @example
 * ```tsx
 * <Input
 *   value={value}
 *   onChangeText={setValue}
 *   label="E-posta"
 *   type="email"
 *   placeholder="ornek@email.com"
 *   required
 * />
 * ```
 */

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  type = 'text',
  placeholder,
  label,
  validationState = 'default',
  errorMessage,
  successMessage,
  warningMessage,
  helperText,
  disabled = false,
  required = false,
  style,
  inputStyle,
  showPasswordToggle = true,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onFocus,
  onBlur,
  onSubmit,
  accessibilityLabel,
  testID,
  autoFocus = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Floating label animation
  const labelAnimation = useSharedValue(value ? 1 : 0);

  // Update label animation when value or focus changes
  React.useEffect(() => {
    labelAnimation.value = withTiming(
      focused || value ? 1 : 0,
      { duration: 200 }
    );
  }, [focused, value, labelAnimation]);

  // Animated styles for floating label
  const animatedLabelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(labelAnimation.value, [0, 1], [0, -28]);
    const scale = interpolate(labelAnimation.value, [0, 1], [1, 0.85]);
    
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  // Get styles based on validation state and focus
  const validationStyles = getValidationStyles(validationState);
  const focusStyles = getFocusStyles(focused, validationState);

  // Handle focus
  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  // Handle blur
  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  // Handle submit editing
  const handleSubmitEditing = () => {
    if (type === 'search') {
      Keyboard.dismiss();
      onSubmit?.();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Get keyboard type
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      default:
        return 'default';
    }
  };

  // Get secure text entry
  const getSecureTextEntry = () => {
    return type === 'password' && !showPassword;
  };

  // Get return key type
  const getReturnKeyType = () => {
    switch (type) {
      case 'search':
        return 'search';
      default:
        return 'done';
    }
  };

  // Get message to display
  const getMessage = () => {
    if (validationState === 'error' && errorMessage) return errorMessage;
    if (validationState === 'success' && successMessage) return successMessage;
    if (validationState === 'warning' && warningMessage) return warningMessage;
    return helperText;
  };

  // Combine container styles
  const containerStyle = [
    styles.inputContainer,
    validationStyles.inputContainer,
    focusStyles.inputContainer,
    disabled && styles.disabled,
  ];

  // Combine input styles
  const combinedInputStyle = [
    styles.input,
    multiline && styles.multiline,
    inputStyle,
  ];

  return (
    <View style={[styles.container, style]}>
      {/* Label (non-floating) */}
      {label && !placeholder && (
        <Text style={[styles.label, validationStyles.label]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Input Container */}
      <View style={containerStyle}>
        {/* Left Icon */}
        {leftIcon && (
          <Text style={[styles.icon, styles.leftIcon]}>
            {leftIcon}
          </Text>
        )}

        {/* Input Field */}
        <TextInput
          ref={inputRef}
          style={combinedInputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={label && focused ? '' : placeholder}
          placeholderTextColor={validationStyles.messageText.color}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmitEditing}
          keyboardType={getKeyboardType()}
          secureTextEntry={getSecureTextEntry()}
          returnKeyType={getReturnKeyType()}
          autoFocus={autoFocus}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          accessible={true}
          accessibilityLabel={accessibilityLabel || label || placeholder}
          testID={testID}
        />

        {/* Floating Label */}
        {label && placeholder && (
          <Animated.Text
            style={[
              styles.floatingLabel,
              validationStyles.floatingLabel,
              animatedLabelStyle,
            ]}
          >
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Animated.Text>
        )}

        {/* Password Toggle */}
        {type === 'password' && showPasswordToggle && (
          <TouchableOpacity
            style={styles.toggleIcon}
            onPress={togglePasswordVisibility}
            accessible={true}
            accessibilityLabel={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            <Text style={styles.icon}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Text style={styles.icon}>
              {rightIcon}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Message */}
      {getMessage() && (
        <View style={styles.messageContainer}>
          <Text style={[styles.messageText, validationStyles.messageText]}>
            {getMessage()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Input;