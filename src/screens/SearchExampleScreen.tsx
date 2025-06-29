/**
 * TravelTurkey - Search Screen Example
 * Gelişmiş arama ekranı örneği
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import { AppColors } from '../constants/Colors';
import { TouristPlace } from '../types/touristPlaces';
import { touristPlaces, categories } from '../data/touristPlaces';

const SearchExampleScreen: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [popularPlaces] = useState<TouristPlace[]>(
    touristPlaces.slice(0, 5), // İlk 5 popüler yer
  );

  // Yer seçimi
  const handlePlaceSelect = (place: TouristPlace) => {
    setSelectedPlace(place);
    Alert.alert(
      'Yer Seçildi',
      `${place.name} seçildi!\n${place.address.city}, ${place.address.district}`,
      [{ text: 'Tamam' }],
    );
  };

  // Popüler yer kartı
  const renderPopularPlace = ({ item }: { item: TouristPlace }) => (
    <TouchableOpacity
      style={styles.popularCard}
      onPress={() => handlePlaceSelect(item)}
    >
      <Text style={styles.popularIcon}>{item.icon}</Text>
      <View style={styles.popularInfo}>
        <Text style={styles.popularName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.popularLocation} numberOfLines={1}>
          {item.address.city}
        </Text>
      </View>
      <Text style={styles.popularRating}>
        ⭐ {item.rating.average.toFixed(1)}
      </Text>
    </TouchableOpacity>
  );

  // Kategori kartı
  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategories.includes(item.id) && styles.selectedCategoryCard,
      ]}
      onPress={() => {
        setSelectedCategories(prev =>
          prev.includes(item.id)
            ? prev.filter(id => id !== item.id)
            : [...prev, item.id],
        );
      }}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryName,
          selectedCategories.includes(item.id) && styles.selectedCategoryName,
        ]}
      >
        {item.name}
      </Text>
      <Text style={styles.categoryCount}>{item.placesCount} yer</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Arama</Text>
          <Text style={styles.subtitle}>
            Türkiye'de gezilecek yerleri keşfedin
          </Text>
        </View>

        {/* Search Component */}
        <SearchComponent
          onPlaceSelect={handlePlaceSelect}
          placeholder="Nereyi ziyaret etmek istiyorsunuz?"
          maxResults={8}
          categories={selectedCategories}
          showRecentSearches={true}
        />

        {/* Selected Place Info */}
        {selectedPlace && (
          <View style={styles.selectedPlaceContainer}>
            <Text style={styles.sectionTitle}>Seçilen Yer</Text>
            <View style={styles.selectedPlaceCard}>
              <Text style={styles.selectedPlaceIcon}>{selectedPlace.icon}</Text>
              <View style={styles.selectedPlaceInfo}>
                <Text style={styles.selectedPlaceName}>
                  {selectedPlace.name}
                </Text>
                <Text style={styles.selectedPlaceDescription}>
                  {selectedPlace.shortDescription}
                </Text>
                <Text style={styles.selectedPlaceLocation}>
                  📍 {selectedPlace.address.city},{' '}
                  {selectedPlace.address.district}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Popular Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popüler Yerler</Text>
          <FlatList
            data={popularPlaces}
            renderItem={renderPopularPlace}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Search Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Arama İpuçları</Text>
          <View style={styles.tipsContainer}>
            <Text style={styles.tip}>
              💡 Şehir adı ile arama yapın (ör: "İstanbul")
            </Text>
            <Text style={styles.tip}>
              🏛️ Kategori adı ile arama yapın (ör: "Müze")
            </Text>
            <Text style={styles.tip}>🔍 Kelime kombinasyonları deneyin</Text>
            <Text style={styles.tip}>
              📱 Son aramalarınız otomatik kaydedilir
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: AppColors.BG_PRIMARY,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  selectedPlaceContainer: {
    marginVertical: 20,
  },
  selectedPlaceCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.BG_PRIMARY,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlaceIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  selectedPlaceInfo: {
    flex: 1,
  },
  selectedPlaceName: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 5,
  },
  selectedPlaceDescription: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 5,
    lineHeight: 20,
  },
  selectedPlaceLocation: {
    fontSize: 14,
    color: AppColors.ACCENT,
    fontWeight: '500',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 10,
    color: AppColors.TEXT_SECONDARY,
  },
  selectedCategoryCard: {
    backgroundColor: AppColors.PRIMARY,
    borderColor: AppColors.PRIMARY,
  },
  selectedCategoryName: {
    color: AppColors.BG_PRIMARY,
  },
  popularCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  popularIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  popularInfo: {
    flex: 1,
  },
  popularName: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 3,
  },
  popularLocation: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  popularRating: {
    fontSize: 14,
    color: AppColors.ACCENT,
    fontWeight: '500',
  },
  tipsContainer: {
    marginHorizontal: 20,
    backgroundColor: AppColors.BG_PRIMARY,
    padding: 15,
    borderRadius: 12,
  },
  tip: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default SearchExampleScreen;
