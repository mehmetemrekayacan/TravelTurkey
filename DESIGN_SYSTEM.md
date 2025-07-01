# TravelTurkey Design System

A comprehensive, Turkey-themed design system built for modern mobile applications with accessibility and cultural authenticity at its core.

## 🎨 Color Palette

Our color palette draws inspiration from Turkey's rich cultural heritage and natural beauty:

### Primary Colors
- **Turkish Red** (`#EF4444`) - Inspired by the Turkish flag
- **Bosphorus Blue** (`#3B82F6`) - The deep blue of Istanbul's straits
- **Aegean Turquoise** (`#14B8A6`) - Crystal waters of the Turkish coast

### Cultural Accent Colors
- **Cappadocia Orange** (`#F97316`) - Sunset hues over fairy chimneys
- **Golden Horn Gold** (`#F59E0B`) - Historic Istanbul's golden light
- **Anatolian Green** (`#22C55E`) - Fertile plains and olive groves

### Neutral Palette
Modern, accessible grays with excellent contrast ratios:
- Background: `#F8FAFC` (Stone 50)
- Surface: `#FFFFFF` (Pure White)
- Text: `#0F172A` (Slate 900)
- Secondary Text: `#64748B` (Slate 500)

## 📝 Typography

### Font Stack
1. **Primary**: Poppins - Modern, highly readable sans-serif
2. **Secondary**: Inter - Clean, optimized for UI components
3. **Accent**: Playfair Display - Elegant serif for special occasions
4. **Monospace**: JetBrains Mono - Technical content and code

### Type Scale (8-point grid system)
```
xs:   12px (Captions, helper text)
sm:   14px (Small text, secondary info)
base: 16px (Body text, default)
lg:   18px (Large body text)
xl:   20px (Section headers)
2xl:  24px (Page titles)
3xl:  28px (Hero titles)
4xl:  32px (Display titles)
5xl:  36px (Large displays)
6xl:  48px (Hero displays)
```

### Font Weights
- Light: 300
- Normal: 400
- Medium: 500
- Semi Bold: 600
- Bold: 700
- Extra Bold: 800

## 🏗️ Design Tokens

### Spacing (8-point grid)
```typescript
spacing: {
  xs: 4,    // 0.25rem
  sm: 8,    // 0.5rem  
  md: 16,   // 1rem (base)
  lg: 24,   // 1.5rem
  xl: 32,   // 2rem
  2xl: 48,  // 3rem
  3xl: 64,  // 4rem
}
```

### Border Radius
```typescript
borderRadius: {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  2xl: 24,
  full: 9999,
}
```

### Shadows
Elevation system for depth and hierarchy:
- **sm**: Subtle cards, buttons
- **base**: Default cards, modals
- **lg**: Important overlays, major sections
- **xl**: Hero sections, key focal points

## 🎯 Component System

### Pre-built Components
All components follow our design principles and include:
- Accessibility props (WCAG 2.1 AA compliant)
- Dark mode support
- Responsive behavior
- Touch target optimization (44px minimum)

#### Buttons
```typescript
// Primary button
<Button style={ComponentStyles.Button.primaryMedium}>
  <Text style={ComponentStyles.ButtonText.primaryText}>Explore Turkey</Text>
</Button>

// Secondary button
<Button style={ComponentStyles.Button.secondaryMedium}>
  <Text style={ComponentStyles.ButtonText.secondaryText}>Learn More</Text>
</Button>
```

#### Cards
```typescript
// Default card
<View style={ComponentStyles.Card.default}>
  <Text style={TextStyles.heading3}>Destination</Text>
  <Text style={TextStyles.bodyMedium}>Description</Text>
</View>

// Elevated card for important content
<View style={ComponentStyles.Card.elevated}>
  // Content
</View>
```

#### Typography
```typescript
// Heading
<Text style={TextStyles.heading1}>Welcome to Turkey</Text>

// Body text
<Text style={TextStyles.bodyMedium}>Discover amazing destinations</Text>

// Caption
<Text style={TextStyles.caption}>Last updated: Today</Text>
```

## ♿ Accessibility

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3.0:1 minimum contrast ratio
- UI components: 3.0:1 minimum contrast ratio

### Touch Targets
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Clear visual feedback for interactions

