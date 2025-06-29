/**
 * TravelTurkey - Explore Screen
 * Keşfet sayfası - Yerler ve aktiviteleri keşfet
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { AppColors } from '../constants/Colors';
import { 
  touristPlaces, 
  categories as dataCategories, 
  searchPlaces, 
  getPlacesByCategory, 
  getFeaturedPlaces 
} from '../data/touristPlaces';
import { TouristPlace, Category as CategoryType } from '../types/touristPlaces';

const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredPlaces, setFilteredPlaces] = useState<TouristPlace[]>(getFeaturedPlaces());

  // Arama fonksiyonu
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPlaces(getFeaturedPlaces());
    } else {
      setFilteredPlaces(searchPlaces(query));
    }
  };

  // Kategori filtresi
  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredPlaces(getFeaturedPlaces());
    } else {
      setFilteredPlaces(getPlacesByCategory(categoryId));
    }
  };

  // Place item renderer
  const renderPlaceItem = ({ item }: { item: TouristPlace }) => (
    <TouchableOpacity style={styles.placeCard}>
      <View style={styles.placeHeader}>
        <Text style={styles.placeIcon}>{item.icon}</Text>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{item.name}</Text>
          <Text style={styles.placeLocation}>{item.address.city}, {item.address.district}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating.average.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.placeDescription}>{item.shortDescription}</Text>
      <View style={styles.placeFooter}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>
          {item.priceInfo.isFree ? 'Ücretsiz' : `${item.priceInfo.adult} ${item.priceInfo.currency}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Category item renderer
  const renderCategoryItem = ({ item }: { item: CategoryType | { id: string; name: string; icon: string; placesCount: number } }) => (
    <TouchableOpacity 
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategoryCard
      ]}
      onPress={() => handleCategoryFilter(item.id)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryName,
        selectedCategory === item.id && styles.selectedCategoryName
      ]}>
        {item.name}
      </Text>
      <Text style={styles.categoryCount}>{item.placesCount} yer</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Keşfet</Text>
          <Text style={styles.subtitle}>Türkiye'nin güzelliklerini keşfedin</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Yer, şehir veya aktivite arayın..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={AppColors.TEXT_SECONDARY}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={[
              { id: 'all', name: 'Tümü', icon: '🗺️', placesCount: touristPlaces.length, description: '', color: '' },
              ...dataCategories
            ]}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Öne Çıkan Yerler' : 'Sonuçlar'}
          </Text>
          <Text style={styles.resultsCount}>{filteredPlaces.length} yer bulundu</Text>
          
          <FlatList
            data={filteredPlaces}
            renderItem={renderPlaceItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.placesList}
          />
        </View>

      </ScrollView>
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