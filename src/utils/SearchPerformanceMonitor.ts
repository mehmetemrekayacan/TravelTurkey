/**
 * TravelTurkey - Search Performance Monitor
 * Arama performansını ölçmek ve optimize etmek için utility
 */

import { TouristPlace } from '../types/touristPlaces';
import { touristPlaces, categories } from '../data/touristPlaces';

// Performans metrikleri interface'i
export interface SearchPerformanceMetrics {
  searchDuration: number;
  resultCount: number;
  query: string;
  timestamp: number;
  relevanceScore: number;
}

// Arama performans monitor sınıfı
export class SearchPerformanceMonitor {
  private static instance: SearchPerformanceMonitor;
  private metrics: SearchPerformanceMetrics[] = [];
  private maxMetrics = 100; // Son 100 aramayı kaydet

  static getInstance(): SearchPerformanceMonitor {
    if (!SearchPerformanceMonitor.instance) {
      SearchPerformanceMonitor.instance = new SearchPerformanceMonitor();
    }
    return SearchPerformanceMonitor.instance;
  }

  // Arama performansını ölç
  measureSearch(
    searchFunction: () => TouristPlace[],
    query: string
  ): { results: TouristPlace[]; metrics: SearchPerformanceMetrics } {
    const startTime = performance.now();
    const results = searchFunction();
    const endTime = performance.now();

    const metrics: SearchPerformanceMetrics = {
      searchDuration: endTime - startTime,
      resultCount: results.length,
      query,
      timestamp: Date.now(),
      relevanceScore: this.calculateAverageRelevance(results, query),
    };

    this.addMetrics(metrics);

    return { results, metrics };
  }

  // Metrikleri kaydet
  private addMetrics(metrics: SearchPerformanceMetrics): void {
    this.metrics.push(metrics);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift(); // En eski metrikleri sil
    }
  }

  // Ortalama relevans skoru hesapla
  private calculateAverageRelevance(results: TouristPlace[], query: string): number {
    if (results.length === 0) return 0;

    const totalRelevance = results.reduce((sum, place) => {
      return sum + this.calculatePlaceRelevance(place, query);
    }, 0);

    return totalRelevance / results.length;
  }

  // Tek bir yer için relevans skoru
  private calculatePlaceRelevance(place: TouristPlace, query: string): number {
    const queryLower = query.toLowerCase();
    let score = 0;

    // İsim eşleşmesi
    if (place.name.toLowerCase().includes(queryLower)) {
      score += place.name.toLowerCase() === queryLower ? 100 : 50;
    }

    // Şehir eşleşmesi
    if (place.address.city.toLowerCase().includes(queryLower)) {
      score += 30;
    }

    // Popülerlik bonusu
    score += place.popularityScore * 0.1;

    return score;
  }

  // Performans istatistikleri
  getPerformanceStats() {
    if (this.metrics.length === 0) {
      return {
        averageSearchTime: 0,
        totalSearches: 0,
        averageResultCount: 0,
        averageRelevanceScore: 0,
        slowestSearch: null,
        fastestSearch: null,
      };
    }

    const totalTime = this.metrics.reduce((sum, m) => sum + m.searchDuration, 0);
    const totalResults = this.metrics.reduce((sum, m) => sum + m.resultCount, 0);
    const totalRelevance = this.metrics.reduce((sum, m) => sum + m.relevanceScore, 0);

    const sortedByTime = [...this.metrics].sort((a, b) => a.searchDuration - b.searchDuration);

    return {
      averageSearchTime: totalTime / this.metrics.length,
      totalSearches: this.metrics.length,
      averageResultCount: totalResults / this.metrics.length,
      averageRelevanceScore: totalRelevance / this.metrics.length,
      slowestSearch: sortedByTime[sortedByTime.length - 1],
      fastestSearch: sortedByTime[0],
      recentSearches: this.metrics.slice(-10).reverse(),
    };
  }

  // Metrikleri temizle
  clearMetrics(): void {
    this.metrics = [];
  }

  // Arama önerilerini analiz et
  getSearchAnalytics() {
    const queryFrequency: { [key: string]: number } = {};
    const categorySearches: { [key: string]: number } = {};
    const citySearches: { [key: string]: number } = {};

    this.metrics.forEach(metric => {
      const query = metric.query.toLowerCase();
      
      // Query frequency
      queryFrequency[query] = (queryFrequency[query] || 0) + 1;

      // Category analysis
      categories.forEach(category => {
        if (category.name.toLowerCase().includes(query)) {
          categorySearches[category.name] = (categorySearches[category.name] || 0) + 1;
        }
      });

      // City analysis
      touristPlaces.forEach(place => {
        if (place.address.city.toLowerCase().includes(query)) {
          citySearches[place.address.city] = (citySearches[place.address.city] || 0) + 1;
        }
      });
    });

    return {
      topQueries: Object.entries(queryFrequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      topCategories: Object.entries(categorySearches)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      topCities: Object.entries(citySearches)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
    };
  }
}

// Arama performansını optimize etmek için öneriler
export const getSearchOptimizationSuggestions = (
  averageSearchTime: number,
  averageResultCount: number
): string[] => {
  const suggestions: string[] = [];

  if (averageSearchTime > 100) {
    suggestions.push('Arama algoritmasını optimize edin - 100ms üzerinde');
  }

  if (averageResultCount > 50) {
    suggestions.push('Sonuç sayısını sınırlayın - Çok fazla sonuç performansı etkiler');
  }

  if (averageSearchTime > 50) {
    suggestions.push('Debounce süresini artırın - Gereksiz aramaları azaltır');
  }

  suggestions.push('Index kullanın - Büyük veri setleri için');
  suggestions.push('Caching ekleyin - Sık aranan terimler için');
  suggestions.push('Virtual scrolling - Uzun listelerde performans için');

  return suggestions;
};

// Performans test utility'si
export const runPerformanceTest = () => {
  const monitor = SearchPerformanceMonitor.getInstance();
  const testQueries = [
    'İstanbul',
    'müze',
    'plaj',
    'Antalya',
    'tarihi',
    'doğal',
    'Kapadokya',
    'cami',
    'antik',
    'şelale'
  ];

  console.log('🔄 Arama performans testi başlıyor...');
  
  testQueries.forEach(query => {
    // Burada gerçek searchPlaces fonksiyonunu çağırabilirsiniz
    const startTime = performance.now();
    // const results = searchPlaces(query);
    const endTime = performance.now();
    
    console.log(`✅ "${query}" - ${(endTime - startTime).toFixed(2)}ms`);
  });

  const stats = monitor.getPerformanceStats();
  console.log('📊 Performans İstatistikleri:', stats);
  
  return stats;
};

export default SearchPerformanceMonitor;
