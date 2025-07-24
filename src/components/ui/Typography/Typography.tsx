import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  TypographyProps,
  HeadingProps,
  BodyProps,
  CaptionProps,
  LabelProps,
} from './Typography.types';
import {
  styles,
  getVariantStyles,
  getAlignmentStyles,
  getColorStyles,
  getFontWeightStyles,
  getFontFamilyStyles,
} from './Typography.styles';

/**
 * Modern Typography Component
 * 
 * A comprehensive typography system with semantic naming and Turkish character support.
 * Includes heading variants, body text variants, captions, and labels.
 * 
 * Features:
 * - Semantic text variants (Heading1-3, BodyLarge/Medium/Small, Caption, Label)
 * - Turkish character support
 * - Consistent typography scale
 * - Accessibility compliant
 * - Interactive text support
 * - Color variants for different contexts
 * - Customizable font weights and families
 * 
 * @example
 * ```tsx
 * <Heading1>Türkiye'yi Keşfet</Heading1>
 * <BodyMedium color="secondary">
 *   En güzel destinasyonları keşfedin
 * </BodyMedium>
 * ```
 */

// Base Typography Component
export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'bodyMedium',
  color = 'primary',
  align = 'left',
  style,
  numberOfLines,
  accessibilityLabel,
  testID,
  selectable = false,
  weight,
  fontFamily,
  onPress,
  underline = false,
  italic = false,
}) => {
  const variantStyles = getVariantStyles(variant);
  const alignmentStyles = getAlignmentStyles(align);
  const colorStyles = getColorStyles(color);
  const weightStyles = weight ? getFontWeightStyles(weight) : {};
  const familyStyles = fontFamily ? getFontFamilyStyles(fontFamily) : {};

  const combinedStyles = [
    styles.base,
    variantStyles,
    alignmentStyles,
    colorStyles,
    weightStyles,
    familyStyles,
    underline && styles.underline,
    italic && styles.italic,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        <Text
          style={combinedStyles}
          numberOfLines={numberOfLines}
          selectable={selectable}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text
      style={combinedStyles}
      numberOfLines={numberOfLines}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      selectable={selectable}
    >
      {children}
    </Text>
  );
};

// Semantic Heading Components
export const Heading1: React.FC<HeadingProps> = (props) => (
  <Typography variant="heading1" {...props} />
);

export const Heading2: React.FC<HeadingProps> = (props) => (
  <Typography variant="heading2" {...props} />
);

export const Heading3: React.FC<HeadingProps> = (props) => (
  <Typography variant="heading3" {...props} />
);

// Semantic Body Components
export const BodyLarge: React.FC<BodyProps> = (props) => (
  <Typography variant="bodyLarge" {...props} />
);

export const BodyMedium: React.FC<BodyProps> = (props) => (
  <Typography variant="bodyMedium" {...props} />
);

export const BodySmall: React.FC<BodyProps> = (props) => (
  <Typography variant="bodySmall" {...props} />
);

// Semantic Utility Components
export const Caption: React.FC<CaptionProps> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Label: React.FC<LabelProps> = (props) => (
  <Typography variant="label" {...props} />
);

// Export all components
export default Typography;