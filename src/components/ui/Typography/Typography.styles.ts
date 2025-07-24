import { StyleSheet } from 'react-native';
import { TypographyTokens } from '../../../styles/tokens/typography';
import { ColorTokens, SemanticColors } from '../../../styles/tokens/colors';
import { TypographyVariant, TextAlign, TextColor } from './Typography.types';

/**
 * Typography component styles
 */

export const styles = StyleSheet.create({
  base: {
    fontFamily: TypographyTokens.fontFamily.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  italic: {
    fontStyle: 'italic',
  },
  interactive: {
    // Add subtle opacity change for interactive text
  },
});

// Variant-specific styles
export const getVariantStyles = (variant: TypographyVariant): any => {
  switch (variant) {
    case 'heading1':
      return {
        fontSize: TypographyTokens.fontSize['4xl'],
        lineHeight: TypographyTokens.fontSize['4xl'] * TypographyTokens.lineHeight.tight,
        fontWeight: TypographyTokens.fontWeight.bold,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.tight,
      };
    
    case 'heading2':
      return {
        fontSize: TypographyTokens.fontSize['3xl'],
        lineHeight: TypographyTokens.fontSize['3xl'] * TypographyTokens.lineHeight.tight,
        fontWeight: TypographyTokens.fontWeight.bold,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.tight,
      };
    
    case 'heading3':
      return {
        fontSize: TypographyTokens.fontSize['2xl'],
        lineHeight: TypographyTokens.fontSize['2xl'] * TypographyTokens.lineHeight.normal,
        fontWeight: TypographyTokens.fontWeight.semiBold,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.normal,
      };
    
    case 'bodyLarge':
      return {
        fontSize: TypographyTokens.fontSize.lg,
        lineHeight: TypographyTokens.fontSize.lg * TypographyTokens.lineHeight.normal,
        fontWeight: TypographyTokens.fontWeight.normal,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.normal,
      };
    
    case 'bodyMedium':
      return {
        fontSize: TypographyTokens.fontSize.base,
        lineHeight: TypographyTokens.fontSize.base * TypographyTokens.lineHeight.normal,
        fontWeight: TypographyTokens.fontWeight.normal,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.normal,
      };
    
    case 'bodySmall':
      return {
        fontSize: TypographyTokens.fontSize.sm,
        lineHeight: TypographyTokens.fontSize.sm * TypographyTokens.lineHeight.normal,
        fontWeight: TypographyTokens.fontWeight.normal,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.normal,
      };
    
    case 'caption':
      return {
        fontSize: TypographyTokens.fontSize.xs,
        lineHeight: TypographyTokens.fontSize.xs * TypographyTokens.lineHeight.normal,
        fontWeight: TypographyTokens.fontWeight.normal,
        fontFamily: TypographyTokens.fontFamily.secondary,
        letterSpacing: TypographyTokens.letterSpacing.wide,
      };
    
    case 'label':
      return {
        fontSize: TypographyTokens.fontSize.sm,
        lineHeight: TypographyTokens.fontSize.sm * TypographyTokens.lineHeight.normal,
        fontWeight: TypographyTokens.fontWeight.medium,
        fontFamily: TypographyTokens.fontFamily.primary,
        letterSpacing: TypographyTokens.letterSpacing.wide,
      };
    
    default:
      return getVariantStyles('bodyMedium');
  }
};

// Text alignment styles
export const getAlignmentStyles = (align: TextAlign) => {
  return {
    textAlign: align,
  };
};

// Text color styles
export const getColorStyles = (color: TextColor) => {
  switch (color) {
    case 'primary':
      return { color: SemanticColors.content.primary };
    
    case 'secondary':
      return { color: SemanticColors.content.secondary };
    
    case 'disabled':
      return { color: SemanticColors.content.disabled };
    
    case 'inverse':
      return { color: SemanticColors.content.inverse };
    
    case 'error':
      return { color: ColorTokens.semantic.error[600] };
    
    case 'success':
      return { color: ColorTokens.semantic.success[600] };
    
    case 'warning':
      return { color: ColorTokens.semantic.warning[600] };
    
    default:
      return { color: SemanticColors.content.primary };
  }
};

// Font weight styles
export const getFontWeightStyles = (weight: keyof typeof TypographyTokens.fontWeight) => {
  return {
    fontWeight: TypographyTokens.fontWeight[weight],
  };
};

// Font family styles
export const getFontFamilyStyles = (family: keyof typeof TypographyTokens.fontFamily) => {
  return {
    fontFamily: TypographyTokens.fontFamily[family],
  };
};