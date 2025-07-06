/**
 * TravelTurkey - Enhanced Search Demo Screen
 * Demonstration of the enhanced search component with FlatList integration
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { EnhancedSearchComponent } from '../../components/search';
import { OptimizedTouristicPlacesList } from '../../components/common';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { Colors } from '../../constants/Colors';
import { getFeaturedPlaces } from '../../data/touristPlaces';

const EnhancedSearchDemoScreen: React.FC = () => {
  const [filteredPlaces, setFilteredPlaces] = useState<
    (TouristPlace | EnhancedTouristPlace)[]
  >(getFeaturedPlaces());
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Handle search filter updates
  const handleSearchFilter = useCallback(
    (results: (TouristPlace | EnhancedTouristPlace)[]) => {
      setFilteredPlaces(results.length > 0 ? results : getFeaturedPlaces());
      setIsSearchActive(results.length > 0);
    },
    [],
  );

  // Handle place selection from search results
  const handlePlaceSelect = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      console.log('Selected place from search:', place.name);
      // Here you would typically navigate to the place detail screen
    },
    [],
  );

  // Handle place press from FlatList
  const handlePlacePress = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      console.log('Pressed place from list:', place.name);
      // Here you would typically navigate to the place detail screen
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary.blue}
        barStyle='light-content'
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Gelişmiş Arama</Text>
        <Text style={styles.subtitle}>
          Debounced arama, yükleme durumu ve erişilebilirlik özellikli arama
        </Text>
      </View>

      {/* Enhanced Search Component */}
      <View style={styles.searchSection}>
        <EnhancedSearchComponent
          onFilter={handleSearchFilter}
          onPlaceSelect={handlePlaceSelect}
          placeholder='Yer, şehir veya kategori arayın...'
          maxResults={15}
          showSuggestions={true}
          autoFocus={false}
          style={styles.searchComponent}
        />
      </View>

      {/* Results Section */}
      <View style={styles.resultsSection}>
        <View style={styles.resultsSectionHeader}>
          <Text style={styles.resultsTitle}>
            {isSearchActive ? 'Arama Sonuçları' : 'Öne Çıkan Yerler'}
          </Text>
          <Text style={styles.resultsCount}>{filteredPlaces.length} yer</Text>
        </View>

        {/* Places List */}
        <OptimizedTouristicPlacesList
          data={filteredPlaces}
          onItemPress={handlePlacePress}
          variant='default'
          showImages={true}
          style={styles.placesList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.offWhite,
  },
  header: {
    backgroundColor: Colors.primary.blue,
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.white,
    opacity: 0.9,
    lineHeight: 22,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: -16, // Overlap with header for better visual connection
    zIndex: 1000,
  },
  searchComponent: {
    // Additional styling if needed
  },
  resultsSection: {
    flex: 1,
    paddingTop: 16,
  },
  resultsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    fontWeight: '500',
  },
  placesList: {
    flex: 1,
  },
});

export default EnhancedSearchDemoScreen;
