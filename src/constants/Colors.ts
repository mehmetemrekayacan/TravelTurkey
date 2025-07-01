/**
 * TravelTurkey App - Color Palette
 * Türkiye temalı modern renk paleti
 */

export const Colors = {
  // Ana Renkler (Primary)
  primary: {
    blue: '#1E3A8A', // Ana mavi - Türk bayrağı
    blueLight: '#3B82F6', // Açık mavi
    red: '#DC2626', // Türk kırmızısı
    redAccent: '#EF4444', // Açık kırmızı
  },

  // İkincil Renkler (Secondary)
  secondary: {
    golden: '#F59E0B', // Altın sarısı
    warmYellow: '#FCD34D', // Sıcak sarı
    turkishGreen: '#059669', // Türkiye yeşili
    mintGreen: '#10B981', // Nane yeşili
  },

  // Nötr Renkler (Neutral)
  neutral: {
    charcoal: '#374151', // Ana metin
    grayMedium: '#6B7280', // İkincil metin
    grayLight: '#D1D5DB', // Çizgiler
    grayLightest: '#F9FAFB', // Arka plan
    white: '#FFFFFF', // Saf beyaz
    offWhite: '#F8FAFC', // Kırık beyaz
  },

  // Özel Aksan Renkleri
  accent: {
    bosphorusBlue: '#0EA5E9', // Boğaziçi mavisi
    skyBlue: '#7DD3FC', // Gökyüzü mavisi
    cappadociaOrange: '#EA580C', // Kapadokya turuncu
    desertRose: '#F97316', // Çöl gülleri
    antiqueGold: '#D97706', // Antik altın
    bronze: '#A16207', // Bronz
  },

  // Sistem Renkleri
  system: {
    success: '#059669', // Başarı
    warning: '#F59E0B', // Uyarı
    error: '#DC2626', // Hata
    info: '#0EA5E9', // Bilgi
  },

  // Interface Renkleri
  ui: {
    headerBg: '#1E3A8A',
    headerText: '#FFFFFF',
    tabActive: '#DC2626',
    tabInactive: '#6B7280',
    cardBg: '#FFFFFF',
    mainBg: '#F9FAFB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: '#000000',
    transparent: 'transparent',
  },

  // Shadow & Overlay renkleri
  shadows: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.15)',
    black: '#000000',
  },
};

// Kolay kullanım için kısayollar
export const AppColors = {
  // En çok kullanılanlar
  PRIMARY: Colors.primary.red, // #DC2626
  SECONDARY: Colors.primary.blue, // #1E3A8A
  ACCENT: Colors.secondary.golden, // #F59E0B

  // Metin renkleri
  TEXT_PRIMARY: Colors.neutral.charcoal, // #374151
  TEXT_SECONDARY: Colors.neutral.grayMedium, // #6B7280
  TEXT_LIGHT: Colors.neutral.grayLight, // #D1D5DB

  // Arka plan renkleri
  BG_PRIMARY: Colors.neutral.white, // #FFFFFF
  BG_SECONDARY: Colors.neutral.offWhite, // #F8FAFC
  BG_LIGHT: Colors.neutral.grayLightest, // #F9FAFB

  // Border renkleri
  BORDER_LIGHT: Colors.neutral.grayLight, // #D1D5DB

  // Shadow renkleri
  SHADOW_COLOR: Colors.shadows.black, // #000000
  SHADOW_LIGHT: Colors.shadows.light, // rgba(0, 0, 0, 0.05)
  SHADOW_MEDIUM: Colors.shadows.medium, // rgba(0, 0, 0, 0.1)
  SHADOW_DARK: Colors.shadows.dark, // rgba(0, 0, 0, 0.15)

  // Özel renkler
  WHITE: Colors.neutral.white, // #FFFFFF
  TRANSPARENT: Colors.ui.transparent, // transparent

  // Türkiye özel renkleri
  TURKISH_FLAG: Colors.primary.red, // #DC2626
  BOSPHORUS: Colors.accent.bosphorusBlue, // #0EA5E9
  CAPPADOCIA: Colors.accent.cappadociaOrange, // #EA580C
  GOLDEN_HORN: Colors.secondary.golden, // #F59E0B

  // Sistem renkleri
  SUCCESS: Colors.system.success, // #059669
  ERROR: Colors.system.error, // #DC2626
  WARNING: Colors.system.warning, // #F59E0B
  INFO: Colors.system.info, // #0EA5E9
};
