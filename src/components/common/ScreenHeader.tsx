/**
 * TravelTurkey - Reusable Screen Header Component
 * Standardized header component for all screens
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  return (
    <View style={[GlobalStyles.header, { paddingTop: insets.top }]}>
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

      {rightIcon && onRightPress && (
        <TouchableOpacity
          onPress={() => {
            console.log('ScreenHeader: Sağ buton tıklandı!');
            onRightPress?.();
          }}
          style={styles.rightButton}
          activeOpacity={0.7}
        >
          <Text style={[GlobalStyles.iconMedium, styles.rightIcon]}>
            {rightIcon}
          </Text>
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
  rightButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  rightIcon: {
    fontSize: 24,
    color: '#333',
  },
});

export default ScreenHeader;
