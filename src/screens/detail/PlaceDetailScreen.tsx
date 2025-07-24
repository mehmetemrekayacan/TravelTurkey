/**
 * TravelTurkey - Modern Place Detail Screen 2025
 * Immersive design with parallax effects, interactive sections, and modern card layouts
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Share,
  Alert,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  withTiming,
  Extrapolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { Theme } from '../../styles/theme';

// Components
import ImageGallery from '../../components/detail/ImageGallery';
import InfoSection from '../../components/detail/InfoSection';
import ReviewsSection from '../../components/detail/ReviewsSection';
import MapSection from '../../components/detail/MapSection';
import ActionButtons from '../../components/detail/ActionButtons';

type PlaceDetailScreenProps = StackScreenProps<RootStackParamList, 'PlaceDetail'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;

// Mock data for development - in production this would come from props/API
const MOCK_PLACE = {
  id: 'hagia-sophia',
  name: 'Ayasofya Müzesi',
  description: 'Ayasofya, İstanbul\'un Fatih ilçesinin Sultanahmet Meydanı\'nda bulunan 537 yılında inşa edilmiş Bizans döneminden kalma bir anıttır. Dünyadaki en önemli mimari eserlerden biri olan yapı, önce katedral, sonra cami, daha sonra müze olarak kullanılmış ve günümüzde tekrar cami olarak hizmet vermektedir.',
  shortDescription: 'Bizans ve Osmanlı mimarisinin muhteşem örneği',
  category: 'historical' as const,
  location: {
    city: 'İstanbul',
    district: 'Fatih',
    coordinates: { latitude: 41.0086, longitude: 28.9802 }
  },
  images: [
    { id: '1', url: '🕌', isPrimary: true, caption: 'Ayasofya genel görünüm' },
    { id: '2', url: '🎨', isPrimary: false, caption: 'İç mekan mozaikler' },
    { id: '3', url: '🏛️', isPrimary: false, caption: 'Mimari detaylar' },
    { id: '4', url: '✨', isPrimary: false, caption: 'Gece görünümü' },
  ],
  rating: {
    average: 4.8,
    count: 12847,
    breakdown: {
      location: 4.9,
      service: 4.7,
      value: 4.8,
      cleanliness: 4.6,
      atmosphere: 4.9,
    }
  },
  workingHours: {
    monday: '09:00 - 17:00',
    tuesday: '09:00 - 17:00',
    wednesday: '09:00 - 17:00',
    thursday: '09:00 - 17:00',
    friday: '09:00 - 17:00',
    saturday: '09:00 - 17:00',
    sunday: '09:00 - 17:00',
  },
  priceInfo: {
    currency: 'TL',
    adult: 0,
    isFree: true,
  },
  tags: ['UNESCO', 'Bizans', 'Osmanlı', 'Mimari', 'Tarihi'],
  visitors: '2.3M',
  features: ['WiFi', 'Rehberli Tur', 'Fotoğraf İzni', 'Engelli Erişimi'],
};

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews' | 'map'>('info');
  const [isSaved, setIsSaved] = useState(false);
  
  // Use mock data for now, in production use route.params.place
  const place = MOCK_PLACE;

  useEffect(() => {
    // Hide status bar for immersive experience
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Parallax header animation
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT / 2],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.2, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  // Floating header animation
  const floatingHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_HEIGHT - 100, HEADER_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  // Back button animation
  const backButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would implement actual save/unsave logic
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${place.name} - ${place.shortDescription}`,
        url: `https://travelturkey.app/place/${place.id}`,
        title: place.name,
      });
    } catch (error) {
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu');
    }
  };

  const handleNavigate = () => {
    // Here you would implement navigation to maps app
    Alert.alert('Navigasyon', 'Harita uygulaması açılacak');
  };

  const handleImageGallery = () => {
    navigation.navigate('ImageViewer', {
      images: place.images.map(img => img.url),
      initialIndex: 0,
      title: place.name,
    });
  };

  return (
    <View style={styles.container}>
      {/* Parallax Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <ImageGallery 
          images={place.images}
          onImagePress={handleImageGallery}
        />
        
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        {/* Header Info */}
        <View style={styles.headerInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {place.category === 'historical' ? 'Tarihi' : place.category}
            </Text>
          </View>
          
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeLocation}>
            {place.location.city}, {place.location.district}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>
              {place.rating.average} ({place.rating.count.toLocaleString()})
            </Text>
            <Text style={styles.visitorsText}>• {place.visitors} ziyaretçi</Text>
          </View>
        </View>
      </Animated.View>

      {/* Back Button */}
      <Animated.View style={[styles.backButton, backButtonStyle, { top: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.backButtonInner}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Geri dön"
        >
          <Text style={styles.backButtonIcon}>←</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Floating Header */}
      <Animated.View style={[styles.floatingHeader, floatingHeaderStyle, { top: insets.top }]}>
        <View style={styles.floatingHeaderContent}>
          <TouchableOpacity onPress={handleBack} style={styles.floatingBackButton}>
            <Text style={styles.floatingBackIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.floatingTitle} numberOfLines={1}>
            {place.name}
          </Text>
          <View style={styles.floatingActions}>
            <TouchableOpacity onPress={handleShare} style={styles.floatingActionButton}>
              <Text style={styles.floatingActionIcon}>📤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_HEIGHT }]}
      >
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <View style={styles.tabNavigation}>
            {(['info', 'reviews', 'map'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
                accessibilityRole="button"
                accessibilityLabel={`${tab} sekmesi`}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab === 'info' ? 'Bilgiler' : tab === 'reviews' ? 'Yorumlar' : 'Harita'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {activeTab === 'info' && <InfoSection place={place} />}
          {activeTab === 'reviews' && <ReviewsSection place={place} />}
          {activeTab === 'map' && <MapSection place={place} />}
        </View>

        {/* Action Buttons */}
        <ActionButtons
          isSaved={isSaved}
          onSave={handleSave}
          onShare={handleShare}
          onNavigate={handleNavigate}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.3)', // Fallback for React Native - linear gradients need library
  },
  headerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.borderRadius.full,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.primary[600],
  },
  placeName: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.neutral[50],
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  placeLocation: {
    fontSize: Theme.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[50],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  visitorsText: {
    fontSize: Theme.typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  backButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    fontSize: 20,
    color: Theme.colors.neutral[50],
    fontWeight: 'bold',
  },
  floatingHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 9,
    ...Theme.shadows.base,
  },
  floatingHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  floatingBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBackIcon: {
    fontSize: 18,
    color: Theme.colors.neutral[900],
  },
  floatingTitle: {
    flex: 1,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginLeft: 12,
  },
  floatingActions: {
    flexDirection: 'row',
  },
  floatingActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  floatingActionIcon: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tabContainer: {
    backgroundColor: Theme.colors.neutral[50],
    paddingTop: 20,
  },
  tabNavigation: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: Theme.borderRadius.lg,
    padding: 4,
    ...Theme.shadows.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Theme.colors.primary[500],
  },
  tabText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.neutral[600],
  },
  activeTabText: {
    color: Theme.colors.neutral[50],
  },
  contentContainer: {
    marginTop: 20,
  },
});

export default PlaceDetailScreen; 