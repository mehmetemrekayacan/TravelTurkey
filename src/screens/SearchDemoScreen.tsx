/**
 * TravelTurkey - Search Demo Component
 * Gelişmiş arama özelliklerini test etmek için demo
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AppColors } from '../constants/Colors';
import {
  searchPlaces,
  fuzzySearchPlaces,
  getSearchSuggestions,
  getPopularSearchTerms,
  searchPlacesWithFilters,
  SearchFilters,
} from '../data/touristPlaces';

const SearchDemoScreen: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedDemo, setSelectedDemo] = useState<string>('');

  // Demo arama testleri
  const runSearchDemo = (demoType: string, query: string) => {
    setSelectedDemo(demoType);
    let results: any[] = [];

    switch (demoType) {
      case 'normal':
        results = searchPlaces(query);
        break;
      case 'fuzzy':
        results = fuzzySearchPlaces(query, 0.5);
        break;
      case 'suggestions':
        results = getSearchSuggestions(query);
        break;
      case 'filtered':
        const filters: SearchFilters = {
          categories: ['historical'],
          minRating: 4.5,
          isFree: false,
        };
        results = searchPlacesWithFilters(query, filters);
        break;
      default:
        results = [];
    }

    setSearchResults(results);
    Alert.alert(
      `${demoType} Arama Sonuçları`,
      `"${query}" için ${results.length} sonuç bulundu`,
      [{ text: 'Tamam' }],
    );
  };

  const popularTerms = getPopularSearchTerms();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Arama Demo</Text>
          <Text style={styles.subtitle}>
            Gelişmiş arama özelliklerini test edin
          </Text>
        </View>

        {/* Demo Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Arama Türleri</Text>

          <TouchableOpacity
            style={[
              styles.demoButton,
              selectedDemo === 'normal' && styles.selectedButton,
            ]}
            onPress={() => runSearchDemo('normal', 'İstanbul')}
          >
            <Text style={styles.demoButtonIcon}>🔍</Text>
            <View style={styles.demoButtonText}>
              <Text style={styles.demoButtonTitle}>Normal Arama</Text>
              <Text style={styles.demoButtonDesc}>Kapsamlı alan araması</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.demoButton,
              selectedDemo === 'fuzzy' && styles.selectedButton,
            ]}
            onPress={() => runSearchDemo('fuzzy', 'Ayasofya')}
          >
            <Text style={styles.demoButtonIcon}>🎯</Text>
            <View style={styles.demoButtonText}>
              <Text style={styles.demoButtonTitle}>Fuzzy Search</Text>
              <Text style={styles.demoButtonDesc}>Yakın eşleşme araması</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.demoButton,
              selectedDemo === 'suggestions' && styles.selectedButton,
            ]}
            onPress={() => runSearchDemo('suggestions', 'Istan')}
          >
            <Text style={styles.demoButtonIcon}>💡</Text>
            <View style={styles.demoButtonText}>
              <Text style={styles.demoButtonTitle}>Arama Önerileri</Text>
              <Text style={styles.demoButtonDesc}>Otomatik tamamlama</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.demoButton,
              selectedDemo === 'filtered' && styles.selectedButton,
            ]}
            onPress={() => runSearchDemo('filtered', 'müze')}
          >
            <Text style={styles.demoButtonIcon}>🎛️</Text>
            <View style={styles.demoButtonText}>
              <Text style={styles.demoButtonTitle}>Filtreli Arama</Text>
              <Text style={styles.demoButtonDesc}>Gelişmiş filtrelerle</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Popular Search Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popüler Arama Terimleri</Text>
          <View style={styles.tagsContainer}>
            {popularTerms.slice(0, 10).map((term, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tagButton}
                onPress={() => runSearchDemo('normal', term)}
              >
                <Text style={styles.tagText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Sonuçlar ({searchResults.length})
            </Text>
            <View style={styles.resultsContainer}>
              {selectedDemo === 'suggestions'
                ? // String sonuçları için
                  searchResults.map((result, index) => (
                    <View key={index} style={styles.resultItem}>
                      <Text style={styles.resultText}>💡 {result}</Text>
                    </View>
                  ))
                : // TouristPlace sonuçları için
                  searchResults.slice(0, 5).map((place, index) => (
                    <View key={place.id || index} style={styles.resultItem}>
                      <Text style={styles.resultIcon}>{place.icon}</Text>
                      <View style={styles.resultInfo}>
                        <Text style={styles.resultName}>{place.name}</Text>
                        <Text style={styles.resultLocation}>
                          {place.address?.city}, {place.address?.district}
                        </Text>
                        <Text style={styles.resultRating}>
                          ⭐ {place.rating?.average.toFixed(1)}(
                          {place.rating?.count.toLocaleString()} değerlendirme)
                        </Text>
                      </View>
                    </View>
                  ))}
            </View>
          </View>
        )}

        {/* Search Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Arama İpuçları</Text>
          <View style={styles.tipsContainer}>
            <Text style={styles.tip}>
              🔍 <Text style={styles.tipBold}>Normal Arama:</Text> İsim,
              açıklama, şehir, etiketler
            </Text>
            <Text style={styles.tip}>
              🎯 <Text style={styles.tipBold}>Fuzzy Search:</Text> Yazım
              hatalarını tolere eder
            </Text>
            <Text style={styles.tip}>
              💡 <Text style={styles.tipBold}>Öneriler:</Text> 2+ karakter ile
              aktif olur
            </Text>
            <Text style={styles.tip}>
              🎛️ <Text style={styles.tipBold}>Filtreli:</Text> Kategori, rating,
              fiyat filtresi
            </Text>
            <Text style={styles.tip}>
              📊 <Text style={styles.tipBold}>Sıralama:</Text> Relevans skoruna
              göre
            </Text>
            <Text style={styles.tip}>
              ⚡ <Text style={styles.tipBold}>Performans:</Text> Debounce ve
              optimizasyon
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
    backgroundColor: AppColors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.BG_PRIMARY,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.BG_PRIMARY,
    opacity: 0.9,
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
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedButton: {
    borderColor: AppColors.PRIMARY,
    backgroundColor: AppColors.BG_SECONDARY,
  },
  demoButtonIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  demoButtonText: {
    flex: 1,
  },
  demoButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 3,
  },
  demoButtonDesc: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    gap: 10,
  },
  tagButton: {
    backgroundColor: AppColors.BG_PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.BORDER_LIGHT,
  },
  tagText: {
    fontSize: 14,
    color: AppColors.TEXT_PRIMARY,
    fontWeight: '500',
  },
  resultsContainer: {
    marginHorizontal: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  resultLocation: {
    fontSize: 13,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 2,
  },
  resultRating: {
    fontSize: 12,
    color: AppColors.ACCENT,
  },
  resultText: {
    fontSize: 15,
    color: AppColors.TEXT_PRIMARY,
  },
  tipsContainer: {
    backgroundColor: AppColors.BG_PRIMARY,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
  },
  tip: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 10,
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
  },
});

export default SearchDemoScreen;
