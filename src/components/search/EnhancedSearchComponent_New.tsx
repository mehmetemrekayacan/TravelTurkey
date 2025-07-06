/**
 * TravelTurkey - Enhanced Search Component
 * Real-time search with debouncing, loading states, and accessibility
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Keyboard,
  AccessibilityInfo,
} from 'react-native';
import { debounce } from 'lodash';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { Colors } from '../../constants/Colors';
import { searchPlaces, getSearchSuggestions } from '../../data/touristPlaces';

interface EnhancedSearchComponentProps {
  onFilter: (filteredResults: (TouristPlace | EnhancedTouristPlace)[]) => void;
  onPlaceSelect?: (place: TouristPlace | EnhancedTouristPlace) => void;
  placeholder?: string;
  maxResults?: number;
  showSuggestions?: boolean;
  autoFocus?: boolean;
  style?: any;
}

interface SearchResultItemProps {
  item: TouristPlace | EnhancedTouristPlace;
  onPress: (place: TouristPlace | EnhancedTouristPlace) => void;
  index: number;
}

// Memoized search result item component
const SearchResultItem = React.memo<SearchResultItemProps>(
  ({ item, onPress, index }) => {
    const slideAnim = useRef(new Animated.Value(50)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          delay: index * 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          delay: index * 50,
          useNativeDriver: true,
        }),
      ]).start();
    }, [slideAnim, opacityAnim, index]);

    const handlePress = useCallback(() => {
      onPress(item);
    }, [item, onPress]);

    // Get location text
    const getLocationText = () => {
      if ('address' in item && typeof item.address === 'object') {
        return `${item.address.city}, ${item.address.district}`;
      }
      return 'Konum bilgisi yok';
    };

    // Get rating
    const getRating = () => {
      if ('rating' in item && typeof item.rating === 'object') {
        if ('overall' in item.rating) {
          return (item.rating as any).overall.average;
        } else if ('average' in item.rating) {
          return item.rating.average;
        }
      }
      return 0;
    };

    return (
      <Animated.View
        style={[
          styles.searchResultItem,
          {
            transform: [{ translateY: slideAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.searchResultContent}
          onPress={handlePress}
          accessibilityRole='button'
          accessibilityLabel={`${item.name} seçeneği`}
          accessibilityHint={`${item.name} için detayları görüntülemek üzere dokunun`}
        >
          <View style={styles.searchResultIcon}>
            <Text style={styles.searchResultIconText}>
              {'icon' in item && item.icon ? item.icon : '📍'}
            </Text>
          </View>
          <View style={styles.searchResultInfo}>
            <Text style={styles.searchResultName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.searchResultLocation} numberOfLines={1}>
              📍 {getLocationText()}
            </Text>
            <View style={styles.searchResultMeta}>
              <Text style={styles.searchResultRating}>
                ⭐ {getRating().toFixed(1)}
              </Text>
              <Text style={styles.searchResultCategory}>{item.category}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

SearchResultItem.displayName = 'SearchResultItem';

const EnhancedSearchComponent: React.FC<EnhancedSearchComponentProps> = ({
  onFilter,
  onPlaceSelect,
  placeholder = 'Yer, şehir veya kategori arayın...',
  maxResults = 10,
  showSuggestions = true,
  autoFocus = false,
  style,
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    (TouristPlace | EnhancedTouristPlace)[]
  >([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const searchContainerAnim = useRef(new Animated.Value(0)).current;

  // Search function
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsLoading(false);
        onFilter([]);
        return;
      }

      try {
        // Simulate search delay for better UX demonstration
        await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

        const results = searchPlaces(searchQuery).slice(0, maxResults);
        setSearchResults(results);
        onFilter(results);

        // Announce results for screen readers
        const resultCount = results.length;
        AccessibilityInfo.announceForAccessibility(
          `${resultCount} sonuç bulundu: ${searchQuery}`,
        );
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        onFilter([]);
        AccessibilityInfo.announceForAccessibility(
          'Arama sırasında hata oluştu',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [maxResults, onFilter],
  );

  // Debounced search function
  const debouncedSearch = useRef(
    debounce((searchQuery: string) => {
      performSearch(searchQuery);
    }, 300),
  ).current;

  // Handle text input changes
  const handleTextChange = useCallback(
    (text: string) => {
      setQuery(text);
      setIsLoading(text.length > 0);

      if (text.length > 0) {
        setShowResults(true);
        if (showSuggestions && text.length >= 2) {
          const searchSuggestions = getSearchSuggestions(text);
          setSuggestions(searchSuggestions);
        }
        debouncedSearch(text);
      } else {
        setSearchResults([]);
        setSuggestions([]);
        setIsLoading(false);
        setShowResults(false);
        onFilter([]);
      }
    },
    [debouncedSearch, onFilter, showSuggestions],
  );

  // Clear search
  const handleClear = useCallback(() => {
    setQuery('');
    setSearchResults([]);
    setSuggestions([]);
    setIsLoading(false);
    setShowResults(false);
    onFilter([]);
    inputRef.current?.focus();

    // Announce clear action
    AccessibilityInfo.announceForAccessibility('Arama temizlendi');
  }, [onFilter]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowResults(true);
    }

    Animated.timing(searchContainerAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [query.length, searchContainerAnim]);

  // Handle input blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Delay hiding results to allow for item selection
    setTimeout(() => {
      setShowResults(false);
    }, 150);

    Animated.timing(searchContainerAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchContainerAnim]);

  // Handle place selection
  const handlePlaceSelect = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      setQuery(place.name);
      setShowResults(false);
      Keyboard.dismiss();
      onPlaceSelect?.(place);

      // Announce selection
      AccessibilityInfo.announceForAccessibility(`${place.name} seçildi`);
    },
    [onPlaceSelect],
  );

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      inputRef.current?.focus();
      handleTextChange(suggestion);
    },
    [handleTextChange],
  );

  // Render search result item
  const renderResultItem = useCallback(
    ({
      item,
      index,
    }: {
      item: TouristPlace | EnhancedTouristPlace;
      index: number;
    }) => (
      <SearchResultItem item={item} onPress={handlePlaceSelect} index={index} />
    ),
    [handlePlaceSelect],
  );

  // Render suggestion item
  const renderSuggestionItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSuggestionSelect(item)}
        accessibilityRole='button'
        accessibilityLabel={`${item} önerisi`}
        accessibilityHint='Bu öneriyi aramak için dokunun'
      >
        <Text style={styles.suggestionIcon}>🔍</Text>
        <Text style={styles.suggestionText}>{item}</Text>
      </TouchableOpacity>
    ),
    [handleSuggestionSelect],
  );

  const animatedBorderColor = searchContainerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.neutral.grayLight, Colors.primary.blue],
  });

  return (
    <View style={[styles.container, style]}>
      {/* Search Input Container */}
      <Animated.View
        style={[
          styles.searchInputContainer,
          { borderColor: animatedBorderColor },
        ]}
      >
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={Colors.neutral.grayMedium}
            value={query}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            autoCorrect={false}
            autoCapitalize='none'
            accessibilityLabel='Arama giriş alanı'
            accessibilityHint='Aranacak yer, şehir veya kategori yazın'
            accessibilityRole='search'
          />

          {/* Loading Indicator */}
          {isLoading && (
            <ActivityIndicator
              size='small'
              color={Colors.primary.blue}
              style={styles.loadingIndicator}
              accessibilityLabel='Aranıyor'
            />
          )}

          {/* Clear Button */}
          {query.length > 0 && !isLoading && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              accessibilityRole='button'
              accessibilityLabel='Aramayı temizle'
              accessibilityHint='Arama kutusunu temizlemek için dokunun'
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Search Results and Suggestions */}
      {showResults && (isFocused || query.length > 0) && (
        <View style={styles.resultsContainer}>
          {/* Search Results */}
          {searchResults.length > 0 && (
            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>
                Sonuçlar ({searchResults.length})
              </Text>
              <FlatList
                data={searchResults}
                renderItem={renderResultItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={10}
                initialNumToRender={5}
                style={styles.resultsList}
              />
            </View>
          )}

          {/* Suggestions */}
          {showSuggestions &&
            suggestions.length > 0 &&
            searchResults.length === 0 &&
            query.length > 0 && (
              <View style={styles.suggestionsSection}>
                <Text style={styles.sectionTitle}>Öneriler</Text>
                <FlatList
                  data={suggestions}
                  renderItem={renderSuggestionItem}
                  keyExtractor={(item, index) => `suggestion-${index}`}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  maxToRenderPerBatch={3}
                  windowSize={5}
                  style={styles.suggestionsList}
                />
              </View>
            )}

          {/* No Results State */}
          {query.length > 0 &&
            !isLoading &&
            searchResults.length === 0 &&
            suggestions.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsIcon}>🔍</Text>
                <Text style={styles.noResultsTitle}>Sonuç bulunamadı</Text>
                <Text style={styles.noResultsSubtitle}>
                  "{query}" için eşleşen yer bulunamadı
                </Text>
                <Text style={styles.noResultsTip}>
                  Farklı anahtar kelimeler deneyebilirsiniz
                </Text>
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
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: Colors.neutral.white,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    color: Colors.neutral.grayMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral.charcoal,
    fontWeight: '500',
  },
  loadingIndicator: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: Colors.neutral.grayMedium,
    fontWeight: '600',
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    marginTop: 4,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 400,
  },
  resultsSection: {
    paddingVertical: 8,
  },
  suggestionsSection: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral.grayMedium,
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultsList: {
    maxHeight: 300,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  searchResultItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchResultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.neutral.white,
  },
  searchResultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchResultIconText: {
    fontSize: 20,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 4,
  },
  searchResultLocation: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    marginBottom: 4,
  },
  searchResultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultRating: {
    fontSize: 12,
    color: Colors.secondary.golden,
    fontWeight: '600',
    marginRight: 12,
  },
  searchResultCategory: {
    fontSize: 12,
    color: Colors.primary.blue,
    fontWeight: '500',
    backgroundColor: Colors.primary.blue + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  suggestionIcon: {
    fontSize: 16,
    marginRight: 12,
    color: Colors.neutral.grayMedium,
  },
  suggestionText: {
    fontSize: 15,
    color: Colors.neutral.charcoal,
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 24,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.6,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
    marginBottom: 4,
  },
  noResultsTip: {
    fontSize: 12,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

EnhancedSearchComponent.displayName = 'EnhancedSearchComponent';

export { EnhancedSearchComponent };
export default EnhancedSearchComponent;
