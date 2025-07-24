/**
 * TravelTurkey - Map Section Component for Place Detail
 * Interactive map section with location information and directions
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Theme } from '../../styles/theme';

interface Place {
  name: string;
  location: {
    city: string;
    district: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

interface MapSectionProps {
  place: Place;
}

const MapPlaceholder: React.FC<{ place: Place }> = ({ place }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleMapPress = () => {
    Alert.alert(
      'Harita',
      `${place.name} konumunu harita uygulamasında açmak istiyorsunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Aç', onPress: () => console.log('Open map') },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={handleMapPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.mapPlaceholder, animatedStyle]}>
        {/* Map Grid Background */}
        <View style={styles.mapGrid}>
          {Array.from({ length: 16 }, (_, index) => (
            <View
              key={index}
              style={[
                styles.gridCell,
                index === 5 && styles.locationCell, // Highlight center cell
              ]}
            />
          ))}
        </View>

        {/* Location Pin */}
        <View style={styles.locationPin}>
          <Text style={styles.pinIcon}>📍</Text>
        </View>

        {/* Overlay Info */}
        <View style={styles.mapOverlay}>
          <Text style={styles.mapTitle}>🗺️ Haritada Görüntüle</Text>
          <Text style={styles.mapSubtitle}>
            Yol tarifi al ve konumu keşfet
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const TransportationCard: React.FC<{
  type: 'walking' | 'driving' | 'transit';
  duration: string;
  distance: string;
  icon: string;
}> = ({ type, duration, distance, icon }) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    
    Alert.alert(
      'Yol Tarifi',
      `${type === 'walking' ? 'Yürüyerek' : 
        type === 'driving' ? 'Araçla' : 
        'Toplu taşıma ile'} yol tarifi alınacak`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Git', onPress: () => console.log(`Navigate via ${type}`) },
      ]
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.transportCard, animatedStyle]}>
        <View style={styles.transportBackground} />
        
        <View style={styles.transportIcon}>
          <Text style={styles.transportIconText}>{icon}</Text>
        </View>
        
        <View style={styles.transportInfo}>
          <Text style={styles.transportDuration}>{duration}</Text>
          <Text style={styles.transportDistance}>{distance}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const MapSection: React.FC<MapSectionProps> = ({ place }) => {
  const [selectedTransport, setSelectedTransport] = useState<'walking' | 'driving' | 'transit'>('walking');

  return (
    <View style={styles.container}>
      {/* Map Display */}
      <View style={styles.mapContainer}>
        <MapPlaceholder place={place} />
      </View>

      {/* Location Info */}
      <View style={styles.locationCard}>
        <View style={styles.locationBackground} />
        
        <View style={styles.locationHeader}>
          <Text style={styles.locationTitle}>📍 Konum Bilgisi</Text>
        </View>
        
        <View style={styles.locationDetails}>
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>Adres:</Text>
            <Text style={styles.locationValue}>
              {place.location.city}, {place.location.district}
            </Text>
          </View>
          
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>Koordinatlar:</Text>
            <Text style={styles.locationValue}>
              {place.location.coordinates.latitude.toFixed(6)}, {place.location.coordinates.longitude.toFixed(6)}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.shareLocationButton}>
          <Text style={styles.shareLocationText}>📤 Konumu Paylaş</Text>
        </TouchableOpacity>
      </View>

      {/* Transportation Options */}
      <View style={styles.transportationContainer}>
        <Text style={styles.sectionTitle}>Ulaşım Seçenekleri</Text>
        
        <View style={styles.transportGrid}>
          <TransportationCard
            type="walking"
            duration="15 dk"
            distance="1.2 km"
            icon="🚶‍♂️"
          />
          <TransportationCard
            type="driving"
            duration="5 dk"
            distance="1.2 km"
            icon="🚗"
          />
          <TransportationCard
            type="transit"
            duration="12 dk"
            distance="Metro + yürüyüş"
            icon="🚊"
          />
        </View>
      </View>

      {/* Nearby Places */}
      <View style={styles.nearbyContainer}>
        <Text style={styles.sectionTitle}>Yakındaki Yerler</Text>
        
        <View style={styles.nearbyList}>
          {[
            { name: 'Sultanahmet Camii', distance: '200m', icon: '🕌' },
            { name: 'Topkapı Sarayı', distance: '500m', icon: '🏰' },
            { name: 'Yerebatan Sarnıcı', distance: '300m', icon: '🏛️' },
            { name: 'Galata Köprüsü', distance: '1.5km', icon: '🌉' },
          ].map((place, index) => (
            <TouchableOpacity key={index} style={styles.nearbyItem}>
              <View style={styles.nearbyIcon}>
                <Text style={styles.nearbyIconText}>{place.icon}</Text>
              </View>
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyName}>{place.name}</Text>
                <Text style={styles.nearbyDistance}>{place.distance}</Text>
              </View>
              <View style={styles.nearbyArrow}>
                <Text style={styles.nearbyArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
  },
  mapContainer: {
    marginBottom: Theme.spacing.lg,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Theme.colors.neutral[100],
    ...Theme.shadows.base,
  },
  mapGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '25%',
    height: '25%',
    borderWidth: 0.5,
    borderColor: Theme.colors.neutral[200],
    backgroundColor: Theme.colors.neutral[50],
  },
  locationCell: {
    backgroundColor: Theme.colors.primary[100],
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  pinIcon: {
    fontSize: 24,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: Theme.spacing.md,
  },
  mapTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[50],
    marginBottom: 2,
  },
  mapSubtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  locationCard: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.base,
  },
  locationBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  locationHeader: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  locationTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
  },
  locationDetails: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationLabel: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
    fontWeight: Theme.typography.fontWeight.medium,
    width: 80,
  },
  locationValue: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[800],
    flex: 1,
    textAlign: 'right',
  },
  shareLocationButton: {
    backgroundColor: Theme.colors.accent.turquoise[500],
    margin: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  shareLocationText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[50],
  },
  transportationContainer: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
    marginBottom: Theme.spacing.md,
  },
  transportGrid: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  transportCard: {
    flex: 1,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  transportBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  transportIcon: {
    alignItems: 'center',
    paddingTop: Theme.spacing.md,
  },
  transportIconText: {
    fontSize: 32,
  },
  transportInfo: {
    alignItems: 'center',
    padding: Theme.spacing.sm,
  },
  transportDuration: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.neutral[900],
  },
  transportDistance: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.neutral[600],
  },
  nearbyContainer: {
    marginBottom: Theme.spacing.xl,
  },
  nearbyList: {
    gap: Theme.spacing.sm,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.sm,
  },
  nearbyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  nearbyIconText: {
    fontSize: 20,
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyName: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.neutral[900],
  },
  nearbyDistance: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.neutral[600],
  },
  nearbyArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyArrowText: {
    fontSize: 16,
    color: Theme.colors.neutral[600],
  },
});

export default MapSection;