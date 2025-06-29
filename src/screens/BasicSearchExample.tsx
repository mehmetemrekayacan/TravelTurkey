/**
 * TravelTurkey - Basic Search Example
 * Temel arama fonksiyonu örneği - FlatList ile gerçek zamanlı filtreleme
 */

import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AppColors } from '../constants/Colors';
import { TouristPlace } from '../types/touristPlaces';
import { touristPlaces } from '../data/touristPlaces';

// Liste header componenti
const ListHeader: React.FC<{ count: number; searchText: string }> = ({
  count,
  searchText,
}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.resultCount}>
      {count} sonuç bulundu
      {searchText.trim() && ` "${searchText}" için`}
    </Text>
  </View>
);

// Boş liste componenti
const EmptyList: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>🔍</Text>
    <Text style={styles.emptyTitle}>Sonuç bulunamadı</Text>
    <Text style={styles.emptySubtitle}>Farklı anahtar kelimeler deneyin</Text>
  </View>
);

const BasicSearchExample: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');

  // Gerçek zamanlı filtreleme - useMemo ile optimize edilmiş
  const filteredData = useMemo(() => {
    if (!searchText.trim()) {
      return touristPlaces; // Arama boşsa tüm verileri göster
    }

    return touristPlaces.filter(place => {
      const searchLower = searchText.toLowerCase();

      // Çoklu arama kriterleri
      return (
        place.name.toLowerCase().includes(searchLower) ||
        place.address.city.toLowerCase().includes(searchLower) ||
        place.address.district.toLowerCase().includes(searchLower) ||
        place.description.toLowerCase().includes(searchLower) ||
        place.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  }, [searchText]);

  // Liste item renderer
  const renderItem = ({ item }: { item: TouristPlace }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemIcon}>{item.icon}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemLocation}>
            {item.address.city}, {item.address.district}
          </Text>
        </View>
        <Text style={styles.itemRating}>
          ⭐ {item.rating.average.toFixed(1)}
        </Text>
      </View>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );

  // Liste header - sonuç sayısı
  const renderListHeader = () => (
    <ListHeader count={filteredData.length} searchText={searchText} />
  );

  // Boş liste render
  const renderEmptyList = () => <EmptyList />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Temel Arama Örneği</Text>
        <Text style={styles.subtitle}>React Native FlatList Filtreleme</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Yer, şehir veya açıklama arayın..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={AppColors.TEXT_SECONDARY}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        // Performans optimizasyonları
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 120, // Tahmini item yüksekliği
          offset: 120 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  header: {
    backgroundColor: AppColors.BG_PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  searchContainer: {
    backgroundColor: AppColors.BG_PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_LIGHT,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColors.BORDER_LIGHT,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: AppColors.TEXT_SECONDARY,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: AppColors.BG_PRIMARY,
  },
  resultCount: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    fontWeight: '500',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: AppColors.BG_PRIMARY,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  itemLocation: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  itemRating: {
    fontSize: 14,
    color: AppColors.ACCENT,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default BasicSearchExample;
