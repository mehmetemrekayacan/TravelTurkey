/**
 * TravelTurkey - Quick Actions Widget Component
 * Modern glassmorphism action buttons for key features
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Theme } from '../../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action: string;
}

interface QuickActionsWidgetProps {
  onActionPress?: (action: QuickAction) => void;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'search',
    title: 'Arama',
    subtitle: 'Yer bul',
    icon: '🔍',
    color: Theme.colors.primary[500],
    action: 'search',
  },
  {
    id: 'map',
    title: 'Harita',
    subtitle: 'Yakınımda',
    icon: '🗺️',
    color: Theme.colors.accent.turquoise[500],
    action: 'map',
  },
  {
    id: 'favorites',
    title: 'Favoriler',
    subtitle: 'Kayıtlı yerler',
    icon: '❤️',
    color: Theme.colors.primary[500],
    action: 'favorites',
  },
  {
    id: 'weather',
    title: 'Hava Durumu',
    subtitle: 'Güncel durum',
    icon: '🌤️',
    color: Theme.colors.accent.gold[500],
    action: 'weather',
  },
];

const ActionButton: React.FC<{
  action: QuickAction;
  onPress: () => void;
}> = ({ action, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${action.title}: ${action.subtitle}`}
      style={styles.actionButton}
    >
      <Animated.View style={[styles.actionCard, animatedStyle]}>
        {/* Glassmorphism Background */}
        <View style={styles.glassBackground} />
        
        {/* Gradient Border */}
        <View style={[styles.gradientBorder, { backgroundColor: action.color }]} />

        {/* Content */}
        <View style={styles.actionContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${action.color}20` }]}>
            <Text style={styles.actionIcon}>{action.icon}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
          </View>
        </View>

        {/* Shine Effect */}
        <View style={styles.shineEffect} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({
  onActionPress,
}) => {
  const handleActionPress = (action: QuickAction) => {
    onActionPress?.(action);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hızlı Eylemler</Text>
        <Text style={styles.subtitle}>Size özel kısayollar</Text>
      </View>

      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onPress={() => handleActionPress(action)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  header: {
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (SCREEN_WIDTH - 48) / 2,
    marginBottom: Theme.spacing.md,
  },
  actionCard: {
    height: 80,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.base,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    // Note: backdropFilter is not supported in React Native, using opacity instead
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  actionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  actionIcon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
});

export default QuickActionsWidget;