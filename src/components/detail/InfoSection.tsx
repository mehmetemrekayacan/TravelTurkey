/**
 * TravelTurkey - Info Section Component for Place Detail
 * Modern card layout with glassmorphism effects for place information
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
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  location: {
    city: string;
    district: string;
  };
  workingHours: {
    [key: string]: string;
  };
  priceInfo: {
    currency: string;
    adult: number;
    isFree: boolean;
  };
  tags: string[];
  features: string[];
}

interface InfoSectionProps {
  place: Place;
}

const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}> = ({ title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const rotateAnimation = useSharedValue(defaultExpanded ? 180 : 0);
  const heightAnimation = useSharedValue(defaultExpanded ? 1 : 0);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    rotateAnimation.value = withTiming(isExpanded ? 0 : 180, { duration: 300 });
    heightAnimation.value = withTiming(isExpanded ? 0 : 1, { duration: 300 });
  };

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnimation.value}deg` }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: heightAnimation.value,
    maxHeight: heightAnimation.value * 1000, // Large number to allow content to show
  }));

  return (
    <View style={styles.infoCard}>
      {/* Glassmorphism Background */}
      <View style={styles.cardBackground} />
      
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={toggleExpanded}
        accessibilityRole="button"
        accessibilityLabel={`${title} ${isExpanded ? 'kapat' : 'aç'}`}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Animated.View style={rotateStyle}>
          <Text style={styles.chevron}>⌄</Text>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.cardContent, contentStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const FeatureTag: React.FC<{ feature: string }> = ({ feature }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.featureTag, animatedStyle]}>
        <Text style={styles.featureText}>{feature}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const InfoSection: React.FC<InfoSectionProps> = ({ place }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Description Card */}
      <InfoCard title="Açıklama">
        <Text style={styles.description}>{place.description}</Text>
        
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Etiketler:</Text>
          <View style={styles.tagsList}>
            {place.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </InfoCard>

      {/* Working Hours Card */}
      <InfoCard title="Çalışma Saatleri">
        <View style={styles.hoursContainer}>
          {Object.entries(place.workingHours).map(([day, hours]) => (
            <View key={day} style={styles.hourRow}>
              <Text style={styles.dayText}>
                {day === 'monday' ? 'Pazartesi' :
                 day === 'tuesday' ? 'Salı' :
                 day === 'wednesday' ? 'Çarşamba' :
                 day === 'thursday' ? 'Perşembe' :
                 day === 'friday' ? 'Cuma' :
                 day === 'saturday' ? 'Cumartesi' : 'Pazar'}
              </Text>
              <Text style={styles.hoursText}>{hours}</Text>
            </View>
          ))}
        </View>
      </InfoCard>

      {/* Price Info Card */}
      <InfoCard title="Fiyat Bilgisi">
        <View style={styles.priceContainer}>
          {place.priceInfo.isFree ? (
            <View style={styles.freeContainer}>
              <Text style={styles.freeIcon}>🎫</Text>
              <Text style={styles.freeText}>Ücretsiz Giriş</Text>
            </View>
          ) : (
            <View style={styles.pricingContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Yetişkin:</Text>
                <Text style={styles.priceValue}>
                  {place.priceInfo.adult} {place.priceInfo.currency}
                </Text>
              </View>
            </View>
          )}
        </View>
      </InfoCard>

      {/* Features Card */}
      <InfoCard title="Özellikler">
        <View style={styles.featuresContainer}>
          {place.features.map((feature, index) => (
            <FeatureTag key={index} feature={feature} />
          ))}
        </View>
      </InfoCard>

      {/* Location Card */}
      <InfoCard title="Konum Bilgisi">
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <View style={styles.locationText}>
              <Text style={styles.locationPrimary}>
                {place.location.city}, {place.location.district}
              </Text>
              <Text style={styles.locationSecondary}>
                {place.name} konumu
              </Text>
            </View>
          </View>
        </View>
      </InfoCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
  },
  infoCard: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.base,
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
  },
  chevron: {
    fontSize: 16,
    color: Theme.colors.neutral[600],
  },
  cardContent: {
    padding: Theme.spacing.md,
    overflow: 'hidden',
  },
  description: {
    fontSize: Theme.typography.fontSize.base,
    lineHeight: Theme.typography.lineHeight.relaxed,
    color: Theme.colors.neutral[700],
    marginBottom: Theme.spacing.md,
  },
  tagsContainer: {
    marginTop: Theme.spacing.sm,
  },
  tagsTitle: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.neutral[700],
    marginBottom: Theme.spacing.xs,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  tag: {
    backgroundColor: Theme.colors.primary[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.base,
  },
  tagText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.primary[700],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  hoursContainer: {
    gap: Theme.spacing.xs,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  dayText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[700],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  hoursText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  priceContainer: {
    alignItems: 'center',
  },
  freeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.semantic.success[50],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.lg,
  },
  freeIcon: {
    fontSize: 24,
    marginRight: Theme.spacing.sm,
  },
  freeText: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.semantic.success[700],
  },
  pricingContainer: {
    width: '100%',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  priceLabel: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.neutral[700],
  },
  priceValue: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.primary[600],
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  featureTag: {
    backgroundColor: Theme.colors.accent.turquoise[100],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
  },
  featureText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.accent.turquoise[700],
    fontWeight: Theme.typography.fontWeight.medium,
  },
  locationContainer: {
    gap: Theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    fontSize: 20,
    marginRight: Theme.spacing.sm,
    marginTop: 2,
  },
  locationText: {
    flex: 1,
  },
  locationPrimary: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: 2,
  },
  locationSecondary: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
});

export default InfoSection;