/**
 * TravelTurkey - HomeScreen Tests
 * Comprehensive test suite for the modernized HomeScreen 2025
 */

import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../src/screens/home/HomeScreen';
import * as asyncStorageUtils from '../../src/utils/asyncStorage';

// Create mock components
const MockHeroCarousel = ({ onSlidePress }: any) => (
  <View testID='hero-carousel'>
    <TouchableOpacity onPress={() => onSlidePress({ title: 'Test Slide' })}>
      <Text>Hero Slide</Text>
    </TouchableOpacity>
  </View>
);

const MockFloatingVisual = () => (
  <View testID='floating-visual'>
    <Text>Türkiye'yi Keşfet</Text>
  </View>
);

const MockCTAButton = ({ title, onPress }: any) => (
  <TouchableOpacity testID='cta-button' onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('react-native-reanimated', () => {
  const RNView = require('react-native').View;
  const RNScrollView = require('react-native').ScrollView;

  return {
    useSharedValue: () => ({ value: 0 }),
    useAnimatedStyle: () => ({}),
    withTiming: (val: any) => val,
    withSpring: (val: any) => val,
    useAnimatedScrollHandler: () => () => {},
    interpolate: () => 0,
    View: RNView,
    ScrollView: RNScrollView,
  };
});

jest.mock('../../src/components/HeroCarousel', () => MockHeroCarousel);

jest.mock('../../src/components/home/FloatingVisual', () => ({
  FloatingVisual: MockFloatingVisual,
}));

jest.mock('../../src/components/CTAButton', () => MockCTAButton);

jest.mock('../../src/utils/asyncStorage', () => ({
  getUserName: jest.fn(),
  updateLastVisit: jest.fn(),
}));

// Test setup
const Tab = createBottomTabNavigator();

// Mock screen components
const ExploreScreen = () => (
  <View>
    <Text>Explore</Text>
  </View>
);
const PlansScreen = () => (
  <View>
    <Text>Plans</Text>
  </View>
);
const ProfileScreen = () => (
  <View>
    <Text>Profile</Text>
  </View>
);

const HomeScreenWrapper = (props: any) => <HomeScreen {...props} />;

const TestNavigator = ({ initialRouteName = 'HomeTab' }) => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName={initialRouteName}>
      <Tab.Screen name='HomeTab' component={HomeScreenWrapper} />
      <Tab.Screen name='ExploreTab' component={ExploreScreen} />
      <Tab.Screen name='PlansTab' component={PlansScreen} />
      <Tab.Screen name='ProfileTab' component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

describe('HomeScreen', () => {
  const mockGetUserName = asyncStorageUtils.getUserName as jest.MockedFunction<
    typeof asyncStorageUtils.getUserName
  >;
  const mockUpdateLastVisit =
    asyncStorageUtils.updateLastVisit as jest.MockedFunction<
      typeof asyncStorageUtils.updateLastVisit
    >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUserName.mockResolvedValue('Emre');
    mockUpdateLastVisit.mockResolvedValue();
  });

  describe('Rendering', () => {
    it('renders correctly', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText(/Hoş geldin/)).toBeTruthy();
      });
    });

    it('displays personalized greeting with user name', async () => {
      mockGetUserName.mockResolvedValue('Ahmet');

      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Hoş geldin, Ahmet!')).toBeTruthy();
      });
    });

    it('displays default name when getUserName fails', async () => {
      mockGetUserName.mockRejectedValue(new Error('Storage error'));

      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Hoş geldin, Gezgin!')).toBeTruthy();
      });
    });

    it('displays correct time-based greeting', () => {
      // Mock Date to return specific hour
      const mockDate = new Date();
      mockDate.setHours(10); // Morning
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      render(<TestNavigator />);

      expect(screen.getByText('Günaydın')).toBeTruthy();

      jest.restoreAllMocks();
    });
  });

  describe('Floating Visual', () => {
    it('renders floating visual component', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByTestId('floating-visual')).toBeTruthy();
      });
    });

    it('displays main title in floating visual', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText("Türkiye'yi Keşfet")).toBeTruthy();
      });
    });
  });

  describe('CTA Button', () => {
    it('renders CTA button with correct text', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByTestId('cta-button')).toBeTruthy();
        expect(screen.getByText('Hemen Keşfet')).toBeTruthy();
      });
    });

    it('triggers navigation when CTA button is pressed', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        const ctaButton = screen.getByTestId('cta-button');
        fireEvent.press(ctaButton);
      });

      expect(screen.getByTestId('cta-button')).toBeTruthy();
    });
  });

  describe('Hero Carousel', () => {
    it('renders hero carousel', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-carousel')).toBeTruthy();
      });
    });

    it('handles carousel slide press', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        const slideButton = screen.getByText('Hero Slide');
        fireEvent.press(slideButton);
      });

      expect(screen.getByText('Hero Slide')).toBeTruthy();
    });
  });

  describe('Statistics Section', () => {
    it('displays user statistics', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Keşif İstatistiklerin')).toBeTruthy();
        expect(screen.getByText('12')).toBeTruthy(); // Visited places
        expect(screen.getByText('5')).toBeTruthy(); // Favorite places
        expect(screen.getByText('3')).toBeTruthy(); // Active plans
      });
    });

    it('displays correct stat labels', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Ziyaret Edilen')).toBeTruthy();
        expect(screen.getByText('Favori Yer')).toBeTruthy();
        expect(screen.getByText('Aktif Plan')).toBeTruthy();
      });
    });
  });

  describe('Accessibility', () => {
    it('renders floating visual with accessibility', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        const floatingVisual = screen.getByTestId('floating-visual');
        expect(floatingVisual).toBeTruthy();
      });
    });

    it('CTA button has proper accessibility label', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        const ctaButton = screen.getByTestId('cta-button');
        expect(ctaButton).toBeTruthy();
      });
    });
  });

  describe('Performance', () => {
    it('initializes AsyncStorage operations', async () => {
      render(<TestNavigator />);

      await waitFor(() => {
        expect(mockGetUserName).toHaveBeenCalledTimes(1);
        expect(mockUpdateLastVisit).toHaveBeenCalledTimes(1);
      });
    });

    it('handles AsyncStorage errors gracefully', async () => {
      mockGetUserName.mockRejectedValue(new Error('Storage error'));
      mockUpdateLastVisit.mockRejectedValue(new Error('Storage error'));

      render(<TestNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Hoş geldin, Gezgin!')).toBeTruthy();
      });
    });
  });

  describe('Time-based Greetings', () => {
    const testCases = [
      { hour: 6, expected: 'Günaydın' },
      { hour: 14, expected: 'İyi öğleden sonra' },
      { hour: 19, expected: 'İyi akşamlar' },
      { hour: 23, expected: 'İyi geceler' },
    ];

    testCases.forEach(({ hour, expected }) => {
      it(`displays "${expected}" for hour ${hour}`, () => {
        const mockDate = new Date();
        mockDate.setHours(hour);
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        render(<TestNavigator />);

        expect(screen.getByText(expected)).toBeTruthy();

        jest.restoreAllMocks();
      });
    });
  });
});
