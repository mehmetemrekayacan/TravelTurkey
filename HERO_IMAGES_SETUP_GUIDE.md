# 🖼️ Hero Images Setup Guide

## ⚠️ Issue Resolved

The original image files were corrupted due to base64 encoding limitations. The app now uses high-quality Unsplash URLs temporarily while you obtain proper images.

## 🎯 Requirements for Hero Images

### Technical Specifications

- **Format**: JPG or PNG
- **Aspect Ratio**: 16:9 (1200x675px recommended)
- **Quality**: High resolution, optimized for mobile
- **File Size**: 200KB - 800KB per image
- **No Text Overlays**: Clean images for overlay text

### Image Subjects Needed

1. **Hagia Sophia** - Golden hour lighting, dramatic angles
2. **Cappadocia** - Hot air balloons at sunrise with fairy chimneys
3. **Pamukkale** - White travertine terraces with turquoise pools
4. **Bosphorus Bridge** - Sunset view with Istanbul skyline
5. **Antalya Coast** - Crystal clear Mediterranean waters

## 🔄 Implementation Options

### Option 1: AI Image Generation Services

Use professional AI tools to generate custom images:

```bash
# Services to consider:
- Midjourney (Discord-based)
- DALL-E 3 (OpenAI)
- Stable Diffusion (Local/Online)
- Adobe Firefly
```

**Prompts for AI Generation:**

```
1. "Hagia Sophia Istanbul at golden hour, dramatic cinematic lighting, 16:9 aspect ratio, professional photography, no text"

2. "Cappadocia hot air balloons sunrise, fairy chimneys, colorful balloons in sky, cinematic, 16:9, professional photography"

3. "Pamukkale white travertine terraces, turquoise thermal pools, aerial view, cinematic lighting, 16:9"

4. "Bosphorus Bridge Istanbul sunset, city skyline silhouette, dramatic colors, cinematic, 16:9"

5. "Antalya Mediterranean coastline, crystal clear turquoise water, dramatic cliffs, cinematic, 16:9"
```

### Option 2: Stock Photography

Purchase from premium stock sites:

- **Shutterstock** - Professional Turkish landmark photos
- **Getty Images** - High-quality travel photography
- **Adobe Stock** - Diverse Turkish tourism images
- **Unsplash** - Free high-quality photos (current temporary solution)

### Option 3: Professional Photography

Commission custom photography for unique branding.

## 📁 File Placement

Once you have proper images, place them in:

```
src/assets/images/hero/
├── hagia-sophia-golden-hour.jpg
├── cappadocia-balloons-sunrise.jpg
├── pamukkale-travertines.jpg
├── bosphorus-bridge-sunset.jpg
└── antalya-coastline.jpg
```

## 🔧 Code Update Required

After adding local images, update `src/assets/ai-generated/assets-config.ts`:

```typescript
export const AI_GENERATED_ASSETS = {
  heroImages: {
    hagiaSophia: {
      uri: require('../images/hero/hagia-sophia-golden-hour.jpg'),
      title: 'Ayasofya',
      subtitle: 'Bizans ve Osmanlı mimarisinin eşsiz buluşması',
      gradient: ['#D97706', '#DC2626'],
    },
    // ... repeat for other images
  },
  // ... rest of config
};
```

## 🚀 Current Status

✅ **Working Solution**: App uses high-quality Unsplash images temporarily
✅ **All 5 Hero Slides**: Carousel displays all Turkish landmarks
✅ **Proper Gradients**: Color overlays for text readability
✅ **Turkish Titles**: Localized titles and subtitles
✅ **Auto-sliding**: 4-second intervals with smooth transitions

## 🎨 Image Style Guidelines

- **Lighting**: Golden hour, blue hour, dramatic natural lighting
- **Composition**: Rule of thirds, leading lines, dynamic angles
- **Colors**: Vibrant but natural, high contrast
- **Mood**: Inspiring, wanderlust-inducing, professional
- **Quality**: Sharp, well-exposed, professional grade

## 📱 Testing

After implementing new images:

1. Test on various screen sizes
2. Check loading performance
3. Verify image quality on high-DPI screens
4. Test carousel functionality
5. Validate accessibility features

## 🔄 Next Steps

1. **Immediate**: App works with current Unsplash URLs
2. **Short-term**: Generate/source proper hero images
3. **Long-term**: Consider implementing image optimization and caching

Your app is now functional with beautiful placeholder images while you source the perfect hero images for your Turkish tourism app!
