/**
 * TravelTurkey - Modern Vector Tab Icons with Smooth Animations
 * Material Icons with Turkey-themed styling and native animations
 */

import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AppColors } from '../../constants/Colors';

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
  badge?: number; // Badge count for notifications
}

const AnimatedIcon = ({
  focused,
  color,
  size,
  iconName,
  badge,
}: {
  focused: boolean;
  color: string;
  size: number;
  iconName: string;
  badge?: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(focused ? 1.2 : 1)).current;
  const translateYAnim = useRef(new Animated.Value(focused ? -2 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(focused ? 1 : 0.7)).current;

  useEffect(() => {
    // Haptic feedback when tab becomes focused
    if (focused) {
      ReactNativeHapticFeedback.trigger('impactLight', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }

    // Smooth scale animation
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Smooth translate animation
    Animated.spring(translateYAnim, {
      toValue: focused ? -2 : 0,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Smooth opacity animation
    Animated.timing(opacityAnim, {
      toValue: focused ? 1 : 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused, scaleAnim, translateYAnim, opacityAnim]);

  return (
    <View style={styles.iconContainer}>
      {/* Background circle for focused state */}
      {focused && (
        <Animated.View
          style={[
            styles.backgroundCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      )}

      {/* Animated icon */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          opacity: opacityAnim,
        }}
      >
        <Icon
          name={iconName}
          size={size}
          color={focused ? AppColors.PRIMARY : color}
        />
      </Animated.View>

      {/* Badge notification */}
      {badge && badge > 0 && (
        <View style={styles.badge}>
          <Animated.Text style={styles.badgeText}>
            {badge > 99 ? '99+' : badge.toString()}
          </Animated.Text>
        </View>
      )}
    </View>
  );
};

export const ExploreTabIcon = ({
  focused,
  color,
  size,
  badge,
}: TabIconProps) => (
  <AnimatedIcon
    focused={focused}
    color={color}
    size={size}
    iconName='explore'
    badge={badge}
  />
);

export const PlansTabIcon = ({ focused, color, size, badge }: TabIconProps) => (
  <AnimatedIcon
    focused={focused}
    color={color}
    size={size}
    iconName='assignment'
    badge={badge}
  />
);

export const ProfileTabIcon = ({
  focused,
  color,
  size,
  badge,
}: TabIconProps) => (
  <AnimatedIcon
    focused={focused}
    color={color}
    size={size}
    iconName='person'
    badge={badge}
  />
);

export const HomeTabIcon = ({ focused, color, size, badge }: TabIconProps) => (
  <AnimatedIcon
    focused={focused}
    color={color}
    size={size}
    iconName='home'
    badge={badge}
  />
);

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  backgroundCircle: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.PRIMARY,
    opacity: 0.15,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: AppColors.ERROR,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: AppColors.BG_PRIMARY,
  },
  badgeText: {
    color: AppColors.WHITE,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
