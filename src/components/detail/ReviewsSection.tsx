/**
 * TravelTurkey - Reviews Section Component for Place Detail
 * Interactive reviews section with rating breakdown and user comments
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from '../../styles/theme';

interface Place {
  rating: {
    average: number;
    count: number;
    breakdown: {
      location: number;
      service: number;
      value: number;
      cleanliness: number;
      atmosphere: number;
    };
  };
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  photos?: string[];
}

interface ReviewsSectionProps {
  place: Place;
}

// Mock reviews data
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Ahmet K.',
    userAvatar: '👨',
    rating: 5,
    date: '2 gün önce',
    comment: 'Muhteşem bir deneyimdi! Tarihi atmosfer ve mimari detaylar gerçekten etkileyici. Fotoğraf çekmek için harika bir yer.',
    helpful: 12,
    photos: ['📸', '🏛️'],
  },
  {
    id: '2',
    userName: 'Elif S.',
    userAvatar: '👩',
    rating: 4,
    date: '1 hafta önce',
    comment: 'Çok güzel bir yer, ancak oldukça kalabalıktı. Sabah erken saatlerde gitmenizi öneririm. Rehberli tur çok faydalı.',
    helpful: 8,
  },
  {
    id: '3',
    userName: 'Mehmet Y.',
    userAvatar: '👨‍🦳',
    rating: 5,
    date: '2 hafta önce',
    comment: 'Her ziyaretimde yeni detaylar keşfediyorum. Bizans ve Osmanlı dönemlerinin izlerini görmek harika.',
    helpful: 15,
  },
];

const RatingBar: React.FC<{
  label: string;
  rating: number;
  maxRating?: number;
}> = ({ label, rating, maxRating = 5 }) => {
  const percentage = (rating / maxRating) * 100;
  const widthAnimation = useSharedValue(0);

  React.useEffect(() => {
    widthAnimation.value = withTiming(percentage, { duration: 1000 });
  }, [percentage, widthAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthAnimation.value}%`,
  }));

  return (
    <View style={styles.ratingBarContainer}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={styles.ratingBarTrack}>
        <Animated.View style={[styles.ratingBarFill, animatedStyle]} />
      </View>
      <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleHelpful = () => {
    setIsHelpful(!isHelpful);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text
        key={index}
        style={[
          styles.star,
          { color: index < rating ? Theme.colors.accent.gold[500] : Theme.colors.neutral[300] }
        ]}
      >
        ★
      </Text>
    ));
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.reviewCard, animatedStyle]}>
        {/* Glassmorphism Background */}
        <View style={styles.reviewBackground} />
        
        {/* Header */}
        <View style={styles.reviewHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>{review.userAvatar}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{review.userName}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          </View>
          
          <View style={styles.ratingStars}>
            {renderStars(review.rating)}
          </View>
        </View>

        {/* Comment */}
        <Text style={styles.reviewComment}>{review.comment}</Text>

        {/* Photos */}
        {review.photos && (
          <View style={styles.reviewPhotos}>
            {review.photos.map((photo, index) => (
              <View key={index} style={styles.reviewPhoto}>
                <Text style={styles.reviewPhotoEmoji}>{photo}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.reviewFooter}>
          <TouchableOpacity
            style={[styles.helpfulButton, isHelpful && styles.helpfulButtonActive]}
            onPress={handleHelpful}
            accessibilityRole="button"
            accessibilityLabel={`Faydalı bulunan: ${review.helpful}`}
          >
            <Text style={[styles.helpfulIcon, isHelpful && styles.helpfulIconActive]}>
              👍
            </Text>
            <Text style={[styles.helpfulText, isHelpful && styles.helpfulTextActive]}>
              Faydalı ({review.helpful + (isHelpful ? 1 : 0)})
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ place }) => {
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  const getSortedReviews = () => {
    const sorted = [...MOCK_REVIEWS];
    switch (sortBy) {
      case 'helpful':
        return sorted.sort((a, b) => b.helpful - a.helpful);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
      default:
        return sorted; // Already in newest order
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Overall Rating Card */}
      <View style={styles.overallCard}>
        <View style={styles.overallBackground} />
        
        <View style={styles.overallHeader}>
          <View style={styles.overallRating}>
            <Text style={styles.overallScore}>{place.rating.average}</Text>
            <View style={styles.overallStars}>
              {Array.from({ length: 5 }, (_, index) => (
                <Text
                  key={index}
                  style={[
                    styles.overallStar,
                    { color: index < Math.round(place.rating.average) 
                      ? Theme.colors.accent.gold[500] 
                      : Theme.colors.neutral[300] }
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.overallCount}>
              {place.rating.count.toLocaleString()} değerlendirme
            </Text>
          </View>
        </View>

        {/* Rating Breakdown */}
        <View style={styles.breakdownContainer}>
          <RatingBar label="Konum" rating={place.rating.breakdown.location} />
          <RatingBar label="Hizmet" rating={place.rating.breakdown.service} />
          <RatingBar label="Değer" rating={place.rating.breakdown.value} />
          <RatingBar label="Temizlik" rating={place.rating.breakdown.cleanliness} />
          <RatingBar label="Atmosfer" rating={place.rating.breakdown.atmosphere} />
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sıralama:</Text>
        <View style={styles.sortButtons}>
          {[
            { key: 'newest', label: 'En Yeni' },
            { key: 'helpful', label: 'En Faydalı' },
            { key: 'rating', label: 'En Yüksek Puan' },
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortButton,
                sortBy === option.key && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy(option.key as any)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === option.key && styles.sortButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reviews List */}
      <View style={styles.reviewsList}>
        {getSortedReviews().map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>

      {/* Write Review Button */}
      <TouchableOpacity style={styles.writeReviewButton}>
        <Text style={styles.writeReviewText}>✍️ Değerlendirme Yaz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
  },
  overallCard: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.base,
  },
  overallBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  overallHeader: {
    padding: Theme.spacing.lg,
  },
  overallRating: {
    alignItems: 'center',
  },
  overallScore: {
    fontSize: 48,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary[600],
    marginBottom: Theme.spacing.xs,
  },
  overallStars: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.xs,
  },
  overallStar: {
    fontSize: 20,
    marginHorizontal: 1,
  },
  overallCount: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  breakdownContainer: {
    padding: Theme.spacing.lg,
    paddingTop: 0,
    gap: Theme.spacing.sm,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  ratingLabel: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[700],
    width: 60,
  },
  ratingBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: Theme.colors.accent.gold[500],
  },
  ratingValue: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[700],
    fontWeight: Theme.typography.fontWeight.medium,
    width: 30,
    textAlign: 'right',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  sortLabel: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[700],
    marginRight: Theme.spacing.sm,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  sortButton: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.base,
    backgroundColor: Theme.colors.neutral[100],
  },
  sortButtonActive: {
    backgroundColor: Theme.colors.primary[500],
  },
  sortButtonText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[700],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  sortButtonTextActive: {
    color: Theme.colors.neutral[50],
  },
  reviewsList: {
    gap: Theme.spacing.md,
  },
  reviewCard: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  reviewBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Theme.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
  },
  reviewDate: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
  },
  ratingStars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
  },
  reviewComment: {
    fontSize: Theme.typography.fontSize.sm,
    lineHeight: Theme.typography.lineHeight.relaxed,
    color: Theme.colors.neutral[700],
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  reviewPhotos: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    gap: Theme.spacing.xs,
  },
  reviewPhoto: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.base,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewPhotoEmoji: {
    fontSize: 20,
  },
  reviewFooter: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.base,
    backgroundColor: Theme.colors.neutral[100],
  },
  helpfulButtonActive: {
    backgroundColor: Theme.colors.primary[100],
  },
  helpfulIcon: {
    fontSize: 16,
    marginRight: Theme.spacing.xs,
  },
  helpfulIconActive: {
    // Could add different styling for active state
  },
  helpfulText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[700],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  helpfulTextActive: {
    color: Theme.colors.primary[700],
  },
  writeReviewButton: {
    backgroundColor: Theme.colors.primary[500],
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.base,
  },
  writeReviewText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[50],
  },
});

export default ReviewsSection;