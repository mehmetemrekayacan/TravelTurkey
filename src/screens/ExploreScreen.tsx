/**
 * TravelTurkey - Explore Screen
 * Keşfet sayfası - Yerler v  const handlePlacePress = (_place: typeof explorePlaces[0]) => {
    // TODO: Navigate to place detail
  };

  const handleCategoryPress = (_category: typeof categories[0]) => {
    // TODO: Filter places by category
  };iteleri keşfet
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

// Keşfedilebilir yerler verisi
const explorePlaces = [
  {
    id: 1,
    name: 'İstanbul Boğazı',
    description: 'İki kıtayı birleştiren eşsiz güzellik',
    category: 'Doğal Güzellik',
    icon: '🌊',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Kapadokya',
    description: 'Peri bacaları ve sıcak hava balonu',
    category: 'Macera',
    icon: '🎈',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Pamukkale',
    description: 'Beyaz travertenler ve termal sular',
    category: 'Doğal Güzellik',
    icon: '♨️',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Efes Antik Kenti',
    description: 'Antik dönem kalıntıları',
    category: 'Tarih',
    icon: '🏛️',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Antalya Sahilleri',
    description: 'Turkuaz mavisi deniz ve altın kumlar',
    category: 'Plaj',
    icon: '🏖️',
    rating: 4.5,
  },
];

const categories = [
  { id: 1, name: 'Doğal Güzellik', icon: '🌿', count: 15 },
  { id: 2, name: 'Tarih', icon: '🏛️', count: 22 },
  { id: 3, name: 'Macera', icon: '🎯', count: 8 },
  { id: 4, name: 'Plaj', icon: '🏖️', count: 12 },
];

export default function ExploreScreen() {
  const handlePlacePress = (place: (typeof explorePlaces)[0]) => {
    console.log(`${place.name} seçildi`);
  };

  const handleCategoryPress = (category: (typeof categories)[0]) => {
    console.log(`${category.name} kategorisi seçildi`);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '⭐'.repeat(fullStars);
    if (hasHalfStar) stars += '⭐';
    return stars;
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>🧭 Keşfet</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* Welcome Section */}
        <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
          <Text style={GlobalStyles.titleLargeWhite}>Türkiye'yi Keşfedin!</Text>
          <Text style={GlobalStyles.bodyMediumWhite}>
            Binlerce yıllık tarihi, eşsiz doğal güzellikleri ve zengin kültürü
            keşfedin
          </Text>
        </View>

        {/* Search Section */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Ne Arıyorsunuz?</Text>
          <TouchableOpacity
            style={[GlobalStyles.buttonPrimary, GlobalStyles.searchButton]}
          >
            <Text style={GlobalStyles.buttonTextPrimary}>🔍 Yer Ara</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Kategoriler</Text>
          <View style={GlobalStyles.categoryGrid}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={GlobalStyles.iconMedium}>{category.icon}</Text>
                <Text style={GlobalStyles.titleSmall}>{category.name}</Text>
                <Text style={GlobalStyles.captionSecondary}>
                  {category.count} yer
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Places */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Popüler Yerler</Text>
        </View>

        {explorePlaces.map(place => (
          <TouchableOpacity
            key={place.id}
            style={[GlobalStyles.card, GlobalStyles.touchableCard]}
            onPress={() => handlePlacePress(place)}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>{place.icon}</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>{place.name}</Text>
                <Text style={GlobalStyles.bodySmall}>{place.description}</Text>
                <Text style={GlobalStyles.bodySmall}>🏷️ {place.category}</Text>
                <View style={[GlobalStyles.row, GlobalStyles.hotelRating]}>
                  <Text style={GlobalStyles.captionSecondary}>
                    {renderStars(place.rating)} {place.rating}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Information Card */}
        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>💡 Keşfet İpuçları</Text>
          <Text style={GlobalStyles.bodySmall}>
            • En iyi fotoğraflar için gün doğumu saatlerini tercih edin{'\n'}•
            Yerel rehberlerden yardım almayı unutmayın{'\n'}• Mevsimsel
            özellikler için en uygun zamanları araştırın{'\n'}• Her yer için
            planlarınıza ekleyebilirsiniz!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
