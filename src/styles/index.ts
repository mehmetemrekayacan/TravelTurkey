/**
 * TravelTurkey App - Design System Index
 * Complete design system exports for easy importing
 */

// Core design system
export { default as Theme } from './theme';
export * from './theme';

// Typography system
export { default as TextStyles } from './typography';
export * from './typography';

// Component styles
export { default as ComponentStyles } from './components';
export * from './components';

// Accessibility utilities
export { default as Accessibility } from './accessibility';
export * from './accessibility';

// Legacy support (for gradual migration)
export { GlobalStyles } from './GlobalStyles';

// Design tokens for easy access
export const DesignTokens = {
  // Colors
  colors: {
    // Primary brand colors
    primary: '#EF4444',      // Turkish flag red
    secondary: '#3B82F6',    // Bosphorus blue
    accent: '#14B8A6',       // Aegean turquoise
    
    // Semantic colors
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Neutral colors
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
  },
  
  // Spacing (8pt grid system)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Typography
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Border radius
  borderRadius: {
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  // Shadows
  shadows: {
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
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 12,
    },
  },
};

// Quick access utilities
export const Colors = DesignTokens.colors;
export const Spacing = DesignTokens.spacing;
export const Typography = DesignTokens.typography;
export const BorderRadius = DesignTokens.borderRadius;
export const Shadows = DesignTokens.shadows;

// Component presets for rapid development
export const QuickStyles = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  
  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadows.base,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Text styles
  heading: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.text,
    lineHeight: Typography.fontSizes.xxl * Typography.lineHeights.tight,
  },
  
  body: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.normal,
    color: Colors.text,
    lineHeight: Typography.fontSizes.base * Typography.lineHeights.normal,
  },
  
  caption: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.normal,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSizes.sm * Typography.lineHeights.normal,
  },
  
  // Input styles
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.fontSizes.base,
    color: Colors.text,
  },
};

export default DesignTokens;
