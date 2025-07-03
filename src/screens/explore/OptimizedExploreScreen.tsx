/**
 * TravelTurkey - Optimized Explore Screen
 * High-performance explore screen with optimized search and data management
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { AppColors } from '../../constants/Colors';
import { TouristPlace, Category } from '../../types/touristPlaces';
import { dataManager } from '../../services/api';
import ScreenHeader from '../../components/common/ScreenHeader';
import OptimizedSearchComponent from '../../components/search/OptimizedSearchComponent';

const OptimizedExploreScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Get categories and featured places from optimized data manager
  const categories = useMemo(() => dataManager.getCategories(), []);
  const featuredPlaces = useMemo(() => dataManager.getFeaturedPlaces(), []);

  // Get filtered places based on selected category
  const filteredPlaces = useMemo(() => {
    if (selectedCategory === 'all') {
      return featuredPlaces;
    }
    return dataManager.getPlacesByCategory(selectedCategory);
  }, [selectedCategory, featuredPlaces]);

  // Handle category selection
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  // Handle place selection from search
  const handlePlaceSelect = useCallback((place: TouristPlace) => {
    setShowSearch(false);
    // TODO: Navigate to place detail screen
    console.log('Selected place:', place.name);
  }, []);

  // Toggle search visibility
  const toggleSearch = useCallback(() => {
    console.log('🔍 Arama butonu tıklandı!');
    setShowSearch(prev => {
      console.log('showSearch değeri:', !prev);
      return !prev;
    });
  }, []);

  // Render category item
  const renderCategoryItem = useCallback(
    ({ item }: { item: Category }) => (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory === item.id && styles.categoryItemSelected,
        ]}
        onPress={() => handleCategorySelect(item.id)}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text
          style={[
            styles.categoryText,
            selectedCategory === item.id && styles.categoryTextSelected,
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={styles.categoryCount}>{item.placesCount}</Text>
      </TouchableOpacity>
    ),
    [selectedCategory, handleCategorySelect],
  );

  // Render place item
  const renderPlaceItem = useCallback(
    ({ item }: { item: TouristPlace }) => (
      <TouchableOpacity
        style={styles.placeItem}
        onPress={() => handlePlaceSelect(item)}
      >
        <View style={styles.placeIconContainer}>
          <Text style={styles.placeIcon}>{item.icon}</Text>
        </View>
        <View style={styles.placeContent}>
          <Text style={styles.placeName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.placeLocation} numberOfLines={1}>
            {item.address.city}, {item.address.district}
          </Text>
          <View style={styles.placeMetaContainer}>
            <Text style={styles.placeRating}>⭐ {item.rating.average}</Text>
            <Text style={styles.placeCategory}>{item.subcategory}</Text>
          </View>
        </View>
        {item.isFeatured && <Text style={styles.featuredBadge}>⭐</Text>}
      </TouchableOpacity>
    ),
    [handlePlaceSelect],
  );

  // Categories with "All" option
  const categoriesWithAll = useMemo(() => {
    const allCategory: Category = {
      id: 'all',
      name: 'Tümü',
      description: 'Tüm kategoriler',
      icon: '🏛️',
      color: AppColors.PRIMARY,
      placesCount: featuredPlaces.length,
    };
    return [allCategory, ...categories];
  }, [categories, featuredPlaces.length]);

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader
        title={`Keşfet ${showSearch ? '(Arama Modu)' : ''}`}
        icon='🧭'
        rightIcon='🔍'
        onRightPress={toggleSearch}
      />

      {showSearch ? (
        // Search Mode
        <View style={styles.searchContainer}>
          <OptimizedSearchComponent
            onPlaceSelect={handlePlaceSelect}
            placeholder='Nereyi keşfetmek istiyorsun?'
            maxResults={20}
            showPerformanceStats={__DEV__} // Only show in development
          />
        </View>
      ) : (
        // Browse Mode
        <ScrollView
          style={GlobalStyles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Kategoriler</Text>
            <FlatList
              data={categoriesWithAll}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          {/* Places */}
          <View style={styles.placesSection}>
            <View style={styles.placesSectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'all'
                  ? 'Öne Çıkan Yerler'
                  : categories.find(c => c.id === selectedCategory)?.name}
              </Text>
              <Text style={styles.placesCount}>
                {filteredPlaces.length} yer
              </Text>
            </View>

            <FlatList
              data={filteredPlaces}
              renderItem={renderPlaceItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: 16,
  },
  categoriesSection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
    borderWidth: 1,
    borderColor: AppColors.BG_LIGHT,
  },
  categoryItemSelected: {
    backgroundColor: AppColors.PRIMARY,
    borderColor: AppColors.PRIMARY,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: AppColors.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryTextSelected: {
    color: AppColors.BG_PRIMARY,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 10,
    color: AppColors.TEXT_SECONDARY,
  },
  placesSection: {
    paddingBottom: 32,
  },
  placesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  placesCount: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  placeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.BG_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  placeIcon: {
    fontSize: 24,
  },
  placeContent: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  placeLocation: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 8,
  },
  placeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeRating: {
    fontSize: 12,
    color: AppColors.ACCENT,
    fontWeight: '500',
  },
  placeCategory: {
    fontSize: 11,
    color: AppColors.TEXT_SECONDARY,
    backgroundColor: AppColors.BG_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  featuredBadge: {
    fontSize: 20,
    marginLeft: 8,
  },
});

export default OptimizedExploreScreen;
