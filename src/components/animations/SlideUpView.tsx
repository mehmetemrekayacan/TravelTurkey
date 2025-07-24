import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface SlideUpViewProps {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  onAnimationComplete?: () => void;
}

/**
 * SlideUpView Component
 * 
 * Animates content sliding up from below with fade-in effect.
 * Perfect for cards, modals, and content reveals.
 * 
 * @example
 * ```tsx
 * <SlideUpView distance={50} duration={300}>
 *   <Card>Bu kart aşağıdan yukarı kayarak görünecek</Card>
 * </SlideUpView>
 * ```
 */
export const SlideUpView: React.FC<SlideUpViewProps> = ({
  children,
  distance = 50,
  duration = 300,
  delay = 0,
  style,
  onAnimationComplete,
}) => {
  const translateY = useSharedValue(distance);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      translateY.value = withTiming(0, { duration });
      opacity.value = withTiming(1, { duration }, (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [translateY, opacity, duration, delay, distance, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default SlideUpView;