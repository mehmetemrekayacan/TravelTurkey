/**
 * TravelTurkey - Detail Screen Demo (2025)
 * Showcasing the modern detail page with sample data
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../styles/theme';
import { TouristPlace } from '../../types/touristPlaces';

// Sample tourist places for demonstration
const samplePlaces: TouristPlace[] = [
  {
    id: '1',
    name: 'Hagia Sophia',
    slug: 'hagia-sophia',
    description:
      'The Hagia Sophia is a Late Antique place of worship in Istanbul, Turkey. Built in 537 as the patriarchal cathedral of the imperial capital of Constantinople, it was the largest Christian church of the eastern Roman Empire and the Byzantine Empire. The building was later converted into a mosque during the Ottoman period and is now a museum that showcases its rich history spanning over 1,400 years.',
    shortDescription:
      'Byzantine architectural masterpiece turned mosque, now a museum',
    category: 'historical',
    subcategory: 'Byzantine Architecture',
    tags: [
      'UNESCO',
      'Byzantine',
      'Ottoman',
      'Architecture',
      'Museum',
      'Historical',
    ],
    coordinates: {
      latitude: 41.0086,
      longitude: 28.9802,
    },
    address: {
      city: 'Istanbul',
      district: 'Fatih',
      neighborhood: 'Sultanahmet',
      fullAddress: 'Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul',
    },
    region: 'marmara',
    icon: '🕌',
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600',
        thumbnail:
          'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=300&h=200',
        caption: 'Hagia Sophia exterior view',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.7,
      count: 15420,
      breakdown: {
        location: 4.9,
        service: 4.5,
        value: 4.6,
        cleanliness: 4.8,
        atmosphere: 4.9,
      },
    },
    popularityScore: 95,
    priceInfo: {
      currency: 'TRY',
      adult: 150,
      child: 0,
      student: 75,
      isFree: false,
    },
    workingHours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: '09:00 - 18:00',
      sunday: '09:00 - 18:00',
      notes: 'Last entry 30 minutes before closing',
    },
    bestTimeToVisit: ['Spring', 'Summer', 'Fall'],
    contactInfo: {
      phone: '+90 212 522 1750',
      website: 'https://ayasofyamuzesi.gov.tr',
      socialMedia: {
        instagram: '@ayasofyamuzesi',
        facebook: 'AyasofyaMuzesi',
      },
    },
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Turkish', 'English'],
    },
    nearbyPlaces: [],
    tips: ['Visit early morning to avoid crowds', 'Photography allowed inside'],
    estimatedDuration: '2-3 hours',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Cappadocia Hot Air Balloons',
    slug: 'cappadocia-balloons',
    description:
      "Experience the magical landscape of Cappadocia from above with a hot air balloon ride. Float over the unique rock formations, fairy chimneys, and ancient cave churches as the sun rises over this UNESCO World Heritage site. This unforgettable experience offers breathtaking panoramic views of one of Turkey's most iconic destinations.",
    shortDescription:
      'Scenic hot air balloon rides over fairy chimneys and rock formations',
    category: 'adventure',
    subcategory: 'Hot Air Ballooning',
    tags: [
      'UNESCO',
      'Adventure',
      'Balloon',
      'Sunrise',
      'Photography',
      'Romantic',
    ],
    coordinates: {
      latitude: 38.6431,
      longitude: 34.8331,
    },
    address: {
      city: 'Nevşehir',
      district: 'Göreme',
      fullAddress: 'Göreme National Park, 50180 Göreme/Nevşehir',
    },
    region: 'ic_anadolu',
    icon: '🎈',
    photos: [
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
        thumbnail:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200',
        caption: 'Hot air balloons over Cappadocia',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.9,
      count: 8750,
      breakdown: {
        location: 5.0,
        service: 4.8,
        value: 4.7,
        cleanliness: 4.9,
        atmosphere: 5.0,
      },
    },
    popularityScore: 98,
    priceInfo: {
      currency: 'TRY',
      adult: 3500,
      child: 2800,
      isFree: false,
    },
    workingHours: {
      monday: '05:00 - 08:00',
      tuesday: '05:00 - 08:00',
      wednesday: '05:00 - 08:00',
      thursday: '05:00 - 08:00',
      friday: '05:00 - 08:00',
      saturday: '05:00 - 08:00',
      sunday: '05:00 - 08:00',
      notes: 'Weather dependent - sunrise flights only',
    },
    bestTimeToVisit: ['Spring', 'Summer', 'Fall'],
    contactInfo: {
      phone: '+90 384 271 2442',
      website: 'https://cappadociaballoons.com',
      socialMedia: {
        instagram: '@cappadociaballoons',
      },
    },
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Turkish', 'English', 'French'],
    },
    nearbyPlaces: [],
    tips: [
      'Book in advance',
      'Weather dependent activity',
      'Dress warmly for early morning',
    ],
    estimatedDuration: '3-4 hours',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DetailScreenDemo: React.FC = () => {
  const navigation = useNavigation();

  const navigateToDetail = (place: TouristPlace) => {
    // Navigate to DetailScreen with the selected place
    (navigation as any).navigate('DetailScreen', { place });
  };

  const showFeatures = () => {
    Alert.alert(
      'DetailScreen Features 🎨',
      `✨ 2025 UI Trends:
• Glassmorphism effects
• Neumorphism buttons
• Smooth animations
• Parallax scrolling

🎯 Modern Features:
• Hero image with overlay
• Floating action buttons
• Interactive info cards
• Animated sections
• Accessibility support

🚀 Animations:
• Hero image parallax
• Entrance animations
• Scroll-based effects
• Spring animations
• Gesture interactions`,
      [{ text: 'Amazing!', style: 'default' }],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Modern Detail Screen Demo</Text>
      <Text style={styles.subtitle}>
        Featuring 2025 UI trends with glassmorphism and advanced animations
      </Text>

      {/* Features Button */}
      <TouchableOpacity style={styles.featuresButton} onPress={showFeatures}>
        <Text style={styles.featuresButtonText}>✨ View Features</Text>
      </TouchableOpacity>

      {/* Sample Places */}
      <View style={styles.placesContainer}>
        <Text style={styles.sectionTitle}>Try the Detail Screen</Text>
        <Text style={styles.sectionSubtitle}>
          Tap any place below to experience the modern detail page
        </Text>

        {samplePlaces.map(place => (
          <TouchableOpacity
            key={place.id}
            style={styles.placeCard}
            onPress={() => navigateToDetail(place)}
            accessibilityRole='button'
            accessibilityLabel={`View details for ${place.name}`}
          >
            <View style={styles.placeCardContent}>
              <Text style={styles.placeCardTitle}>{place.name}</Text>
              <Text style={styles.placeCardDescription} numberOfLines={2}>
                {place.shortDescription}
              </Text>

              <View style={styles.placeCardFooter}>
                <View style={styles.placeCardRating}>
                  <Text style={styles.ratingText}>
                    ⭐ {place.rating.average}
                  </Text>
                  <Text style={styles.reviewsText}>
                    ({place.rating.count} reviews)
                  </Text>
                </View>

                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{place.category}</Text>
                </View>
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Technical Details */}
      <View style={styles.techSection}>
        <Text style={styles.techTitle}>Technical Implementation</Text>

        <View style={styles.techCard}>
          <Text style={styles.techCardTitle}>🎨 UI/UX Features</Text>
          <Text style={styles.techCardText}>
            • Glassmorphism overlays and cards{'\n'}• Neumorphism button effects
            {'\n'}• Responsive design system{'\n'}• Modern color palette{'\n'}•
            Accessibility compliant
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techCardTitle}>⚡ Animations</Text>
          <Text style={styles.techCardText}>
            • React Native Reanimated v3{'\n'}• Parallax scrolling effects{'\n'}
            • Spring-based interactions{'\n'}• Entrance animations{'\n'}•
            Gesture-driven animations
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techCardTitle}>📱 Modern Patterns</Text>
          <Text style={styles.techCardText}>
            • Hero image with dynamic header{'\n'}• Floating action buttons
            {'\n'}• Progressive information disclosure{'\n'}• Interactive map
            integration{'\n'}• Smooth navigation transitions
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  content: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing['4xl'],
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
    lineHeight: Theme.typography.lineHeight.relaxed,
    marginBottom: Theme.spacing.xl,
  },
  featuresButton: {
    backgroundColor: Theme.colors.accent.gold[500],
    borderRadius: Theme.borderRadius.xl,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.md,
  },
  featuresButtonText: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[50],
  },
  placesContainer: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing.lg,
  },
  placeCard: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.base,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  placeCardContent: {
    flex: 1,
  },
  placeCardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.xs,
  },
  placeCardDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
    lineHeight: Theme.typography.lineHeight.normal,
    marginBottom: Theme.spacing.sm,
  },
  placeCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  ratingText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.accent.gold[600],
  },
  reviewsText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[500],
  },
  categoryBadge: {
    backgroundColor: Theme.colors.primary[100],
    borderRadius: Theme.borderRadius.base,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
  },
  categoryText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.primary[700],
    textTransform: 'capitalize',
  },
  arrowContainer: {
    marginLeft: Theme.spacing.md,
  },
  arrow: {
    fontSize: Theme.typography.fontSize.xl,
    color: Theme.colors.neutral[400],
  },
  techSection: {
    marginTop: Theme.spacing.lg,
  },
  techTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.md,
  },
  techCard: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.primary[500],
    ...Theme.shadows.sm,
  },
  techCardTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.xs,
  },
  techCardText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
    lineHeight: Theme.typography.lineHeight.relaxed,
  },
});

export default DetailScreenDemo;
