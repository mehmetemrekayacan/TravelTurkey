/**
 * TravelTurkey App - Typography Utilities
 * Pre-defined text styles for consistent typography
 */

import { TextStyle } from 'react-native';
import { Theme } from './theme';

// Text Style Presets
export const TextStyles: { [key: string]: TextStyle } = {
  // Display styles (for hero sections)
  displayLarge: {
    fontFamily: Theme.typography.fonts.primary,
    fontSize: Theme.typography.fontSize['6xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.fontSize['6xl'] * Theme.typography.lineHeight.tight,
    letterSpacing: Theme.typography.letterSpacing.tight,
    color: Theme.colors.neutral[900],
  },

  displayMedium: {
    fontFamily: Theme.typography.fonts.primary,
    fontSize: Theme.typography.fontSize['4xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.fontSize['4xl'] * Theme.typography.lineHeight.tight,
    letterSpacing: Theme.typography.letterSpacing.tight,
    color: Theme.colors.neutral[900],
  },

  displaySmall: {
    fontFamily: Theme.typography.fonts.primary,
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize['3xl'] * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[900],
  },

  // Heading styles
  heading1: {
    fontFamily: Theme.typography.fonts.primary,
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.fontSize['2xl'] * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[900],
  },

  heading2: {
    fontFamily: Theme.typography.fonts.primary,
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize.xl * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[800],
  },

  heading3: {
    fontFamily: Theme.typography.fonts.primary,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize.lg * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[800],
  },

  // Body text styles
  bodyLarge: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.normal,
    lineHeight: Theme.typography.fontSize.lg * Theme.typography.lineHeight.relaxed,
    color: Theme.colors.neutral[700],
  },

  bodyMedium: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.normal,
    lineHeight: Theme.typography.fontSize.base * Theme.typography.lineHeight.relaxed,
    color: Theme.colors.neutral[700],
  },

  bodySmall: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.normal,
    lineHeight: Theme.typography.fontSize.sm * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[600],
  },

  // Label styles
  labelLarge: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.base * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[800],
  },

  labelMedium: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.sm * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[700],
  },

  labelSmall: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.xs * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[600],
  },

  // Button text styles
  buttonLarge: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize.base * Theme.typography.lineHeight.normal,
    letterSpacing: Theme.typography.letterSpacing.wide,
    textAlign: 'center' as const,
  },

  buttonMedium: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize.sm * Theme.typography.lineHeight.normal,
    letterSpacing: Theme.typography.letterSpacing.wide,
    textAlign: 'center' as const,
  },

  buttonSmall: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.xs * Theme.typography.lineHeight.normal,
    letterSpacing: Theme.typography.letterSpacing.normal,
    textAlign: 'center' as const,
  },

  // Caption styles
  caption: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.normal,
    lineHeight: Theme.typography.fontSize.xs * Theme.typography.lineHeight.normal,
    color: Theme.colors.neutral[500],
  },

  // Accent styles (for special text like quotes, decorative elements)
  accent: {
    fontFamily: Theme.typography.fonts.accent,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.normal,
    lineHeight: Theme.typography.fontSize.lg * Theme.typography.lineHeight.relaxed,
    fontStyle: 'italic' as const,
    color: Theme.colors.primary[600],
  },

  // Error text
  error: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.sm * Theme.typography.lineHeight.normal,
    color: Theme.colors.semantic.error[500],
  },

  // Success text
  success: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.sm * Theme.typography.lineHeight.normal,
    color: Theme.colors.semantic.success[500],
  },

  // Link text
  link: {
    fontFamily: Theme.typography.fonts.secondary,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.base * Theme.typography.lineHeight.normal,
    color: Theme.colors.secondary[600],
    textDecorationLine: 'underline' as const,
  },
};

// Typography utility functions
export const createTextStyle = (
  baseStyle: keyof typeof TextStyles,
  overrides?: Partial<TextStyle>
): TextStyle => {
  return {
    ...TextStyles[baseStyle],
    ...overrides,
  };
};

// Responsive text scaling utility
export const getResponsiveText = (
  baseSize: number,
  scaleFactor: number = 1
): number => {
  return Math.round(baseSize * scaleFactor);
};

// Text color utilities
export const getTextColor = (
  variant: 'primary' | 'secondary' | 'disabled' | 'error' | 'success' | 'warning' | 'info'
) => {
  switch (variant) {
    case 'primary':
      return Theme.colors.neutral[900];
    case 'secondary':
      return Theme.colors.neutral[600];
    case 'disabled':
      return Theme.colors.neutral[400];
    case 'error':
      return Theme.colors.semantic.error[500];
    case 'success':
      return Theme.colors.semantic.success[500];
    case 'warning':
      return Theme.colors.semantic.warning[500];
    case 'info':
      return Theme.colors.secondary[600];
    default:
      return Theme.colors.neutral[700];
  }
};

export default TextStyles;
