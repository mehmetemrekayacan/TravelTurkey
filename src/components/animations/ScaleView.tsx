import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface ScaleViewProps {
  children: React.ReactNode;
  fromScale?: number;
  toScale?: number;
  duration?: number;
  delay?: number;
  useSpring?: boolean;
  style?: StyleProp<ViewStyle>;
  onAnimationComplete?: () => void;
}

/**
 * ScaleView Component
 * 
 * Animates content scaling from one size to another.
 * Supports both timing and spring animations.
 * 
 * @example
 * ```tsx
 * <ScaleView fromScale={0.8} toScale={1} useSpring>
 *   <Button>Bu buton büyüyerek görünecek</Button>
 * </ScaleView>
 * ```
 */
export const ScaleView: React.FC<ScaleViewProps> = ({
  children,
  fromScale = 0.8,
  toScale = 1,
  duration = 300,
  delay = 0,
  useSpring = false,
  style,
  onAnimationComplete,
}) => {
  const scale = useSharedValue(fromScale);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (useSpring) {
        scale.value = withSpring(toScale, {
          damping: 15,
          mass: 1,
          stiffness: 150,
        });
      } else {
        scale.value = withTiming(toScale, { duration });
      }
      
      opacity.value = withTiming(1, { duration }, (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [
    scale, 
    opacity, 
    fromScale, 
    toScale, 
    duration, 
    delay, 
    useSpring, 
    onAnimationComplete
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default ScaleView;