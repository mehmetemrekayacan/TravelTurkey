/**
 * TravelTurkey - AI Recommendations Engine (2025)
 * Content-based filtering with on-device machine learning
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouristPlace } from '../../types/touristPlaces';

export interface UserPreferences {
  visitedPlaces: string[];
  favoriteCategories: Record<string, number>; // category -> score
  favoriteRegions: Record<string, number>; // region -> score
  ratingHistory: Record<string, number>; // placeId -> rating
  searchHistory: string[];
  lastUpdated: number;
}

export interface RecommendationScore {
  placeId: string;
  score: number;
  reasons: string[];
  confidence: number;
}

export interface AIRecommendation {
  place: TouristPlace;
  score: number;
  reasons: string[];
  confidence: number;
}

const STORAGE_KEYS = {
  USER_PREFERENCES: '@travel_turkey:user_preferences',
  RECOMMENDATION_CACHE: '@travel_turkey:recommendation_cache',
} as const;

/**
 * Initialize user preferences
 */
export const initializeUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error loading user preferences:', error);
  }

  // Default preferences
  const defaultPreferences: UserPreferences = {
    visitedPlaces: [],
    favoriteCategories: {},
    favoriteRegions: {},
    ratingHistory: {},
    searchHistory: [],
    lastUpdated: Date.now(),
  };

  await saveUserPreferences(defaultPreferences);
  return defaultPreferences;
};

/**
 * Save user preferences
 */
export const saveUserPreferences = async (
  preferences: UserPreferences,
): Promise<void> => {
  try {
    preferences.lastUpdated = Date.now();
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences),
    );
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

/**
 * Update user preferences after interaction
 */
export const updateUserPreferences = async (
  action: 'visit' | 'favorite' | 'rate' | 'search',
  data: {
    placeId?: string;
    place?: TouristPlace;
    rating?: number;
    searchTerm?: string;
  },
): Promise<void> => {
  const preferences = await initializeUserPreferences();

  switch (action) {
    case 'visit':
      if (data.placeId && !preferences.visitedPlaces.includes(data.placeId)) {
        preferences.visitedPlaces.push(data.placeId);

        // Update category preferences
        if (data.place) {
          const category = data.place.category;
          preferences.favoriteCategories[category] =
            (preferences.favoriteCategories[category] || 0) + 1;

          // Update region preferences
          const region = data.place.address.city;
          preferences.favoriteRegions[region] =
            (preferences.favoriteRegions[region] || 0) + 1;
        }
      }
      break;

    case 'favorite':
      if (data.place) {
        const category = data.place.category;
        preferences.favoriteCategories[category] =
          (preferences.favoriteCategories[category] || 0) + 2; // Higher weight for favorites
      }
      break;

    case 'rate':
      if (data.placeId && data.rating !== undefined) {
        preferences.ratingHistory[data.placeId] = data.rating;

        // Update category preference based on rating
        if (data.place && data.rating >= 4) {
          const category = data.place.category;
          preferences.favoriteCategories[category] =
            (preferences.favoriteCategories[category] || 0) + data.rating;
        }
      }
      break;

    case 'search':
      if (data.searchTerm) {
        preferences.searchHistory.unshift(data.searchTerm.toLowerCase());
        // Keep only last 50 searches
        preferences.searchHistory = preferences.searchHistory.slice(0, 50);
      }
      break;
  }

  await saveUserPreferences(preferences);
};

/**
 * Calculate similarity between two places
 */
const calculateSimilarity = (
  place1: TouristPlace,
  place2: TouristPlace,
): number => {
  let similarity = 0;

  // Category similarity (40% weight)
  if (place1.category === place2.category) {
    similarity += 0.4;
  }

  // Location similarity (30% weight)
  const location1 = place1.address.city;
  const location2 = place2.address.city;
  if (location1 === location2) {
    similarity += 0.3;
  }

  // Rating similarity (20% weight)
  const ratingDiff = Math.abs(place1.rating.average - place2.rating.average);
  similarity += (1 - ratingDiff / 5) * 0.2;

  // Name/description similarity (10% weight)
  const place1Text = `${place1.name} ${place1.description}`.toLowerCase();
  const place2Text = `${place2.name} ${place2.description}`.toLowerCase();

  const commonWords = place1Text
    .split(' ')
    .filter(word => word.length > 3 && place2Text.includes(word));

  if (commonWords.length > 0) {
    similarity += 0.1;
  }

  return Math.min(similarity, 1);
};

/**
 * Generate content-based recommendations
 */
