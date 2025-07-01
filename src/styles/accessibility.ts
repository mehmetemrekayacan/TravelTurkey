/**
 * TravelTurkey App - Accessibility Utilities
 * WCAG 2.1 AA compliant accessibility helpers
 */

import { Theme } from './theme';

// Color contrast calculation (WCAG 2.1)
export const calculateContrastRatio = (
  color1: string,
  color2: string,
): number => {
  const getLuminance = (color: string): number => {
    // Remove # if present
    const hex = color.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Apply gamma correction
    const gammaCorrect = (value: number) => {
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    };

    const rCorrect = gammaCorrect(r);
    const gCorrect = gammaCorrect(g);
    const bCorrect = gammaCorrect(b);

    // Calculate relative luminance
    return 0.2126 * rCorrect + 0.7152 * gCorrect + 0.0722 * bCorrect;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Check if color combination meets WCAG standards
export const meetsContrastRequirement = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal',
): boolean => {
  const ratio = calculateContrastRatio(foreground, background);

  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }

  // AA level (default)
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
};

// Get accessible text color for a background
export const getAccessibleTextColor = (
  backgroundColor: string,
  preferredColor?: string,
): string => {
  const colors = Theme.colors;

  if (
    preferredColor &&
    meetsContrastRequirement(preferredColor, backgroundColor)
  ) {
    return preferredColor;
  }

  // Try white first
  if (meetsContrastRequirement(colors.neutral[50], backgroundColor)) {
    return colors.neutral[50];
  }

  // Try black
  if (meetsContrastRequirement(colors.neutral[900], backgroundColor)) {
    return colors.neutral[900];
  }

  // Try neutral colors
  const neutralColors = [
    colors.neutral[100],
    colors.neutral[200],
    colors.neutral[700],
    colors.neutral[800],
  ];

  for (const color of neutralColors) {
    if (meetsContrastRequirement(color, backgroundColor)) {
      return color;
    }
  }

  // Fallback
  return colors.neutral[900];
};

// Common accessibility props for different component types
export const AccessibilityHelpers = {
  // Button accessibility
  button: (label: string, hint?: string, disabled: boolean = false) => ({
    accessible: true,
    accessibilityRole: 'button' as const,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState: { disabled },
  }),

  // Link accessibility
  link: (label: string, hint?: string) => ({
    accessible: true,
    accessibilityRole: 'link' as const,
    accessibilityLabel: label,
    accessibilityHint: hint || 'Double tap to open',
  }),

  // Header accessibility
  header: (title: string) => ({
    accessible: true,
    accessibilityRole: 'header' as const,
    accessibilityLabel: title,
  }),

  // Image accessibility
  image: (description: string, decorative: boolean = false) => ({
    accessible: !decorative,
    accessibilityRole: 'image' as const,
    accessibilityLabel: decorative ? undefined : description,
  }),

  // Text input accessibility
  textInput: (
    label: string,
    value?: string,
    placeholder?: string,
    _error?: string,
  ) => ({
    accessible: true,
    accessibilityRole: 'text' as const,
    accessibilityLabel: label,
    accessibilityValue: value ? { text: value } : undefined,
    accessibilityHint: placeholder,
  }),

  // Tab accessibility
  tab: (label: string, selected: boolean, index: number, total: number) => ({
    accessible: true,
    accessibilityRole: 'tab' as const,
    accessibilityLabel: `${label}, tab ${index + 1} of ${total}`,
    accessibilityState: { selected },
  }),

  // List item accessibility
  listItem: (
    label: string,
    position?: { index: number; total: number },
    hint?: string,
  ) => ({
    accessible: true,
    accessibilityRole: 'button' as const,
    accessibilityLabel: position
      ? `${label}, item ${position.index + 1} of ${position.total}`
      : label,
    accessibilityHint: hint || 'Double tap to select',
  }),

  // Search accessibility
  search: (
    placeholder: string = 'Search',
    value?: string,
    resultsCount?: number,
  ) => ({
    accessible: true,
    accessibilityRole: 'search' as const,
    accessibilityLabel: 'Search input',
    accessibilityHint: placeholder,
    accessibilityValue: value ? { text: value } : undefined,
    ...(resultsCount !== undefined && {
      accessibilityLiveRegion: 'polite' as const,
      accessibilityLabel: `Search input, ${resultsCount} results found`,
    }),
  }),

  // Modal accessibility
  modal: (title: string, description?: string) => ({
    accessible: true,
    accessibilityLabel: title,
    accessibilityHint: description,
    accessibilityViewIsModal: true,
  }),

  // Loading accessibility
  loading: (message: string = 'Loading') => ({
    accessible: true,
    accessibilityLabel: message,
    accessibilityLiveRegion: 'polite' as const,
  }),
};

