/**
 * TravelTurkey - Advanced Search Component
 * Gelişmiş arama bileşeni - Debounce, filtreler ve gerçek zamanlı arama
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { AppColors } from '../constants/Colors';
import { TouristPlace } from '../types/touristPlaces';
import { searchPlaces, getSearchSuggestions } from '../data/touristPlaces';

interface SearchComponentProps {
  onPlaceSelect?: (place: TouristPlace) => void;
  placeholder?: string;
  maxResults?: number;
  categories?: string[];
  showRecentSearches?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onPlaceSelect,
  placeholder = 'Yer, şehir veya aktivite arayın...',
  maxResults = 10,
  categories = [],
  showRecentSearches = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPlaces, setFilteredPlaces] = useState<TouristPlace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [searchAnimation] = useState(new Animated.Value(0));

  // Debounce timeout referansı
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Arama animasyonu
  useEffect(() => {
    Animated.timing(searchAnimation, {
      toValue: isSearchFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isSearchFocused, searchAnimation]);

  // Debounced arama fonksiyonu
  const performSearch = useCallback(
    (query: string) => {
      if (query.trim() === '') {
        setFilteredPlaces([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // Gerçek uygulamada bu API çağrısı olabilir
      setTimeout(() => {
        let results = searchPlaces(query);

        // Kategori filtresi uygula
        if (categories.length > 0) {
          results = results.filter(place =>
            categories.includes(place.category),
          );
        }

        // Maksimum sonuç sayısını sınırla
        results = results.slice(0, maxResults);

        setFilteredPlaces(results);
        setIsLoading(false);
      }, 200); // Daha hızlı yanıt için 200ms
    },
    [categories, maxResults],
  );

  // Arama query değişikliği - debounce ile
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    // Arama önerileri güncelle
    if (query.length >= 2) {
      setSearchSuggestions(getSearchSuggestions(query));
    } else {
      setSearchSuggestions([]);
    }

    // Önceki timeout'u temizle
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Yeni timeout ayarla (300ms debounce - daha hızlı)
    const newTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);

    setDebounceTimeout(newTimeout);
  };

  // Arama önerisine tıklama
  const handleSuggestionPress = (place: TouristPlace) => {
    setSearchQuery(place.name);
    setIsSearchFocused(false);

    // Son aramalara ekle
    if (!recentSearches.includes(place.name)) {
      setRecentSearches(prev => [place.name, ...prev.slice(0, 4)]);
    }

    onPlaceSelect?.(place);
  };

  // Son arama önerisine tıklama
  const handleRecentSearchPress = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    performSearch(searchTerm);
  };

  // Arama önerisi item renderer
  const renderSuggestionItem = ({ item }: { item: TouristPlace }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionIcon}>{item.icon}</Text>
        <View style={styles.suggestionText}>
          <Text style={styles.suggestionName}>{item.name}</Text>
          <Text style={styles.suggestionLocation}>
            {item.address.city}, {item.address.district}
          </Text>
        </View>
        <View style={styles.suggestionMeta}>
          <Text style={styles.suggestionRating}>
            ⭐ {item.rating.average.toFixed(1)}
          </Text>
          <Text style={styles.suggestionCategory}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Son aramalar item renderer
  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Text style={styles.recentSearchIcon}>🕐</Text>
      <Text style={styles.recentSearchText}>{item}</Text>
      <TouchableOpacity
        style={styles.removeRecentButton}
        onPress={() =>
          setRecentSearches(prev => prev.filter(search => search !== item))
        }
      >
        <Text style={styles.removeRecentText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Empty state component
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>Sonuç bulunamadı</Text>
      <Text style={styles.emptyStateSubtext}>
        Farklı anahtar kelimeler deneyin
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <Animated.View
        style={[
          styles.searchInputContainer,
          {
            borderColor: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [AppColors.BORDER_LIGHT, AppColors.PRIMARY],
            }),
          },
        ]}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
          placeholderTextColor={AppColors.TEXT_SECONDARY}
          autoCorrect={false}
          clearButtonMode='while-editing'
        />
        {isLoading && (
          <ActivityIndicator
            size='small'
            color={AppColors.PRIMARY}
            style={styles.loadingIndicator}
          />
        )}
      </Animated.View>

      {/* Search Results Dropdown */}
      {isSearchFocused && (
        <View style={styles.dropdownContainer}>
          {searchQuery.trim() === '' &&
          showRecentSearches &&
          recentSearches.length > 0 ? (
            // Son aramalar
            <View>
              <Text style={styles.dropdownHeader}>Son Aramalar</Text>
              <FlatList
                data={recentSearches}
                renderItem={renderRecentSearchItem}
                keyExtractor={(item, index) => `recent-${index}`}
                scrollEnabled={false}
              />
            </View>
          ) : searchQuery.length >= 2 &&
            searchSuggestions.length > 0 &&
            filteredPlaces.length === 0 ? (
            // Arama önerileri
            <View>
              <Text style={styles.dropdownHeader}>Öneriler</Text>
              <FlatList
                data={searchSuggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionTextItem}
                    onPress={() => handleRecentSearchPress(item)}
                  >
                    <Text style={styles.suggestionTextIcon}>💡</Text>
                    <Text style={styles.suggestionTextLabel}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `suggestion-${index}`}
                scrollEnabled={false}
              />
            </View>
          ) : (
            // Arama sonuçları
            <View>
              {filteredPlaces.length > 0 && (
                <Text style={styles.dropdownHeader}>
                  {filteredPlaces.length} sonuç bulundu
                </Text>
              )}
              <FlatList
                data={filteredPlaces}
                renderItem={renderSuggestionItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                ListEmptyComponent={
                  searchQuery.trim() !== '' && !isLoading
                    ? renderEmptyState
                    : null
                }
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: AppColors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: AppColors.TEXT_SECONDARY,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
    paddingVertical: 0,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 20,
    right: 20,
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    maxHeight: 300,
    shadowColor: AppColors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  dropdownHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.TEXT_SECONDARY,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  suggestionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  suggestionLocation: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  suggestionMeta: {
    alignItems: 'flex-end',
  },
  suggestionRating: {
    fontSize: 14,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  suggestionCategory: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
    textTransform: 'capitalize',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  recentSearchIcon: {
    fontSize: 16,
    marginRight: 12,
    color: AppColors.TEXT_SECONDARY,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
  },
  removeRecentButton: {
    padding: 4,
  },
  removeRecentText: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
  },
  suggestionTextItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  suggestionTextIcon: {
    fontSize: 16,
    marginRight: 12,
    color: AppColors.ACCENT,
  },
  suggestionTextLabel: {
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
  },
});

export default SearchComponent;
