/**
 * TravelTurkey - Featured Places Carousel Component
 * Horizontal scrolling showcase of top destinations with parallax effects
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Theme } from '../../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_SPACING = 16;

interface FeaturedPlace {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  visitors: string;
  category: string;
  tags: string[];
}

interface FeaturedPlacesCarouselProps {
  onPlacePress?: (place: FeaturedPlace) => void;
}

const FEATURED_PLACES: FeaturedPlace[] = [
  {
    id: 'hagia-sophia',
    title: 'Ayasofya Müzesi',
    location: 'İstanbul, Sultanahmet',
    description: 'Bizans ve Osmanlı mimarisinin muhteşem örneği',
    image: '🕌',
    rating: 4.8,
    visitors: '2.3M',
    category: 'Tarihi',
    tags: ['UNESCO', 'Müze', 'Mimari'],
  },
  {
    id: 'cappadocia',
    title: 'Kapadokya',
    location: 'Nevşehir',
    description: 'Büyülü peri bacaları ve balon turları',
    image: '🎈',
    rating: 4.9,
    visitors: '1.8M',
    category: 'Doğal',
    tags: ['Balon', 'Jeoloji', 'Fotoğraf'],
  },
  {
    id: 'pamukkale',
    title: 'Pamukkale',
    location: 'Denizli',
    description: 'Beyaz travertenler ve antik Hierapolis',
    image: '💎',
    rating: 4.7,
    visitors: '1.2M',
    category: 'Doğal',
    tags: ['Termal', 'UNESCO', 'Antik'],
  },
  {
    id: 'ephesus',
    title: 'Efes Antik Kenti',
    location: 'İzmir, Selçuk',
    description: 'Antik dünyanın en iyi korunmuş şehri',
    image: '🏛️',
    rating: 4.6,
    visitors: '900K',
    category: 'Tarihi',
    tags: ['Antik', 'Arkeoloji', 'Roma'],
  },
];

const PlaceCard: React.FC<{
  place: FeaturedPlace;
  index: number;
  scrollX: Animated.SharedValue<number>;
  onPress: () => void;
}> = ({ place, index, scrollX, onPress }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const inputRange = [
    (index - 1) * (CARD_WIDTH + CARD_SPACING),
    index * (CARD_WIDTH + CARD_SPACING),
    (index + 1) * (CARD_WIDTH + CARD_SPACING),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      scrollX.value,
      inputRange,
      [15, 0, -15],
      Extrapolate.CLAMP
    );
    
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
      opacity,
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${place.title} detayları`}
    >
      <Animated.View style={[styles.placeCard, animatedStyle]}>
        {/* Glassmorphism Background */}
        <View style={styles.glassBackground} />
        
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Text style={styles.placeImage}>{place.image}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{place.category}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.placeTitle}>{place.title}</Text>
            <Text style={styles.placeLocation}>{place.location}</Text>
          </View>

          <Text style={styles.placeDescription}>{place.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⭐</Text>
              <Text style={styles.statText}>{place.rating}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statText}>{place.visitors}</Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {place.tags.slice(0, 2).map((tag, tagIndex) => (
              <View key={tagIndex} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Shine Effect */}
        <View style={styles.shineEffect} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const FeaturedPlacesCarousel: React.FC<FeaturedPlacesCarouselProps> = ({
  onPlacePress,
}) => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const handlePlacePress = (place: FeaturedPlace) => {
    onPlacePress?.(place);
  };

  const onScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const renderItem = ({ item, index }: { item: FeaturedPlace; index: number }) => (
    <PlaceCard
      place={item}
      index={index}
      scrollX={scrollX}
      onPress={() => handlePlacePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Öne Çıkan Yerler</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Tümünü Gör</Text>
          <Text style={styles.seeAllArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={FEATURED_PLACES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary[600],
    fontWeight: Theme.typography.fontWeight.medium,
    marginRight: 4,
  },
  seeAllArrow: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary[600],
  },
  carouselContent: {
    paddingLeft: Theme.spacing.md,
    paddingRight: Theme.spacing.md,
  },
  placeCard: {
    width: CARD_WIDTH,
    height: 280,
    marginRight: CARD_SPACING,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.lg,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    // Note: backdropFilter is not supported in React Native, using opacity instead
  },
  imageContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  placeImage: {
    fontSize: 48,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.base,
  },
  categoryText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[50],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  cardContent: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  titleContainer: {
    marginBottom: Theme.spacing.xs,
  },
  placeTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[900],
    marginBottom: 2,
  },
  placeLocation: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  placeDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[700],
    lineHeight: Theme.typography.lineHeight.normal,
    marginBottom: Theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.base,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.primary[600],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ skewX: '-20deg' }],
  },
});

export default FeaturedPlacesCarousel;