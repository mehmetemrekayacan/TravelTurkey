import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface FadeInViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  onAnimationComplete?: () => void;
}

/**
 * FadeInView Component
 * 
 * Animates opacity from 0 to 1 with customizable timing.
 * Useful for revealing content with smooth fade-in effect.
 * 
 * @example
 * ```tsx
 * <FadeInView duration={300} delay={100}>
 *   <Text>Bu metin yumuşak bir şekilde görünecek</Text>
 * </FadeInView>
 * ```
 */
export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  duration = 300,
  delay = 0,
  style,
  onAnimationComplete,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration }, (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [opacity, duration, delay, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;