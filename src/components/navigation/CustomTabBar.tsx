/**
 * TravelTurkey - Custom Tab Bar Component
 * Beautiful Turkey-themed tab bar with modern design and animations
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors } from '../../constants/Colors';

interface CustomTabBarProps extends BottomTabBarProps {
  // Add any custom props here
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      {/* Top border gradient effect */}
      <View style={styles.topBorder} />

      {/* Tab buttons container */}
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
            >
              {/* Tab icon */}
              <View style={styles.iconContainer}>
                {options.tabBarIcon?.({
                  focused: isFocused,
                  color: isFocused
                    ? AppColors.PRIMARY
                    : AppColors.TEXT_SECONDARY,
                  size: 24,
                })}
              </View>

              {/* Tab label */}
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelFocused : styles.tabLabelUnfocused,
                ]}
              >
                {typeof label === 'string' ? label : 'Tab'}
              </Text>

              {/* Focus indicator */}
              {isFocused && <View style={styles.focusIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderTopWidth: 0, // Remove default border
    elevation: 20,
    shadowColor: AppColors.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: AppColors.PRIMARY,
    opacity: 0.8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    minHeight: 56,
    position: 'relative',
  },
  tabButtonFocused: {
    backgroundColor: `${AppColors.PRIMARY}08`, // 3% opacity
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  tabLabelFocused: {
    color: AppColors.PRIMARY,
    fontWeight: '700',
  },
  tabLabelUnfocused: {
    color: AppColors.TEXT_SECONDARY,
  },
  focusIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 20,
    height: 3,
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 2,
  },
});

export default CustomTabBar;
