import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// Logo PNG import
const APP_ICON = require('../../assets/icons/app-icon.png');

export type LogoSize = 'small' | 'medium' | 'large' | 'xlarge';

interface LogoProps {
  size?: LogoSize;
  style?: any;
  width?: number;
  height?: number;
}

const sizeMap = {
  small: { width: 50, height: 50 },
  medium: { width: 75, height: 75 },
  large: { width: 100, height: 100 },
  xlarge: { width: 125, height: 125 },
};

export const TravelTurkeyLogo: React.FC<LogoProps> = ({
  size = 'medium',
  style,
  width,
  height,
}) => {
  const getDimensions = () => {
    if (width && height) {
      return { width, height };
    }
    return sizeMap[size];
  };

  const dimensions = getDimensions();

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
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TravelTurkeyLogo;
