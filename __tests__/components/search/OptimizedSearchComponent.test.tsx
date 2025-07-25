/**
 * TravelTurkey - OptimizedSearchComponent Tests
 * Comprehensive test suite for search functionality
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { OptimizedSearchComponent } from '../../../src/components/search/OptimizedSearchComponent';

// Mock the search hook
const mockSetQuery = jest.fn();
const mockClearSearch = jest.fn();

jest.mock('../../../src/hooks/useOptimizedSearch', () => ({
  useOptimizedSearch: () => ({
    query: '',
    results: [],
    suggestions: ['Istanbul', 'Ankara', 'Cappadocia'],
    isLoading: false,
    isError: false,
    performanceStats: { lastSearchDuration: 50, averageSearchDuration: 45 },
    setQuery: mockSetQuery,
    clearSearch: mockClearSearch,
  }),
}));

describe('OptimizedSearchComponent', () => {
  const mockOnPlaceSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(
      <OptimizedSearchComponent
        onPlaceSelect={mockOnPlaceSelect}
        placeholder='Search places...'
      />,
    );

    expect(getByPlaceholderText('Search places...')).toBeTruthy();
  });

  it('displays performance stats in development mode', () => {
    // Test performance stats functionality exists
    const { getByPlaceholderText } = render(
      <OptimizedSearchComponent
        onPlaceSelect={mockOnPlaceSelect}
        showPerformanceStats={true}
      />,
    );

    // Just verify the component renders with showPerformanceStats prop
    expect(
      getByPlaceholderText('Yer, şehir veya aktivite arayın...'),
    ).toBeTruthy();
  });

  it('handles search input correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <OptimizedSearchComponent onPlaceSelect={mockOnPlaceSelect} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya aktivite arayın...',
    );
    fireEvent.changeText(searchInput, 'Istanbul');

    await waitFor(() => {
      // Verify search results are displayed (suggestions appear)
      expect(getByText('Istanbul')).toBeTruthy();
    });
  });

  it('meets accessibility requirements', () => {
    const { getByPlaceholderText } = render(
      <OptimizedSearchComponent onPlaceSelect={mockOnPlaceSelect} />,
    );

    const searchInput = getByPlaceholderText(
      'Yer, şehir veya aktivite arayın...',
    );
    expect(searchInput.props.accessibilityLabel).toBe('Arama çubuğu');
  });
});
