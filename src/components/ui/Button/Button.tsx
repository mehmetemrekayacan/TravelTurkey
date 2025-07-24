import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ButtonProps } from './Button.types';
import { styles, getVariantStyles, getSizeStyles } from './Button.styles';
import { ColorTokens } from '../../../styles/tokens/colors';

/**
 * Modern Button Component
 * 
 * A comprehensive button component with multiple variants, sizes, states,
 * Turkish tourism themed colors, accessibility support, and animation.
 * 
 * Features:
 * - Multiple variants: primary, secondary, ghost, danger
 * - Sizes: small, medium, large
 * - States: loading, disabled, pressed
 * - Turkish tourism themed colors
 * - Accessibility support (WCAG 2.1 AA)
 * - Smooth animations
 * - Icon support
 * 
 * @example
 * ```tsx
 * <Button
 *   title="Keşfet"
 *   variant="primary"
 *   size="medium"
 *   onPress={() => console.log('Pressed')}
 * />
 * ```
 */

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onPress,
  style,
  textStyle,
  accessibilityLabel,
  testID,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

  // Animation styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // Handle press in animation
  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.95, { damping: 15 });
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  };

  // Handle press out animation
  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(1, { damping: 15 });
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  // Handle press
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  // Combine container styles
  const containerStyle = [
    styles.container,
    variantStyles.container,
    sizeStyles.container,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  // Combine text styles
  const combinedTextStyle = [
    styles.text,
    variantStyles.text,
    sizeStyles.text,
    textStyle,
  ];

  // Loading indicator color
  const loadingColor = variant === 'ghost' 
    ? ColorTokens.neutral[700] 
    : '#FFFFFF';

  return (
    <AnimatedTouchableOpacity
      style={[containerStyle, animatedStyle]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole={'button'}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
      activeOpacity={1} // We handle opacity with animations
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={loadingColor}
          style={styles.loading}
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <Text style={[styles.icon, { color: variantStyles.text.color }]}>
          {icon}
        </Text>
      )}
      
      <Text style={combinedTextStyle}>
        {title}
      </Text>
      
      {icon && iconPosition === 'right' && !loading && (
        <Text style={[styles.icon, { color: variantStyles.text.color }]}>
          {icon}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

export default Button;