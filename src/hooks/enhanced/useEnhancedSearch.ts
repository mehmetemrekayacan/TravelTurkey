/**
 * TravelTurkey - Enhanced Search Hook
 * Custom hook for managing search state with debouncing and caching
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { searchPlaces, getSearchSuggestions } from '../../data/touristPlaces';

export interface UseEnhancedSearchOptions {
  debounceMs?: number;
  maxResults?: number;
  enableCaching?: boolean;
  enableSuggestions?: boolean;
  minQueryLength?: number;
}

export interface SearchState {
  query: string;
  results: (TouristPlace | EnhancedTouristPlace)[];
  suggestions: string[];
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
}

export interface SearchActions {
  setQuery: (query: string) => void;
  clearSearch: () => void;
  search: (query: string) => Promise<void>;
  selectPlace: (place: TouristPlace | EnhancedTouristPlace) => void;
}

// Cache for search results
const searchCache = new Map<string, (TouristPlace | EnhancedTouristPlace)[]>();
const suggestionCache = new Map<string, string[]>();

export const useEnhancedSearch = (
  options: UseEnhancedSearchOptions = {},
): [SearchState, SearchActions] => {
  const {
    debounceMs = 300,
    maxResults = 10,
    enableCaching = true,
    enableSuggestions = true,
    minQueryLength = 1,
  } = options;

  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    suggestions: [],
    isLoading: false,
    hasSearched: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Perform search function
  const performSearch = useCallback(
    async (searchQuery: string, signal?: AbortSignal) => {
      if (!searchQuery.trim() || searchQuery.length < minQueryLength) {
        setState(prev => ({
          ...prev,
          results: [],
          suggestions: [],
          isLoading: false,
          hasSearched: true,
          error: null,
        }));
        return;
      }

      try {
        // Check cache first
        if (enableCaching && searchCache.has(searchQuery)) {
          const cachedResults = searchCache.get(searchQuery)!;
          setState(prev => ({
            ...prev,
            results: cachedResults.slice(0, maxResults),
            isLoading: false,
            hasSearched: true,
            error: null,
          }));
          return;
        }

        // Check if request was aborted
        if (signal?.aborted) {
          return;
        }

        // Perform actual search
        const results = searchPlaces(searchQuery);
        const limitedResults = results.slice(0, maxResults);

        // Cache results
        if (enableCaching) {
          searchCache.set(searchQuery, results);
        }

        // Get suggestions if enabled
        let suggestions: string[] = [];
        if (enableSuggestions && searchQuery.length >= 2) {
          if (enableCaching && suggestionCache.has(searchQuery)) {
            suggestions = suggestionCache.get(searchQuery)!;
          } else {
            suggestions = getSearchSuggestions(searchQuery);
            if (enableCaching) {
              suggestionCache.set(searchQuery, suggestions);
            }
          }
        }

        // Update state if not aborted
        if (!signal?.aborted) {
          setState(prev => ({
            ...prev,
            results: limitedResults,
            suggestions,
            isLoading: false,
            hasSearched: true,
            error: null,
          }));
        }
      } catch (error) {
        if (!signal?.aborted) {
          console.error('Search error:', error);
          setState(prev => ({
            ...prev,
            results: [],
            suggestions: [],
            isLoading: false,
            hasSearched: true,
            error: 'Arama sırasında hata oluştu',
          }));
        }
      }
    },
    [maxResults, enableCaching, enableSuggestions, minQueryLength],
  );

  // Debounced search function
  const debouncedSearch = useRef(
    debounce((searchQuery: string, signal?: AbortSignal) => {
      performSearch(searchQuery, signal);
    }, debounceMs),
  ).current;

  // Set query function
  const setQuery = useCallback(
    (newQuery: string) => {
      setState(prev => ({
        ...prev,
        query: newQuery,
        isLoading: newQuery.length >= minQueryLength,
        error: null,
      }));

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (newQuery.length >= minQueryLength) {
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        debouncedSearch(newQuery, abortControllerRef.current.signal);
      } else {
        setState(prev => ({
          ...prev,
          results: [],
          suggestions: [],
          isLoading: false,
          hasSearched: false,
        }));
      }
    },
    [debouncedSearch, minQueryLength],
  );

  // Clear search function
  const clearSearch = useCallback(() => {
    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Cancel debounced search
    debouncedSearch.cancel();

    setState({
      query: '',
      results: [],
      suggestions: [],
      isLoading: false,
      hasSearched: false,
      error: null,
    });
  }, [debouncedSearch]);

  // Manual search function
  const search = useCallback(
    async (searchQuery: string) => {
      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      await performSearch(searchQuery);
    },
    [performSearch],
  );

  // Select place function
  const selectPlace = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      setState(prev => ({
        ...prev,
        query: place.name,
        results: [place],
        suggestions: [],
      }));
    },
    [],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const actions: SearchActions = {
    setQuery,
    clearSearch,
    search,
    selectPlace,
  };

  return [state, actions];
};

// Hook for search analytics
export const useSearchAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSearches: 0,
    popularQueries: [] as { query: string; count: number }[],
    averageResultsPerSearch: 0,
    noResultQueries: [] as string[],
  });

  const trackSearch = useCallback((query: string, resultCount: number) => {
    setAnalytics(prev => {
      const newTotalSearches = prev.totalSearches + 1;
      const newAverageResults =
        (prev.averageResultsPerSearch * prev.totalSearches + resultCount) /
        newTotalSearches;

      // Update popular queries
      const existingQueryIndex = prev.popularQueries.findIndex(
        q => q.query === query,
      );
      let newPopularQueries = [...prev.popularQueries];

      if (existingQueryIndex >= 0) {
        newPopularQueries[existingQueryIndex].count++;
      } else {
        newPopularQueries.push({ query, count: 1 });
      }

      // Sort by count and keep top 10
      newPopularQueries = newPopularQueries
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Track no result queries
      const newNoResultQueries =
        resultCount === 0
          ? [...prev.noResultQueries, query].slice(-50) // Keep last 50
          : prev.noResultQueries;

      return {
        totalSearches: newTotalSearches,
        popularQueries: newPopularQueries,
        averageResultsPerSearch: newAverageResults,
        noResultQueries: newNoResultQueries,
      };
    });
  }, []);

  const resetAnalytics = useCallback(() => {
    setAnalytics({
      totalSearches: 0,
      popularQueries: [],
      averageResultsPerSearch: 0,
      noResultQueries: [],
    });
  }, []);

  return {
    analytics,
    trackSearch,
    resetAnalytics,
  };
};

export default useEnhancedSearch;
