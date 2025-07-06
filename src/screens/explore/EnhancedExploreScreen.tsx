/**
 * TravelTurkey - Enhanced Explore Screen
 * Modern explore screen with integrated enhanced search functionality
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import { TouristicPlaceCard } from '../../components/common';
import { EnhancedSearchComponent } from '../../components/search';
import {
  categories as dataCategories,
  getPlacesByCategory,
  getFeaturedPlaces,
} from '../../data/touristPlaces';
import {
  TouristPlace,
  Category as CategoryType,
} from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';

const EnhancedExploreScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredPlaces, setFilteredPlaces] = useState<
    (TouristPlace | EnhancedTouristPlace)[]
  >(getFeaturedPlaces());
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  // Handle search filter updates from EnhancedSearchComponent
  const handleSearchFilter = useCallback(
    (results: (TouristPlace | EnhancedTouristPlace)[]) => {
      if (results.length > 0) {
        setFilteredPlaces(results);
        setIsSearchActive(true);
        setSelectedCategory('all'); // Reset category when searching
      } else {
        setFilteredPlaces(
          selectedCategory === 'all'
            ? getFeaturedPlaces()
            : getPlacesByCategory(selectedCategory),
        );
        setIsSearchActive(false);
      }
    },
    [selectedCategory],
  );

  // Handle place selection from search
  const handlePlaceSelect = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      console.log('Selected place from search:', place.name);
      // Navigate to place detail screen
    },
    [],
  );

  // Handle category filter function
  const handleCategoryFilter = useCallback(
    (categoryId: string) => {
      if (isSearchActive) return; // Don't change category during search

      setSelectedCategory(categoryId);
      if (categoryId === 'all') {
        setFilteredPlaces(getFeaturedPlaces());
      } else {
        setFilteredPlaces(getPlacesByCategory(categoryId));
      }
    },
    [isSearchActive],
  );

  // Memoized categories data with 'all' option
  const categoriesData = useMemo(
    () => [
      {
        id: 'all',
        name: 'Tümü',
        icon: '🏛️',
        placesCount: getFeaturedPlaces().length,
      },
      ...dataCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        placesCount: cat.placesCount,
      })),
    ],
    [],
  );

  // Render place item for FlatList
  const renderPlaceItem: ListRenderItem<TouristPlace | EnhancedTouristPlace> =
    useCallback(
      ({ item, index }) => (
        <TouristicPlaceCard
          place={item}
          index={index}
          onPress={() => console.log('Pressed place:', item.name)}
          variant='default'
          showImage={true}
        />
      ),
      [],
    );

  // Render category item
  const renderCategoryItem: ListRenderItem<
    | CategoryType
    | { id: string; name: string; icon: string; placesCount: number }
  > = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          selectedCategory === item.id && styles.categoryCardActive,
          isSearchActive && styles.categoryCardDisabled,
        ]}
        onPress={() => handleCategoryFilter(item.id)}
        disabled={isSearchActive}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text
          style={[
            styles.categoryName,
            selectedCategory === item.id && styles.categoryNameActive,
            isSearchActive && styles.categoryNameDisabled,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategory, handleCategoryFilter, isSearchActive],
  );

  // Key extractors
  const keyExtractorPlace = useCallback(
    (item: TouristPlace | EnhancedTouristPlace) => item.id,
    [],
  );
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
            Türkiye'nin güzel yerlerini keşfedin
          </Text>
        </Animated.View>

        {/* Enhanced Search Component */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.searchSection}
        >
          <EnhancedSearchComponent
            onFilter={handleSearchFilter}
            onPlaceSelect={handlePlaceSelect}
            placeholder='Yer, şehir veya kategori arayın...'
            maxResults={20}
            showSuggestions={true}
            autoFocus={false}
          />
        </Animated.View>

        {/* Categories */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.categoriesSection}
        >
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
            {isSearchActive
              ? 'Arama Sonuçları'
              : selectedCategory === 'all'
              ? 'Öne Çıkan Yerler'
              : 'Sonuçlar'}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredPlaces.length} yer bulundu
          </Text>
        </View>
      </View>
    ),
    [
      categoriesData,
      selectedCategory,
      filteredPlaces.length,
      isSearchActive,
      handleSearchFilter,
      handlePlaceSelect,
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
            tintColor={Colors.primary.blue}
            colors={[Colors.primary.blue]}
            progressBackgroundColor={Colors.neutral.white}
          />
        }
        removeClippedSubviews={true}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={21}
        updateCellsBatchingPeriod={50}
        contentContainerStyle={styles.listContainer}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: Colors.neutral.offWhite,
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: Colors.neutral.offWhite,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.neutral.charcoal,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.grayMedium,
    fontWeight: '500',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.neutral.offWhite,
  },
  categoriesSection: {
    paddingVertical: 20,
    backgroundColor: Colors.neutral.offWhite,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral.charcoal,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: Colors.neutral.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryCardActive: {
    backgroundColor: Colors.primary.blue,
    shadowColor: Colors.primary.blue,
    shadowOpacity: 0.3,
    elevation: 6,
  },
  categoryCardDisabled: {
    opacity: 0.5,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    textAlign: 'center',
  },
  categoryNameActive: {
    color: Colors.neutral.white,
  },
  categoryNameDisabled: {
    color: Colors.neutral.grayMedium,
  },
  placesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Colors.neutral.offWhite,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    fontWeight: '500',
  },
});

export default EnhancedExploreScreen;
