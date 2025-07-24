import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Logo SVG strings - you can import these from separate files if preferred
const LOGO_HORIZONTAL = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
  <defs>
    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E53E3E"/>
      <stop offset="100%" style="stop-color:#C53030"/>
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F6E05E"/>
      <stop offset="50%" style="stop-color:#ECC94B"/>
      <stop offset="100%" style="stop-color:#D69E2E"/>
    </linearGradient>
  </defs>
  
  <!-- Circular background -->
  <circle cx="50" cy="50" r="45" fill="url(#redGradient)" />
  
  <!-- Turkish tulip/lale design -->
  <g transform="translate(25, 20)">
    <!-- Main tulip petals -->
    <path d="M25 55 C20 40, 15 30, 20 20 C25 25, 25 35, 25 45 Z" fill="#FFFFFF"/>
    <path d="M25 55 C30 40, 35 30, 30 20 C25 25, 25 35, 25 45 Z" fill="#FFFFFF"/>
    <path d="M25 45 C22 35, 18 28, 22 22 C24 26, 25 32, 25 45 Z" fill="#FFFFFF" opacity="0.8"/>
    <path d="M25 45 C28 35, 32 28, 28 22 C26 26, 25 32, 25 45 Z" fill="#FFFFFF" opacity="0.8"/>
    
    <!-- Central detail -->
    <ellipse cx="25" cy="35" rx="3" ry="12" fill="#FFFFFF" opacity="0.6"/>
    
    <!-- Stem -->
    <rect x="24" y="45" width="2" height="8" fill="#FFFFFF" opacity="0.9"/>
  </g>
  
  <!-- Crescent moon -->
  <g transform="translate(15, 15)">
    <path d="M15 25 C12 20, 12 15, 15 10 C13 15, 13 20, 15 25 Z" fill="url(#goldGradient)"/>
    <circle cx="17" cy="12" r="2" fill="url(#goldGradient)"/>
  </g>
  
  <!-- Text -->
  <text x="110" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#2D3748">Travel</text>
  <text x="250" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#E53E3E">Turkey</text>
</svg>`;

const LOGO_VERTICAL = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140" width="180" height="140">
  <defs>
    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E53E3E"/>
      <stop offset="100%" style="stop-color:#C53030"/>
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F6E05E"/>
      <stop offset="50%" style="stop-color:#ECC94B"/>
      <stop offset="100%" style="stop-color:#D69E2E"/>
    </linearGradient>
  </defs>
  
  <!-- Circular background -->
  <circle cx="90" cy="45" r="40" fill="url(#redGradient)" />
  
  <!-- Turkish tulip/lale design -->
  <g transform="translate(70, 15)">
    <!-- Main tulip petals -->
    <path d="M20 50 C16 35, 12 25, 16 15 C20 20, 20 30, 20 40 Z" fill="#FFFFFF"/>
    <path d="M20 50 C24 35, 28 25, 24 15 C20 20, 20 30, 20 40 Z" fill="#FFFFFF"/>
    <path d="M20 40 C18 30, 15 23, 18 17 C19 21, 20 27, 20 40 Z" fill="#FFFFFF" opacity="0.8"/>
    <path d="M20 40 C22 30, 25 23, 22 17 C21 21, 20 27, 20 40 Z" fill="#FFFFFF" opacity="0.8"/>
    
    <!-- Central detail -->
    <ellipse cx="20" cy="30" rx="2.5" ry="10" fill="#FFFFFF" opacity="0.6"/>
    
    <!-- Stem -->
    <rect x="19.5" y="40" width="1.5" height="7" fill="#FFFFFF" opacity="0.9"/>
  </g>
  
  <!-- Crescent moon -->
  <g transform="translate(60, 10)">
    <path d="M12 20 C10 16, 10 12, 12 8 C11 12, 11 16, 12 20 Z" fill="url(#goldGradient)"/>
    <circle cx="13.5" cy="10" r="1.5" fill="url(#goldGradient)"/>
  </g>
  
  <!-- Text -->
  <text x="90" y="105" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#2D3748" text-anchor="middle">Travel</text>
  <text x="90" y="125" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#E53E3E" text-anchor="middle">Turkey</text>
</svg>`;

