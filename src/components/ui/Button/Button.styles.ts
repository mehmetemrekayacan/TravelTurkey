import { StyleSheet } from 'react-native';
import { ColorTokens } from '../../../styles/tokens/colors';
import { TypographyTokens } from '../../../styles/tokens/typography';
import { SpacingTokens } from '../../../styles/tokens/spacing';
import { ShadowTokens } from '../../../styles/tokens/shadows';
import { ButtonVariant, ButtonSize } from './Button.types';

/**
 * Button component styles
 */

// Base button styles
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    ...ShadowTokens.sm,
  },
  text: {
    fontFamily: TypographyTokens.fontFamily.primary,
    fontWeight: TypographyTokens.fontWeight.semiBold,
    textAlign: 'center',
  },
  icon: {
    marginHorizontal: SpacingTokens.xs,
  },
  loading: {
    marginRight: SpacingTokens.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});

// Variant-specific styles
export const getVariantStyles = (variant: ButtonVariant): {
  container: any;
  text: any;
} => {
  switch (variant) {
    case 'primary':
      return {
        container: {
          backgroundColor: ColorTokens.primary[500],
          borderColor: ColorTokens.primary[500],
          ...ShadowTokens.md,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    
    case 'secondary':
      return {
        container: {
          backgroundColor: ColorTokens.secondary[500],
          borderColor: ColorTokens.secondary[500],
          ...ShadowTokens.md,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    
    case 'ghost':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: ColorTokens.neutral[300],
          ...ShadowTokens.none,
        },
        text: {
          color: ColorTokens.neutral[700],
        },
      };
    
    case 'danger':
      return {
        container: {
          backgroundColor: ColorTokens.semantic.error[500],
          borderColor: ColorTokens.semantic.error[500],
          ...ShadowTokens.md,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    
    default:
      return getVariantStyles('primary');
  }
};

// Size-specific styles
export const getSizeStyles = (size: ButtonSize): {
  container: any;
  text: any;
} => {
  switch (size) {
    case 'small':
      return {
        container: {
          height: 32,
          paddingHorizontal: SpacingTokens.sm,
        },
        text: {
          fontSize: TypographyTokens.fontSize.sm,
          lineHeight: TypographyTokens.fontSize.sm * TypographyTokens.lineHeight.normal,
        },
      };
    
    case 'medium':
      return {
        container: {
          height: 44,
          paddingHorizontal: SpacingTokens.md,
        },
        text: {
          fontSize: TypographyTokens.fontSize.base,
          lineHeight: TypographyTokens.fontSize.base * TypographyTokens.lineHeight.normal,
        },
      };
    
    case 'large':
      return {
        container: {
          height: 52,
          paddingHorizontal: SpacingTokens.lg,
        },
        text: {
          fontSize: TypographyTokens.fontSize.lg,
          lineHeight: TypographyTokens.fontSize.lg * TypographyTokens.lineHeight.normal,
        },
      };
    
    default:
      return getSizeStyles('medium');
  }
};