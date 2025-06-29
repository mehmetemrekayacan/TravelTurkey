# TravelTurkey 🇹🇷

Modern ve sade Türkiye turizm uygulaması - React Native ile geliştirilmiş.

## ✨ Özellikler

- **🏠 Ana Sayfa**: Hoş geldin ekranı ve hızlı navigasyon
- **🧭 Keşfet**: Türkiye'deki popüler yerleri ve aktiviteleri keşfedin
- **📋 Planlarım**: Seyahat planlarınızı oluşturup takip edin
- **👤 Profil**: Kişisel bilgileriniz ve seyahat istatistikleriniz

## 🛠️ Teknolojiler

- **React Native**: 0.80.0
- **TypeScript**: Modern tip güvenliği
- **React Navigation**: 4 tab'lı navigasyon sistemi
- **ESLint + Prettier**: Kod kalitesi ve formatı

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# iOS bağımlılıkları (sadece macOS)
cd ios && pod install && cd ..

# Android'de çalıştır
npm run android

# iOS'ta çalıştır (sadece macOS)
npm run ios
```

## 📱 Geliştirme

```bash
# Metro bundler'ı başlat
npm start

# TypeScript tip kontrolü
npm run type-check

# ESLint kontrolü
npm run lint

# ESLint hataları düzelt
npm run lint:fix

# Testleri çalıştır
npm test

# Test coverage
npm run test:coverage
```

## 📁 Proje Yapısı

```
src/
├── screens/          # Ana ekranlar (4 tab + templates)
│   ├── HomeScreen.tsx          # 🏠 Ana sayfa (NEW!)
│   ├── ExploreScreen.tsx       # 🧭 Keşfet ekranı (Enhanced!)
│   ├── PlansScreen.tsx         # 📋 Planlarım ekranı  
│   ├── ProfileScreen.tsx       # 👤 Profil ekranı
│   ├── ExploreScreenTemplate.tsx   # Keşfet template
│   ├── ProfileScreenTemplate.tsx   # Profil template
│   └── BaseScreenTemplate.tsx      # Genel screen template
├── navigation/       # Navigasyon yapısı
│   └── BottomTabNavigator.tsx  # 4 tab navigator
├── styles/          # Global stil tanımları
│   └── GlobalStyles.ts
├── constants/       # Sabitler (renkler vb.)
│   └── Colors.ts
└── types/          # TypeScript tip tanımları
    └── navigation.ts           # 4 tab types
```

## 📱 Screen Template'leri

### Temel Screen Component Yapısı:
```tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function MyScreen() {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>Başlık</Text>
      </View>
      <ScrollView style={GlobalStyles.container}>
        {/* İçerik */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

### Mevcut Template'ler:
- **BaseScreenTemplate.tsx**: Genel amaçlı screen şablonu
- **HomeScreen.tsx**: Ana sayfa örneği
- **ExploreScreenTemplate.tsx**: Keşfet sayfası şablonu  
- **ProfileScreenTemplate.tsx**: Profil sayfası şablonu

## 🎨 Tasarım

- Sade ve modern arayüz
- Türkiye temalı renkler
- 4 ana tab yapısı
- Responsive tasarım
- iOS ve Android uyumlu

## 📝 Lisans

MIT License

---

Made with ❤️ in Turkey 🇹🇷
