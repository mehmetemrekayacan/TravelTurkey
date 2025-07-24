import { StyleSheet, Dimensions } from 'react-native';
import { ColorTokens } from '../../../styles/tokens/colors';
import { SpacingTokens } from '../../../styles/tokens/spacing';
import { ShadowTokens } from '../../../styles/tokens/shadows';
import { TypographyTokens } from '../../../styles/tokens/typography';
import { CardVariant, CardSize, ImageLayout } from './Card.types';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Card component styles
 */

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: SpacingTokens.md,
  },
  header: {
    marginBottom: SpacingTokens.sm,
  },
  footer: {
    marginTop: SpacingTokens.sm,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  badge: {
    position: 'absolute',
    backgroundColor: ColorTokens.primary[500],
    paddingHorizontal: SpacingTokens.sm,
    paddingVertical: SpacingTokens.xs,
    borderRadius: 12,
    zIndex: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: TypographyTokens.fontSize.xs,
    fontWeight: TypographyTokens.fontWeight.semiBold,
    fontFamily: TypographyTokens.fontFamily.primary,
  },
  badgeTopLeft: {
    top: SpacingTokens.sm,
    left: SpacingTokens.sm,
  },
  badgeTopRight: {
    top: SpacingTokens.sm,
    right: SpacingTokens.sm,
  },
  badgeBottomLeft: {
    bottom: SpacingTokens.sm,
    left: SpacingTokens.sm,
  },
  badgeBottomRight: {
    bottom: SpacingTokens.sm,
    right: SpacingTokens.sm,
  },
  horizontalLayout: {
    flexDirection: 'row',
  },
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: SpacingTokens.md,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  disabled: {
    opacity: 0.6,
  },
  tourismCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  tourismContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: SpacingTokens.md,
  },
  tourismTitle: {
    color: '#FFFFFF',
    fontSize: TypographyTokens.fontSize.lg,
    fontWeight: TypographyTokens.fontWeight.bold,
    fontFamily: TypographyTokens.fontFamily.primary,
    marginBottom: SpacingTokens.xs,
  },
  tourismSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: TypographyTokens.fontSize.sm,
    fontFamily: TypographyTokens.fontFamily.primary,
  },
});

// Variant-specific styles
export const getVariantStyles = (variant: CardVariant) => {
  switch (variant) {
    case 'elevated':
      return {
        container: {
          ...ShadowTokens.lg,
          borderWidth: 0,
        },
      };
    
    case 'outlined':
      return {
        container: {
          borderWidth: 1,
          borderColor: ColorTokens.neutral[200],
          ...ShadowTokens.none,
        },
      };
    
    case 'tourism':
      return {
        container: {
          ...ShadowTokens.md,
          borderRadius: 16,
        },
      };
    
    default:
      return {
        container: {
          ...ShadowTokens.base,
        },
      };
  }
};

// Size-specific styles
export const getSizeStyles = (size: CardSize): {
  container: any;
  content: any;
  image: any;
} => {
  switch (size) {
    case 'small':
      return {
        container: {
          maxWidth: screenWidth * 0.4,
        },
        content: {
          padding: SpacingTokens.sm,
        },
        image: {
          height: 120,
        },
      };
    
    case 'medium':
      return {
        container: {
          maxWidth: screenWidth * 0.7,
        },
        content: {
          padding: SpacingTokens.md,
        },
        image: {
          height: 180,
        },
      };
    
    case 'large':
      return {
        container: {
          width: '100%',
        },
        content: {
          padding: SpacingTokens.lg,
        },
        image: {
          height: 240,
        },
      };
    
    default:
      return getSizeStyles('medium');
  }
};

// Image layout styles
export const getImageLayoutStyles = (layout: ImageLayout) => {
  switch (layout) {
    case 'left':
      return {
        container: {
          flexDirection: 'row' as const,
        },
        image: {
          width: 120,
          height: '100%',
        },
        content: {
          flex: 1,
        },
      };
    
    case 'right':
      return {
        container: {
          flexDirection: 'row-reverse' as const,
        },
        image: {
          width: 120,
          height: '100%',
        },
        content: {
          flex: 1,
        },
      };
    
    case 'background':
      return {
        image: {
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        content: {
          backgroundColor: 'transparent',
        },
      };
    
    default: // 'top'
      return {
        image: {
          width: '100%',
        },
      };
  }
};