/**
 * TravelTurkey - Optimized Data Manager
 * Lazy loading and cached data management for better performance
 */

import { TouristPlace, Category } from '../../types/touristPlaces';
import {
  touristPlaces,
  categories as allCategories,
} from '../../data/touristPlaces';

// Cache for frequently accessed data
interface DataCache {
  featuredPlaces?: TouristPlace[];
  popularPlaces?: TouristPlace[];
  placesByCategory?: Record<string, TouristPlace[]>;
  citiesIndex?: Record<string, TouristPlace[]>;
  searchIndex?: Map<string, TouristPlace[]>;
}

class DataManager {
  private static instance: DataManager;
  private cache: DataCache = {};
  private initialized = false;

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  // Lazy initialization
  private initialize() {
    if (this.initialized) return;

    console.log('🚀 Initializing DataManager...');
    const startTime = performance.now();

    this.buildIndexes();

    const endTime = performance.now();
    console.log(
      `✅ DataManager initialized in ${(endTime - startTime).toFixed(2)}ms`,
    );
    this.initialized = true;
  }

  // Build search indexes for faster lookups
  private buildIndexes() {
    // Featured places cache
    this.cache.featuredPlaces = touristPlaces.filter(place => place.isFeatured);

    // Popular places cache (sorted by popularity)
    this.cache.popularPlaces = [...touristPlaces].sort(
      (a, b) => b.popularityScore - a.popularityScore,
    );

    // Category index
    this.cache.placesByCategory = {};
    allCategories.forEach(category => {
      this.cache.placesByCategory![category.id] = touristPlaces.filter(
        place => place.category === category.id,
      );
    });

    // Cities index
    this.cache.citiesIndex = {};
    touristPlaces.forEach(place => {
      const city = place.address.city;
      if (!this.cache.citiesIndex![city]) {
        this.cache.citiesIndex![city] = [];
      }
      this.cache.citiesIndex![city].push(place);
    });

    // Search index for common terms
    this.cache.searchIndex = new Map();
  }

  // Get featured places (cached)
  getFeaturedPlaces(): TouristPlace[] {
    this.initialize();
    return this.cache.featuredPlaces || [];
  }

  // Get popular places with limit (cached)
  getPopularPlaces(limit: number = 10): TouristPlace[] {
    this.initialize();
    return this.cache.popularPlaces?.slice(0, limit) || [];
  }

  // Get places by category (cached)
  getPlacesByCategory(categoryId: string): TouristPlace[] {
    this.initialize();
    return this.cache.placesByCategory?.[categoryId] || [];
  }

  // Get places by city (cached)
  getPlacesByCity(city: string): TouristPlace[] {
    this.initialize();
    return this.cache.citiesIndex?.[city] || [];
  }

  // Optimized search with caching
  searchPlaces(query: string): TouristPlace[] {
    if (!query?.trim()) return [];

    this.initialize();

    const normalizedQuery = query.toLowerCase().trim();

    // Check cache first
    if (this.cache.searchIndex?.has(normalizedQuery)) {
      return this.cache.searchIndex.get(normalizedQuery) || [];
    }

    // Perform search
    const results = this.performOptimizedSearch(normalizedQuery);

    // Cache results for future use (limit cache size)
    if (this.cache.searchIndex!.size < 100) {
      this.cache.searchIndex!.set(normalizedQuery, results);
    }

    return results;
  }

  private performOptimizedSearch(query: string): TouristPlace[] {
    const queryWords = query.split(' ').filter(w => w.length > 1);
    const results: Array<{ place: TouristPlace; score: number }> = [];

    for (const place of touristPlaces) {
      const score = this.calculateSearchScore(place, query, queryWords);
      if (score > 0) {
        results.push({ place, score });
      }
    }

    // Sort by score and return places
    return results
      .sort((a, b) => b.score - a.score)
      .map(result => result.place);
  }

  private calculateSearchScore(
    place: TouristPlace,
    query: string,
    queryWords: string[],
  ): number {
    let score = 0;
    const placeName = place.name.toLowerCase();
    const placeCity = place.address.city.toLowerCase();
    const placeDesc = place.shortDescription.toLowerCase();

    // Exact name match - highest priority
    if (placeName === query) return 1000;
    if (placeName.includes(query)) score += 500;

    // City match
    if (placeCity === query) score += 400;
    if (placeCity.includes(query)) score += 200;

    // Description match
    if (placeDesc.includes(query)) score += 100;

    // Multi-word search
    if (queryWords.length > 1) {
      const matchedWords = queryWords.filter(
        word =>
          placeName.includes(word) ||
          placeCity.includes(word) ||
          placeDesc.includes(word),
      );
      score += matchedWords.length * 50;
    }

    // Category match
    const category = allCategories.find(cat => cat.id === place.category);
    if (category?.name.toLowerCase().includes(query)) {
      score += 150;
    }

    // Tag match
    const tagMatch = place.tags.some(tag => tag.toLowerCase().includes(query));
    if (tagMatch) score += 80;

    // Popularity boost
    score += place.popularityScore * 0.5;

    // Featured boost
    if (place.isFeatured) score += 50;

    return score;
  }

  // Get search suggestions (optimized)
  getSearchSuggestions(query: string, limit: number = 8): string[] {
    if (!query || query.length < 2) return [];

    this.initialize();

    const suggestions = new Set<string>();
    const lowerQuery = query.toLowerCase();

    // City suggestions
    Object.keys(this.cache.citiesIndex || {}).forEach(city => {
      if (city.toLowerCase().includes(lowerQuery) && suggestions.size < limit) {
        suggestions.add(city);
      }
    });

    // Category suggestions
    allCategories.forEach(category => {
      if (
        category.name.toLowerCase().includes(lowerQuery) &&
        suggestions.size < limit
      ) {
        suggestions.add(category.name);
      }
    });

    // Place name suggestions
    this.cache.popularPlaces?.slice(0, 20).forEach(place => {
      if (
        place.name.toLowerCase().includes(lowerQuery) &&
        suggestions.size < limit
      ) {
        suggestions.add(place.name);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }

  // Get all categories (cached)
  getCategories(): Category[] {
    return allCategories;
  }

  // Get place by ID (optimized)
  getPlaceById(id: string): TouristPlace | undefined {
    return touristPlaces.find(place => place.id === id);
  }

  // Clear cache (for memory management)
  clearCache() {
    this.cache = {};
    this.initialized = false;
    console.log('🗑️ DataManager cache cleared');
  }

  // Get statistics
  getStatistics() {
    this.initialize();
    return {
      totalPlaces: touristPlaces.length,
      totalCategories: allCategories.length,
      totalCities: Object.keys(this.cache.citiesIndex || {}).length,
      featuredPlaces: this.cache.featuredPlaces?.length || 0,
      cacheSize: this.cache.searchIndex?.size || 0,
    };
  }
}

// Export singleton instance
export const dataManager = DataManager.getInstance();
export default dataManager;
