/**
 * TravelTurkey - Hotels Screen
 * Oteller sayfası
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

// Öne çıkan oteller verisi
const featuredHotels = [
  {
    id: 1,
    name: 'Çırağan Palace Kempinski',
    location: 'İstanbul, Beşiktaş',
    rating: 5,
    price: '₺8.500',
    icon: '🏰',
    type: 'Lüks Saray Oteli',
  },
  {
    id: 2,
    name: 'Museum Hotel',
    location: 'Kapadokya, Uçhisar',
    rating: 5,
    price: '₺4.200',
    icon: '🏛️',
    type: 'Mağara Oteli',
  },
  {
    id: 3,
    name: 'Maxx Royal Belek',
    location: 'Antalya, Belek',
    rating: 5,
    price: '₺6.800',
    icon: '🏖️',
    type: 'Tatil Köyü',
  },
  {
    id: 4,
    name: 'Four Seasons Sultanahmet',
    location: 'İstanbul, Sultanahmet',
    rating: 5,
    price: '₺7.200',
    icon: '🕌',
    type: 'Tarihi Konum',
  },
  {
    id: 5,
    name: 'Swissôtel The Bosphorus',
    location: 'İstanbul, Maçka',
    rating: 5,
    price: '₺5.500',
    icon: '🌊',
    type: 'Boğaz Manzaralı',
  },
];

const hotelCategories = [
  { id: 1, name: 'Lüks Oteller', icon: '💎', count: 25 },
  { id: 2, name: 'Butik Oteller', icon: '🏛️', count: 18 },
  { id: 3, name: 'Termal Oteller', icon: '♨️', count: 12 },
  { id: 4, name: 'Deniz Kenarı', icon: '🏖️', count: 34 },
];

export default function HotelsScreen() {
  const handleHotelPress = (hotel: (typeof featuredHotels)[0]) => {
    console.log(`${hotel.name} oteli seçildi`);
  };

  const handleCategoryPress = (category: (typeof hotelCategories)[0]) => {
    console.log(`${category.name} kategorisi seçildi`);
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>🏨 Oteller</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* Search Section */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Otel Arama</Text>
          <Text style={GlobalStyles.bodyMedium}>
            En uygun fiyatlı otelleri bulun ve rezervasyon yapın
          </Text>
          <TouchableOpacity
            style={[GlobalStyles.buttonPrimary, GlobalStyles.searchButton]}
          >
            <Text style={GlobalStyles.buttonTextPrimary}>🔍 Otel Ara</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Otel Kategorileri</Text>
          <View style={GlobalStyles.categoryGrid}>
            {hotelCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={GlobalStyles.iconMedium}>{category.icon}</Text>
                <Text style={GlobalStyles.titleSmall}>{category.name}</Text>
                <Text style={GlobalStyles.captionSecondary}>
                  {category.count} otel
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Hotels */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Öne Çıkan Oteller</Text>
        </View>

        {featuredHotels.map(hotel => (
          <TouchableOpacity
            key={hotel.id}
            style={[GlobalStyles.card, GlobalStyles.touchableCard]}
            onPress={() => handleHotelPress(hotel)}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>{hotel.icon}</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>{hotel.name}</Text>
                <Text style={GlobalStyles.bodySmall}>📍 {hotel.location}</Text>
                <Text style={GlobalStyles.bodySmall}>🏷️ {hotel.type}</Text>
                <View style={[GlobalStyles.row, GlobalStyles.hotelRating]}>
                  <Text style={GlobalStyles.captionSecondary}>
                    {renderStars(hotel.rating)}
                  </Text>
                  <Text
                    style={[GlobalStyles.titleSmall, GlobalStyles.priceText]}
                  >
                    {hotel.price}/gece
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
          <Text style={GlobalStyles.titleSmall}>ℹ️ Rezervasyon Bilgisi</Text>
          <Text style={GlobalStyles.bodySmall}>
            • Tüm fiyatlar gecelik bazda verilmiştir{'\n'}• Fiyatlar mevsime
            göre değişiklik gösterebilir{'\n'}• Rezervasyon için doğrudan
            oteller ile iletişime geçebilirsiniz{'\n'}• Yakında online
            rezervasyon sistemi aktif olacak!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
