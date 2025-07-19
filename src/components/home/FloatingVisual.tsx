import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

// Floating animation component for individual elements
const FloatingElement: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
}> = ({ children, delay = 0, duration = 3000, translateY = 10 }) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: duration / 2 }),
          withTiming(0, { duration: duration / 2 }),
        ),
        -1,
        true,
      ),
    );
  }, [animatedValue, delay, duration, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateYValue = interpolate(
      animatedValue.value,
      [0, 1],
      [0, -translateY],
    );

    return {
      transform: [{ translateY: translateYValue }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

// Main floating visual component
export const FloatingVisual: React.FC = () => {
  const scaleAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(0);

  useEffect(() => {
    // Initial appearance animation
    scaleAnimation.value = withTiming(1, { duration: 1000 });
    opacityAnimation.value = withTiming(1, { duration: 1200 });
  }, [scaleAnimation, opacityAnimation]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
    opacity: opacityAnimation.value,
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1570939274851-b7879c4f7998?w=800&h=600&fit=crop&q=80',
          }}
          style={styles.backgroundImage}
          resizeMode='cover'
        />

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
      </View>

      {/* Floating Content */}
      <View style={styles.contentContainer}>
        {/* Main Title with floating animation */}
        <FloatingElement delay={500} duration={4000} translateY={15}>
          <Text style={styles.mainTitle}>Türkiye'yi Keşfet</Text>
        </FloatingElement>

        {/* Subtitle with floating animation */}
        <FloatingElement delay={800} duration={3500} translateY={12}>
          <Text style={styles.subtitle}>
            Binlerce yıllık tarihi ve doğal güzellikleri deneyimle
          </Text>
        </FloatingElement>

        {/* Floating Icons */}
        <View style={styles.iconsContainer}>
          <FloatingElement delay={1000} duration={2800} translateY={8}>
            <View style={styles.iconItem}>
              <Text style={styles.icon}>🏛️</Text>
              <Text style={styles.iconLabel}>Tarih</Text>
            </View>
          </FloatingElement>

          <FloatingElement delay={1200} duration={3200} translateY={10}>
            <View style={styles.iconItem}>
              <Text style={styles.icon}>🏔️</Text>
              <Text style={styles.iconLabel}>Doğa</Text>
            </View>
          </FloatingElement>

          <FloatingElement delay={1400} duration={2900} translateY={12}>
            <View style={styles.iconItem}>
              <Text style={styles.icon}>🏖️</Text>
              <Text style={styles.iconLabel}>Sahil</Text>
            </View>
          </FloatingElement>

          <FloatingElement delay={1600} duration={3100} translateY={9}>
            <View style={styles.iconItem}>
              <Text style={styles.icon}>🍽️</Text>
              <Text style={styles.iconLabel}>Lezzet</Text>
            </View>
          </FloatingElement>
        </View>

        {/* Floating decorative elements */}
        <FloatingElement delay={2000} duration={5000} translateY={20}>
          <View style={[styles.decorativeCircle, styles.circle1]} />
        </FloatingElement>

        <FloatingElement delay={2300} duration={4500} translateY={15}>
          <View style={[styles.decorativeCircle, styles.circle2]} />
        </FloatingElement>

        <FloatingElement delay={2600} duration={3800} translateY={18}>
          <View style={[styles.decorativeCircle, styles.circle3]} />
        </FloatingElement>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 280,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.primary.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 58, 138, 0.6)',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.neutral.white,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
    paddingHorizontal: 16,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  iconItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 12,
    minWidth: 64,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 12,
    color: Colors.neutral.white,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 60,
    height: 60,
    top: 20,
    right: 20,
  },
  circle2: {
    width: 40,
    height: 40,
    bottom: 30,
    left: 30,
  },
  circle3: {
    width: 30,
    height: 30,
    top: 50,
    left: 20,
  },
});
