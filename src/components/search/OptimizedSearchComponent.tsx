/**
 * TravelTurkey - Optimized Search Component
 * High-performance search component with modern React patterns
 */

import React, { memo, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { AppColors } from '../../constants/Colors';
import { TouristPlace } from '../../types/touristPlaces';
import { useOptimizedSearch } from '../../hooks/useOptimizedSearch';

interface OptimizedSearchProps {
  onPlaceSelect?: (place: TouristPlace) => void;
  placeholder?: string;
  maxResults?: number;
  categories?: string[];
  showPerformanceStats?: boolean;
  style?: any;
}

// Memoized search result item
const SearchResultItem = memo<{
  item: TouristPlace;
  onPress: (place: TouristPlace) => void;
}>(({ item, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity style={styles.resultItem} onPress={handlePress}>
      <View style={styles.resultIcon}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.resultContent}>
        <Text style={styles.resultName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.resultLocation} numberOfLines={1}>
          {item.address.city}, {item.address.district}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            ⭐ {item.rating.average.toFixed(1)}
          </Text>
          <Text style={styles.categoryText}>{item.subcategory}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// Memoized suggestion item
const SuggestionItem = memo<{
  suggestion: string;
  onPress: (suggestion: string) => void;
}>(({ suggestion, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(suggestion);
  }, [suggestion, onPress]);

  return (
    <TouchableOpacity style={styles.suggestionItem} onPress={handlePress}>
      <Text style={styles.suggestionIcon}>🔍</Text>
      <Text style={styles.suggestionText}>{suggestion}</Text>
    </TouchableOpacity>
  );
});

// Main optimized search component
export const OptimizedSearchComponent: React.FC<OptimizedSearchProps> = memo(
  ({
    onPlaceSelect,
    placeholder = 'Yer, şehir veya aktivite arayın...',
    maxResults = 15,
    categories = [],
    showPerformanceStats = false,
    style,
  }) => {
    const {
      query,
      results,
      suggestions,
      isLoading,
      isError,
      performanceStats,
      setQuery,
      clearSearch,
    } = useOptimizedSearch({
      maxResults,
      categories,
      debounceMs: 250, // Faster debounce for better UX
    });

    // Handle place selection
    const handlePlaceSelect = useCallback(
      (place: TouristPlace) => {
        onPlaceSelect?.(place);
        clearSearch();
      },
      [onPlaceSelect, clearSearch],
    );

    // Handle suggestion selection
    const handleSuggestionSelect = useCallback(
      (suggestion: string) => {
        setQuery(suggestion);
      },
      [setQuery],
    );

    // Render search result item
    const renderResultItem = useCallback(
      ({ item }: { item: TouristPlace }) => (
        <SearchResultItem item={item} onPress={handlePlaceSelect} />
      ),
      [handlePlaceSelect],
    );

    // Render suggestion item
    const renderSuggestionItem = useCallback(
      ({ item }: { item: string }) => (
        <SuggestionItem suggestion={item} onPress={handleSuggestionSelect} />
      ),
      [handleSuggestionSelect],
    );

    // Show suggestions when query is short or no results
    const showSuggestions =
      suggestions.length > 0 && (query.length < 2 || results.length === 0);
    const showResults = query.length >= 2 && results.length > 0;

    return (
      <View style={[styles.container, style]}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={AppColors.TEXT_SECONDARY}
            autoCorrect={false}
            autoCapitalize='none'
          />

          {isLoading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              color={AppColors.PRIMARY}
              size='small'
            />
          )}

          {query.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Performance Stats (Development Only) */}
        {showPerformanceStats && query.length > 0 && (
          <View style={styles.performanceStats}>
            <Text style={styles.performanceText}>
              Son arama: {performanceStats.lastSearchDuration.toFixed(1)}ms |
              Ortalama: {performanceStats.averageSearchDuration.toFixed(1)}ms
            </Text>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Arama sırasında bir hata oluştu
            </Text>
          </View>
        )}

        {/* Suggestions */}
        {showSuggestions && (
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Öneriler</Text>
            <FlatList
              data={suggestions}
              renderItem={renderSuggestionItem}
              keyExtractor={(item, index) => `suggestion-${index}`}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              maxToRenderPerBatch={5}
              windowSize={10}
            />
          </View>
        )}

        {/* Search Results */}
        {showResults && (
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>
              {results.length} sonuç bulundu
            </Text>
            <FlatList
              data={results}
              renderItem={renderResultItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              maxToRenderPerBatch={8}
              windowSize={10}
              getItemLayout={(data, index) => ({
                length: 80,
                offset: 80 * index,
                index,
              })}
            />
          </View>
        )}

        {/* No Results */}
        {query.length >= 2 &&
          !isLoading &&
          results.length === 0 &&
          suggestions.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <Text style={styles.noResultsTitle}>Sonuç bulunamadı</Text>
              <Text style={styles.noResultsSubtitle}>
                "{query}" için herhangi bir yer bulunamadı
              </Text>
            </View>
          )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
  },
  loadingIndicator: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
  },
  performanceStats: {
    backgroundColor: AppColors.BG_SECONDARY,
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  performanceText: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 12,
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
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.BG_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  resultLocation: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 12,
    color: AppColors.ACCENT,
    fontWeight: '500',
  },
  categoryText: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
    backgroundColor: AppColors.BG_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 8,
    marginBottom: 4,
  },
  suggestionIcon: {
    fontSize: 16,
    marginRight: 12,
    color: AppColors.TEXT_SECONDARY,
  },
  suggestionText: {
    fontSize: 14,
    color: AppColors.TEXT_PRIMARY,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default OptimizedSearchComponent;
