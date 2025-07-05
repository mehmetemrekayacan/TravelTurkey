/**
 * TravelTurkey - Enhanced FlatList Demo
 * Demonstration of the modern FlatList implementation with sample data
 */

import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { OptimizedTouristicPlacesList } from '../../components/common';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { touristPlaces, getFeaturedPlaces } from '../../data/touristPlaces';
import { Colors } from '../../constants/Colors';

const FlatListDemo: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState<TouristPlace[]>(getFeaturedPlaces());

  // Handle item press
  const handleItemPress = useCallback(
    (item: TouristPlace | EnhancedTouristPlace) => {
      console.log('Pressed item:', item.name);
      // Here you would typically navigate to a detail screen
      // navigation.navigate('PlaceDetail', { placeId: item.id });
    },
    [],
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate network request
    setTimeout(() => {
      setPlaces(getFeaturedPlaces());
      setRefreshing(false);
    }, 1500);
  }, []);

  // Header component
  const ListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Öne Çıkan Yerler</Text>
        <Text style={styles.subtitle}>
          Modern FlatList implementasyonu ile Türkiye'nin güzel yerlerini
          keşfedin
        </Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary.blue}
        barStyle='light-content'
      />

      <OptimizedTouristicPlacesList
        data={places}
        onItemPress={handleItemPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListHeaderComponent={ListHeader}
        variant='default'
        showImages={true}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

// Example of how to use different variants:

export const CompactListExample: React.FC = () => {
  const [places] = useState<TouristPlace[]>(touristPlaces.slice(0, 5));

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Kompakt Görünüm</Text>
      <OptimizedTouristicPlacesList
        data={places}
        variant='compact'
        showImages={true}
        style={styles.compactList}
      />
    </View>
  );
};

export const FeaturedListExample: React.FC = () => {
  const [places] = useState<TouristPlace[]>(touristPlaces.slice(0, 3));

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Öne Çıkan Görünüm</Text>
      <OptimizedTouristicPlacesList
        data={places}
        variant='featured'
        showImages={true}
        style={styles.featuredList}
      />
    </View>
  );
};

export const HorizontalListExample: React.FC = () => {
  const [places] = useState<TouristPlace[]>(touristPlaces.slice(0, 8));

  const handleItemPress = useCallback(
    (item: TouristPlace | EnhancedTouristPlace) => {
      console.log('Horizontal item pressed:', item.name);
    },
    [],
  );

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Yatay Görünüm</Text>
      <OptimizedTouristicPlacesList
        data={places}
        onItemPress={handleItemPress}
        variant='compact'
        showImages={true}
        horizontal={true}
        style={styles.horizontalList}
        contentContainerStyle={styles.horizontalContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.offWhite,
  },
  list: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: Colors.primary.blue,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.white,
    opacity: 0.9,
    lineHeight: 22,
  },
  exampleContainer: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    margin: 8,
    borderRadius: 12,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 12,
  },
  compactList: {
    height: 400,
  },
  featuredList: {
    height: 600,
  },
  horizontalList: {
    height: 200,
  },
  horizontalContent: {
    paddingHorizontal: 16,
  },
});

export default FlatListDemo;

// Usage Examples and Performance Tips:

/*

1. BASIC USAGE:
```tsx
<OptimizedTouristicPlacesList
  data={places}
  onItemPress={handleItemPress}
  variant="default"
/>
```

2. WITH REFRESH CONTROL:
```tsx
<OptimizedTouristicPlacesList
  data={places}
  onItemPress={handleItemPress}
  onRefresh={handleRefresh}
  refreshing={refreshing}
  variant="default"
/>
```

3. COMPACT VARIANT FOR SPACE-EFFICIENT DISPLAY:
```tsx
<OptimizedTouristicPlacesList
  data={places}
  variant="compact"
  showImages={false}
/>
```

4. FEATURED VARIANT FOR HERO SECTIONS:
```tsx
<OptimizedTouristicPlacesList
  data={featuredPlaces}
  variant="featured"
  onItemPress={handleFeaturedPress}
/>
```

5. HORIZONTAL SCROLLING:
```tsx
<OptimizedTouristicPlacesList
  data={places}
  horizontal={true}
  variant="compact"
  contentContainerStyle={{ paddingHorizontal: 16 }}
/>
```

PERFORMANCE TIPS:

1. Always use keyExtractor for unique keys
2. Keep renderItem functions memoized with useCallback
3. Use getItemLayout when possible for better performance
4. Limit initialNumToRender for faster initial load
5. Use removeClippedSubviews for large lists
6. Implement proper error boundaries for production
7. Consider virtualizing very large datasets
8. Test memory usage with large datasets

ACCESSIBILITY FEATURES:

1. All cards have proper accessibility labels
2. Touch feedback with animations
3. Proper role definitions
4. Screen reader support
5. High contrast support

ANIMATION FEATURES:

1. Fade-in animations for cards
2. Spring animations for press feedback
3. Staggered animations based on index
4. Smooth transitions between states

*/
