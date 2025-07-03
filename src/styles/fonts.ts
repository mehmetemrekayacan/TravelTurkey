/**
 * TravelTurkey App - Font Configuration
 * Google Fonts setup for React Native
 */

// Google Fonts Configuration
export const GoogleFonts = {
  // Primary font family - Poppins (Modern, clean, highly readable)
  poppins: {
    weights: ['300', '400', '500', '600', '700', '800'],
    variants: [
      'Poppins-Light', // 300
      'Poppins-Regular', // 400
      'Poppins-Medium', // 500
      'Poppins-SemiBold', // 600
      'Poppins-Bold', // 700
      'Poppins-ExtraBold', // 800
    ],
    fallbacks: {
      ios: 'System',
      android: 'Roboto',
      web: 'system-ui, -apple-system, sans-serif',
    },
  },

  // Secondary font family - Inter (Technical, clean, optimized for UI)
  inter: {
    weights: ['300', '400', '500', '600', '700'],
    variants: [
      'Inter-Light', // 300
      'Inter-Regular', // 400
      'Inter-Medium', // 500
      'Inter-SemiBold', // 600
      'Inter-Bold', // 700
    ],
    fallbacks: {
      ios: 'System',
      android: 'Roboto',
      web: 'system-ui, -apple-system, sans-serif',
    },
  },

  // Accent font family - Playfair Display (Elegant serif for special occasions)
  playfairDisplay: {
    weights: ['400', '500', '600', '700'],
    variants: [
      'PlayfairDisplay-Regular', // 400
      'PlayfairDisplay-Medium', // 500
      'PlayfairDisplay-SemiBold', // 600
      'PlayfairDisplay-Bold', // 700
    ],
    fallbacks: {
      ios: 'Georgia',
      android: 'serif',
      web: 'Georgia, serif',
    },
  },

  // Monospace font family - JetBrains Mono (Code, technical content)
  jetBrainsMono: {
    weights: ['400', '500', '600', '700'],
    variants: [
      'JetBrainsMono-Regular', // 400
      'JetBrainsMono-Medium', // 500
      'JetBrainsMono-SemiBold', // 600
      'JetBrainsMono-Bold', // 700
    ],
    fallbacks: {
      ios: 'Menlo',
      android: 'monospace',
      web: 'Menlo, Monaco, "Courier New", monospace',
    },
  },
};

// Font loading instructions for different platforms
export const FontLoadingInstructions = {
  reactNative: {
    // Instructions for react-native.config.js
    config: `
// react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
    `,

    // Font files to add to assets/fonts/
    requiredFiles: [
      // Poppins
      'Poppins-Light.ttf',
      'Poppins-Regular.ttf',
      'Poppins-Medium.ttf',
      'Poppins-SemiBold.ttf',
      'Poppins-Bold.ttf',
      'Poppins-ExtraBold.ttf',

      // Inter
      'Inter-Light.ttf',
      'Inter-Regular.ttf',
      'Inter-Medium.ttf',
      'Inter-SemiBold.ttf',
      'Inter-Bold.ttf',

      // Playfair Display
      'PlayfairDisplay-Regular.ttf',
      'PlayfairDisplay-Medium.ttf',
      'PlayfairDisplay-SemiBold.ttf',
      'PlayfairDisplay-Bold.ttf',

      // JetBrains Mono
      'JetBrainsMono-Regular.ttf',
      'JetBrainsMono-Medium.ttf',
      'JetBrainsMono-SemiBold.ttf',
      'JetBrainsMono-Bold.ttf',
    ],

    // Installation commands
    installCommands: [
      'npx react-native link',
      // or for newer versions
      'npx react-native-asset',
    ],
  },

  expo: {
    // For Expo projects
    config: `
// app.json or app.config.js
{
  "expo": {
    "font": {
      "Poppins-Regular": "./assets/fonts/Poppins-Regular.ttf",
      "Poppins-Medium": "./assets/fonts/Poppins-Medium.ttf",
      "Poppins-SemiBold": "./assets/fonts/Poppins-SemiBold.ttf",
      "Poppins-Bold": "./assets/fonts/Poppins-Bold.ttf",
      "Inter-Regular": "./assets/fonts/Inter-Regular.ttf",
      "Inter-Medium": "./assets/fonts/Inter-Medium.ttf",
      "Inter-SemiBold": "./assets/fonts/Inter-SemiBold.ttf"
    }
  }
}
    `,

    installCommands: [
      'expo install expo-font',
      'expo install @expo-google-fonts/poppins',
      'expo install @expo-google-fonts/inter',
      'expo install @expo-google-fonts/playfair-display',
    ],
  },

  web: {
    // For web (Next.js, React)
    googleFontsImport: `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    `,

    nextjsConfig: `
// next.config.js
module.exports = {
  optimizeFonts: true,
}
    `,
  },
};

// Font utility functions
export const FontUtils = {
  // Get font family with fallbacks
  getFontFamily: (
    primary: keyof typeof GoogleFonts,
    platform: 'ios' | 'android' | 'web' = 'ios',
  ): string => {
    const font = GoogleFonts[primary];
    if (!font) return 'System';

    return font.fallbacks[platform];
  },

  // Get font weight for specific font
  getFontWeight: (weight: string): string => {
    const weightMap: { [key: string]: string } = {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    };

    return weightMap[weight.toLowerCase()] || '400';
  },

  // Check if font is loaded (React Native always returns true - fonts are bundled)
  isFontLoaded: (_fontFamily: string): boolean => {
    // In React Native, fonts are bundled with the app, so they're always "loaded"
    return true;
  },

  // Load font dynamically (React Native always returns true - fonts are pre-bundled)
  loadFont: async (
    _fontFamily: string,
    _weight: string = '400',
  ): Promise<boolean> => {
    // In React Native, fonts are bundled with the app, no dynamic loading needed
    return Promise.resolve(true);
  },
};

// Platform-specific font names
export const PlatformFonts = {
  ios: {
    primary: 'Poppins',
    secondary: 'Inter',
    accent: 'PlayfairDisplay',
    mono: 'JetBrainsMono',
  },
  android: {
    primary: 'Poppins',
    secondary: 'Inter',
    accent: 'PlayfairDisplay',
    mono: 'JetBrainsMono',
  },
  web: {
    primary: 'Poppins, system-ui, -apple-system, sans-serif',
    secondary: 'Inter, system-ui, -apple-system, sans-serif',
    accent: 'Playfair Display, Georgia, serif',
    mono: 'JetBrains Mono, Menlo, Monaco, "Courier New", monospace',
  },
};

// Export default configuration
export default {
  GoogleFonts,
  FontLoadingInstructions,
  FontUtils,
  PlatformFonts,
};
