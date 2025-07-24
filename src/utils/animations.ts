/**
 * Animation Utilities and Presets
 * Comprehensive animation system for TravelTurkey app
 */

import { 
  withTiming, 
  withSpring, 
  withSequence, 
  withDelay,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';

/**
 * Animation Presets
 * Pre-configured animation settings for consistent motion design
 */
export const AnimationPresets = {
  // Fade animations
  fadeIn: {
    duration: 300,
    easing: Easing.out(Easing.ease),
  },
  fadeOut: {
    duration: 200,
    easing: Easing.in(Easing.ease),
  },

  // Slide animations
  slideUp: {
    duration: 250,
    easing: Easing.out(Easing.ease),
  },
  slideDown: {
    duration: 200,
    easing: Easing.in(Easing.ease),
  },
  slideLeft: {
    duration: 300,
    easing: Easing.out(Easing.ease),
  },
  slideRight: {
    duration: 300,
    easing: Easing.out(Easing.ease),
  },

  // Scale animations
  scale: {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  },
  scaleIn: {
    duration: 300,
    easing: Easing.out(Easing.ease),
  },
  scaleOut: {
    duration: 200,
    easing: Easing.in(Easing.ease),
  },

  // Bounce animations (using spring instead)
  bounce: {
    damping: 8,
    mass: 1,
    stiffness: 150,
  },
  
  // Spring animations
  spring: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
  
  // Quick interactions
  quickPress: {
    duration: 100,
    easing: Easing.out(Easing.ease),
  },
  
  // Page transitions
  pageTransition: {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  },
};

/**
 * Animation Factories
 * Functions to create common animation patterns
 */

// Fade animation factory
export const createFadeAnimation = (
  toValue: number,
  preset = AnimationPresets.fadeIn
) => {
  return withTiming(toValue, preset);
};

// Scale animation factory
export const createScaleAnimation = (
  toValue: number,
  preset = AnimationPresets.scale
) => {
  return withTiming(toValue, preset);
};

// Spring animation factory
export const createSpringAnimation = (
  toValue: number,
  preset = AnimationPresets.spring
) => {
  return withSpring(toValue, preset);
};

// Slide animation factory
export const createSlideAnimation = (
  toValue: number,
  preset = AnimationPresets.slideUp
) => {
  return withTiming(toValue, preset);
};

// Bounce animation factory
export const createBounceAnimation = (toValue: number) => {
  return withSequence(
    withTiming(toValue * 1.1, { duration: 150 }),
    withTiming(toValue * 0.95, { duration: 100 }),
    withTiming(toValue, { duration: 150 })
  );
};

// Pulse animation factory
export const createPulseAnimation = (
  scale = 1.05,
  duration = 1000,
  repeat = -1
) => {
  return withSequence(
    withTiming(scale, { duration: duration / 2 }),
    withTiming(1, { duration: duration / 2 })
  );
};

// Stagger animation factory
export const createStaggerAnimation = (
  toValue: number,
  delay: number,
  preset = AnimationPresets.fadeIn
) => {
  return withDelay(delay, withTiming(toValue, preset));
};

/**
 * Interpolation Helpers
 * Common interpolation patterns for animations
 */

// Fade interpolation
export const createFadeInterpolation = (
  animatedValue: number,
  inputRange = [0, 1],
  outputRange = [0, 1]
) => {
  return interpolate(
    animatedValue,
    inputRange,
    outputRange,
    Extrapolate.CLAMP
  );
};

// Scale interpolation
export const createScaleInterpolation = (
  animatedValue: number,
  inputRange = [0, 1],
  outputRange = [0.8, 1]
) => {
  return interpolate(
    animatedValue,
    inputRange,
    outputRange,
    Extrapolate.CLAMP
  );
};

// Slide interpolation
export const createSlideInterpolation = (
  animatedValue: number,
  distance = 50,
  inputRange = [0, 1]
) => {
  return interpolate(
    animatedValue,
    inputRange,
    [distance, 0],
    Extrapolate.CLAMP
  );
};

// Rotate interpolation
export const createRotateInterpolation = (
  animatedValue: number,
  inputRange = [0, 1],
  outputRange = ['0deg', '360deg']
) => {
  return interpolate(
    animatedValue,
    inputRange,
    outputRange.map(value => 
      typeof value === 'string' ? 
        parseFloat(value.replace('deg', '')) * (Math.PI / 180) : 
        value
    ),
    Extrapolate.CLAMP
  );
};

/**
 * Easing Functions
 * Custom easing functions for specific use cases
 */
export const EasingFunctions = {
  // Tourism-specific easings
  tourismSlow: { duration: 800, easing: Easing.out(Easing.ease) },
  tourismFast: { duration: 200, easing: Easing.inOut(Easing.ease) },
  tourismBounce: { damping: 12, mass: 1, stiffness: 100 },
  
  // UI interaction easings
  buttonPress: { duration: 100, easing: Easing.out(Easing.ease) },
  cardHover: { duration: 200, easing: Easing.inOut(Easing.ease) },
  modalSlide: { duration: 300, easing: Easing.out(Easing.ease) },
  
  // Page transition easings
  pageSlide: { duration: 400, easing: Easing.inOut(Easing.ease) },
  pageModal: { duration: 350, easing: Easing.out(Easing.ease) },
};

/**
 * Animation Sequences
 * Pre-built animation sequences for complex interactions
 */

// Loading sequence
export const createLoadingSequence = (scale: any, opacity: any) => {
  scale.value = withSequence(
    withTiming(1.1, { duration: 300 }),
    withTiming(0.9, { duration: 200 }),
    withTiming(1, { duration: 200 })
  );
  
  opacity.value = withSequence(
    withTiming(0.7, { duration: 150 }),
    withTiming(1, { duration: 150 })
  );
};

// Success sequence
export const createSuccessSequence = (scale: any, opacity: any) => {
  scale.value = withSequence(
    withTiming(1.2, { duration: 200 }),
    withTiming(1, { duration: 300 })
  );
  
  opacity.value = withSequence(
    withTiming(0.8, { duration: 100 }),
    withTiming(1, { duration: 200 })
  );
};

// Error sequence
export const createErrorSequence = (translateX: any) => {
  translateX.value = withSequence(
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(0, { duration: 50 })
  );
};

// Card entrance sequence
export const createCardEntranceSequence = (
  translateY: any, 
  opacity: any, 
  scale: any,
  delay = 0
) => {
  const config = { duration: 300, easing: Easing.out(Easing.ease) };
  
  translateY.value = withDelay(delay, withTiming(0, config));
  opacity.value = withDelay(delay, withTiming(1, config));
  scale.value = withDelay(delay, withTiming(1, config));
};

export default AnimationPresets;