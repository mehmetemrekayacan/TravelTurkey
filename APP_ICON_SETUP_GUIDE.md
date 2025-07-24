# TravelTurkey App Icon Setup Guide

## 📱 Mobil Uygulamada App Icon Görünümü

### Android İçin

Android'de app icon'unuz şu şekilde görünecek:

**Home Screen'de:**

- Kırmızı circular background üzerinde beyaz tulip
- Altın renkli hilal ve yıldız detayları
- Modern, professional görünüm

**App Drawer'da:**

- Tüm detaylar korunarak küçük boyutta
- Adaptive icon desteği ile farklı launcher'larda farklı şekillerde

**Notification'larda:**

- Küçük boyutlarda bile tanınabilir
- Monochrome versiyonu otomatik olarak sistem tarafından kullanılır

### iOS İçin

iOS'te app icon'unuz:

**Home Screen'de:**

- Rounded corners otomatik olarak sistem tarafından eklenir
- Retina display'de kristal netliği
- 3D Touch ile hafif gölge efekti

**App Store'da:**

- 1024x1024 boyutunda tam kalitede
- Tüm gradientler ve detaylar korunur
- Professional turizm uygulaması görünümü

## 🛠️ Kurulum Adımları

### 1. Android için Icon'ları Hazırlama

Aşağıdaki boyutlarda PNG dosyalarına ihtiyacınız var:

- **mdpi**: 48x48px
- **hdpi**: 72x72px
- **xhdpi**: 96x96px
- **xxhdpi**: 144x144px
- **xxxhdpi**: 192x192px

### 2. iOS için Icon'ları Hazırlama

iOS için gerekli boyutlar:

- **20x20pt**: Notification (iPhone)
- **29x29pt**: Settings
- **40x40pt**: Spotlight
- **60x60pt**: App icon (iPhone)
- **1024x1024pt**: App Store

### 3. Otomatik Generator Kullanma

En kolay yöntem online icon generator kullanmak:

1. **App Icon Generator** sitelerine gidin
2. `app-icon.svg` dosyanızı 1024x1024 PNG olarak export edin
3. PNG'yi upload edin
4. Tüm boyutları otomatik oluşturun

## 📂 Dosya Yerleştirme

### Android

```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

### iOS

```
ios/TravelTurkey/Images.xcassets/AppIcon.appiconset/
├── icon-20@1x.png
├── icon-20@2x.png
├── icon-29@1x.png
├── icon-29@2x.png
├── icon-40@1x.png
├── icon-40@2x.png
├── icon-60@2x.png
├── icon-60@3x.png
└── icon-1024.png
```

## 🎨 Görsel Önizleme

App icon'unuz şu durumlarda nasıl görünecek:

**✅ Ana Ekranda**

- Kırmızı dairesel arkaplan
- Beyaz lale merkezi
- Altın hilal sol üstte
- Temiz, professional görünüm

**✅ Uygulama Listesinde**

- Küçük boyutta bile detaylar seçilebilir
- Türkiye turizm markası tanınabilir
- Diğer uygulamalar arasında öne çıkar

**✅ Bildirimler'de**

- Sistem tarafından otomatik küçültülür
- Monochrome versiyonu gerektiğinde kullanılır
- Marka kimliği korunur

## 🚀 Test Etme

1. **Android Emulator'da test edin**
2. **Farklı launcher'ları deneyin**
3. **iOS Simulator'da kontrol edin**
4. **Gerçek cihazlarda test edin**

## 💡 Pro Tips

- SVG dosyanızı 1024x1024 PNG olarak export ederken kalite 100% yapın
- Transparent background kullanmayın (Android adaptive icon hariç)
- Text çok küçük olmamasına dikkat edin
- Marka renklerinizi tutarlı tutun
