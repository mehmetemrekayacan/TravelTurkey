import { StyleSheet } from 'react-native';
import { TypographyTokens } from '../../../styles/tokens/typography';
import { SemanticColors } from '../../../styles/tokens/colors';
import { IconSize } from './Icon.types';

/**
 * Icon component styles and mappings
 */

export const styles = StyleSheet.create({
  icon: {
    fontFamily: TypographyTokens.fontFamily.primary,
    textAlign: 'center',
    includeFontPadding: false,
  },
  interactive: {
    // Add interactive styles if needed
  },
});

// Size mappings
export const getSizeStyles = (size: IconSize | number): {
  fontSize: number;
  lineHeight: number;
} => {
  if (typeof size === 'number') {
    return {
      fontSize: size,
      lineHeight: size,
    };
  }

  switch (size) {
    case 'xs':
      return {
        fontSize: 12,
        lineHeight: 12,
      };
    case 'sm':
      return {
        fontSize: 16,
        lineHeight: 16,
      };
    case 'md':
      return {
        fontSize: 20,
        lineHeight: 20,
      };
    case 'lg':
      return {
        fontSize: 24,
        lineHeight: 24,
      };
    case 'xl':
      return {
        fontSize: 32,
        lineHeight: 32,
      };
    default:
      return getSizeStyles('md');
  }
};

// Default color
export const getDefaultColor = () => SemanticColors.content.primary;