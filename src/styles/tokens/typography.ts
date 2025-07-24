/**
 * Typography Tokens - Modern Design System
 * Comprehensive typography system for TravelTurkey app with Turkish character support
 */

export const TypographyTokens = {
  // Font Families
  fontFamily: {
    primary: 'Poppins',        // Modern, readable sans-serif
    secondary: 'Inter',        // Clean, technical font  
    accent: 'Playfair Display', // Elegant serif for special occasions
    mono: 'JetBrains Mono'     // Monospace for code/technical content
  },

  // Font Sizes (following 8-point grid system)
  fontSize: {
    xs: 12,   // Captions, helper text
    sm: 14,   // Small text, secondary info
    base: 16, // Body text, default
    lg: 18,   // Large body text
    xl: 20,   // Section headers
    '2xl': 24, // Page titles
    '3xl': 28, // Hero titles
    '4xl': 32, // Display titles
    '5xl': 36  // Large displays
  },

  // Font Weights (React Native compatible)
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const
  },

  // Line Heights (for better readability)
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1
  }
};

export default TypographyTokens;