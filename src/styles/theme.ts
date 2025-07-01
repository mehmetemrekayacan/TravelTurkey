/**
 * TravelTurkey App - Modern Design System
 * Turkey-themed color palette and typography optimized for mobile
 */

// Typography System - Google Fonts optimized for mobile
export const Typography = {
  // Font Families
  fonts: {
    primary: 'Poppins', // Modern, readable sans-serif
    secondary: 'Inter', // Clean, technical font
    accent: 'Playfair Display', // Elegant serif for special occasions
    mono: 'JetBrains Mono', // Monospace for code/technical content
  },

  // Font Sizes (following 8-point grid system)
  fontSize: {
    xs: 12, // Captions, helper text
    sm: 14, // Small text, secondary info
    base: 16, // Body text, default
    lg: 18, // Large body text
    xl: 20, // Section headers
    '2xl': 24, // Page titles
    '3xl': 28, // Hero titles
    '4xl': 32, // Display titles
    '5xl': 36, // Large displays
    '6xl': 48, // Hero displays
  },

  // Font Weights (React Native compatible)
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },

  // Line Heights (for better readability)
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Enhanced Color Palette - Turkey-themed with modern accessibility
export const Colors = {
  // Primary Colors - Turkish Identity
  primary: {
    50: '#FEF2F2', // Very light red
    100: '#FEE2E2', // Light red
    200: '#FECACA', // Lighter red
    300: '#FCA5A5', // Light medium red
    400: '#F87171', // Medium red
    500: '#EF4444', // Turkish flag red (main)
    600: '#DC2626', // Darker red
    700: '#B91C1C', // Dark red
    800: '#991B1B', // Very dark red
    900: '#7F1D1D', // Darkest red
  },

  // Secondary Colors - Bosphorus Blue
  secondary: {
    50: '#EFF6FF', // Very light blue
    100: '#DBEAFE', // Light blue
    200: '#BFDBFE', // Lighter blue
    300: '#93C5FD', // Light medium blue
    400: '#60A5FA', // Medium blue
    500: '#3B82F6', // Bosphorus blue (main)
    600: '#2563EB', // Darker blue
    700: '#1D4ED8', // Dark blue
    800: '#1E40AF', // Very dark blue
    900: '#1E3A8A', // Darkest blue
  },

  // Accent Colors - Turkish Culture
  accent: {
    // Aegean Turquoise
    turquoise: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6', // Main turquoise
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },

    // Cappadocia Orange
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316', // Main orange
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },

    // Golden Horn Gold
    gold: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B', // Main gold
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
  },

  // Neutral Colors - Modern & Clean
  neutral: {
    50: '#F8FAFC', // Almost white
    100: '#F1F5F9', // Very light gray
    200: '#E2E8F0', // Light gray
    300: '#CBD5E1', // Medium light gray
    400: '#94A3B8', // Medium gray
    500: '#64748B', // Base gray
    600: '#475569', // Medium dark gray
    700: '#334155', // Dark gray
    800: '#1E293B', // Very dark gray
    900: '#0F172A', // Almost black
  },

  // Semantic Colors - System States
  semantic: {
    success: {
      50: '#F0FDF4',
      500: '#22C55E', // Success green
      600: '#16A34A',
      700: '#15803D',
    },
    warning: {
      50: '#FFFBEB',
      500: '#F59E0B', // Warning amber
      600: '#D97706',
      700: '#B45309',
    },
    error: {
      50: '#FEF2F2',
      500: '#EF4444', // Error red
      600: '#DC2626',
      700: '#B91C1C',
    },
    info: {
      50: '#EFF6FF',
      500: '#3B82F6', // Info blue
      600: '#2563EB',
      700: '#1D4ED8',
    },
  },
};

// Spacing System - 8-point grid
export const Spacing = {
  xs: 4, // 0.25rem
  sm: 8, // 0.5rem
  md: 16, // 1rem (base)
  lg: 24, // 1.5rem
  xl: 32, // 2rem
  '2xl': 48, // 3rem
  '3xl': 64, // 4rem
  '4xl': 80, // 5rem
  '5xl': 96, // 6rem
};

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

// Shadow System
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
};

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
