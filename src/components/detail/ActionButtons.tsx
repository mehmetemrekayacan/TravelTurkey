/**
 * TravelTurkey - Action Buttons Component for Place Detail
 * Modern floating action buttons for save, share, and navigation
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from '../../styles/theme';

interface ActionButtonsProps {
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
  onNavigate: () => void;
}

const ActionButton: React.FC<{
  icon: string;
  label: string;
  color: string;
  backgroundColor: string;
  onPress: () => void;
  isActive?: boolean;
}> = ({ icon, label, color, backgroundColor, onPress, isActive = false }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    // Add haptic feedback effect
    scale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withSpring(1, { duration: 200 })
    );
    
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Animated.View style={[styles.actionButton, { backgroundColor }, animatedStyle]}>
        {/* Glassmorphism Background */}
        <View style={styles.buttonBackground} />
        
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={[styles.buttonIcon, { color }]}>{icon}</Text>
        </View>
        
        {/* Label */}
        <Text style={[styles.buttonLabel, { color }]}>{label}</Text>
        
        {/* Active Indicator */}
        {isActive && (
          <View style={styles.activeIndicator}>
            <Text style={styles.activeIcon}>✓</Text>
          </View>
        )}

        {/* Shine Effect */}
        <View style={styles.shineEffect} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const PrimaryActionButton: React.FC<{
  icon: string;
  label: string;
  onPress: () => void;
}> = ({ icon, label, onPress }) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    glowOpacity.value = withTiming(0.5, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    glowOpacity.value = withTiming(0, { duration: 200 });
  };

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(1.05, { duration: 100 }),
      withSpring(1, { duration: 200 })
    );
    
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Animated.View style={[styles.primaryButton, animatedStyle]}>
        {/* Glow Effect */}
        <Animated.View style={[styles.glowEffect, glowStyle]} />
        
        {/* Gradient Background */}
        <View style={styles.primaryBackground} />
        
        {/* Content */}
        <View style={styles.primaryContent}>
          <Text style={styles.primaryIcon}>{icon}</Text>
          <Text style={styles.primaryLabel}>{label}</Text>
        </View>

        {/* Shine Effect */}
        <View style={styles.primaryShine} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSaved,
  onSave,
  onShare,
  onNavigate,
}) => {
  return (
    <View style={styles.container}>
      {/* Primary Navigation Button */}
      <View style={styles.primaryButtonContainer}>
        <PrimaryActionButton
          icon="🧭"
          label="Yol Tarifi Al"
          onPress={onNavigate}
        />
      </View>

      {/* Secondary Action Buttons */}
      <View style={styles.secondaryButtonsContainer}>
        <ActionButton
          icon={isSaved ? "❤️" : "🤍"}
          label={isSaved ? "Kaydedildi" : "Kaydet"}
          color={isSaved ? Theme.colors.semantic.error[600] : Theme.colors.neutral[600]}
          backgroundColor={isSaved ? Theme.colors.semantic.error[50] : 'rgba(255, 255, 255, 0.9)'}
          onPress={onSave}
          isActive={isSaved}
        />
        
        <ActionButton
          icon="📤"
          label="Paylaş"
          color={Theme.colors.accent.turquoise[600]}
          backgroundColor="rgba(255, 255, 255, 0.9)"
          onPress={onShare}
        />
        
        <ActionButton
          icon="📞"
          label="İletişim"
          color={Theme.colors.accent.gold[600]}
          backgroundColor="rgba(255, 255, 255, 0.9)"
          onPress={() => {}}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>📷</Text>
          <Text style={styles.quickActionLabel}>Fotoğraf</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>⏰</Text>
          <Text style={styles.quickActionLabel}>Hatırlatıcı</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>📝</Text>
          <Text style={styles.quickActionLabel}>Not Ekle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>🎯</Text>
          <Text style={styles.quickActionLabel}>Plan Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  primaryButtonContainer: {
    marginBottom: Theme.spacing.lg,
  },
  primaryButton: {
    height: 56,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...Theme.shadows.lg,
  },
  glowEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.xl,
    transform: [{ scale: 1.1 }],
  },
  primaryBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.primary[500],
    // Add gradient effect here in production
  },
  primaryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.lg,
  },
  primaryIcon: {
    fontSize: 24,
    marginRight: Theme.spacing.sm,
  },
  primaryLabel: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[50],
  },
  primaryShine: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
    height: 80,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Theme.shadows.base,
  },
  buttonBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.medium,
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingBottom: Theme.spacing.sm,
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Theme.colors.semantic.success[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    fontSize: 12,
    color: Theme.colors.neutral[50],
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 30,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ skewX: '-20deg' }],
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickActionLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
    fontWeight: Theme.typography.fontWeight.medium,
  },
});

export default ActionButtons;