/**
 * TravelTurkey - Optimized Search Hook
 * Performance-optimized search hook with debouncing and caching
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TouristPlace } from '../types/touristPlaces';
import { dataManager } from '../services/api';

interface UseSearchOptions {
  debounceMs?: number;
  maxResults?: number;
  categories?: string[];
  minQueryLength?: number;
}

interface UseSearchResult {
  query: string;
  results: TouristPlace[];
  suggestions: string[];
  isLoading: boolean;
  isError: boolean;
  searchCount: number;
  performanceStats: {
    lastSearchDuration: number;
    averageSearchDuration: number;
  };
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useOptimizedSearch = (
  options: UseSearchOptions = {},
): UseSearchResult => {
  const {
    debounceMs = 300,
    maxResults = 20,
    categories = [],
    minQueryLength = 2,
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TouristPlace[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  // Performance tracking
  const searchTimesRef = useRef<number[]>([]);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Performance stats
  const performanceStats = useMemo(() => {
    const times = searchTimesRef.current;
    return {
      lastSearchDuration: times.length > 0 ? times[times.length - 1] : 0,
      averageSearchDuration:
        times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0,
    };
  }, []);

  // Optimized search function
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim() || searchQuery.length < minQueryLength) {
        setResults([]);
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const startTime = Date.now();

        // Perform search using optimized data manager
        let searchResults = dataManager.searchPlaces(searchQuery);

        // Apply category filters if specified
        if (categories.length > 0) {
          searchResults = searchResults.filter(place =>
            categories.includes(place.category),
          );
        }

        // Limit results
        const limitedResults = searchResults.slice(0, maxResults);

        // Get suggestions
        const searchSuggestions = dataManager.getSearchSuggestions(
          searchQuery,
          6,
        );

        const endTime = Date.now();
        const searchDuration = endTime - startTime;

        // Track performance
        searchTimesRef.current.push(searchDuration);
        if (searchTimesRef.current.length > 10) {
          searchTimesRef.current.shift(); // Keep only last 10 measurements
        }

        setResults(limitedResults);
        setSuggestions(searchSuggestions);
        setSearchCount(prev => prev + 1);

        console.log(
          `🔍 Search completed in ${searchDuration.toFixed(2)}ms - ${
            limitedResults.length
          } results`,
        );
      } catch (error) {
        console.error('Search error:', error);
        setIsError(true);
        setResults([]);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [categories, maxResults, minQueryLength],
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, debounceMs);
    },
    [debounceMs, performSearch],
  );

  // Handle query changes
  const handleSetQuery = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      if (!newQuery.trim()) {
        setResults([]);
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      // For very short queries, get suggestions only
      if (newQuery.length >= 1 && newQuery.length < minQueryLength) {
        const quickSuggestions = dataManager.getSearchSuggestions(newQuery, 8);
        setSuggestions(quickSuggestions);
        return;
      }

      debouncedSearch(newQuery);
    },
    [debouncedSearch, minQueryLength],
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
    setIsLoading(false);
    setIsError(false);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    query,
    results,
    suggestions,
    isLoading,
    isError,
    searchCount,
    performanceStats,
    setQuery: handleSetQuery,
    clearSearch,
  };
};
