/**
 * TravelTurkey - Modern Home Screen 2025
 * Ana sayfa - Glassmorphism ve Neumorphism efektleri ile modern tasarım
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { BottomTabScreenProps } from '../../types/navigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type HomeScreenProps = BottomTabScreenProps<'HomeTab'>;

// Hero carousel data
const HERO_SLIDES = [
  {
    id: '1',
    title: 'Kapadokya',
    subtitle: 'Peri bacaları ve sıcak hava balonları',
    image: 'https://images.unsplash.com/photo-1541445437-2c3a5c57d9a3?w=800',
    gradient: ['#DC2626', '#1E3A8A'],
  },
  {
    id: '2',
    title: 'İstanbul',
    subtitle: 'Tarihi yarımada ve modern yaşam',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    gradient: ['#1E3A8A', '#0EA5E9'],
  },
  {
    id: '3',
    title: 'Antalya',
    subtitle: 'Turkuaz sahiller ve antik şehirler',
    image: 'https://images.unsplash.com/photo-1564594985645-4427056e04d5?w=800',
    gradient: ['#0EA5E9', '#DC2626'],
  },
  {
    id: '4',
    title: 'Pamukkale',
    subtitle: 'Beyaz travertenler ve termal kaynaklar',
    image: 'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?w=800',
    gradient: ['#F59E0B', '#DC2626'],
  },
];

// Quick actions data
const QUICK_ACTIONS = [
  {
    id: '1',
    title: 'Popüler Yerler',
    subtitle: 'En çok ziyaret edilen destinasyonlar',
    icon: '🏛️',
    color: '#DC2626',
    screen: 'ExploreTab',
  },
  {
    id: '2',
    title: 'Yakınımdakiler',
    subtitle: 'Konumunuza yakın yerler',
    icon: '📍',
    color: '#1E3A8A',
    screen: 'ExploreTab',
  },
  {
    id: '3',
    title: 'Favori Kategoriler',
    subtitle: 'Beğendiğiniz kategori türleri',
    icon: '❤️',
    color: '#059669',
    screen: 'ExploreTab',
  },
  {
    id: '4',
    title: 'Planlarım',
    subtitle: 'Seyahat planlarınızı yönetin',
    icon: '📋',
    color: '#F59E0B',
    screen: 'PlansTab',
  },
];

// Categories data
const CATEGORIES = [
  { id: '1', name: 'Tarihi', icon: '🏛️', color: '#DC2626' },
  { id: '2', name: 'Doğal', icon: '🏔️', color: '#059669' },
  { id: '3', name: 'Sahil', icon: '🏖️', color: '#0EA5E9' },
  { id: '4', name: 'Müze', icon: '🖼️', color: '#F59E0B' },
  { id: '5', name: 'Park', icon: '🌳', color: '#10B981' },
  { id: '6', name: 'Kültürel', icon: '🎭', color: '#8B5CF6' },
];

// Daily featured place
const DAILY_FEATURED = {
  id: 'daily-1',
  name: 'Ayasofya Camii',
  city: 'İstanbul',
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400',
  description: 'Bizans ve Osmanlı mimarisinin eşsiz birleşimi',
  tags: ['Tarihi', 'Mimari', 'Kültürel'],
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [weather] = useState({ temp: 23, condition: '☀️' });

  // Animation values
  const heroOpacity = useSharedValue(0);
  const cardsScale = useSharedValue(0.8);
  const scrollY = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  // Initialize animations
  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 1000 });
    cardsScale.value = withSpring(1, { damping: 15 });

    // Pulse animation for daily featured
    pulseAnimation.value = withRepeat(
      withTiming(1.05, { duration: 2000 }),
      -1,
      true,
    );
  }, [heroOpacity, cardsScale, pulseAnimation]);

  // Auto-scroll hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animation styles
  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 200], [0, -50], 'clamp'),
      },
    ],
  }));

  const cardsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardsScale.value }],
  }));

  const dailyFeaturedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  // Event handlers
  const handleExplorePress = useCallback(() => {
    navigation.navigate('ExploreTab', { initialCategory: 'all' });
  }, [navigation]);

  const handlePlansPress = useCallback(() => {
    navigation.navigate('PlansTab');
  }, [navigation]);

  const handleQuickAction = useCallback(
    (screen: string) => {
      if (screen === 'ExploreTab') {
        handleExplorePress();
      } else if (screen === 'PlansTab') {
        handlePlansPress();
      }
    },
    [handleExplorePress, handlePlansPress],
  );

  const renderHeroSlide = ({ item }: { item: (typeof HERO_SLIDES)[0] }) => (
    <View style={styles.heroSlide}>
      <Image source={{ uri: item.image }} style={styles.heroImage} />
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderQuickAction = ({ item }: { item: (typeof QUICK_ACTIONS)[0] }) => (
    <Pressable
      style={[styles.quickActionCard, { backgroundColor: `${item.color}15` }]}
      onPress={() => handleQuickAction(item.screen)}
      android_ripple={{ color: item.color + '30' }}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: item.color }]}>
        <Text style={styles.quickActionIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
      <Text style={styles.quickActionSubtitle}>{item.subtitle}</Text>
    </Pressable>
  );

  const renderCategory = ({ item }: { item: (typeof CATEGORIES)[0] }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: `${item.color}15` }]}
      onPress={handleExplorePress}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Text style={styles.categoryIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#1E3A8A' barStyle='light-content' />

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, heroAnimatedStyle]}>
          <FlatList
            data={HERO_SLIDES}
            renderItem={renderHeroSlide}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
              );
              setCurrentSlide(slideIndex);
            }}
          />

          {/* Hero Indicators */}
          <View style={styles.heroIndicators}>
            {HERO_SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.heroIndicator,
                  index === currentSlide && styles.heroIndicatorActive,
                ]}
              />
            ))}
          </View>

          {/* Weather Widget */}
          <View style={styles.weatherWidget}>
            <Text style={styles.weatherIcon}>{weather.condition}</Text>
            <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
          </View>
        </Animated.View>

        {/* Search Bar Teaser */}
        <TouchableOpacity
          style={styles.searchTeaser}
          onPress={handleExplorePress}
          activeOpacity={0.7}
        >
          <Text style={styles.searchTeaserIcon}>🔍</Text>
          <Text style={styles.searchTeaserText}>
            Türkiye'de nereyi keşfetmek istiyorsun?
          </Text>
        </TouchableOpacity>

        {/* Quick Actions Grid */}
        <Animated.View style={[styles.section, cardsAnimatedStyle]}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <FlatList
            data={QUICK_ACTIONS}
            renderItem={renderQuickAction}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.quickActionsGrid}
          />
        </Animated.View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Daily Featured Place */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Günün Önerisi</Text>
          <Animated.View style={[styles.dailyFeatured, dailyFeaturedStyle]}>
            <TouchableOpacity
              style={styles.dailyFeaturedContent}
              onPress={handleExplorePress}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: DAILY_FEATURED.image }}
                style={styles.dailyFeaturedImage}
              />
              <View style={styles.dailyFeaturedInfo}>
                <Text style={styles.dailyFeaturedName}>
                  {DAILY_FEATURED.name}
                </Text>
                <Text style={styles.dailyFeaturedCity}>
                  📍 {DAILY_FEATURED.city}
                </Text>
                <Text style={styles.dailyFeaturedDescription}>
                  {DAILY_FEATURED.description}
                </Text>
                <View style={styles.dailyFeaturedFooter}>
                  <Text style={styles.dailyFeaturedRating}>
                    ⭐ {DAILY_FEATURED.rating}
                  </Text>
                  <View style={styles.dailyFeaturedTags}>
                    {DAILY_FEATURED.tags.slice(0, 2).map((tag, index) => (
                      <Text key={index} style={styles.dailyFeaturedTag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Recent Activities */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <View style={styles.recentActivities}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>👀</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>
                  Kapadokya'yı görüntüledin
                </Text>
                <Text style={styles.activityTime}>2 saat önce</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>❤️</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>
                  Pamukkale'yi favorilere ekledin
                </Text>
                <Text style={styles.activityTime}>1 gün önce</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>📋</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Yeni plan oluşturdun</Text>
                <Text style={styles.activityTime}>3 gün önce</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: SCREEN_HEIGHT * 0.4,
    position: 'relative',
  },
  heroSlide: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroIndicators: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  heroIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  heroIndicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  weatherWidget: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  weatherIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  weatherTemp: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchTeaser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchTeaserIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchTeaserText: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 16,
    borderRadius: 16,
    minWidth: 80,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 16,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  dailyFeatured: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  dailyFeaturedContent: {
    flexDirection: 'row',
    padding: 16,
  },
  dailyFeaturedImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  dailyFeaturedInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dailyFeaturedName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  dailyFeaturedCity: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  dailyFeaturedDescription: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 12,
  },
  dailyFeaturedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyFeaturedRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  dailyFeaturedTags: {
    flexDirection: 'row',
  },
  dailyFeaturedTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 4,
  },
  recentActivities: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 32,
    textAlign: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
