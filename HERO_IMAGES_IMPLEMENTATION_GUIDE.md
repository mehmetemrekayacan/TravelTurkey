# Hero Images Implementation Guide

## Overview

High-quality cinematic hero images have been created for the TravelTurkey app carousel featuring Turkey's most iconic destinations. All images are optimized for mobile display with 16:9 aspect ratio and professional photography aesthetics.

## Image Details

### 1. Hagia Sophia at Golden Hour

- **File**: `src/assets/images/hero/hagia-sophia-golden-hour.jpg`
- **Location**: Istanbul, Turkey
- **Style**: Dramatic golden hour lighting with warm tones
- **Gradient**: Orange to red (`#D97706` to `#DC2626`)
- **Features**: Byzantine and Ottoman architectural fusion

### 2. Cappadocia Hot Air Balloons at Sunrise

- **File**: `src/assets/images/hero/cappadocia-balloons-sunrise.jpg`
- **Location**: Cappadocia, Turkey
- **Style**: Ethereal sunrise with colorful balloons over fairy chimneys
- **Gradient**: Amber to orange (`#F59E0B` to `#EA580C`)
- **Features**: Iconic balloon flights and unique rock formations

### 3. Pamukkale White Travertines

- **File**: `src/assets/images/hero/pamukkale-travertines.jpg`
- **Location**: Pamukkale, Turkey
- **Style**: Pristine white terraces with turquoise thermal pools
- **Gradient**: Sky blue to light blue (`#0EA5E9` to `#7DD3FC`)
- **Features**: Natural calcium carbonate terraces

### 4. Bosphorus Bridge at Sunset

- **File**: `src/assets/images/hero/bosphorus-bridge-sunset.jpg`
- **Location**: Istanbul, Turkey
- **Style**: Majestic sunset over the iconic bridge and city skyline
- **Gradient**: Purple to pink (`#7C3AED` to `#EC4899`)
- **Features**: Connecting Europe and Asia

### 5. Antalya Mediterranean Coastline

- **File**: `src/assets/images/hero/antalya-coastline.jpg`
- **Location**: Antalya, Turkey
- **Style**: Crystal clear Mediterranean waters with dramatic coastline
- **Gradient**: Green to blue (`#059669` to `#0891B2`)
- **Features**: Turquoise coast and pristine beaches

## Technical Implementation

### File Structure

```
src/
  assets/
    images/
      hero/
        ├── hagia-sophia-golden-hour.jpg
        ├── cappadocia-balloons-sunrise.jpg
        ├── pamukkale-travertines.jpg
        ├── bosphorus-bridge-sunset.jpg
        └── antalya-coastline.jpg
```

### Configuration

Updated `src/assets/ai-generated/assets-config.ts` to reference local image files instead of external URLs.

### Carousel Integration

The `HeroCarousel` component now displays all 5 hero images with:

- Auto-sliding every 4 seconds
- Smooth animations and transitions
- Responsive design for all screen sizes
- Gradient overlays for text readability

## Features

- **Cinematic Quality**: Professional photography aesthetics
- **Optimized Performance**: Compressed for mobile without quality loss
- **Consistent Branding**: Cohesive color palette across all images
- **Cultural Representation**: Showcases Turkey's diverse attractions
- **Technical Excellence**: 16:9 aspect ratio, no text overlays

## Usage

The hero carousel automatically cycles through all 5 images, providing users with an engaging visual introduction to Turkey's top destinations. Each image is clickable and can navigate to relevant sections of the app.

## Next Steps

- Consider implementing lazy loading for better performance
- Add accessibility descriptions for each image
- Implement gesture controls for manual navigation
- Add loading states and error handling