// Touch target utilities
export const TouchTargets = {
  // Minimum touch target size (44pt recommended)
  minSize: Theme.accessibility.minTouchTarget,

  // Ensure minimum touch target
  ensureMinimumSize: (size: number) => Math.max(size, TouchTargets.minSize),

  // Calculate touch target padding
  calculatePadding: (contentSize: number) => {
    const minSize = TouchTargets.minSize;
    if (contentSize >= minSize) return 0;
    return (minSize - contentSize) / 2;
  },
};

// Font scaling utilities for accessibility
export const FontScaling = {
  // Get scaled font size based on user preferences
  getScaledFontSize: (baseSize: number, maxScale: number = 1.5): number => {
    // In a real app, you'd get the actual font scale from system settings
    // For now, return the base size
    return Math.min(baseSize * 1, baseSize * maxScale);
  },

  // Check if large text is enabled
  isLargeTextEnabled: (): boolean => {
    // In a real app, check system accessibility settings
    return false;
  },
};

// Screen reader utilities
export const ScreenReader = {
  // Announce changes to screen reader users
  announce: (message: string): void => {
    // Implementation would depend on platform-specific screen reader APIs
    console.log(`Screen reader announcement: ${message}`);
  },

  // Check if screen reader is active
  isEnabled: (): boolean => {
    // In a real app, check if screen reader is active
    return false;
  },
};

// Focus management utilities
export const FocusManagement = {
  // Set focus to an element
  setFocus: (ref: any): void => {
    if (ref && ref.current && ref.current.focus) {
      ref.current.focus();
    }
  },

  // Manage focus for modals
  trapFocus: (_containerRef: any): void => {
    // Implementation for focus trapping in modals
    // This would prevent focus from leaving the modal
  },
};

// Color accessibility utilities
export const ColorAccessibility = {
  // Pre-validated color combinations
  combinations: {
    // High contrast combinations
    highContrast: {
      lightOnDark: {
        background: Theme.colors.neutral[900],
        text: Theme.colors.neutral[50],
        contrast: calculateContrastRatio(
          Theme.colors.neutral[50],
          Theme.colors.neutral[900],
        ),
      },
      darkOnLight: {
        background: Theme.colors.neutral[50],
        text: Theme.colors.neutral[900],
        contrast: calculateContrastRatio(
          Theme.colors.neutral[900],
          Theme.colors.neutral[50],
        ),
      },
    },

    // Brand color combinations (pre-validated)
    brand: {
      primaryOnWhite: {
        background: Theme.colors.neutral[50],
        text: Theme.colors.primary[600],
        contrast: calculateContrastRatio(
          Theme.colors.primary[600],
          Theme.colors.neutral[50],
        ),
      },
      whiteOnPrimary: {
        background: Theme.colors.primary[500],
        text: Theme.colors.neutral[50],
        contrast: calculateContrastRatio(
          Theme.colors.neutral[50],
          Theme.colors.primary[500],
        ),
      },
    },
  },

  // Get accessible color variant
  getAccessibleVariant: (
    baseColor: keyof typeof Theme.colors.primary,
    background: string,
  ): string => {
    const colorShades = Theme.colors.primary;
    const shadeKeys = [
      50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
    ] as const;

    for (const shade of shadeKeys) {
      const color = colorShades[shade];
      if (
        typeof color === 'string' &&
        meetsContrastRequirement(color, background)
      ) {
        return color;
      }
    }

    return Theme.colors.neutral[900]; // Fallback
  },
};

export default {
  calculateContrastRatio,
  meetsContrastRequirement,
  getAccessibleTextColor,
  AccessibilityHelpers,
  TouchTargets,
  FontScaling,
  ScreenReader,
  FocusManagement,
  ColorAccessibility,
};
