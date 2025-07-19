/**
 * TravelTurkey - CTA Button Component
 * Glassmorphism CTA button with haptic feedback and bounce animation
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

interface CTAButtonProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  enableBounce?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  subtitle,
  icon = '🧭',
  onPress,
  disabled = false,
  accessibilityLabel,
  enableBounce = true,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const bounceScale = useSharedValue(1);

  // Initialize animations
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });

    if (enableBounce) {
      // Continuous subtle bounce animation
      bounceScale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1500 }),
          withTiming(1, { duration: 1500 }),
        ),
        -1,
        true,
      );
    }
  }, [enableBounce, opacity, bounceScale]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      // For iOS, you would use react-native-haptic-feedback
      // For now, using basic vibration
      Vibration.vibrate(50);
    } else {
      Vibration.vibrate(50);
    }

    // Trigger bounce animation
    bounceScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 200 }),
    );

    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { scale: bounceScale.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole='button'
      accessibilityLabel={accessibilityLabel || title}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[styles.button, animatedStyle, disabled && styles.disabled]}
      >
        {/* Glassmorphism Background */}
        <View style={styles.glassBg} />

        {/* Gradient Border */}
        <View style={styles.gradientBorder} />

        {/* Content */}
        <View style={styles.content}>
          {icon && (
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{icon}</Text>
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          {/* Arrow Indicator */}
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>

        {/* Shine Effect */}
        <View style={styles.shine} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    minHeight: 64,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: Colors.primary.blue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary.blue,
    opacity: 0.9,
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.secondary.golden,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 64,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 2,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  arrow: {
    fontSize: 16,
    color: Colors.neutral.white,
    fontWeight: 'bold',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ skewX: '-20deg' }],
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CTAButton;
