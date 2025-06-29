# 🇹🇷 TravelTurkey - Türkiye Turizm Uygulaması

[![CI Status](https://github.com/mehmetemrekayacan/TravelTurkey/workflows/TravelTurkey%20CI/badge.svg)](https://github.com/mehmetemrekayacan/TravelTurkey/actions)
[![React Native](https://img.shields.io/badge/React%20Native-0.80.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Modern ve kullanıcı dostu Türkiye turizm uygulaması. React Native CLI ile geliştirilmiş, TypeScript destekli mobil uygulama.

## ✨ Özellikler

### � Ana Sayfa

- Türkiye'nin popüler destinasyonları
- Öne çıkan yerler (İstanbul Boğazı, Kapadokya, Antik Şehirler)
- Hızlı erişim butonları

### 📍 Gezilecek Yerler

- **İstanbul**: Tarihi yarımada, Boğaz turu, müzeler
- **Kapadokya**: Peri bacaları, balon turu, yer altı şehirleri
- **Antalya**: Deniz, güneş, antik şehirler
- **Pamukkale**: Beyaz travertenler, antik Hierapolis
- **Bodrum**: Marina, antik tiyatro, gece hayatı
- **Trabzon**: Sümela Manastırı, doğal güzellikler

### 🏨 Oteller

- Lüks oteller (Çırağan Palace, Four Seasons)
- Butik oteller ve mağara otelleri
- Termal oteller ve deniz kenarı tesisleri
- Fiyat karşılaştırma ve rezervasyon

### 👨‍💼 Rehber Hizmetleri

- Profesyonel rehberler (8+ yıl deneyim)
- Çoklu dil desteği (Türkçe, İngilizce, Almanca, Fransızca, Rusça)
- Farklı tur çeşitleri (Tarih, Doğa, Kültür, Gastronomi)
- 7/24 destek hattı

### 👤 Kullanıcı Profili

- Seyahat istatistikleri
- Rezervasyon geçmişi
- Favori yerler
- Kişisel ayarlar

## 🚀 Teknolojiler

- **React Native 0.80.0** - Cross-platform mobil geliştirme
- **TypeScript 5.0.4** - Type-safe kod geliştirme
- **React Navigation 6** - Tab ve Stack navigation
- **React Native Gesture Handler** - Gelişmiş dokunmatik işlemler
- **React Native Safe Area Context** - Güvenli alan yönetimi
- **React Native Screens** - Native ekran optimizasyonu
- **ESLint + Prettier** - Kod kalitesi ve formatlaması
- **Jest** - Unit testler ve mock'lar
- **GitHub Actions** - CI/CD pipeline (lint, type-check, build)

## 📱 Kurulum

### Gereksinimler

- Node.js 18+
- React Native CLI
- Android Studio (Android için)
- Xcode (iOS için - sadece macOS)
- Java JDK 11+

### Proje Kurulumu

```bash
# Repository'yi klonlayın
git clone https://github.com/mehmetemrekayacan/TravelTurkey.git
cd TravelTurkey

# Bağımlılıkları yükleyin
npm install

# iOS için (sadece macOS)
cd ios && pod install && cd ..

# Metro bundler'ı başlatın
npm start

# Android için (ayrı terminalde)
npm run android

# iOS için (ayrı terminalde)
npm run ios
```

## 🔧 Geliştirme

### Kod Kalitesi Kontrolleri

```bash
# ESLint kontrolü
npm run lint

# ESLint otomatik düzeltme
npm run lint:fix

# TypeScript tip kontrolü
npm run type-check

# Testleri çalıştır
npm test

# Test coverage raporu
npm run test:coverage

# Watch mode'da test
npm run test:watch
```

### Debug ve Optimizasyon

```bash
# Metro cache temizle
npm start -- --reset-cache

# Android build temizle
cd android && ./gradlew clean && cd ..

# iOS build temizle (macOS)
cd ios && xcodebuild clean && cd ..
```

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
