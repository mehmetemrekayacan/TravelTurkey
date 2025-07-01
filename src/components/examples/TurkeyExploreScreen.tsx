/**
 * TravelTurkey - Sample Component Using Design System
 * Demonstrates best practices for using the modern Turkey-themed design system
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import {
  ComponentStyles,
  TextStyles,
  Theme,
  AccessibilityHelpers,
  QuickStyles,
} from '../../styles';

// Sample destination data
const sampleDestination = {
  id: '1',
  name: 'Cappadocia',
  description:
    'Experience the magical landscape of fairy chimneys and hot air balloons',
  rating: 4.9,
  reviewCount: 2453,
  price: '₺150',
  image: 'https://example.com/cappadocia.jpg',
};

export const DestinationCard: React.FC = () => {
  return (
    <View style={ComponentStyles.Card.elevated}>
      {/* Destination Image */}
      <Image
        source={{ uri: sampleDestination.image }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: Theme.borderRadius.md,
          marginBottom: Theme.spacing.md,
        }}
        {...AccessibilityHelpers.image(
          `Beautiful view of ${sampleDestination.name} with fairy chimneys and hot air balloons`,
        )}
      />

      {/* Content */}
      <View>
        {/* Title and Rating */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: Theme.spacing.sm,
          }}
        >
          <Text style={TextStyles.heading2} numberOfLines={2}>
            {sampleDestination.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={TextStyles.labelMedium}>
              ⭐ {sampleDestination.rating}
            </Text>
            <Text style={TextStyles.caption}>
              {' '}
              ({sampleDestination.reviewCount})
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text
          style={[TextStyles.bodyMedium, { marginBottom: Theme.spacing.md }]}
          numberOfLines={2}
        >
          {sampleDestination.description}
        </Text>

        {/* Price and Action */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={TextStyles.caption}>Starting from</Text>
            <Text
              style={[
                TextStyles.heading3,
                { color: Theme.colors.primary[600] },
              ]}
            >
              {sampleDestination.price}
            </Text>
          </View>

          <TouchableOpacity
            style={ComponentStyles.Button.primaryMedium}
            {...AccessibilityHelpers.button(
              `Explore ${sampleDestination.name}`,
              `View detailed information and book tours for ${sampleDestination.name}`,
            )}
          >
            <Text style={ComponentStyles.ButtonText.primaryText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const TurkeyExploreScreen: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Theme.colors.primary[600]}
      />

      <ScrollView style={QuickStyles.container}>
        {/* Header */}
        <View style={ComponentStyles.Header.container}>
          <View>
            <Text style={ComponentStyles.Header.title}>Discover Turkey</Text>
            <Text style={ComponentStyles.Header.subtitle}>
              Unforgettable experiences await
            </Text>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={{ padding: Theme.spacing.md }}>
          <Text
            style={[
              TextStyles.displaySmall,
              { textAlign: 'center', marginBottom: Theme.spacing.lg },
            ]}
          >
            Welcome to Turkey 🇹🇷
          </Text>

          <Text
            style={[
              TextStyles.bodyLarge,
              { textAlign: 'center', marginBottom: Theme.spacing.xl },
            ]}
          >
            From ancient wonders to natural beauty, discover a land where East
            meets West
          </Text>

          {/* Featured Destination */}
          <Text
            style={[TextStyles.heading2, { marginBottom: Theme.spacing.md }]}
          >
            Featured Destination
          </Text>

          <DestinationCard />

          {/* Quick Actions */}
          <View style={{ marginTop: Theme.spacing.xl }}>
            <Text
              style={[TextStyles.heading3, { marginBottom: Theme.spacing.md }]}
            >
              Plan Your Journey
            </Text>

            <View style={{ gap: Theme.spacing.sm }}>
              <TouchableOpacity
                style={ComponentStyles.Button.secondaryLarge}
                {...AccessibilityHelpers.button(
                  'Browse all destinations',
                  'View complete list of tourist destinations in Turkey',
                )}
              >
                <Text style={ComponentStyles.ButtonText.secondaryText}>
                  🗺️ Browse Destinations
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={ComponentStyles.Button.secondaryLarge}
                {...AccessibilityHelpers.button(
                  'Create travel plan',
                  'Start planning your custom Turkey itinerary',
                )}
              >
                <Text style={ComponentStyles.ButtonText.secondaryText}>
                  📋 Create Travel Plan
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={ComponentStyles.Button.secondaryLarge}
                {...AccessibilityHelpers.button(
                  'Local guides',
                  'Connect with experienced local guides',
                )}
              >
                <Text style={ComponentStyles.ButtonText.secondaryText}>
                  👥 Find Local Guides
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cultural Quote */}
          <View
            style={{
              marginTop: Theme.spacing.xl,
              padding: Theme.spacing.lg,
              backgroundColor: Theme.colors.accent.turquoise[50],
              borderRadius: Theme.borderRadius.lg,
              borderLeftWidth: 4,
              borderLeftColor: Theme.colors.accent.turquoise[500],
            }}
          >
            <Text style={[TextStyles.accent, { textAlign: 'center' }]}>
              "Turkey is not just a destination, it's a journey through time and
              culture"
            </Text>
            <Text
              style={[
                TextStyles.caption,
                { textAlign: 'center', marginTop: Theme.spacing.sm },
              ]}
            >
              — Turkish Tourism Board
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// Quick Stats Component
export const TurkeyStatsCard: React.FC = () => {
  const stats = [
    { label: 'UNESCO Sites', value: '19', icon: '🏛️' },
    { label: 'Provinces', value: '81', icon: '🗺️' },
    { label: 'Coastline', value: '8,333km', icon: '🏖️' },
    { label: 'Languages', value: '30+', icon: '🗣️' },
  ];

  return (
    <View style={ComponentStyles.Card.default}>
      <Text style={[TextStyles.heading3, { marginBottom: Theme.spacing.md }]}>
        Turkey by Numbers
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: Theme.spacing.md,
        }}
      >
        {stats.map((stat, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              minWidth: '45%',
              alignItems: 'center',
              padding: Theme.spacing.sm,
              backgroundColor: Theme.colors.neutral[100],
              borderRadius: Theme.borderRadius.base,
            }}
          >
            <Text style={{ fontSize: 24, marginBottom: Theme.spacing.xs }}>
              {stat.icon}
            </Text>
            <Text
              style={[
                TextStyles.heading3,
                { color: Theme.colors.primary[600] },
              ]}
            >
              {stat.value}
            </Text>
            <Text style={TextStyles.caption}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TurkeyExploreScreen;
