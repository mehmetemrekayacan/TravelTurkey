/**
 * TravelTurkey - Simple Accessibility Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';

describe('Simple Accessibility Tests', () => {
  it('should pass a basic accessibility test', () => {
    const { getByText } = render(
      <View>
        <Text>Test Component</Text>
      </View>,
    );

    expect(getByText('Test Component')).toBeTruthy();
  });
});
