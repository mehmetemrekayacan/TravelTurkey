import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface PressableAnimatedProps extends TouchableOpacityProps {
  children: React.ReactNode;
  scaleValue?: number;
  opacityValue?: number;
  springConfig?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
  };
}

/**
 * PressableAnimated Component
 * 
 * A TouchableOpacity wrapper with smooth scale and opacity animations.
 * Provides tactile feedback for user interactions.
 * 
 * @example
 * ```tsx
 * <PressableAnimated 
 *   scaleValue={0.95} 
 *   onPress={() => console.log('Pressed')}
 * >
 *   <Card>Basılabilir kart</Card>
 * </PressableAnimated>
 * ```
 */

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const PressableAnimated: React.FC<PressableAnimatedProps> = ({
  children,
  scaleValue = 0.95,
  opacityValue = 0.8,
  springConfig = { damping: 15, mass: 1, stiffness: 150 },
  onPressIn,
  onPressOut,
  disabled,
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = (event: any) => {
    if (!disabled) {
      scale.value = withSpring(scaleValue, springConfig);
      opacity.value = withTiming(opacityValue, { duration: 100 });
    }
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    if (!disabled) {
      scale.value = withSpring(1, springConfig);
      opacity.value = withTiming(1, { duration: 100 });
    }
    onPressOut?.(event);
  };

  return (
    <AnimatedTouchableOpacity
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1} // We handle opacity with animations
      {...props}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default PressableAnimated;