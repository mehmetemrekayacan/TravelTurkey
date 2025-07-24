import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { IconProps, IconName } from './Icon.types';
import { styles, getSizeStyles, getDefaultColor } from './Icon.styles';

/**
 * Turkish Tourism Icon Mappings
 * Emoji-based icons for tourism categories and common UI elements
 */
const IconMappings: Record<IconName, string> = {
  // Tourism categories
  mosque: '🕌',
  beach: '🏖️',
  mountain: '🏔️',
  historical: '🏛️',
  food: '🍽️',
  hotel: '🏨',
  transport: '🚌',
  culture: '🎭',
  nature: '🌿',
  shopping: '🛍️',
  nightlife: '🌃',
  spa: '🧘',

  // Common UI icons
  search: '🔍',
  heart: '❤️',
  share: '📤',
  location: '📍',
  calendar: '📅',
  star: '⭐',
  
  // Navigation
  'arrow-right': '→',
  'arrow-left': '←',
  'arrow-up': '↑',
  'arrow-down': '↓',
  
  // Interface
  close: '✕',
  menu: '☰',
  home: '🏠',
  profile: '👤',
  settings: '⚙️',
  
  // Media
  camera: '📷',
  gallery: '🖼️',
  
  // Contact
  phone: '📞',
  email: '📧',
  website: '🌐',
  
  // Status
  info: 'ℹ️',
  warning: '⚠️',
  success: '✅',
  error: '❌',
};

/**
 * Modern Icon Component
 * 
 * A flexible icon component using emoji-based icons for Turkish tourism app.
 * Includes tourism-specific icons and common UI elements.
 * 
 * Features:
 * - Tourism-specific icon set (mosque, beach, mountain, etc.)
 * - Multiple sizes (xs, sm, md, lg, xl) or custom size
 * - Customizable colors
 * - Interactive support (onPress)
 * - Accessibility compliant
 * - Lightweight (emoji-based, no external fonts needed)
 * 
 * @example
 * ```tsx
 * <Icon 
 *   name="mosque" 
 *   size="lg" 
 *   color="#DC2626" 
 *   onPress={() => console.log('Mosque icon pressed')}
 * />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  style,
  onPress,
  accessibilityLabel,
  testID,
}) => {
  const sizeStyles = getSizeStyles(size);
  const iconColor = color || getDefaultColor();
  
  const combinedStyles = [
    styles.icon,
    sizeStyles,
    { color: iconColor },
    onPress && styles.interactive,
    style,
  ];

  const iconContent = IconMappings[name] || '❓'; // Fallback to question mark

  // Get accessibility label
  const getAccessibilityLabel = () => {
    if (accessibilityLabel) return accessibilityLabel;
    
    // Generate accessibility labels for common icons
    const labels: Partial<Record<IconName, string>> = {
      mosque: 'Cami',
      beach: 'Plaj',
      mountain: 'Dağ',
      historical: 'Tarihi yer',
      food: 'Yemek',
      hotel: 'Otel',
      transport: 'Ulaşım',
      culture: 'Kültür',
      nature: 'Doğa',
      shopping: 'Alışveriş',
      nightlife: 'Gece hayatı',
      spa: 'Spa',
      search: 'Ara',
      heart: 'Beğen',
      share: 'Paylaş',
      location: 'Konum',
      calendar: 'Takvim',
      star: 'Yıldız',
      'arrow-right': 'Sağa git',
      'arrow-left': 'Sola git',
      'arrow-up': 'Yukarı git',
      'arrow-down': 'Aşağı git',
      close: 'Kapat',
      menu: 'Menü',
      home: 'Ana sayfa',
      profile: 'Profil',
      settings: 'Ayarlar',
      camera: 'Kamera',
      gallery: 'Galeri',
      phone: 'Telefon',
      email: 'E-posta',
      website: 'Web sitesi',
      info: 'Bilgi',
      warning: 'Uyarı',
      success: 'Başarılı',
      error: 'Hata',
    };
    
    return labels[name] || name;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={getAccessibilityLabel()}
        testID={testID}
      >
        <Text style={combinedStyles}>
          {iconContent}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text
      style={combinedStyles}
      accessible={true}
      accessibilityLabel={getAccessibilityLabel()}
      testID={testID}
    >
      {iconContent}
    </Text>
  );
};

export default Icon;