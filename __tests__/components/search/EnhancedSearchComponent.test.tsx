/**
 * EnhancedSearchComponent Tests
 * Testing real-time search functionality with debouncing and accessibility
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { EnhancedSearchComponent } from '../../../src/components/search/EnhancedSearchComponent';
import { searchPlaces } from '../../../src/data/touristPlaces';

// Mock lodash debounce
jest.mock('lodash', () => ({
  debounce: (fn: any) => {
    const debounced = (...args: any[]) => {
      fn(...args);
    };
    debounced.cancel = jest.fn();
    return debounced;
  },
}));

// Mock the data functions
jest.mock('../../../src/data/touristPlaces', () => ({
  searchPlaces: jest.fn(),
  getSearchSuggestions: jest.fn(() => []),
}));

const mockSearchPlaces = searchPlaces as jest.MockedFunction<
  typeof searchPlaces
>;

describe('EnhancedSearchComponent', () => {
  const mockOnFilter = jest.fn();
  const mockOnPlaceSelect = jest.fn();

  const mockPlace = {
    id: '1',
    name: 'Test Place',
    slug: 'test-place',
    description: 'Test description',
    shortDescription: 'Short test description',
    category: 'historical' as const,
    subcategory: 'Museum',
    tags: ['test', 'museum'],
    coordinates: { latitude: 41.0082, longitude: 28.9784 },
    address: {
      city: 'Istanbul',
      district: 'Sultanahmet',
      fullAddress: 'Test Address, Sultanahmet, Istanbul',
    },
    region: 'marmara' as const,
    icon: '🏛️',
    photos: [],
    rating: {
      average: 4.5,
      count: 100,
      breakdown: {
        location: 4.5,
        service: 4.5,
        value: 4.5,
        cleanliness: 4.5,
        atmosphere: 4.5,
      },
    },
    popularityScore: 85,
    priceInfo: {
      currency: 'TRY',
      adult: 50,
      isFree: false,
    },
    workingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '09:00-17:00',
      sunday: '09:00-17:00',
    },
    bestTimeToVisit: ['spring', 'summer'],
    estimatedDuration: '2-3 hours',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['tr', 'en'],
    },
    nearbyPlaces: [],
    contactInfo: {},
    tips: ['Bring comfortable shoes'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isActive: true,
    isFeatured: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchPlaces.mockReturnValue([mockPlace]);
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    expect(
      getByPlaceholderText('Yer, şehir veya kategori arayın...'),
    ).toBeTruthy();
    expect(getByLabelText('Arama giriş alanı')).toBeTruthy();
  });

  it('handles text input and triggers search', async () => {
    const { getByPlaceholderText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'Test');
    });

    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalledWith([mockPlace]);
    });
  });

  it('shows loading indicator during search', async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'Test');
    });

    expect(getByLabelText('Aranıyor')).toBeTruthy();
  });

  it('displays clear button when there is text', async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'Test');
    });

    await waitFor(() => {
      expect(getByLabelText('Aramayı temizle')).toBeTruthy();
    });
  });

  it('clears search when clear button is pressed', async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'Test');
    });

    await waitFor(() => {
      const clearButton = getByLabelText('Aramayı temizle');
      fireEvent.press(clearButton);
    });

    expect(mockOnFilter).toHaveBeenCalledWith([]);
  });

  it('handles place selection', async () => {
    const { getByPlaceholderText, getByText } = render(
      <EnhancedSearchComponent
        onFilter={mockOnFilter}
        onPlaceSelect={mockOnPlaceSelect}
      />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'Test');
    });

    await waitFor(() => {
      const placeItem = getByText('Test Place');
      fireEvent.press(placeItem);
    });

    expect(mockOnPlaceSelect).toHaveBeenCalledWith(mockPlace);
  });

  it('shows no results message when search returns empty', async () => {
    mockSearchPlaces.mockReturnValue([]);

    const { getByPlaceholderText, getByText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'NonExistentPlace');
    });

    await waitFor(() => {
      expect(getByText('Sonuç bulunamadı')).toBeTruthy();
      expect(
        getByText('"NonExistentPlace" için eşleşen yer bulunamadı'),
      ).toBeTruthy();
    });
  });

  it('handles focus and blur events', async () => {
    const { getByPlaceholderText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent(searchInput, 'focus');
    });

    await act(async () => {
      fireEvent(searchInput, 'blur');
    });

    // Component should handle focus/blur without errors
    expect(searchInput).toBeTruthy();
  });

  it('respects maxResults prop', async () => {
    const manyPlaces = Array.from({ length: 20 }, (_, i) => ({
      ...mockPlace,
      id: `${i}`,
      name: `Place ${i}`,
      slug: `place-${i}`,
    }));

    mockSearchPlaces.mockReturnValue(manyPlaces);

    const { getByPlaceholderText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} maxResults={5} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );

    await act(async () => {
      fireEvent.changeText(searchInput, 'Place');
    });

    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalledWith(manyPlaces.slice(0, 5));
    });
  });

  it('displays custom placeholder', () => {
    const customPlaceholder = 'Özel arama...';
    const { getByPlaceholderText } = render(
      <EnhancedSearchComponent
        onFilter={mockOnFilter}
        placeholder={customPlaceholder}
      />,
    );

    expect(getByPlaceholderText(customPlaceholder)).toBeTruthy();
  });

  it('handles autoFocus prop', () => {
    const { getByPlaceholderText } = render(
      <EnhancedSearchComponent onFilter={mockOnFilter} autoFocus={true} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya kategori arayın...',
    );
    expect(searchInput.props.autoFocus).toBe(true);
  });
});
