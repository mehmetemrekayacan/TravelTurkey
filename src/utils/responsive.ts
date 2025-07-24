/**
 * Responsive Utilities
 * Helper functions for responsive design in React Native
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Screen size breakpoints
export const Breakpoints = {
  xs: 0,     // Extra small devices
  sm: 576,   // Small devices
  md: 768,   // Medium devices (tablets)
  lg: 992,   // Large devices
  xl: 1200,  // Extra large devices
};

/**
 * Get current screen size category
 */
export const getScreenSize = () => {
  if (SCREEN_WIDTH >= Breakpoints.xl) return 'xl';
  if (SCREEN_WIDTH >= Breakpoints.lg) return 'lg';
  if (SCREEN_WIDTH >= Breakpoints.md) return 'md';
  if (SCREEN_WIDTH >= Breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * Check if device is a tablet
 */
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  if (Platform.OS === 'ios') {
    // iPad detection
    return (adjustedWidth >= 1024 && adjustedHeight >= 1366) || 
           (adjustedWidth >= 1366 && adjustedHeight >= 1024);
  } else {
    // Android tablet detection
    return adjustedWidth >= 1000 && adjustedHeight >= 1000;
  }
};

/**
 * Scale font size based on screen width
 */
export const scaleFontSize = (size: number) => {
  const scale = SCREEN_WIDTH / 375; // Base on iPhone X width
  const newSize = size * scale;
  
  // Limit scaling between 0.85x and 1.3x
  return Math.max(size * 0.85, Math.min(newSize, size * 1.3));
};

/**
 * Scale spacing based on screen width
 */
export const scaleSpacing = (spacing: number) => {
  const scale = SCREEN_WIDTH / 375;
  return spacing * scale;
};

/**
 * Get responsive width
 */
export const getResponsiveWidth = (percentage: number) => {
  return SCREEN_WIDTH * (percentage / 100);
};

/**
 * Get responsive height
 */
export const getResponsiveHeight = (percentage: number) => {
  return SCREEN_HEIGHT * (percentage / 100);
};

/**
 * Platform-specific values
 */
export const platformSelect = <T>(values: { ios?: T; android?: T; default: T }): T => {
  if (Platform.OS === 'ios' && values.ios !== undefined) {
    return values.ios;
  }
  if (Platform.OS === 'android' && values.android !== undefined) {
    return values.android;
  }
  return values.default;
};

/**
 * Screen size specific values
 */
export const screenSizeSelect = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  default: T;
}): T => {
  const screenSize = getScreenSize();
  
  if (values[screenSize] !== undefined) {
    return values[screenSize]!;
  }
  
  return values.default;
};

/**
 * Get safe margins for notched devices
 */
export const getSafeMargins = () => {
  return {
    top: Platform.OS === 'ios' ? 44 : 0,
    bottom: Platform.OS === 'ios' ? 34 : 0,
  };
};

/**
 * Tourism card responsive dimensions
 */
export const getTourismCardDimensions = () => {
  const isTab = isTablet();
  const screenSize = getScreenSize();
  
  if (isTab || screenSize === 'lg' || screenSize === 'xl') {
    return {
      width: getResponsiveWidth(45), // 45% width on tablets
      height: 280,
    };
  }
  
  if (screenSize === 'md') {
    return {
      width: getResponsiveWidth(48), // 48% width on medium screens
      height: 240,
    };
  }
  
  return {
    width: getResponsiveWidth(90), // 90% width on small screens
    height: 200,
  };
};

/**
 * Grid layout helper
 */
export const getGridColumns = () => {
  const screenSize = getScreenSize();
  
  return screenSizeSelect({
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    default: 2,
  });
};

// Export screen dimensions
export { SCREEN_WIDTH, SCREEN_HEIGHT };

// Export utility object
export const ResponsiveUtils = {
  getScreenSize,
  isTablet,
  scaleFontSize,
  scaleSpacing,
  getResponsiveWidth,
  getResponsiveHeight,
  platformSelect,
  screenSizeSelect,
  getSafeMargins,
  getTourismCardDimensions,
  getGridColumns,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  Breakpoints,
};

export default ResponsiveUtils;