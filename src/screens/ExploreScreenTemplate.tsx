/**
 * TravelTurkey - Explore Screen Template
 * Keşfet sayfası - Yerler ve aktiviteleri keşfet
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

// Types
interface Place {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  rating: number;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export default function ExploreScreen() {
  // Sample data
  const places: Place[] = [
    {
      id: 1,
      name: 'İstanbul Boğazı',
      description: 'İki kıtayı birleştiren eşsiz güzellik',
      category: 'Doğal Güzellik',
      icon: '🌊',
      rating: 4.9,
    },
    // Add more places here...
  ];

  const categories: Category[] = [
    { id: 1, name: 'Doğal Güzellik', icon: '🌿', count: 15 },
    { id: 2, name: 'Tarih', icon: '🏛️', count: 22 },
    // Add more categories here...
  ];

  // Event handlers
  const handlePlacePress = (_place: Place) => {
    // TODO: Navigate to place detail
  };

  const handleCategoryPress = (_category: Category) => {
    // TODO: Filter places by category
  };

  const handleSearchPress = () => {
    // TODO: Open search screen
  };

  // Render functions
  const renderPlace = ({ item }: { item: Place }) => (
    <TouchableOpacity
      style={GlobalStyles.touchableCard}
      onPress={() => handlePlacePress(item)}
    >
      <View style={GlobalStyles.cardContent}>
        <View style={GlobalStyles.cardIcon}>
          <Text style={GlobalStyles.iconLarge}>{item.icon}</Text>
        </View>
        <View style={GlobalStyles.cardText}>
          <Text style={GlobalStyles.titleSmall}>{item.name}</Text>
          <Text style={GlobalStyles.bodySmall}>{item.description}</Text>
          <Text style={GlobalStyles.bodySmall}>🏷️ {item.category}</Text>
          <Text style={GlobalStyles.captionSecondary}>
            ⭐ {item.rating}
          </Text>
        </View>
        <View style={GlobalStyles.cardArrow}>
          <Text style={GlobalStyles.iconMedium}>➡️</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={GlobalStyles.iconMedium}>{item.icon}</Text>
      <Text style={GlobalStyles.titleSmall}>{item.name}</Text>
      <Text style={GlobalStyles.captionSecondary}>{item.count} yer</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      {/* Header */}
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>🧭 Keşfet</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* Welcome Section */}
        <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
          <Text style={GlobalStyles.titleLargeWhite}>Türkiye'yi Keşfedin!</Text>
          <Text style={GlobalStyles.bodyMediumWhite}>
            Binlerce yıllık tarihi, eşsiz doğal güzellikleri ve zengin kültürü keşfedin
          </Text>
        </View>

        {/* Search Section */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Ne Arıyorsunuz?</Text>
          <TouchableOpacity 
            style={[GlobalStyles.buttonPrimary, GlobalStyles.searchButton]}
            onPress={handleSearchPress}
          >
            <Text style={GlobalStyles.buttonTextPrimary}>🔍 Yer Ara</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Kategoriler</Text>
          <View style={GlobalStyles.categoryGrid}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Popular Places */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Popüler Yerler</Text>
        </View>

        <FlatList
          data={places}
          renderItem={renderPlace}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />

        {/* Info Card */}
        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>💡 Keşfet İpuçları</Text>
          <Text style={GlobalStyles.bodySmall}>
            • En iyi fotoğraflar için gün doğumu saatlerini tercih edin{'\n'}
            • Yerel rehberlerden yardım almayı unutmayın{'\n'}
            • Mevsimsel özellikler için en uygun zamanları araştırın
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
