/**
 * TravelTurkey - Quick Link Card Component
 * Neumorphic design cards for navigation
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 cards per row with margins

interface QuickLinkCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  title,
  subtitle,
  icon,
  color,
  onPress,
  accessibilityLabel,
}) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
    shadowOpacity.value = withTiming(0.2, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    shadowOpacity.value = withTiming(0.1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: shadowOpacity.value,
    elevation: shadowOpacity.value * 30,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole='button'
      accessibilityLabel={accessibilityLabel || `${title} - ${subtitle}`}
      style={styles.pressable}
    >
      <Animated.View style={[styles.container, animatedStyle, shadowStyle]}>
        {/* Neumorphic Background */}
        <View
          style={[styles.neumorphicBg, { backgroundColor: `${color}08` }]}
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Icon Container */}
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Subtle Border */}
        <View style={[styles.border, { borderColor: `${color}20` }]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: CARD_WIDTH,
    marginBottom: 12,
  },
  container: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 130,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  neumorphicBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconText: {
    fontSize: 20,
    color: Colors.neutral.white,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
    lineHeight: 14,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
  },
});

export default QuickLinkCard;
