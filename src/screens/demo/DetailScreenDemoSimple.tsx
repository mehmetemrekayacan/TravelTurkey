/**
 * TravelTurkey - Simplified Detail Screen Demo (2025)
 * Working demo with proper type compliance
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

// Simplified sample data for demonstration
const simplePlaces = [
  {
    id: '1',
    name: 'Hagia Sophia',
    description:
      'The Hagia Sophia is a Late Antique place of worship in Istanbul, Turkey. Built in 537 as the patriarchal cathedral of the imperial capital of Constantinople, it was the largest Christian church of the eastern Roman Empire and the Byzantine Empire.',
    shortDescription: 'Byzantine architectural masterpiece',
    category: 'historical' as const,
    rating: { average: 4.7, count: 15420 },
    location: 'Istanbul, Fatih',
    image:
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600',
  },
  {
    id: '2',
    name: 'Cappadocia Hot Air Balloons',
    description:
      'Experience the magical landscape of Cappadocia from above with a hot air balloon ride. Float over the unique rock formations, fairy chimneys, and ancient cave churches as the sun rises.',
    shortDescription: 'Scenic hot air balloon rides',
    category: 'adventure' as const,
    rating: { average: 4.9, count: 8750 },
    location: 'Nevşehir, Göreme',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
  },
];

export const DetailScreenDemoSimple: React.FC = () => {
  const navigation = useNavigation();

  const navigateToDetail = (place: (typeof simplePlaces)[0]) => {
    // Create a complete TouristPlace object for the DetailScreen
    const completePlace = {
      id: place.id,
      name: place.name,
      slug: place.name.toLowerCase().replace(/\s+/g, '-'),
      description: place.description,
      shortDescription: place.shortDescription,
      category: place.category,
      subcategory:
        place.category === 'historical'
          ? 'Byzantine Architecture'
          : 'Hot Air Ballooning',
      tags:
        place.category === 'historical'
          ? ['UNESCO', 'Byzantine', 'Historical']
          : ['Adventure', 'Sunrise', 'Photography'],
      region: place.category === 'historical' ? 'Marmara' : 'Central Anatolia',
      icon: place.category === 'historical' ? '🏛️' : '🎈',
      popularityScore: 95,
      coordinates: {
        latitude: place.category === 'historical' ? 41.0086 : 38.6431,
        longitude: place.category === 'historical' ? 28.9802 : 34.8331,
      },
      address: {
        city: place.category === 'historical' ? 'Istanbul' : 'Nevşehir',
        district: place.category === 'historical' ? 'Fatih' : 'Göreme',
        fullAddress: place.location,
      },
      photos: [
        {
          id: 'p1',
          url: place.image,
          thumbnail: place.image,
          caption: `${place.name} view`,
          isPrimary: true,
        },
      ],
      rating: {
        average: place.rating.average,
        count: place.rating.count,
        breakdown: {
          location: 4.9,
          service: 4.5,
          value: 4.6,
          cleanliness: 4.8,
          atmosphere: 4.9,
        },
      },
      priceInfo: {
        currency: 'TRY',
        adult: place.category === 'historical' ? 150 : 3500,
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
      },
      bestTimeToVisit: ['Spring', 'Fall'],
      estimatedDuration: '2-3 hours',
      accessibility: {
        wheelchairAccessible: true,
        publicTransport: true,
        parking: true,
        guidedTours: true,
        audioGuide: true,
        languages: ['Turkish', 'English'],
      },
      nearbyPlaces: [],
      contactInfo: {},
      tips: ['Visit early morning to avoid crowds'],
      isActive: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (navigation as any).navigate('DetailScreen', { place: completePlace });
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
• Spring animations`,
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

        {simplePlaces.map(place => (
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

      {/* Implementation Guide */}
      <View style={styles.guideSection}>
        <Text style={styles.guideTitle}>Implementation Guide</Text>

        <View style={styles.guideCard}>
          <Text style={styles.guideCardTitle}>🎨 UI Features</Text>
          <Text style={styles.guideCardText}>
            • Glassmorphism overlays and backgrounds{'\n'}• Neumorphism button
            effects{'\n'}• Responsive design system{'\n'}• Modern color palette
            {'\n'}• WCAG accessibility compliance
          </Text>
        </View>

        <View style={styles.guideCard}>
          <Text style={styles.guideCardTitle}>⚡ Animations</Text>
          <Text style={styles.guideCardText}>
            • React Native Reanimated v3{'\n'}• Parallax scrolling effects{'\n'}
            • Spring-based interactions{'\n'}• Staggered entrance animations
            {'\n'}• 60fps smooth performance
          </Text>
        </View>

        <View style={styles.guideCard}>
          <Text style={styles.guideCardTitle}>📱 2025 Trends</Text>
          <Text style={styles.guideCardText}>
            • Hero sections with dynamic headers{'\n'}• Floating action buttons
            {'\n'}• Progressive information disclosure{'\n'}• Interactive map
            integration{'\n'}• Modern micro-interactions
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
  guideSection: {
    marginTop: Theme.spacing.lg,
  },
  guideTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.md,
  },
  guideCard: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.primary[500],
    ...Theme.shadows.sm,
  },
  guideCardTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.xs,
  },
  guideCardText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
    lineHeight: Theme.typography.lineHeight.relaxed,
  },
});

export default DetailScreenDemoSimple;