### Screen Reader Support
```typescript
// Button with accessibility
<Button 
  {...AccessibilityHelpers.button(
    'Explore Cappadocia',
    'Opens detailed information about Cappadocia region'
  )}
>
  <Text>Explore</Text>
</Button>

// Image with description
<Image 
  {...AccessibilityHelpers.image('Hot air balloons over Cappadocia at sunrise')}
  source={cappadociaImage}
/>
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Google Fonts (if using Expo)
expo install @expo-google-fonts/poppins @expo-google-fonts/inter

# Or for bare React Native
npm install react-native-vector-icons
npx react-native link
```

### 2. Import Design System
```typescript
import { 
  Theme, 
  TextStyles, 
  ComponentStyles,
  QuickStyles,
  AccessibilityHelpers 
} from '../styles';
```

### 3. Use Design Tokens
```typescript
// Quick styles for rapid development
const styles = StyleSheet.create({
  container: QuickStyles.container,
  card: QuickStyles.card,
  heading: QuickStyles.heading,
  body: QuickStyles.body,
});

// Or use the full theme system
const customStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.base,
  },
});
```

## 📱 Platform Support

### React Native
- iOS 11+
- Android API 21+
- Full accessibility support
- Performance optimized

### Expo
- SDK 45+
- Font loading handled automatically
- Easy deployment

### Web (React/Next.js)
- Modern browsers
- Progressive enhancement
- Font loading optimization

## 🌙 Dark Mode Support

The design system includes comprehensive dark mode support:

```typescript
// Colors automatically adapt
const backgroundColor = Theme.colors.neutral[50]; // Light mode
const darkBackgroundColor = Theme.colors.neutral[900]; // Dark mode

// Use semantic colors for automatic theming
const semanticBackground = Theme.colors.background; // Adapts to theme
```

## 🎨 Cultural Considerations

### Turkish Design Elements
- Colors inspired by Turkish landscapes and culture
- Typography optimized for Turkish language support
- Cultural symbols and patterns (planned for future releases)

### Localization Ready
- RTL support preparation
- Multi-language typography considerations
- Cultural color significance awareness

## 📊 Performance

### Optimizations
- Tree-shakeable exports
- Minimal bundle impact
- Cached style objects
- Optimized font loading

### Bundle Size
- Core theme: ~2KB gzipped
- Component styles: ~3KB gzipped
- Typography: ~1KB gzipped
- Total: ~6KB gzipped

## 🛠️ Development

### Adding New Components
1. Create component styles in `src/styles/components.ts`
2. Add accessibility helpers
3. Include in main exports
4. Update documentation

### Customization
```typescript
// Extend the theme
const customTheme = {
  ...Theme,
  colors: {
    ...Theme.colors,
    custom: {
      brand: '#your-color',
    },
  },
};
```

### Testing
- Accessibility testing with screen readers
- Color contrast validation
- Cross-platform testing
- Performance benchmarks

## 📚 Examples

### Complete Screen Example
```typescript
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { 
  ComponentStyles, 
  TextStyles, 
  QuickStyles,
  AccessibilityHelpers 
} from '../styles';

export const ExploreScreen = () => {
  return (
    <ScrollView style={QuickStyles.container}>
      {/* Header */}
      <View style={ComponentStyles.Header.container}>
        <Text style={ComponentStyles.Header.title}>
          Explore Turkey
        </Text>
      </View>

      {/* Content */}
      <View style={{ padding: 16 }}>
        <Text style={TextStyles.heading1}>
          Discover Amazing Places
        </Text>
        
        <Text style={TextStyles.bodyMedium}>
          From the fairy chimneys of Cappadocia to the blue waters 
          of the Mediterranean, Turkey offers unforgettable experiences.
        </Text>

        {/* Destination Card */}
        <View style={ComponentStyles.Card.default}>
          <Text style={TextStyles.heading3}>Cappadocia</Text>
          <Text style={TextStyles.bodySmall}>
            Famous for hot air balloons and unique rock formations
          </Text>
          
          <TouchableOpacity 
            style={ComponentStyles.Button.primaryMedium}
            {...AccessibilityHelpers.button(
              'Explore Cappadocia',
              'View detailed information about Cappadocia region'
            )}
          >
            <Text style={ComponentStyles.ButtonText.primaryText}>
              Explore
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
```

## 🔗 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Google Fonts](https://fonts.google.com/)
- [Turkish Cultural Colors](https://en.wikipedia.org/wiki/Flag_of_Turkey)

## 📄 License

MIT License - Feel free to use in your projects!

---

*Built with ❤️ for Turkish tourism and cultural appreciation*
