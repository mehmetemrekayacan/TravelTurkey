/**
 * TravelTurkey - Guide Screen
 * Rehber sayfası
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

// Rehber hizmetleri verisi
const guideServices = [
  {
    id: 1,
    name: 'Ahmet Kaya',
    specialty: 'İstanbul Tarih Turu',
    experience: '8 yıl',
    languages: ['Türkçe', 'İngilizce', 'Almanca'],
    rating: 4.9,
    icon: '👨‍🏫',
  },
  {
    id: 2,
    name: 'Elif Özkan',
    specialty: 'Kapadokya Doğa Turu',
    experience: '6 yıl',
    languages: ['Türkçe', 'İngilizce', 'Fransızca'],
    rating: 4.8,
    icon: '👩‍🏫',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    specialty: 'Antalya Kültür Turu',
    experience: '10 yıl',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    rating: 4.9,
    icon: '👨‍💼',
  },
];

const tourTypes = [
  { id: 1, name: 'Tarih Turu', icon: '🏛️', duration: '4-6 saat' },
  { id: 2, name: 'Doğa Turu', icon: '🌿', duration: '6-8 saat' },
  { id: 3, name: 'Kültür Turu', icon: '🎭', duration: '3-5 saat' },
  { id: 4, name: 'Gastronomi Turu', icon: '🍽️', duration: '2-4 saat' },
];

export default function GuideScreen() {
  const handleGuidePress = (guide: (typeof guideServices)[0]) => {
    console.log(`${guide.name} rehberi seçildi`);
  };

  const handleTourTypePress = (tourType: (typeof tourTypes)[0]) => {
    console.log(`${tourType.name} seçildi`);
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
        <Text style={GlobalStyles.headerTitle}>👨‍💼 Rehber</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* Service Info */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>
            Profesyonel Rehber Hizmeti
          </Text>
          <Text style={GlobalStyles.bodyMedium}>
            Deneyimli rehberlerimizle Türkiye'yi keşfedin. Kişisel tur
            programları ve yerli uzman rehberlik hizmeti.
          </Text>
        </View>

        {/* Tour Types */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Tur Çeşitleri</Text>
          <View style={GlobalStyles.categoryGrid}>
            {tourTypes.map(tourType => (
              <TouchableOpacity
                key={tourType.id}
                style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}
                onPress={() => handleTourTypePress(tourType)}
              >
                <Text style={GlobalStyles.iconMedium}>{tourType.icon}</Text>
                <Text style={GlobalStyles.titleSmall}>{tourType.name}</Text>
                <Text style={GlobalStyles.captionSecondary}>
                  {tourType.duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Available Guides */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Müsait Rehberler</Text>
        </View>

        {guideServices.map(guide => (
          <TouchableOpacity
            key={guide.id}
            style={[GlobalStyles.card, GlobalStyles.touchableCard]}
            onPress={() => handleGuidePress(guide)}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>{guide.icon}</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>{guide.name}</Text>
                <Text style={GlobalStyles.bodySmall}>🎯 {guide.specialty}</Text>
                <Text style={GlobalStyles.bodySmall}>
                  ⏱️ {guide.experience} deneyim
                </Text>
                <Text style={GlobalStyles.bodySmall}>
                  🗣️ {guide.languages.join(', ')}
                </Text>
                <View style={[GlobalStyles.row, GlobalStyles.hotelRating]}>
                  <Text style={GlobalStyles.captionSecondary}>
                    {renderStars(guide.rating)} {guide.rating}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Contact Info */}
        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>📞 İletişim</Text>
          <Text style={GlobalStyles.bodySmall}>
            • WhatsApp: +90 555 123 45 67{'\n'}• E-posta:
            rehber@travelturkey.com{'\n'}• 7/24 destek hattı mevcuttur{'\n'}•
            Rezervasyon en az 24 saat önceden yapılmalıdır
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
