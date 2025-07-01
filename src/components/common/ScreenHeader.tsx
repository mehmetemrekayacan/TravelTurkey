/**
 * TravelTurkey - Reusable Screen Header Component
 * Standardized header component for all screens
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';

interface ScreenHeaderProps {
  title: string;
  icon?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  icon,
  showBackButton = false,
  onBackPress,
  rightIcon,
  onRightPress,
}) => {
  return (
    <View style={GlobalStyles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={GlobalStyles.iconMedium}>←</Text>
        </TouchableOpacity>
      )}

      <Text style={GlobalStyles.headerTitle}>
        {icon && `${icon} `}
        {title}
      </Text>

      <View style={styles.spacer} />

      {rightIcon && (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={GlobalStyles.iconMedium}>{rightIcon}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 8,
  },
  spacer: {
    flex: 1,
  },
});

export default ScreenHeader;
