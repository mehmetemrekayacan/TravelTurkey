/**
 * TravelTurkey - Modern Category Grid Component
 * Responsive grid layout with Turkish tourism categories and glassmorphism effects
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
const CARD_MARGIN = 8;
const CARDS_PER_ROW = 2;
const CARD_WIDTH = (SCREEN_WIDTH - 40 - CARD_MARGIN * (CARDS_PER_ROW - 1)) / CARDS_PER_ROW;

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  count: number;
  gradient: string[];
}

interface CategoryGridProps {
  onCategoryPress?: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  {
    id: 'historical',
    title: 'Tarihi Yerler',
    subtitle: 'Osmanlı ve antik dönem',
    icon: '🏛️',
    count: 47,
    gradient: [Theme.colors.primary[500], Theme.colors.primary[600]],
  },
  {
    id: 'natural',
    title: 'Doğal Güzellikler',
    subtitle: 'Plajlar ve dağlar',
    icon: '🌿',
    count: 32,
    gradient: [Theme.colors.accent.turquoise[500], Theme.colors.accent.turquoise[600]],
  },
  {
    id: 'cultural',
    title: 'Kültürel Alanlar',
    subtitle: 'Müzeler ve sanat',
    icon: '🎭',
    count: 23,
    gradient: [Theme.colors.accent.orange[500], Theme.colors.accent.orange[600]],
  },
  {
    id: 'religious',
    title: 'Dini Yerler',
    subtitle: 'Camiler ve kiliseler',
    icon: '🕌',
    count: 18,
    gradient: [Theme.colors.accent.gold[500], Theme.colors.accent.gold[600]],
  },
];

const CategoryCard: React.FC<{ category: Category; onPress: () => void }> = ({
  category,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${category.title} kategorisi, ${category.count} yer`}
    >
      <Animated.View style={[styles.categoryCard, animatedStyle]}>
        {/* Glassmorphism Background */}
        <View style={styles.glassBackground} />
        
        {/* Gradient Border */}
        <View style={[styles.gradientBorder, { 
          backgroundColor: category.gradient[0] 
        }]} />

        {/* Content */}
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
          </View>
          
          <View style={styles.countContainer}>
            <Text style={styles.countNumber}>{category.count}</Text>
            <Text style={styles.countLabel}>yer</Text>
          </View>
        </View>

        {/* Shine Effect */}
        <View style={styles.shineEffect} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategoryPress,
}) => {
  const handleCategoryPress = (category: Category) => {
    onCategoryPress?.(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kategoriler</Text>
        <Text style={styles.subtitle}>İlginizi çeken alanları keşfedin</Text>
      </View>

      <View style={styles.grid}>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={() => handleCategoryPress(category)}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: 120,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // Note: backdropFilter is not supported in React Native, using opacity instead
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  cardContent: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignSelf: 'flex-start',
  },
  categoryIcon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
    marginTop: Theme.spacing.xs,
  },
  categoryTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
  },
  countContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  countNumber: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary[600],
  },
  countLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[500],
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

export default CategoryGrid;