/**
 * TravelTurkey - Modern Home Screen 2025
 * Redesigned with hero section, category grids, featured places carousel,
 * quick actions, search suggestions, and modern glassmorphism effects
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import { BottomTabScreenProps } from '../../types/navigation';
import { Theme } from '../../styles/theme';
import { getUserName, updateLastVisit } from '../../utils/asyncStorage';

// Components
import HeroCarousel from '../../components/HeroCarousel';
import { FloatingVisual } from '../../components/home/FloatingVisual';
import CTAButton from '../../components/CTAButton';
import CategoryGrid from '../../components/home/CategoryGrid';
import FeaturedPlacesCarousel from '../../components/home/FeaturedPlacesCarousel';
import QuickActionsWidget from '../../components/home/QuickActionsWidget';
import SearchSuggestionWidget from '../../components/home/SearchSuggestionWidget';

type HomeScreenProps = BottomTabScreenProps<'HomeTab'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [userName, setUserName] = useState<string>('Gezgin');
  const [currentTime, setCurrentTime] = useState<string>('');

  // Animation values
  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.9);

  // Initialize component
  useEffect(() => {
    initializeScreen();
    updateTime();

    // Update time every minute
    const timeInterval = setInterval(updateTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  // Initialize animations
  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    contentScale.value = withSpring(1, { damping: 15 });
  }, [headerOpacity, contentScale]);

  const initializeScreen = async () => {
    try {
      const name = await getUserName();
      setUserName(name);
      await updateLastVisit();
    } catch (error) {
      console.error('Error initializing home screen:', error);
    }
  };

  const updateTime = () => {
    const now = new Date();
    const hour = now.getHours();

    let greeting = 'İyi geceler';
    if (hour >= 5 && hour < 12) greeting = 'Günaydın';
    else if (hour >= 12 && hour < 17) greeting = 'İyi öğleden sonra';
    else if (hour >= 17 && hour < 21) greeting = 'İyi akşamlar';

    setCurrentTime(greeting);
  };

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animation styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [0, -20], 'clamp'),
      },
    ],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
  }));

  // Event handlers
  const handleCTAPress = useCallback(() => {
    navigation.navigate('ExploreTab', { initialCategory: 'popular' });
  }, [navigation]);

  const handleHeroSlidePress = useCallback(
    (_slide: any) => {
      navigation.navigate('ExploreTab', { initialCategory: 'all' });
    },
    [navigation],
  );

  const handleCategoryPress = useCallback(
    (category: any) => {
      navigation.navigate('ExploreTab', { initialCategory: category.id });
    },
    [navigation],
  );

  const handleFeaturedPlacePress = useCallback(
    (place: any) => {
      // For now, navigate to ExploreTab since PlaceDetail expects different params
      navigation.navigate('ExploreTab', { initialCategory: 'featured' });
    },
    [navigation],
  );

  const handleQuickActionPress = useCallback(
    (action: any) => {
      switch (action.action) {
        case 'search':
          // Navigate to ExploreTab for now since Search params don't match
          navigation.navigate('ExploreTab', { initialCategory: 'search' });
          break;
        case 'map':
          navigation.navigate('ExploreTab', { initialCategory: 'map' });
          break;
        case 'favorites':
          navigation.navigate('ProfileTab');
          break;
        case 'weather':
          // Handle weather action - could open weather modal or external app
          break;
        default:
          break;
      }
    },
    [navigation],
  );

  const handleSearchPress = useCallback(() => {
    navigation.navigate('ExploreTab', { initialCategory: 'search' });
  }, [navigation]);

  const handleSearchSuggestionPress = useCallback(
    (suggestion: any) => {
      navigation.navigate('ExploreTab', { initialCategory: suggestion.id });
    },
    [navigation],
  );

  const handleMostVisitedPress = useCallback(() => {
    navigation.navigate('ExploreTab', { initialCategory: 'historical' });
  }, [navigation]);

  // Memoized FloatingVisual for performance
  const memoizedFloatingVisual = useMemo(() => <FloatingVisual />, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Theme.colors.primary[600]}
        barStyle='light-content'
        translucent={false}
      />

      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.headerContent}>
          <View style={styles.greetingContainer}>
            <Text style={styles.timeGreeting}>{currentTime}</Text>
            <Text style={styles.userGreeting}>Hoş geldin, {userName}!</Text>
          </View>
          <View style={styles.weatherWidget}>
            <Text style={styles.weatherIcon}>☀️</Text>
            <Text style={styles.weatherText}>23°C</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Carousel */}
        <HeroCarousel onSlidePress={handleHeroSlidePress} />

        {/* Content Container */}
        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          {/* Search Suggestion Widget */}
          <SearchSuggestionWidget
            onSearchPress={handleSearchPress}
            onSuggestionPress={handleSearchSuggestionPress}
          />

          {/* Quick Actions Widget */}
          <QuickActionsWidget onActionPress={handleQuickActionPress} />

          {/* Category Grid */}
          <CategoryGrid onCategoryPress={handleCategoryPress} />

          {/* Featured Places Carousel */}
          <FeaturedPlacesCarousel onPlacePress={handleFeaturedPlacePress} />

          {/* CTA Button */}
          <View style={styles.ctaContainer}>
            <CTAButton
              title='Hemen Keşfet'
              subtitle="Türkiye'nin en güzel yerlerini keşfetmeye başla"
              icon='🧭'
              onPress={handleCTAPress}
              accessibilityLabel='Keşfet sayfasına git ve yeni yerler bul'
              enableBounce={true}
            />
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Keşif İstatistiklerin</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Ziyaret Edilen</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Favori Yer</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Aktif Plan</Text>
              </View>
            </View>
          </View>

          {/* Most Visited Place Section */}
          <View style={styles.mostVisitedContainer}>
            <Text style={styles.sectionTitle}>
              Son Zamanlarda En Çok Ziyaret Edilen
            </Text>
            <TouchableOpacity
              style={styles.mostVisitedCard}
              onPress={handleMostVisitedPress}
              activeOpacity={0.7}
            >
              <View style={styles.mostVisitedImageContainer}>
                <Text style={styles.mostVisitedIcon}>🏛️</Text>
              </View>
              <View style={styles.mostVisitedContent}>
                <Text style={styles.mostVisitedTitle}>Ayasofya Camii</Text>
                <Text style={styles.mostVisitedSubtitle}>
                  İstanbul, Sultanahmet
                </Text>
                <View style={styles.mostVisitedStats}>
                  <View style={styles.mostVisitedStatItem}>
                    <Text style={styles.mostVisitedStatIcon}>👥</Text>
                    <Text style={styles.mostVisitedStatText}>2.3M ziyaret</Text>
                  </View>
                  <View style={styles.mostVisitedStatItem}>
                    <Text style={styles.mostVisitedStatIcon}>⭐</Text>
                    <Text style={styles.mostVisitedStatText}>4.8 puan</Text>
                  </View>
                </View>
              </View>
              <View style={styles.mostVisitedArrow}>
                <Text style={styles.mostVisitedArrowIcon}>▶</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary[600],
  },
  header: {
    backgroundColor: Theme.colors.primary[600],
    paddingBottom: 16,
    paddingTop: Platform.OS === 'android' ? 32 : 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  timeGreeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userGreeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.neutral[50],
  },
  weatherWidget: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  weatherIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  weatherText: {
    fontSize: 12,
    color: Theme.colors.neutral[50],
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    marginTop: -60,
    backgroundColor: Theme.colors.neutral[50],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.neutral[900],
    marginBottom: 16,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    ...Theme.shadows.base,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.primary[600],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
  },
  mostVisitedContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  mostVisitedCard: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  mostVisitedImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  mostVisitedIcon: {
    fontSize: 28,
    color: Theme.colors.neutral[50],
  },
  mostVisitedContent: {
    flex: 1,
  },
  mostVisitedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.neutral[900],
    marginBottom: 4,
  },
  mostVisitedSubtitle: {
    fontSize: 14,
    color: Theme.colors.neutral[600],
    marginBottom: 8,
  },
  mostVisitedStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mostVisitedStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  mostVisitedStatIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  mostVisitedStatText: {
    fontSize: 12,
    color: Theme.colors.neutral[600],
    fontWeight: '500',
  },
  mostVisitedArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  mostVisitedArrowIcon: {
    fontSize: 12,
    color: Theme.colors.neutral[50],
  },
});