export const generateRecommendations = async (
  allPlaces: TouristPlace[],
  limit: number = 10,
): Promise<AIRecommendation[]> => {
  const preferences = await initializeUserPreferences();
  const recommendations: RecommendationScore[] = [];

  // Filter out already visited places
  const unvisitedPlaces = allPlaces.filter(
    place => !preferences.visitedPlaces.includes(place.id),
  );

  for (const place of unvisitedPlaces) {
    let score = 0;
    const reasons: string[] = [];

    // Category preference scoring (40% weight)
    const categoryScore = preferences.favoriteCategories[place.category] || 0;
    if (categoryScore > 0) {
      score += Math.min(categoryScore / 10, 0.4);
      reasons.push(`${place.category} kategorisini seviyorsunuz`);
    }

    // Region preference scoring (30% weight)
    const region = place.address.city;
    const regionScore = preferences.favoriteRegions[region] || 0;
    if (regionScore > 0) {
      score += Math.min(regionScore / 10, 0.3);
      reasons.push(`${region} bölgesini daha önce ziyaret ettiniz`);
    }

    // Rating-based scoring (20% weight)
    if (place.rating.average >= 4.0) {
      score += 0.2;
      reasons.push('Yüksek puanlı bir yer');
    }

    // Similarity to visited places (10% weight)
    const visitedPlaces = allPlaces.filter(p =>
      preferences.visitedPlaces.includes(p.id),
    );

    let maxSimilarity = 0;
    for (const visitedPlace of visitedPlaces) {
      const similarity = calculateSimilarity(place, visitedPlace);
      maxSimilarity = Math.max(maxSimilarity, similarity);
    }

    if (maxSimilarity > 0.6) {
      score += maxSimilarity * 0.1;
      reasons.push('Beğendiğiniz yerlere benziyor');
    }

    // Search history relevance
    const placeText = `${place.name} ${place.description}`.toLowerCase();
    const relevantSearches = preferences.searchHistory.filter(
      search => placeText.includes(search) || search.includes(place.category),
    );

    if (relevantSearches.length > 0) {
      score += 0.1;
      reasons.push('Arama geçmişinizle uyumlu');
    }

    // Calculate confidence based on data availability
    let confidence = 0.5; // Base confidence
    if (preferences.visitedPlaces.length > 5) confidence += 0.2;
    if (Object.keys(preferences.favoriteCategories).length > 3)
      confidence += 0.2;
    if (preferences.searchHistory.length > 10) confidence += 0.1;

    if (score > 0.1) {
      // Only include if minimum score threshold is met
      recommendations.push({
        placeId: place.id,
        score,
        reasons,
        confidence: Math.min(confidence, 1),
      });
    }
  }

  // Sort by score and return top recommendations
  const sortedRecommendations = recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // Convert to AI recommendations with place data
  const aiRecommendations: AIRecommendation[] = sortedRecommendations
    .map(rec => {
      const place = allPlaces.find(p => p.id === rec.placeId);
      if (!place) return null;

      return {
        place,
        score: rec.score,
        reasons: rec.reasons,
        confidence: rec.confidence,
      };
    })
    .filter((rec): rec is AIRecommendation => rec !== null);

  return aiRecommendations;
};

/**
 * Get personalized recommendations for specific category
 */
export const getCategoryRecommendations = async (
  allPlaces: TouristPlace[],
  category: string,
  limit: number = 5,
): Promise<AIRecommendation[]> => {
  const categoryPlaces = allPlaces.filter(place => place.category === category);
  return generateRecommendations(categoryPlaces, limit);
};

/**
 * Get recommendations based on current location/region
 */
export const getLocationBasedRecommendations = async (
  allPlaces: TouristPlace[],
  currentRegion: string,
  limit: number = 5,
): Promise<AIRecommendation[]> => {
  const regionPlaces = allPlaces.filter(
    place =>
      place.address.city.toLowerCase().includes(currentRegion.toLowerCase()) ||
      place.address.district
        .toLowerCase()
        .includes(currentRegion.toLowerCase()),
  );
  return generateRecommendations(regionPlaces, limit);
};

/**
 * Clear user preferences (for privacy/reset)
 */
export const clearUserPreferences = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    await AsyncStorage.removeItem(STORAGE_KEYS.RECOMMENDATION_CACHE);
  } catch (error) {
    console.error('Error clearing user preferences:', error);
  }
};

/**
 * Export user data (for GDPR compliance)
 */
export const exportUserData = async (): Promise<UserPreferences | null> => {
  try {
    return await initializeUserPreferences();
  } catch (error) {
    console.error('Error exporting user data:', error);
    return null;
  }
};
