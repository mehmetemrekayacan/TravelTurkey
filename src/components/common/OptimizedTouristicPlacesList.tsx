/**
 * TravelTurkey - Optimized Touristic Places List
 * High-performance FlatList component for displaying tourist places
 */

import React, { memo, useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { TouristicPlaceCard } from './TouristicPlaceCard';
import { Colors } from '../../constants/Colors';

interface OptimizedTouristicPlacesListProps {
  data: (TouristPlace | EnhancedTouristPlace)[];
  onItemPress?: (item: TouristPlace | EnhancedTouristPlace) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  variant?: 'default' | 'compact' | 'featured';
  showImages?: boolean;
  numColumns?: number;
  horizontal?: boolean;
  contentContainerStyle?: any;
  style?: any;
}

const DefaultEmptyComponent = () => (
  <Animated.View entering={FadeInDown} style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>🗺️</Text>
    <Text style={styles.emptyTitle}>Henüz yer bulunamadı</Text>
    <Text style={styles.emptySubtitle}>
      Farklı arama terimleri veya filtreler deneyebilirsiniz
    </Text>
  </Animated.View>
);

const DefaultFooterComponent = () => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>
      Türkiye'nin güzelliklerini keşfetmeye devam edin 🇹🇷
    </Text>
  </View>
);

export const OptimizedTouristicPlacesList: React.FC<OptimizedTouristicPlacesListProps> =
  memo(
    ({
      data,
      onItemPress,
      onRefresh,
      refreshing = false,
      ListHeaderComponent,
      ListFooterComponent = DefaultFooterComponent,
      ListEmptyComponent = DefaultEmptyComponent,
      variant = 'default',
      showImages = true,
      numColumns = 1,
      horizontal = false,
      contentContainerStyle,
      style,
    }) => {
      // Optimized render item function
      const renderItem: ListRenderItem<TouristPlace | EnhancedTouristPlace> =
        useCallback(
          ({ item, index }) => (
            <TouristicPlaceCard
              place={item}
              index={index}
              onPress={onItemPress}
              variant={variant}
              showImage={showImages}
            />
          ),
          [onItemPress, variant, showImages],
        );

      // Optimized key extractor
      const keyExtractor = useCallback(
        (item: TouristPlace | EnhancedTouristPlace) => item.id,
        [],
      );

      // Get item layout for better performance
      const getItemLayout = useCallback(
        (dataArray: any, index: number) => {
          const height =
            variant === 'compact' ? 160 : variant === 'featured' ? 320 : 280;
          return {
            length: height,
            offset: height * index,
            index,
          };
        },
        [variant],
      );

      // Item separator component
      const ItemSeparatorComponent = useCallback(
        () => <View style={styles.separator} />,
        [],
      );

      return (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          horizontal={horizontal}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // Header and Footer
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent}
          // Performance optimizations
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={21}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          getItemLayout={!horizontal ? getItemLayout : undefined}
          ItemSeparatorComponent={
            !horizontal ? ItemSeparatorComponent : undefined
          }
          // Refresh control
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary.blue}
                colors={[Colors.primary.blue]}
                progressBackgroundColor={Colors.neutral.white}
              />
            ) : undefined
          }
          // Styles
          style={[styles.container, style]}
          contentContainerStyle={[
            styles.contentContainer,
            data.length === 0 && styles.emptyContentContainer,
            contentContainerStyle,
          ]}
          // Accessibility
          accessibilityLabel='Turistik yerler listesi'
          // Memory optimizations
          legacyImplementation={false}
        />
      );
    },
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
    lineHeight: 22,
  },
  footerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

OptimizedTouristicPlacesList.displayName = 'OptimizedTouristicPlacesList';

export default OptimizedTouristicPlacesList;
