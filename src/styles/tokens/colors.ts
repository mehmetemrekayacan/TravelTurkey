/**
 * Color Tokens - Modern Turkish Tourism Theme
 * Enhanced color system for TravelTurkey app with accessibility compliance
 */

export const ColorTokens = {
  // Primary Colors - Turkish Red (Enhanced)
  primary: {
    50: '#FEF2F2',
    100: '#FEE2E2', 
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#DC2626', // Turkish Red - Main
    600: '#B91C1C',
    700: '#991B1B', 
    800: '#7F1D1D',
    900: '#7F1D1D'
  },

  // Secondary Colors - Bosphorus Blue (Enhanced)
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE', 
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#1E3A8A', // Bosphorus Blue - Main
    600: '#1D4ED8',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#1E3A8A'
  },

  // Accent Colors - Turkish Tourism Themed
  accent: {
    bosphorus: '#0EA5E9',     // Bosphorus waters
    cappadocia: '#EA580C',    // Cappadocia rocks
    golden: '#F59E0B',        // Golden Horn
    turkish_green: '#059669'  // Turkish nature
  },

  // Neutral Colors - Modern & Clean
  neutral: {
    50: '#F8FAFC',   // Almost white
    100: '#F1F5F9',  // Very light gray
    200: '#E2E8F0',  // Light gray
    300: '#CBD5E1',  // Medium light gray
    400: '#94A3B8',  // Medium gray
    500: '#64748B',  // Base gray
    600: '#475569',  // Medium dark gray
    700: '#334155',  // Dark gray
    800: '#1E293B',  // Very dark gray
    900: '#0F172A'   // Almost black
  },

  // Semantic Colors - System States
  semantic: {
    success: {
      50: '#F0FDF4',
      500: '#22C55E',
      600: '#16A34A', 
      700: '#15803D'
    },
    warning: {
      50: '#FFFBEB',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309'
    },
    error: {
      50: '#FEF2F2',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C'
    },
    info: {
      50: '#EFF6FF',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8'
    }
  }
};

// Semantic Color Mappings
export const SemanticColors = {
  // Surface colors
  surface: {
    background: ColorTokens.neutral[50],
    card: '#FFFFFF',
    modal: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },

  // Content colors
  content: {
    primary: ColorTokens.neutral[900],
    secondary: ColorTokens.neutral[600],
    disabled: ColorTokens.neutral[400],
    inverse: '#FFFFFF'
  },

  // Border colors
  border: {
    default: ColorTokens.neutral[200],
    focus: ColorTokens.primary[500],
    error: ColorTokens.semantic.error[500],
    success: ColorTokens.semantic.success[500]
  },

  // Status colors
  status: {
    success: ColorTokens.semantic.success[500],
    warning: ColorTokens.semantic.warning[500],
    error: ColorTokens.semantic.error[500],
    info: ColorTokens.semantic.info[500]
  }
};

export default ColorTokens;