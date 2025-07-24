/**
 * TravelTurkey - Image Gallery Component for Place Detail
 * Immersive image viewer with swipe gestures and smooth animations
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
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

interface Image {
  id: string;
  url: string;
  isPrimary: boolean;
  caption?: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImagePress?: () => void;
}

const ImageItem: React.FC<{
  image: Image;
  index: number;
  scrollX: Animated.SharedValue<number>;
  onPress: () => void;
}> = ({ image, index, scrollX, onPress }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    const imageScale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [
        { scale: imageScale * scale.value },
      ],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={styles.imageContainer}
    >
      <Animated.View style={[styles.imageWrapper, animatedStyle]}>
        {/* Using emoji as placeholder - in production would use actual Image component */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>{image.url}</Text>
        </View>
        
        {image.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>{image.caption}</Text>
          </View>
        )}
        
        {/* Primary badge */}
        {image.isPrimary && (
          <View style={styles.primaryBadge}>
            <Text style={styles.primaryText}>Ana Fotoğraf</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImagePress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const onMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item, index }: { item: Image; index: number }) => (
    <ImageItem
      image={item}
      index={index}
      scrollX={scrollX}
      onPress={() => onImagePress?.()}
    />
  );

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Main Image Carousel */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      />

      {/* Gallery Info */}
      <View style={styles.galleryInfo}>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={onImagePress}
          accessibilityRole="button"
          accessibilityLabel="Galeriyi aç"
        >
          <Text style={styles.galleryButtonText}>📷 Galeri</Text>
          <Text style={styles.galleryCount}>
            {currentIndex + 1}/{images.length}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
            onPress={() => scrollToIndex(index)}
            accessibilityRole="button"
            accessibilityLabel={`Fotoğraf ${index + 1}`}
          />
        ))}
      </View>

      {/* Thumbnail Strip */}
      <View style={styles.thumbnailContainer}>
        {images.slice(0, 4).map((image, index) => (
          <TouchableOpacity
            key={image.id}
            style={[
              styles.thumbnail,
              index === currentIndex && styles.activeThumbnail,
            ]}
            onPress={() => scrollToIndex(index)}
          >
            <Text style={styles.thumbnailEmoji}>{image.url}</Text>
            {index === 3 && images.length > 4 && (
              <View style={styles.moreOverlay}>
                <Text style={styles.moreText}>+{images.length - 4}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[900],
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[100],
  },
  imageEmoji: {
    fontSize: 80,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: Theme.borderRadius.md,
    padding: 12,
  },
  captionText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[50],
    textAlign: 'center',
  },
  primaryBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: Theme.colors.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.borderRadius.full,
  },
  primaryText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[50],
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  galleryInfo: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  galleryButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.full,
    alignItems: 'center',
  },
  galleryButtonText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[50],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  galleryCount: {
    fontSize: Theme.typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Theme.colors.primary[500],
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.neutral[100],
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: Theme.colors.primary[500],
  },
  thumbnailEmoji: {
    fontSize: 24,
  },
  moreOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[50],
    fontWeight: Theme.typography.fontWeight.bold,
  },
});

export default ImageGallery;