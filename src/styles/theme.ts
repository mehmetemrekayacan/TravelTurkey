/**
 * TravelTurkey App - Modern Design System
 * Enhanced theme with tokens integration
 */

// Import design tokens
import { ColorTokens, SemanticColors } from './tokens/colors';
import { TypographyTokens } from './tokens/typography';
import { SpacingTokens } from './tokens/spacing';
import { ShadowTokens } from './tokens/shadows';

// Re-export tokens with legacy names for backward compatibility
export const Typography = {
  ...TypographyTokens,
  // Add legacy 'fonts' property for backward compatibility
  fonts: {
    ...TypographyTokens.fontFamily,
    mono: TypographyTokens.fontFamily.mono,
  },
};

export const Colors = {
  ...ColorTokens,
  // Legacy semantic colors mapping
  semantic: ColorTokens.semantic,
  // Add legacy accent structure for backward compatibility
  accent: {
    ...ColorTokens.accent,
    // Add turquoise and gold objects for legacy compatibility
    turquoise: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },
    gold: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
  },
};

// Export semantic colors for new components
export { SemanticColors };

// Spacing System - Enhanced with tokens
export const Spacing = SpacingTokens;

// Border Radius System
export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadow System - Enhanced with tokens
export const Shadows = ShadowTokens;

// Theme Configuration
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,

  // Component-specific configurations
  components: {
    button: {
      height: {
        sm: 32,
        md: 44,
        lg: 52,
      },
      padding: {
        sm: Spacing.sm,
        md: Spacing.md,
        lg: Spacing.lg,
      },
    },

    card: {
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      shadow: Shadows.base,
    },

    input: {
      height: 48,
      padding: Spacing.md,
      borderRadius: BorderRadius.base,
      borderWidth: 1,
    },

    header: {
      height: 56,
      padding: Spacing.md,
    },
  },

  // Accessibility configurations
  accessibility: {
    // Minimum touch target size (44px recommended by Apple/Google)
    minTouchTarget: 44,

    // Color contrast ratios (WCAG 2.1 AA compliance)
    contrast: {
      normal: 4.5, // Normal text
      large: 3.0, // Large text (18pt+ or 14pt+ bold)
      nonText: 3.0, // UI components
    },
  },
};

// Utility functions for theme usage
export const getColor = (colorPath: string) => {
  const paths = colorPath.split('.');
  let result: any = Colors;

  for (const path of paths) {
    result = result[path];
    if (!result) return Colors.neutral[500]; // Fallback
  }

  return result;
};

export const getFontSize = (size: keyof typeof Typography.fontSize) => {
  return Typography.fontSize[size];
};

export const getSpacing = (size: keyof typeof Spacing) => {
  return Spacing[size];
};

// Export default theme
export default Theme;
