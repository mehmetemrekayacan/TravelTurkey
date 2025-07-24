# TravelTurkey Logo Assets

This directory contains the logo assets for the TravelTurkey mobile application, featuring modern, professional design with Turkish cultural elements inspired by the official tourism branding.

## Logo Variations

### 1. Horizontal Logo (`logo-horizontal.svg`)

- **Dimensions**: 400×100px
- **Use case**: App headers, splash screens, wide layouts
- **Features**: Circular red emblem with white tulip, "Travel" in dark gray, "Turkey" in red

### 2. Vertical Logo (`logo-vertical.svg`)

- **Dimensions**: 180×140px
- **Use case**: Square layouts, profile sections, narrow spaces
- **Features**: Stacked text with centered circular emblem

### 3. Icon Only (`logo-icon-only.svg`)

- **Dimensions**: 100×100px
- **Use case**: App icons, favicons, small UI elements, loading states
- **Features**: Standalone circular emblem with white tulip and golden crescent

### 4. App Icon (`app-icon.svg`)

- **Dimensions**: 1024×1024px
- **Use case**: Mobile app store icons, device home screen
- **Features**: High-resolution version with enhanced shadows and decorative elements

## Design Elements

### Cultural Symbols

- **Tulip**: Stylized Turkish tulip as the main icon
- **Crescent Moon**: Traditional Turkish symbol as accent
- **Geometric Patterns**: Islamic-inspired decorative elements

### Color Palette

- **Turkish Red**: `#DC2626` - Primary brand color
- **Bosphorus Blue**: `#1E3A8A` - Secondary brand color
- **Golden Accent**: `#F59E0B` - Highlight color
- **Gradients**: Used for modern visual appeal

### Typography

- **Font**: Arial/sans-serif for cross-platform compatibility
- **Weight**: Bold (700) for "Travel", Regular (400) for "Turkey"
- **Color**: Gradient from blue to red for visual interest

## Usage in React Native

### Installation

First, install the required dependency:

```bash
npm install react-native-svg
```

### Basic Usage

```tsx
import TravelTurkeyLogo from '@/components/common/TravelTurkeyLogo';

// Horizontal logo (default)
<TravelTurkeyLogo />

// Vertical logo
<TravelTurkeyLogo variant="vertical" />

// Icon only
<TravelTurkeyLogo variant="icon" size="large" />

// Custom size
<TravelTurkeyLogo width={200} height={50} />
```

### Props

- `variant`: 'horizontal' | 'vertical' | 'icon' | 'iconOnly'
- `size`: 'small' | 'medium' | 'large' | 'xlarge'
- `width`: Custom width (overrides size)
- `height`: Custom height (overrides size)
- `style`: Additional styles

### Size Reference

| Size   | Horizontal | Vertical | Icon    |
| ------ | ---------- | -------- | ------- |
| small  | 120×30     | 80×60    | 40×40   |
| medium | 160×40     | 120×90   | 60×60   |
| large  | 240×60     | 160×120  | 80×80   |
| xlarge | 320×80     | 200×150  | 100×100 |

## File Formats

All logos are provided in **SVG format** for:

- **Scalability**: Vector graphics scale without quality loss
- **Small file size**: Efficient for mobile applications
- **Crisp rendering**: Perfect at any resolution
- **Easy styling**: Can be modified programmatically

## Brand Guidelines

### Minimum Size

- Horizontal: 120px wide minimum
- Vertical: 80px wide minimum
- Icon: 24px minimum

### Clear Space

Maintain clear space around logo equal to the height of the "T" in "Travel"

### Background Usage

- Works on white and light backgrounds
- Use monochrome version on busy backgrounds
- Ensure sufficient contrast

### Don'ts

- Don't stretch or distort proportions
- Don't change colors outside brand palette
- Don't add drop shadows or effects
- Don't use on backgrounds that conflict with brand colors

## Technical Specifications

- **Format**: SVG (Scalable Vector Graphics)
- **Color mode**: RGB
- **Compatibility**: React Native SVG, Web browsers, Design tools
- **Optimization**: Cleaned and optimized for production use

## Implementation Notes

1. The React Native component uses `react-native-svg` for rendering
2. All gradients and effects are preserved in SVG format
3. Component is TypeScript-ready with proper prop types
4. Responsive sizing system included
5. Style prop support for custom positioning

## File Structure

```
src/assets/logos/
├── logo-horizontal.svg
├── logo-vertical.svg
├── logo-icon-only.svg
├── logo-horizontal-mono.svg
└── app-icon.svg

src/components/common/
├── TravelTurkeyLogo.tsx
└── SplashScreen.tsx
```

## Usage in App

### Current Implementation

The TravelTurkey logos are currently integrated in the following screens:

1. **Splash Screen** (`SplashScreen.tsx`)

   - Shows vertical logo with animation on app startup
   - Uses `variant="vertical"` and `size="xlarge"`

2. **Home Screen** (`HomeScreen.tsx`)

   - Header section displays horizontal logo
   - Uses `variant="horizontal"` and `size="small"`

3. **Login Screen** (`LoginScreen.tsx`)

   - Welcome section with vertical logo
   - Uses `variant="vertical"` and `size="large"`

4. **Onboarding Screen** (`OnboardingScreen.tsx`)
   - Hero section with large vertical logo
   - Uses `variant="vertical"` and `size="xlarge"`

### Integration Examples

```tsx
// Splash Screen
<TravelTurkeyLogo variant="vertical" size="xlarge" />

// Home Screen Header
<TravelTurkeyLogo variant="horizontal" size="small" />

// Login/Onboarding
<TravelTurkeyLogo variant="vertical" size="large" />

// Small UI elements
<TravelTurkeyLogo variant="icon" size="medium" />
```
