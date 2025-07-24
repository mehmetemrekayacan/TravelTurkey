import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { CardProps } from './Card.types';
import { 
  styles, 
  getVariantStyles, 
  getSizeStyles, 
  getImageLayoutStyles 
} from './Card.styles';
import { ColorTokens } from '../../../styles/tokens/colors';

/**
 * Modern Card Component
 * 
 * A flexible card component with tourism-specific layouts, image support,
 * gradient overlays, shadow variations, and responsive behavior.
 * 
 * Features:
 * - Multiple variants: default, elevated, outlined, tourism
 * - Tourism-specific layouts with gradient overlays
 * - Image support with lazy loading
 * - Multiple image layouts: top, left, right, background
 * - Shadow variations for depth
 * - Responsive behavior
 * - Accessibility support
 * - Loading and disabled states
 * - Badge support for tourism cards
 * 
 * @example
 * ```tsx
 * <Card
 *   variant="tourism"
 *   imageSource={{ uri: 'https://example.com/image.jpg' }}
 *   imageLayout="background"
 *   gradientOverlay
 *   badge="Öne Çıkan"
 *   onPress={() => console.log('Pressed')}
 * >
 *   <Text>Kapadokya</Text>
 * </Card>
 * ```
 */

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  style,
  onPress,
  imageSource,
  imageLayout = 'top',
  imageStyle,
  lazyLoad = true,
  gradientOverlay = false,
  gradientColors = ['transparent', 'rgba(0,0,0,0.7)'],
  tourismLayout = false,
  accessibilityLabel,
  testID,
  disabled = false,
  loading = false,
  badge,
  badgePosition = 'top-right',
  header,
  footer,
}) => {
  const [imageLoaded, setImageLoaded] = useState(!lazyLoad);
  const [imageError, setImageError] = useState(false);
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const imageLayoutStyles = getImageLayoutStyles(imageLayout);

  // Animation styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // Handle press animations
  const handlePressIn = () => {
    if (!disabled && !loading && onPress) {
      scale.value = withSpring(0.98, { damping: 15 });
      opacity.value = withTiming(0.9, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading && onPress) {
      scale.value = withSpring(1, { damping: 15 });
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Combine container styles
  const containerStyle = [
    styles.container,
    variantStyles.container,
    sizeStyles.container,
    imageLayoutStyles.container,
    tourismLayout && styles.tourismCard,
    disabled && styles.disabled,
    style,
  ];

  // Combine content styles
  const contentStyle = [
    styles.content,
    sizeStyles.content,
    imageLayoutStyles.content,
    imageLayout === 'background' && { backgroundColor: 'transparent' },
  ];

  // Combine image styles
  const combinedImageStyle = [
    styles.image,
    sizeStyles.image,
    imageLayoutStyles.image,
    imageStyle,
  ];

  // Badge position styles
  const getBadgePositionStyle = () => {
    switch (badgePosition) {
      case 'top-left':
        return styles.badgeTopLeft;
      case 'top-right':
        return styles.badgeTopRight;
      case 'bottom-left':
        return styles.badgeBottomLeft;
      case 'bottom-right':
        return styles.badgeBottomRight;
      default:
        return styles.badgeTopRight;
    }
  };

  // Render content
  const renderContent = () => (
    <View style={contentStyle}>
      {header && <View style={styles.header}>{header}</View>}
      {children}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );

  // Render image
  const renderImage = () => {
    if (!imageSource) return null;

    return (
      <View style={styles.imageContainer}>
        {!imageLoaded && lazyLoad && (
          <View style={[combinedImageStyle, styles.loading]}>
            <ActivityIndicator size="small" color={ColorTokens.primary[500]} />
          </View>
        )}
        
        {!imageError && (
          <Image
            source={imageSource}
            style={combinedImageStyle}
            onLoad={handleImageLoad}
            onError={handleImageError}
            resizeMode="cover"
          />
        )}
        
        {gradientOverlay && imageLoaded && !imageError && (
          <View style={styles.gradientOverlay} />
        )}
        
        {badge && (
          <View style={[styles.badge, getBadgePositionStyle()]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <View style={[containerStyle, styles.loading]}>
        <ActivityIndicator size="large" color={ColorTokens.primary[500]} />
      </View>
    );
  }

  // Render card based on layout and interaction
  const CardComponent = onPress ? AnimatedTouchableOpacity : AnimatedView;

  const cardProps = onPress
    ? {
        onPress: handlePress,
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
        disabled: disabled || loading,
        accessible: true,
        accessibilityRole: 'button' as const,
        accessibilityLabel,
        testID,
        activeOpacity: 1, // We handle opacity with animations
      }
    : {
        accessible: true,
        accessibilityLabel,
        testID,
      };

  return (
    <CardComponent
      style={[containerStyle, animatedStyle]}
      {...cardProps}
    >
      {imageLayout === 'top' && renderImage()}
      
      {(imageLayout === 'left' || imageLayout === 'right') && (
        <>
          {imageLayout === 'left' && renderImage()}
          {renderContent()}
          {imageLayout === 'right' && renderImage()}
        </>
      )}
      
      {imageLayout === 'background' && (
        <>
          {renderImage()}
          {renderContent()}
        </>
      )}
      
      {imageLayout === 'top' && renderContent()}
    </CardComponent>
  );
};

export default Card;