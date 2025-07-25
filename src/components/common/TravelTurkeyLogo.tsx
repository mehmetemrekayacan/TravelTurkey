import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

// Logo PNG import
const APP_ICON = require('../../assets/icons/app-icon.png');

export type LogoVariant = 'horizontal' | 'vertical' | 'icon' | 'iconOnly';
export type LogoSize = 'small' | 'medium' | 'large' | 'xlarge';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  style?: any;
  width?: number;
  height?: number;
}

const sizeMap = {
  small: {
    horizontal: { width: 150, height: 38 },
    vertical: { width: 90, height: 70 },
    icon: { width: 50, height: 50 },
  },
  medium: {
    horizontal: { width: 200, height: 50 },
    vertical: { width: 135, height: 105 },
    icon: { width: 75, height: 75 },
  },
  large: {
    horizontal: { width: 300, height: 75 },
    vertical: { width: 180, height: 140 },
    icon: { width: 100, height: 100 },
  },
  xlarge: {
    horizontal: { width: 400, height: 100 },
    vertical: { width: 225, height: 175 },
    icon: { width: 125, height: 125 },
  },
};

export const TravelTurkeyLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'medium',
  style,
  width,
  height,
}) => {
  const getDimensions = () => {
    if (width && height) {
      return { width, height };
    }

    const variantKey = variant === 'iconOnly' ? 'icon' : variant;
    const dimensions =
      sizeMap[size][variantKey as keyof (typeof sizeMap)[typeof size]];

    // For horizontal and vertical variants, we show both icon and text
    // For icon and iconOnly variants, we show just the icon
    if (variant === 'icon' || variant === 'iconOnly') {
      return dimensions;
    }

    // For horizontal and vertical, adjust dimensions appropriately
    return dimensions;
  };

  const dimensions = getDimensions();

  // For icon-only variants, show just the app icon
  if (variant === 'icon' || variant === 'iconOnly') {
    return (
      <View style={[styles.container, style]}>
        <Image
          source={APP_ICON}
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
          resizeMode='contain'
        />
      </View>
    );
  }

  // For horizontal and vertical variants with text
  return (
    <View style={[styles.container, style]}>
      <View
        style={
          variant === 'vertical'
            ? styles.verticalLayout
            : styles.horizontalLayout
        }
      >
        <Image
          source={APP_ICON}
          style={{
            width:
              variant === 'vertical'
                ? dimensions.height * 0.4
                : dimensions.height * 0.8,
            height:
              variant === 'vertical'
                ? dimensions.height * 0.4
                : dimensions.height * 0.8,
          }}
          resizeMode='contain'
        />
        {variant === 'vertical' ? (
          <View style={styles.verticalText}>
            <Text
              style={[
                styles.text,
                styles.travelText,
                { fontSize: dimensions.height * 0.12 },
              ]}
            >
              Travel
            </Text>
            <Text
              style={[
                styles.text,
                styles.turkeyText,
                { fontSize: dimensions.height * 0.12 },
              ]}
            >
              Turkey
            </Text>
          </View>
        ) : (
          <View style={styles.horizontalText}>
            <Text
              style={[
                styles.text,
                styles.travelText,
                { fontSize: dimensions.height * 0.32 },
              ]}
            >
              Travel
            </Text>
            <Text
              style={[
                styles.text,
                styles.turkeyText,
                { fontSize: dimensions.height * 0.32 },
              ]}
            >
              Turkey
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  verticalText: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    fontFamily: 'Arial',
    fontWeight: '700',
  },
  travelText: {
    color: '#2D3748',
  },
  turkeyText: {
    color: '#E53E3E',
    marginLeft: 4,
  },
});

export default TravelTurkeyLogo;
