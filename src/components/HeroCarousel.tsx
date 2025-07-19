/**
 * TravelTurkey - Hero Carousel Component
 * Modern auto-sliding carousel with AI-generated Turkish landmark images
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { AI_GENERATED_ASSETS } from '../assets/ai-generated/assets-config';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.4;

interface HeroSlide {
  id: string;
  uri: string;
  title: string;
  subtitle: string;
  gradient: string[];
}

interface HeroCarouselProps {
  onSlidePress?: (slide: HeroSlide) => void;
  autoSlideInterval?: number;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    ...AI_GENERATED_ASSETS.heroImages.hagiaSophia,
  },
  {
    id: '2',
    ...AI_GENERATED_ASSETS.heroImages.cappadocia,
  },
  {
    id: '3',
    ...AI_GENERATED_ASSETS.heroImages.pamukkale,
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onSlidePress,
  autoSlideInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Initialize animations
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1, { damping: 15 });
  }, [opacity, scale]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % HERO_SLIDES.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoSlideInterval]);

  const handleSlidePress = useCallback(
    (slide: HeroSlide) => {
      onSlidePress?.(slide);
    },
    [onSlidePress],
  );

  const onMomentumScrollEnd = useCallback((event: any) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );
    setCurrentIndex(slideIndex);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const renderSlide = ({ item, index }: { item: HeroSlide; index: number }) => {
    const isActive = index === currentIndex;

    return (
      <TouchableOpacity
        style={styles.slide}
        onPress={() => handleSlidePress(item)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.uri }} style={styles.slideImage} />

        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          <Animated.View
            style={[styles.textContainer, isActive && animatedStyle]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </Animated.View>
        </View>

        {/* Decorative Border */}
        <View
          style={[styles.gradientBorder, { backgroundColor: item.gradient[0] }]}
        />
      </TouchableOpacity>
    );
  };

  const renderIndicators = () => {
    return (
      <View style={styles.indicatorContainer}>
        {HERO_SLIDES.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={[styles.indicator, isActive && styles.indicatorActive]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={HERO_SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        decelerationRate='fast'
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment='start'
        bounces={false}
      />

      {/* Indicators */}
      {renderIndicators()}

      {/* Bottom Fade */}
      <View style={styles.bottomFade} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    position: 'relative',
  },
  slide: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  gradientBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    pointerEvents: 'none',
  },
});

export default HeroCarousel;
