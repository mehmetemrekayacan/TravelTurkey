/**
 * TravelTurkey - Search Suggestion Widget Component
 * Intelligent search component with Turkish destinations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from '../../styles/theme';

interface SearchSuggestion {
  id: string;
  title: string;
  location: string;
  category: string;
  icon: string;
}

interface SearchSuggestionWidgetProps {
  onSearchPress?: () => void;
  onSuggestionPress?: (suggestion: SearchSuggestion) => void;
}

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    id: 'istanbul',
    title: 'İstanbul',
    location: 'Marmara Bölgesi',
    category: 'Şehir',
    icon: '🏙️',
  },
  {
    id: 'cappadocia',
    title: 'Kapadokya',
    location: 'Nevşehir',
    category: 'Doğal',
    icon: '🎈',
  },
  {
    id: 'antalya',
    title: 'Antalya',
    location: 'Akdeniz Bölgesi',
    category: 'Plaj',
    icon: '🏖️',
  },
  {
    id: 'ephesus',
    title: 'Efes',
    location: 'İzmir',
    category: 'Tarihi',
    icon: '🏛️',
  },
];

const SuggestionItem: React.FC<{
  suggestion: SearchSuggestion;
  onPress: () => void;
}> = ({ suggestion, onPress }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
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
      accessibilityLabel={`${suggestion.title} ara`}
    >
      <Animated.View style={[styles.suggestionItem, animatedStyle]}>
        <View style={styles.suggestionIcon}>
          <Text style={styles.iconText}>{suggestion.icon}</Text>
        </View>
        
        <View style={styles.suggestionContent}>
          <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
          <Text style={styles.suggestionLocation}>{suggestion.location}</Text>
        </View>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{suggestion.category}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const SearchSuggestionWidget: React.FC<SearchSuggestionWidgetProps> = ({
  onSearchPress,
  onSuggestionPress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnimation = useSharedValue(0);

  const handleSearchPress = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      expandAnimation.value = withTiming(1, { duration: 300 });
    }
    onSearchPress?.();
  };

  const handleSuggestionPress = (suggestion: SearchSuggestion) => {
    onSuggestionPress?.(suggestion);
  };

  const expandedStyle = useAnimatedStyle(() => ({
    height: expandAnimation.value * 200,
    opacity: expandAnimation.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nereyi Keşfetmek İstiyorsun?</Text>
        <Text style={styles.subtitle}>Popüler destinasyonlar</Text>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={handleSearchPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Arama yapmak için dokunun"
      >
        <View style={styles.searchBar}>
          {/* Glassmorphism Background */}
          <View style={styles.glassBackground} />
          
          <View style={styles.searchContent}>
            <View style={styles.searchIcon}>
              <Text style={styles.searchIconText}>🔍</Text>
            </View>
            
            <Text style={styles.searchPlaceholder}>
              Şehir, yer veya aktivite ara...
            </Text>
            
            <View style={styles.micIcon}>
              <Text style={styles.micIconText}>🎤</Text>
            </View>
          </View>

          {/* Shine Effect */}
          <View style={styles.shineEffect} />
        </View>
      </TouchableOpacity>

      {/* Suggestions */}
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Popüler Aramalar</Text>
        
        <View style={styles.suggestionsList}>
          {SEARCH_SUGGESTIONS.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              suggestion={suggestion}
              onPress={() => handleSuggestionPress(suggestion)}
            />
          ))}
        </View>
      </View>

      {/* Expanded Search (if needed) */}
      <Animated.View style={[styles.expandedSearch, expandedStyle]}>
        {/* Additional search content can go here */}
      </Animated.View>
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
  searchContainer: {
    marginBottom: Theme.spacing.lg,
  },
  searchBar: {
    height: 56,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.base,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // Note: backdropFilter is not supported in React Native, using opacity instead
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  searchIconText: {
    fontSize: 16,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.neutral[500],
  },
  micIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIconText: {
    fontSize: 16,
  },
  suggestionsContainer: {
    marginBottom: Theme.spacing.lg,
  },
  suggestionsTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  suggestionsList: {
    gap: Theme.spacing.sm,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.base,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  iconText: {
    fontSize: 16,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.neutral[900],
    marginBottom: 2,
  },
  suggestionLocation: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
  },
  categoryBadge: {
    backgroundColor: Theme.colors.primary[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.base,
  },
  categoryText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.primary[700],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  expandedSearch: {
    overflow: 'hidden',
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

export default SearchSuggestionWidget;