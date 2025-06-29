# TravelTurkey 🇹🇷

Modern ve sade Türkiye turizm uygulaması - React Native ile geliştirilmiş.

## ✨ Özellikler

- **🧭 Keşfet**: Türkiye'deki popüler yerleri ve aktiviteleri keşfedin
- **📋 Planlarım**: Seyahat planlarınızı oluşturup takip edin
- **👤 Profil**: Kişisel bilgileriniz ve seyahat istatistikleriniz

## 🛠️ Teknolojiler

- **React Native**: 0.80.0
- **TypeScript**: Modern tip güvenliği
- **React Navigation**: 3 tab'lı navigasyon sistemi
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
├── screens/          # Ana ekranlar (3 tab)
│   ├── ExploreScreen.tsx
│   ├── PlansScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/       # Navigasyon yapısı
│   └── BottomTabNavigator.tsx
├── styles/          # Global stil tanımları
│   └── GlobalStyles.ts
├── constants/       # Sabitler (renkler vb.)
│   └── Colors.ts
└── types/          # TypeScript tip tanımları
    └── navigation.ts
```

## 🎨 Tasarım

- Sade ve modern arayüz
- Türkiye temalı renkler
- 3 ana tab yapısı
- Responsive tasarım
- iOS ve Android uyumlu

## 📝 Lisans

MIT License

---

Made with ❤️ in Turkey 🇹🇷