const LOGO_ICON_ONLY = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E53E3E"/>
      <stop offset="100%" style="stop-color:#C53030"/>
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F6E05E"/>
      <stop offset="50%" style="stop-color:#ECC94B"/>
      <stop offset="100%" style="stop-color:#D69E2E"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Circular background with shadow -->
  <circle cx="50" cy="50" r="45" fill="url(#redGradient)" filter="url(#shadow)" />
  
  <!-- Turkish tulip/lale design -->
  <g transform="translate(30, 20)">
    <!-- Main tulip petals -->
    <path d="M20 50 C16 35, 12 25, 16 15 C20 20, 20 30, 20 40 Z" fill="#FFFFFF"/>
    <path d="M20 50 C24 35, 28 25, 24 15 C20 20, 20 30, 20 40 Z" fill="#FFFFFF"/>
    <path d="M20 40 C18 30, 15 23, 18 17 C19 21, 20 27, 20 40 Z" fill="#FFFFFF" opacity="0.8"/>
    <path d="M20 40 C22 30, 25 23, 22 17 C21 21, 20 27, 20 40 Z" fill="#FFFFFF" opacity="0.8"/>
    
    <!-- Central detail -->
    <ellipse cx="20" cy="30" rx="2.5" ry="10" fill="#FFFFFF" opacity="0.6"/>
    
    <!-- Stem -->
    <rect x="19.5" y="40" width="1.5" height="10" fill="#FFFFFF" opacity="0.9"/>
  </g>
  
  <!-- Crescent moon -->
  <g transform="translate(20, 15)">
    <path d="M12 20 C10 16, 10 12, 12 8 C11 12, 11 16, 12 20 Z" fill="url(#goldGradient)"/>
    <circle cx="13.5" cy="10" r="1.5" fill="url(#goldGradient)"/>
  </g>
  
  <!-- Optional decorative stars -->
  <g transform="translate(70, 25)">
    <polygon points="5,0 6,3 10,3 7,5 8,9 5,7 2,9 3,5 0,3 4,3" fill="url(#goldGradient)" opacity="0.7"/>
  </g>
</svg>`;

export type LogoVariant = 'horizontal' | 'vertical' | 'icon' | 'iconOnly';
export type LogoSize = 'small' | 'medium' | 'large' | 'xlarge';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  style?: any;
  width?: number;
  height?: number;
}

const sizeMap = {
  small: {
    horizontal: { width: 150, height: 38 },
    vertical: { width: 90, height: 70 },
    icon: { width: 50, height: 50 },
  },
  medium: {
    horizontal: { width: 200, height: 50 },
    vertical: { width: 135, height: 105 },
    icon: { width: 75, height: 75 },
  },
  large: {
    horizontal: { width: 300, height: 75 },
    vertical: { width: 180, height: 140 },
    icon: { width: 100, height: 100 },
  },
  xlarge: {
    horizontal: { width: 400, height: 100 },
    vertical: { width: 225, height: 175 },
    icon: { width: 125, height: 125 },
  },
};

export const TravelTurkeyLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'medium',
  style,
  width,
  height,
}) => {
  const getLogoSvg = () => {
    switch (variant) {
      case 'vertical':
        return LOGO_VERTICAL;
      case 'icon':
      case 'iconOnly':
        return LOGO_ICON_ONLY;
      default:
        return LOGO_HORIZONTAL;
    }
  };

  const getDimensions = () => {
    if (width && height) {
      return { width, height };
    }

    const variantKey = variant === 'iconOnly' ? 'icon' : variant;
    return sizeMap[size][variantKey as keyof (typeof sizeMap)[typeof size]];
  };

  const dimensions = getDimensions();

  return (
    <View style={[styles.container, style]}>
      <SvgXml
        xml={getLogoSvg()}
        width={dimensions.width}
        height={dimensions.height}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TravelTurkeyLogo;
