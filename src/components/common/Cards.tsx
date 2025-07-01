/**
 * TravelTurkey - Reusable Card Components
 * Standardized card components for consistent UI
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';

// Basic Info Card
interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  theme?: 'default' | 'bosphorus' | 'turkish-flag';
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  theme = 'default',
}) => {
  const getThemeStyle = () => {
    switch (theme) {
      case 'bosphorus':
        return GlobalStyles.bosphorusTheme;
      case 'turkish-flag':
        return GlobalStyles.turkishFlag;
      default:
        return {};
    }
  };

  return (
    <View style={[GlobalStyles.card, getThemeStyle()]}>
      {title && <Text style={GlobalStyles.titleMedium}>{title}</Text>}
      {children}
    </View>
  );
};

// Touchable Action Card
interface ActionCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity style={GlobalStyles.touchableCard} onPress={onPress}>
      <View style={GlobalStyles.cardContent}>
        <View style={GlobalStyles.cardIcon}>
          <Text style={GlobalStyles.iconMedium}>{icon}</Text>
        </View>
        <View style={GlobalStyles.cardText}>
          <Text style={GlobalStyles.titleSmall}>{title}</Text>
          {subtitle && (
            <Text style={GlobalStyles.captionSecondary}>{subtitle}</Text>
          )}
        </View>
        {showArrow && (
          <View style={GlobalStyles.cardArrow}>
            <Text style={GlobalStyles.iconMedium}>➡️</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Stat Card for displaying statistics
interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <View style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}>
      <Text style={GlobalStyles.iconMedium}>{icon}</Text>
      <Text style={[GlobalStyles.titleSmall, GlobalStyles.statValue]}>
        {value}
      </Text>
      <Text style={GlobalStyles.captionSecondary}>{label}</Text>
    </View>
  );
};

// Welcome Card with centered content
interface WelcomeCardProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonPress?: () => void;
  icon?: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  title,
  subtitle,
  buttonText,
  onButtonPress,
  icon,
}) => {
  return (
    <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
      <View style={GlobalStyles.center}>
        {icon && (
          <Text style={[GlobalStyles.iconLarge, GlobalStyles.profileAvatar]}>
            {icon}
          </Text>
        )}
        <Text style={GlobalStyles.titleLargeWhite}>{title}</Text>
        <Text style={GlobalStyles.bodyMediumWhite}>{subtitle}</Text>

        {buttonText && onButtonPress && (
          <TouchableOpacity
            style={GlobalStyles.buttonPrimary}
            onPress={onButtonPress}
          >
            <Text style={GlobalStyles.buttonTextPrimary}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
