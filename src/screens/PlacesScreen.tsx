/**
 * TravelTurkey - Places Screen
 * Gezilecek yerler sayfası
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

// Popüler destinasyonlar verisi
const popularPlaces = [
  {
    id: 1,
    name: 'İstanbul',
    description: 'Tarihi yarımada, Boğaz, müzeler',
    icon: '🏛️',
    region: 'Marmara',
  },
  {
    id: 2,
    name: 'Kapadokya',
    description: 'Peri bacaları, balon turu, yer altı şehirleri',
    icon: '🎈',
    region: 'İç Anadolu',
  },
  {
    id: 3,
    name: 'Antalya',
    description: 'Deniz, güneş, antik şehirler',
    icon: '🏖️',
    region: 'Akdeniz',
  },
  {
    id: 4,
    name: 'Pamukkale',
    description: 'Beyaz travertenler, antik Hierapolis',
    icon: '💎',
    region: 'Ege',
  },
  {
    id: 5,
    name: 'Bodrum',
    description: 'Marina, antik tiyatro, gece hayatı',
    icon: '⛵',
    region: 'Ege',
  },
  {
    id: 6,
    name: 'Trabzon',
    description: 'Sümela Manastırı, doğal güzellikler',
    icon: '🏔️',
    region: 'Karadeniz',
  },
];

export default function PlacesScreen() {
  const handlePlacePress = (place: (typeof popularPlaces)[0]) => {
    // Detay sayfasına yönlendirme (gelecekte implementasyonu)
    console.log(`${place.name} seçildi`);
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>📍 Gezilecek Yerler</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Popüler Destinasyonlar</Text>
          <Text style={GlobalStyles.bodyMedium}>
            Türkiye'nin en güzel yerlerini keşfedin
          </Text>
        </View>

        {popularPlaces.map(place => (
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
                <Text style={GlobalStyles.captionSecondary}>
                  📍 {place.region} Bölgesi
                </Text>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>💡 İpucu</Text>
          <Text style={GlobalStyles.bodySmall}>
            Her destinasyona tıklayarak detaylı bilgilere ulaşabilirsiniz.
            Yakında daha fazla özellik eklenecek!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
