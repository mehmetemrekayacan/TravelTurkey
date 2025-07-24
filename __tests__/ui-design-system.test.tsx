import React from 'react';
import { render } from '@testing-library/react-native';
import { Button, Card, Input, Icon, Typography } from '../src/components/ui';

describe('UI Design System Components', () => {
  describe('Button Component', () => {
    it('renders correctly with default props', () => {
      const { getByText } = render(
        <Button title="Test Button" />
      );
      
      expect(getByText('Test Button')).toBeTruthy();
    });

    it('renders with different variants', () => {
      const { getByText } = render(
        <Button title="Primary Button" variant="primary" />
      );
      
      expect(getByText('Primary Button')).toBeTruthy();
    });

    it('renders with icon', () => {
      const { getByText } = render(
        <Button title="Button with Icon" icon="🔍" />
      );
      
      expect(getByText('Button with Icon')).toBeTruthy();
      expect(getByText('🔍')).toBeTruthy();
    });
  });

  describe('Input Component', () => {
    it('renders correctly with default props', () => {
      const { getByDisplayValue } = render(
        <Input value="test value" onChangeText={() => {}} />
      );
      
      expect(getByDisplayValue('test value')).toBeTruthy();
    });

    it('renders with placeholder', () => {
      const { getByPlaceholderText } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          placeholder="Enter text"
        />
      );
      
      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });
  });

  describe('Card Component', () => {
    it('renders correctly with children', () => {
      const { getByText } = render(
        <Card>
          <Typography>Card Content</Typography>
        </Card>
      );
      
      expect(getByText('Card Content')).toBeTruthy();
    });

    it('renders with badge', () => {
      const { getByText } = render(
        <Card 
          badge="Featured"
          imageSource={{ uri: 'https://example.com/image.jpg' }}
        >
          <Typography>Card with Badge</Typography>
        </Card>
      );
      
      expect(getByText('Featured')).toBeTruthy();
      expect(getByText('Card with Badge')).toBeTruthy();
    });
  });

  describe('Icon Component', () => {
    it('renders correctly with icon name', () => {
      const { getByText } = render(
        <Icon name="mosque" />
      );
      
      expect(getByText('🕌')).toBeTruthy();
    });

    it('renders tourism icons correctly', () => {
      const { getByText: getByTextBeach } = render(
        <Icon name="beach" />
      );
      const { getByText: getByTextMountain } = render(
        <Icon name="mountain" />
      );
      
      expect(getByTextBeach('🏖️')).toBeTruthy();
      expect(getByTextMountain('🏔️')).toBeTruthy();
    });
  });

  describe('Typography Component', () => {
    it('renders text correctly', () => {
      const { getByText } = render(
        <Typography>Test Typography</Typography>
      );
      
      expect(getByText('Test Typography')).toBeTruthy();
    });

    it('renders with different variants', () => {
      const { getByText } = render(
        <Typography variant="heading1">Heading Text</Typography>
      );
      
      expect(getByText('Heading Text')).toBeTruthy();
    });
  });
});

describe('Design Tokens', () => {
  it('should have proper color tokens structure', () => {
    const { ColorTokens } = require('../src/styles/tokens/colors');
    
    expect(ColorTokens.primary).toBeDefined();
    expect(ColorTokens.secondary).toBeDefined();
    expect(ColorTokens.accent).toBeDefined();
    expect(ColorTokens.neutral).toBeDefined();
    expect(ColorTokens.semantic).toBeDefined();
  });

  it('should have proper typography tokens structure', () => {
    const { TypographyTokens } = require('../src/styles/tokens/typography');
    
    expect(TypographyTokens.fontFamily).toBeDefined();
    expect(TypographyTokens.fontSize).toBeDefined();
    expect(TypographyTokens.fontWeight).toBeDefined();
    expect(TypographyTokens.lineHeight).toBeDefined();
  });

  it('should have proper spacing tokens', () => {
    const { SpacingTokens } = require('../src/styles/tokens/spacing');
    
    expect(SpacingTokens.xs).toBe(4);
    expect(SpacingTokens.sm).toBe(8);
    expect(SpacingTokens.md).toBe(16);
    expect(SpacingTokens.lg).toBe(24);
    expect(SpacingTokens.xl).toBe(32);
  });
});