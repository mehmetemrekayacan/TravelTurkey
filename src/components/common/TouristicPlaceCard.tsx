/**
 * TravelTurkey - Touristic Place Card Component
 * Modern card component for displaying tourist places with animations
 */

import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { Colors } from '../../constants/Colors';

interface TouristicPlaceCardProps {
  place: TouristPlace | EnhancedTouristPlace;
  index: number;
  onPress?: (place: TouristPlace | EnhancedTouristPlace) => void;
  showImage?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const TouristicPlaceCard: React.FC<TouristicPlaceCardProps> = memo(
  ({ place, index, onPress, showImage = true, variant = 'default' }) => {
    const scaleValue = useSharedValue(1);
    const opacityValue = useSharedValue(1);

    // Animation for press feedback
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scaleValue.value }],
        opacity: opacityValue.value,
      };
    });

    const handlePressIn = () => {
      scaleValue.value = withSpring(0.98, { damping: 15 });
      opacityValue.value = withTiming(0.8, { duration: 150 });
    };

    const handlePressOut = () => {
      scaleValue.value = withSpring(1, { damping: 15 });
      opacityValue.value = withTiming(1, { duration: 150 });
    };

    const handlePress = () => {
      onPress?.(place);
    };

    // Helper function to get rating from both old and new data structures
    const getRating = () => {
      if ('rating' in place && typeof place.rating === 'object') {
        if ('overall' in place.rating) {
          // Enhanced structure
          return (place.rating as any).overall.average;
        } else if ('average' in place.rating) {
          // Current structure
          return place.rating.average;
        }
      }
      return 0;
    };

    // Helper function to get price info
    const getPriceInfo = () => {
      if ('priceInfo' in place) {
        if (typeof place.priceInfo === 'object' && place.priceInfo.isFree) {
          return 'Ücretsiz';
        } else if (
          typeof place.priceInfo === 'object' &&
          'basePrices' in place.priceInfo
        ) {
          // Enhanced structure
          return `${(place.priceInfo as any).basePrices.adult} ${
            place.priceInfo.currency
          }`;
        } else if (
          typeof place.priceInfo === 'object' &&
          'adult' in place.priceInfo
        ) {
          // Current structure
          return `${(place.priceInfo as any).adult} ${
            place.priceInfo.currency
          }`;
        }
      }
      return 'Fiyat bilgisi yok';
    };

    // Helper function to get image URL
    const getImageUrl = () => {
      if (
        'media' in place &&
        Array.isArray(place.media) &&
        place.media.length > 0
      ) {
        // Enhanced structure
        return place.media[0].url;
      } else if (
        'images' in place &&
        Array.isArray(place.images) &&
        place.images.length > 0
      ) {
        // Current structure
        return place.images[0];
      }
      return null;
    };

    // Get address info
    const getLocationText = () => {
      if ('address' in place) {
        if (typeof place.address === 'object' && 'city' in place.address) {
          return `${place.address.city}, ${place.address.district}`;
        }
      }
      return 'Konum bilgisi yok';
    };

    // Get description
    const getDescription = () => {
      if ('content' in place && typeof place.content === 'object') {
        // Enhanced structure
        return (
          (place.content as any).shortDescription ||
          (place.content as any).description
        );
      } else if ('shortDescription' in place) {
        // Current structure
        return place.shortDescription;
      }
      return '';
    };

    const cardStyle =
      variant === 'compact'
        ? styles.compactCard
        : variant === 'featured'
        ? styles.featuredCard
        : styles.defaultCard;

    const imageHeight =
      variant === 'compact' ? 120 : variant === 'featured' ? 220 : 180;

    return (
      <AnimatedTouchableOpacity
        entering={FadeInDown.delay(index * 100).springify()}
        style={[cardStyle, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        accessibilityRole='button'
        accessibilityLabel={`${place.name} kartı`}
        accessibilityHint={`${place.name} hakkında detaylı bilgi almak için dokunun`}
      >
        {/* Image Section */}
        {showImage && (
          <View style={[styles.imageContainer, { height: imageHeight }]}>
            {getImageUrl() ? (
              <Image
                source={{ uri: getImageUrl()! }}
                style={styles.image}
                resizeMode='cover'
                accessibilityLabel={`${place.name} görüntüsü`}
              />
            ) : (
              <View style={[styles.placeholderImage, { height: imageHeight }]}>
                <Text style={styles.placeholderIcon}>
                  {'icon' in place && place.icon ? place.icon : '📍'}
                </Text>
              </View>
            )}

            {/* Rating Badge */}
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {getRating().toFixed(1)}</Text>
            </View>

            {/* Category Tag */}
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{place.category}</Text>
            </View>
          </View>
        )}

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {place.name}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              📍 {getLocationText()}
            </Text>
          </View>

          {variant !== 'compact' && getDescription() && (
            <Text style={styles.description} numberOfLines={3}>
              {getDescription()}
            </Text>
          )}

          {/* Footer with Price and Action */}
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Giriş</Text>
              <Text style={styles.price}>{getPriceInfo()}</Text>
            </View>

            <View style={styles.actionButton}>
              <Text style={styles.actionText}>Detay</Text>
              <Text style={styles.actionArrow}>→</Text>
            </View>
          </View>
        </View>
      </AnimatedTouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  compactCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  featuredCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: Colors.primary.blue,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.accent.bosphorusBlue + '20',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: Colors.neutral.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  placeholderIcon: {
    fontSize: 32,
    opacity: 0.6,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
  },
  categoryTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: Colors.primary.blue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.neutral.white,
    textTransform: 'capitalize',
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.neutral.charcoal,
    marginBottom: 4,
    lineHeight: 24,
  },
  location: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.neutral.grayMedium,
    fontWeight: '500',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary.golden,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent.bosphorusBlue + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent.bosphorusBlue,
    marginRight: 4,
  },
  actionArrow: {
    fontSize: 14,
    color: Colors.accent.bosphorusBlue,
    fontWeight: '600',
  },
});

TouristicPlaceCard.displayName = 'TouristicPlaceCard';

export default TouristicPlaceCard;
