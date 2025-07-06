/**
 * TravelTurkey - Modern Detail Screen (2025)
 * Advanced UI with glassmorphism, neumorphism, and smooth animations
 */

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Pressable,
  AccessibilityInfo,
  Vibration,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  withSpring,
  withTiming,
  withSequence,
  Extrapolate,
  FadeIn,
  SlideInDown,
  SlideInUp,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
  BounceIn,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TouristPlace } from '../../types/touristPlaces';
import { createDetailScreenStyles } from './DetailScreen.styles';

// Screen dimensions for responsive design
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.5;

// Navigation types
type DetailScreenNavigationProp = StackNavigationProp<any, 'DetailScreen'>;
type DetailScreenRouteProp = RouteProp<
  { DetailScreen: { place: TouristPlace } },
  'DetailScreen'
>;

interface DetailScreenProps {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { place } = route.params;
  const insets = useSafeAreaInsets();
  const styles = createDetailScreenStyles(insets);

  // Animation values
  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const fabScale = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const likeScale = useSharedValue(1);
  const shareScale = useSharedValue(1);
  const cardProgress = useSharedValue(0);
  const sectionProgress = useSharedValue(0);

  // Component state
  const [isLiked, setIsLiked] = useState(false);
  const [_imageLoaded, setImageLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [_activeSection, _setActiveSection] = useState(0);

  // Refs
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  // Initialize animations
  useEffect(() => {
    // Entrance animations with progressive disclosure
    contentOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });
    fabScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    cardProgress.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
    sectionProgress.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.quad),
    });

    // Announce screen for accessibility
    AccessibilityInfo.announceForAccessibility(`Detail page for ${place.name}`);
  }, [contentOpacity, fabScale, cardProgress, sectionProgress, place.name]);

  // Scroll handler with advanced interpolations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;

      // Header opacity animation
      headerOpacity.value = interpolate(
        scrollY.value,
        [HERO_HEIGHT - 100, HERO_HEIGHT],
        [0, 1],
        Extrapolate.CLAMP,
      );

      // Hero image parallax and scale
      imageScale.value = interpolate(
        scrollY.value,
        [-100, 0, HERO_HEIGHT],
        [1.2, 1, 0.8],
        Extrapolate.CLAMP,
      );
    },
  });

  // Animated styles
  const heroImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: imageScale.value,
      },
      {
        translateY: interpolate(
          scrollY.value,
          [-100, 0, HERO_HEIGHT],
          [50, 0, -HERO_HEIGHT * 0.3],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    backgroundColor: interpolateColor(
      headerOpacity.value,
      [0, 1],
      ['transparent', 'rgba(255, 255, 255, 0.95)'],
    ),
  }));

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const likeButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const shareButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shareScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const progressiveCardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(cardProgress.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(cardProgress.value, [0, 1], [50, 0]),
      },
    ],
  }));

  const progressiveSectionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(sectionProgress.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(sectionProgress.value, [0, 1], [30, 0]),
      },
    ],
  }));

  // Handlers with micro-interactions
  const handleLike = () => {
    setIsLiked(!isLiked);

    // Micro-interaction: Spring scale animation
    likeScale.value = withSequence(
      withTiming(1.3, { duration: 100 }),
      withSpring(1, { damping: 15, stiffness: 300 }),
    );

    // Haptic feedback for better UX
    try {
      Vibration.vibrate(50);
    } catch (error) {
      console.log('Vibration not supported');
    }

    // Accessibility announcement
    AccessibilityInfo.announceForAccessibility(
      isLiked ? 'Removed from favorites' : 'Added to favorites',
    );
  };

  const handleShare = () => {
    // Micro-interaction: Bounce animation
    shareScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, { damping: 15, stiffness: 300 }),
    );

    console.log('Share place:', place.name);
    AccessibilityInfo.announceForAccessibility('Sharing options opened');
  };

  const handleDirections = () => {
    console.log('Get directions to:', place.name);
    AccessibilityInfo.announceForAccessibility('Opening directions');
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    AccessibilityInfo.announceForAccessibility(
      showFullDescription ? 'Description collapsed' : 'Description expanded',
    );
  };

  const renderHeroSection = () => (
    <View style={styles.heroContainer}>
      <Animated.View style={[styles.heroImageContainer, heroImageStyle]}>
        <Image
          source={{
            uri:
              place.photos?.[0]?.url || 'https://via.placeholder.com/400x300',
          }}
          style={styles.heroImage}
          onLoad={() => setImageLoaded(true)}
          accessibilityLabel={`Hero image of ${place.name}`}
        />

        {/* Glassmorphism overlay */}
        <View style={styles.heroOverlay} />

        {/* Hero content */}
        <Animated.View
          style={[styles.heroContent, contentStyle]}
          entering={SlideInDown.delay(300).springify()}
        >
          <Text style={styles.heroCategory}>
            {place.category.toUpperCase()}
          </Text>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {place.name}
          </Text>
          <View style={styles.heroLocation}>
            <Text style={styles.heroLocationText}>
              📍 {place.address.city}, {place.address.district}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Floating Action Buttons with Micro-interactions */}
      <Animated.View style={[styles.fabContainer, fabStyle]}>
        <Animated.View style={likeButtonStyle}>
          <Pressable
            style={[styles.fab, isLiked && styles.fabLiked]}
            onPress={handleLike}
            accessibilityRole='button'
            accessibilityLabel={
              isLiked ? 'Remove from favorites' : 'Add to favorites'
            }
            accessibilityState={{ selected: isLiked }}
          >
            <Text style={styles.fabIcon}>{isLiked ? '❤️' : '🤍'}</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={shareButtonStyle}>
          <Pressable
            style={styles.fab}
            onPress={handleShare}
            accessibilityRole='button'
            accessibilityLabel='Share this place'
          >
            <Text style={styles.fabIcon}>📤</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );

  const renderInfoCards = () => (
    <Animated.View style={[styles.infoCardsContainer, progressiveCardStyle]}>
      {/* Rating Card with Enhanced Animation */}
      <Animated.View
        style={styles.infoCard}
        entering={SlideInLeft.delay(400).springify()}
      >
        <View style={styles.infoCardHeader}>
          <Text style={styles.infoCardTitle}>Rating</Text>
          <Text style={styles.infoCardValue}>
            ⭐ {place.rating?.average.toFixed(1) || 'N/A'}
          </Text>
        </View>
        <Text style={styles.infoCardSubtext}>
          {place.rating?.count || 0} reviews
        </Text>
        <View style={styles.ratingBar}>
          <Animated.View
            style={[
              styles.ratingFill,
              { width: `${(place.rating?.average || 0) * 20}%` },
            ]}
            entering={SlideInRight.delay(600)}
          />
        </View>
      </Animated.View>

      {/* Price Card with Micro-interaction */}
      <Animated.View
        style={styles.infoCard}
        entering={ZoomIn.delay(500).springify()}
      >
        <View style={styles.infoCardHeader}>
          <Text style={styles.infoCardTitle}>Price</Text>
          <Text style={styles.infoCardValue}>
            {place.priceInfo?.isFree
              ? 'FREE'
              : `₺${place.priceInfo?.adult || 'N/A'}`}
          </Text>
        </View>
        <Text style={styles.infoCardSubtext}>
          {place.priceInfo?.isFree ? 'No entrance fee' : 'Per adult'}
        </Text>
        {!place.priceInfo?.isFree && (
          <Animated.View entering={FadeIn.delay(700)}>
            <Text style={styles.priceNote}>
              💳 Student: ₺
              {place.priceInfo?.student ||
                Math.floor((place.priceInfo?.adult || 0) * 0.5)}
            </Text>
          </Animated.View>
        )}
      </Animated.View>

      {/* Duration Card with Progressive Content */}
      <Animated.View
        style={styles.infoCard}
        entering={SlideInRight.delay(600).springify()}
      >
        <View style={styles.infoCardHeader}>
          <Text style={styles.infoCardTitle}>Duration</Text>
          <Text style={styles.infoCardValue}>
            🕐 {place.estimatedDuration || '2-3h'}
          </Text>
        </View>
        <Text style={styles.infoCardSubtext}>Average visit time</Text>
        <Animated.View entering={FadeIn.delay(800)}>
          <Text style={styles.durationTip}>
            💡 Best visited in {place.bestTimeToVisit?.[0] || 'Spring'}
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );

  const renderDescription = () => (
    <Animated.View
      style={[styles.section, progressiveSectionStyle]}
      entering={SlideInDown.delay(700).springify()}
    >
      <Text style={styles.sectionTitle}>About this place</Text>

      {/* Enhanced Glassmorphism Container */}
      <Animated.View style={styles.descriptionContainer}>
        <Animated.Text
          style={styles.descriptionText}
          numberOfLines={showFullDescription ? undefined : 4}
          entering={FadeIn.delay(800)}
        >
          {place.description}
        </Animated.Text>

        {place.description.length > 200 && (
          <Animated.View entering={SlideInUp.delay(900)}>
            <TouchableOpacity
              onPress={toggleDescription}
              style={styles.readMoreButton}
              accessibilityRole='button'
              accessibilityLabel={
                showFullDescription ? 'Show less' : 'Show more'
              }
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? '📖 Show Less' : '📚 Read More'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>

      {/* Enhanced Tags with Staggered Animation */}
      <View style={styles.tagsContainer}>
        {place.tags?.slice(0, 5).map((tag, index) => (
          <Animated.View
            key={tag}
            style={styles.tag}
            entering={BounceIn.delay(1000 + index * 150).springify()}
          >
            <Text style={styles.tagText}>#{tag}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Additional Features Section */}
      <Animated.View
        style={styles.featuresContainer}
        entering={FadeIn.delay(1200)}
      >
        <Text style={styles.featuresTitle}>✨ Features</Text>
        <View style={styles.featuresGrid}>
          {place.accessibility?.wheelchairAccessible && (
            <Animated.View
              style={styles.featureItem}
              entering={ZoomIn.delay(1300)}
            >
              <Text style={styles.featureIcon}>♿</Text>
              <Text style={styles.featureText}>Accessible</Text>
            </Animated.View>
          )}
          {place.accessibility?.audioGuide && (
            <Animated.View
              style={styles.featureItem}
              entering={ZoomIn.delay(1400)}
            >
              <Text style={styles.featureIcon}>🎧</Text>
              <Text style={styles.featureText}>Audio Guide</Text>
            </Animated.View>
          )}
          {place.accessibility?.parking && (
            <Animated.View
              style={styles.featureItem}
              entering={ZoomIn.delay(1500)}
            >
              <Text style={styles.featureIcon}>🅿️</Text>
              <Text style={styles.featureText}>Parking</Text>
            </Animated.View>
          )}
          {place.accessibility?.publicTransport && (
            <Animated.View
              style={styles.featureItem}
              entering={ZoomIn.delay(1600)}
            >
              <Text style={styles.featureIcon}>🚌</Text>
              <Text style={styles.featureText}>Transit</Text>
            </Animated.View>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );

  const renderMapSection = () => (
    <Animated.View style={styles.section} entering={FadeIn.delay(900)}>
      <Text style={styles.sectionTitle}>Location & Directions</Text>

      {/* Map Placeholder with Neumorphism */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️</Text>
          <Text style={styles.mapSubtext}>Interactive Map</Text>
          <Text style={styles.mapCoordinates}>
            {place.coordinates.latitude.toFixed(4)},{' '}
            {place.coordinates.longitude.toFixed(4)}
          </Text>
        </View>
      </View>

      {/* Directions Button */}
      <TouchableOpacity
        style={styles.directionsButton}
        onPress={handleDirections}
        accessibilityRole='button'
        accessibilityLabel='Get directions to this place'
      >
        <Text style={styles.directionsButtonText}>🧭 Get Directions</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderWorkingHours = () => (
    <Animated.View style={styles.section} entering={SlideInDown.delay(1000)}>
      <Text style={styles.sectionTitle}>Opening Hours</Text>

      <View style={styles.workingHoursContainer}>
        {place.workingHours ? (
          Object.entries(place.workingHours).map(
            ([day, hours]) =>
              day !== 'notes' && (
                <View key={day} style={styles.workingHourRow}>
                  <Text style={styles.dayText}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </Text>
                  <Text style={styles.hoursText}>{hours}</Text>
                </View>
              ),
          )
        ) : (
          <Text style={styles.noInfoText}>Working hours not available</Text>
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, headerStyle]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole='button'
          accessibilityLabel='Go back'
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {place.name}
        </Text>

        <TouchableOpacity
          style={styles.headerActionButton}
          onPress={handleShare}
          accessibilityRole='button'
          accessibilityLabel='Share this place'
        >
          <Text style={styles.headerActionText}>📤</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {renderHeroSection()}

        <View style={styles.contentContainer}>
          {renderInfoCards()}
          {renderDescription()}
          {renderMapSection()}
          {renderWorkingHours()}

          {/* Bottom spacing for safe area */}
          <View style={{ height: insets.bottom + 20 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default DetailScreen;
