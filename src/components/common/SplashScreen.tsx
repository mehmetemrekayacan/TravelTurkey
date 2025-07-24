import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import TravelTurkeyLogo from '../common/TravelTurkeyLogo';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(1);

  useEffect(() => {
    // Start animations
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withSequence(
      withSpring(1.1, { damping: 8 }),
      withSpring(1, { damping: 12 }),
    );

    // Complete splash after 2.5 seconds
    const timer = setTimeout(() => {
      backgroundOpacity.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(onComplete)();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, backgroundOpacity, onComplete]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return (
    <>
      <StatusBar
        backgroundColor='#1E3A8A'
        barStyle='light-content'
        translucent={false}
      />
      <Animated.View style={[styles.container, backgroundAnimatedStyle]}>
        <View style={styles.logoContainer}>
          <Animated.View style={logoAnimatedStyle}>
            <TravelTurkeyLogo variant='vertical' size='xlarge' />
          </Animated.View>
        </View>

        {/* Decorative elements */}
        <View style={styles.decorativeContainer}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  circle1: {
    width: width * 0.8,
    height: width * 0.8,
    top: -width * 0.4,
    right: -width * 0.4,
  },
  circle2: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: -width * 0.3,
    left: -width * 0.3,
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.2,
    right: width * 0.1,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
  },
});

export default SplashScreen;
