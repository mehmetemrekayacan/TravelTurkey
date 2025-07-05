/**
 * TravelTurkey - Modern Explore Screen Template
 * Advanced TypeScript component with skeleton loaders and modern UI patterns
 */

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  RefreshControl,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../constants/Colors';
import { Typography, Spacing, Shadows } from '../../styles/theme';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../types/navigation';

// TypeScript Interfaces
interface ExploreItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  imageUrl?: string;
  rating: number;
  featured?: boolean;
}

interface ExploreScreenProps
  extends BottomTabScreenProps<BottomTabParamList, 'ExploreTab'> {}

interface CategoryFilter {
  id: string;
  title: string;
  icon: string;
  color: string;
}

// Sample data structure
const CATEGORIES: CategoryFilter[] = [
  { id: 'all', title: 'Tümü', icon: 'explore', color: AppColors.PRIMARY },
  {
    id: 'historical',
    title: 'Tarihi',
    icon: 'account-balance',
    color: AppColors.ACCENT,
  },
  {
    id: 'natural',
    title: 'Doğal',
    icon: 'landscape',
    color: AppColors.SUCCESS,
  },
  { id: 'cultural', title: 'Kültürel', icon: 'museum', color: AppColors.INFO },
];

// Modern Skeleton Loader Component
const SkeletonCard: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const animatedOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View style={[styles.skeletonCard, { opacity: animatedOpacity }]}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonSubtitle} />
        <View style={styles.skeletonRating} />
      </View>
    </Animated.View>
  );
};

// Explore Card Component
const ExploreCard: React.FC<{
  item: ExploreItem;
  onPress: (item: ExploreItem) => void;
}> = React.memo(({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[styles.exploreCard, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Placeholder for image */}
        <View style={styles.cardImage}>
          <Icon name='image' size={32} color={AppColors.TEXT_SECONDARY} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          )}

          <View style={styles.cardFooter}>
            <View style={styles.ratingContainer}>
              <Icon name='star' size={16} color={AppColors.WARNING} />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
        </View>

        {item.featured && (
          <View style={styles.featuredBadge}>
            <Icon name='star' size={12} color={AppColors.WHITE} />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
});

// Main Explore Screen Component
const ExploreScreenTemplate: React.FC<ExploreScreenProps> = ({
  navigation: _navigation,
}) => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exploreData, setExploreData] = useState<ExploreItem[]>([]);

  // Animation References
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Simulated data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      // Mock data
      const mockData: ExploreItem[] = [
        {
          id: '1',
          title: 'Kapadokya Balon Turu',
          subtitle: 'Nevşehir, Türkiye',
          category: 'Doğal',
          rating: 4.8,
          featured: true,
        },
        {
          id: '2',
          title: 'Ayasofya Camii',
          subtitle: 'İstanbul, Türkiye',
          category: 'Tarihi',
          rating: 4.9,
        },
        {
          id: '3',
          title: 'Pamukkale Travertenleri',
          subtitle: 'Denizli, Türkiye',
          category: 'Doğal',
          rating: 4.7,
        },
      ];

      setExploreData(mockData);
      setIsLoading(false);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    };

    loadData();
  }, [fadeAnim, slideAnim]);

  // Handlers
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Implement search logic
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    // Implement filtering logic
  }, []);

  const handleItemPress = useCallback((item: ExploreItem) => {
    // Navigate to detail screen
    console.log('Navigate to:', item.title);
  }, []);

  // Filtered data
  const filteredData = useMemo(() => {
    let filtered = exploreData;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        item => item.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [exploreData, selectedCategory, searchQuery]);

  // Render Category Filter
  const renderCategoryFilter = useCallback(
    () => (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => handleCategorySelect(category.id)}
          >
            <Icon
              name={category.icon}
              size={16}
              color={
                selectedCategory === category.id
                  ? AppColors.WHITE
                  : category.color
              }
            />
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category.id &&
                  styles.categoryChipTextActive,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
    [selectedCategory, handleCategorySelect],
  );

  // Render Explore Item
  const renderExploreItem = useCallback(
    ({ item }: { item: ExploreItem }) => (
      <ExploreCard item={item} onPress={handleItemPress} />
    ),
    [handleItemPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.headerTitle}>Keşfet</Text>
        <Text style={styles.headerSubtitle}>
          Türkiye'nin en güzel yerlerini keşfedin
        </Text>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View
        style={[
          styles.searchContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.searchBar}>
          <Icon name='search' size={20} color={AppColors.TEXT_SECONDARY} />
          <TextInput
            style={styles.searchInput}
            placeholder='Aradığınız yeri yazın...'
            placeholderTextColor={AppColors.TEXT_SECONDARY}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Icon name='clear' size={20} color={AppColors.TEXT_SECONDARY} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Category Filters */}
      <Animated.View
        style={[{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {renderCategoryFilter()}
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {isLoading ? (
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={() => <SkeletonCard />}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderExploreItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[AppColors.PRIMARY]}
                tintColor={AppColors.PRIMARY}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon
                  name='explore-off'
                  size={64}
                  color={AppColors.TEXT_LIGHT}
                />
                <Text style={styles.emptyTitle}>Sonuç bulunamadı</Text>
                <Text style={styles.emptyText}>
                  Arama kriterlerinizi değiştirmeyi deneyin
                </Text>
              </View>
            }
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
    ...Shadows.md,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_PRIMARY,
    marginLeft: Spacing.sm,
  },
  categoryContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    ...Shadows.sm,
  },
  categoryChipActive: {
    backgroundColor: AppColors.PRIMARY,
  },
  categoryChipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_PRIMARY,
    marginLeft: Spacing.xs,
  },
  categoryChipTextActive: {
    color: AppColors.WHITE,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  exploreCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 16,
    marginBottom: Spacing.md,
    ...Shadows.md,
    overflow: 'hidden',
  },
  cardImage: {
    height: 150,
    backgroundColor: AppColors.BG_SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: Spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_PRIMARY,
    marginLeft: Spacing.xs,
  },
  categoryBadge: {
    backgroundColor: AppColors.BG_SECONDARY,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  categoryText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_SECONDARY,
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 16,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  skeletonImage: {
    height: 150,
    backgroundColor: AppColors.BG_SECONDARY,
  },
  skeletonContent: {
    padding: Spacing.md,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: AppColors.BG_SECONDARY,
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  skeletonSubtitle: {
    height: 16,
    backgroundColor: AppColors.BG_SECONDARY,
    borderRadius: 4,
    width: '70%',
    marginBottom: Spacing.sm,
  },
  skeletonRating: {
    height: 16,
    backgroundColor: AppColors.BG_SECONDARY,
    borderRadius: 4,
    width: '40%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
    color: AppColors.TEXT_PRIMARY,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default ExploreScreenTemplate;
