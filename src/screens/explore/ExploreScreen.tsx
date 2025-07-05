/**
 * TravelTurkey - Explore Screen
 * Keşfet sayfası - Yerler ve aktiviteleri keşfet
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { AppColors } from '../../constants/Colors';
import { TouristicPlaceCard } from '../../components/common';
import {
  touristPlaces,
  categories as dataCategories,
  searchPlaces,
  getPlacesByCategory,
  getFeaturedPlaces,
} from '../../data/touristPlaces';
import {
  TouristPlace,
  Category as CategoryType,
} from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';

const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredPlaces, setFilteredPlaces] = useState<TouristPlace[]>(
    getFeaturedPlaces(),
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Optimized search function with debouncing effect
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPlaces(getFeaturedPlaces());
    } else {
      setFilteredPlaces(searchPlaces(query));
    }
  }, []);

  // Optimized category filter function
  const handleCategoryFilter = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredPlaces(getFeaturedPlaces());
    } else {
      setFilteredPlaces(getPlacesByCategory(categoryId));
    }
  }, []);

  // Memoized categories data with 'all' option
  const categoriesData = useMemo(
    () => [
      {
        id: 'all',
        name: 'Tümü',
        icon: '🗺️',
        placesCount: touristPlaces.length,
        description: '',
        color: '',
      },
      ...dataCategories,
    ],
    [],
  );

  // Optimized place card press handler
  const handlePlacePress = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      // TODO: Navigate to place detail screen
      console.log('Place pressed:', place.name);
    },
    [],
  );

  // Optimized place item renderer with proper typing
  const renderPlaceItem: ListRenderItem<TouristPlace> = useCallback(
    ({ item, index }) => (
      <TouristicPlaceCard
        place={item}
        index={index}
        onPress={handlePlacePress}
        variant='default'
      />
    ),
    [handlePlacePress],
  );

  // Optimized category item renderer
  const renderCategoryItem: ListRenderItem<
    | CategoryType
    | { id: string; name: string; icon: string; placesCount: number }
  > = useCallback(
    ({ item, index }) => (
      <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
        <TouchableOpacity
          style={[
            styles.categoryCard,
            selectedCategory === item.id && styles.selectedCategoryCard,
          ]}
          onPress={() => handleCategoryFilter(item.id)}
          accessibilityRole='button'
          accessibilityLabel={`${item.name} kategorisi`}
          accessibilityState={{ selected: selectedCategory === item.id }}
        >
          <Text style={styles.categoryIcon}>{item.icon}</Text>
          <Text
            style={[
              styles.categoryName,
              selectedCategory === item.id && styles.selectedCategoryName,
            ]}
          >
            {item.name}
          </Text>
          <Text style={styles.categoryCount}>{item.placesCount} yer</Text>
        </TouchableOpacity>
      </Animated.View>
    ),
    [selectedCategory, handleCategoryFilter],
  );

  // Optimized key extractors
  const keyExtractorPlace = useCallback((item: TouristPlace) => item.id, []);
  const keyExtractorCategory = useCallback(
    (
      item:
        | CategoryType
        | { id: string; name: string; icon: string; placesCount: number },
    ) => item.id,
    [],
  );

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setFilteredPlaces(
        selectedCategory === 'all'
          ? getFeaturedPlaces()
          : getPlacesByCategory(selectedCategory),
      );
      setRefreshing(false);
    }, 1000);
  }, [selectedCategory]);

  // Header component for the main FlatList
  const ListHeaderComponent = useCallback(
    () => (
      <View>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.title}>Keşfet</Text>
          <Text style={styles.subtitle}>
            Türkiye'nin güzelliklerini keşfedin
          </Text>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.searchContainer}
        >
          <TextInput
            style={styles.searchInput}
            placeholder='Yer, şehir veya aktivite arayın...'
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={AppColors.TEXT_SECONDARY}
            accessibilityLabel='Arama çubuğu'
            accessibilityHint='Yer, şehir veya aktivite aramak için buraya yazın'
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={keyExtractorCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={10}
          />
        </Animated.View>

        {/* Section Header for Places */}
        <View style={styles.placesHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Öne Çıkan Yerler' : 'Sonuçlar'}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredPlaces.length} yer bulundu
          </Text>
        </View>
      </View>
    ),
    [
      searchQuery,
      categoriesData,
      selectedCategory,
      filteredPlaces.length,
      handleSearch,
      renderCategoryItem,
      keyExtractorCategory,
    ],
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <FlatList
        data={filteredPlaces}
        renderItem={renderPlaceItem}
        keyExtractor={keyExtractorPlace}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={AppColors.PRIMARY}
            colors={[AppColors.PRIMARY]}
          />
        }
        // Performance optimizations
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: 280, // Approximate item height
          offset: 280 * index,
          index,
        })}
        // Accessibility
        accessibilityLabel='Turistik yerler listesi'
        // Content container style
        contentContainerStyle={styles.mainFlatListContent}
      />
    </SafeAreaView>
  );
};

const styles = {
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: AppColors.PRIMARY,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
  },
  searchContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    margin: 20,
    marginTop: 10,
    backgroundColor: AppColors.BG_LIGHT,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
  },
  searchIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: AppColors.TEXT_PRIMARY,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  placesHeader: {
    marginBottom: 10,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    minWidth: 100,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: AppColors.TEXT_LIGHT,
  },
  selectedCategoryCard: {
    backgroundColor: AppColors.PRIMARY,
    borderColor: AppColors.PRIMARY,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: AppColors.TEXT_PRIMARY,
    textAlign: 'center' as const,
    marginBottom: 3,
  },
  selectedCategoryName: {
    color: AppColors.BG_PRIMARY,
  },
  categoryCount: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
  },
  mainFlatListContent: {
    paddingBottom: 20,
  },
  // Legacy styles for backward compatibility
  placesList: {
    paddingHorizontal: 20,
  },
  placeCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 10,
  },
  placeIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 3,
  },
  placeLocation: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  ratingContainer: {
    backgroundColor: AppColors.BG_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: AppColors.TEXT_PRIMARY,
  },
  placeDescription: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 10,
  },
  placeFooter: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  category: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: AppColors.PRIMARY,
    backgroundColor: AppColors.BG_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: AppColors.TEXT_PRIMARY,
  },
};

export default ExploreScreen;
