/**
 * TravelTurkey - Animated Tab Icons Component
 * Modern vector icons with smooth animations and Turkey-themed design
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { AppColors } from '../../constants/Colors';

interface AnimatedTabIconProps {
  focused: boolean;
  color: string;
  size: number;
  iconName: string;
  accessibilityLabel?: string;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({
  focused,
  color,
  size,
  iconName,
  accessibilityLabel,
}) => {
  const scale = useSharedValue(focused ? 1.2 : 1);
  const opacity = useSharedValue(focused ? 1 : 0.7);
  const translateY = useSharedValue(focused ? -2 : 0);

  // Update animation values when focus changes
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      duration: 300,
      dampingRatio: 0.8,
    });
    opacity.value = withSpring(focused ? 1 : 0.7, {
      duration: 200,
    });
    translateY.value = withSpring(focused ? -2 : 0, {
      duration: 300,
      dampingRatio: 0.8,
    });
  }, [focused, scale, opacity, translateY]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(scale.value, [1, 1.2], [0, 0.15]);

    return {
      opacity: backgroundOpacity,
      transform: [{ scale: scale.value * 0.8 }],
    };
  });

  return (
    <View style={styles.container} accessibilityLabel={accessibilityLabel}>
      {/* Animated background circle for focused state */}
      <Animated.View
        style={[
          styles.background,
          animatedBackgroundStyle,
          { backgroundColor: AppColors.PRIMARY },
        ]}
      />

      {/* Animated icon */}
      <AnimatedIcon
        name={iconName}
        size={size}
        color={color}
        style={animatedIconStyle}
      />
    </View>
  );
};

// Pre-configured icon components for each tab
export const HomeTabIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => (
  <AnimatedTabIcon
    focused={focused}
    color={color}
    size={size}
    iconName='home'
    accessibilityLabel='Ana Sayfa'
  />
);

export const ExploreTabIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => (
  <AnimatedTabIcon
    focused={focused}
    color={color}
    size={size}
    iconName='explore'
    accessibilityLabel='Keşfet'
  />
);

export const PlansTabIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => (
  <AnimatedTabIcon
    focused={focused}
    color={color}
    size={size}
    iconName='assignment'
    accessibilityLabel='Planlarım'
  />
);

export const ProfileTabIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => (
  <AnimatedTabIcon
    focused={focused}
    color={color}
    size={size}
    iconName='person'
    accessibilityLabel='Profil'
  />
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  background: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    top: 2,
    left: 2,
  },
});

// Default export for the base component
export default AnimatedTabIcon;
