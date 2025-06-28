# 🤝 TravelTurkey Projesine Katkıda Bulunma

TravelTurkey projesine katkıda bulunmak istediğiniz için teşekkürler! Bu döküman katkı süreci hakkında bilgi verir.

## 🚀 Başlamadan Önce

1. **Projeyi fork edin**
2. **Local'e clone edin**:
   ```bash
   git clone https://github.com/your-username/TravelTurkey.git
   ```
3. **Dependencies yükleyin**:
   ```bash
   npm install
   ```

## 📝 Geliştirme Süreci

### 1. Branch Oluşturma

```bash
# Feature branch oluştur
git checkout -b feature/yeni-ozellik

# Bug fix branch oluştur
git checkout -b fix/bug-adi
```

### 2. Kod Standardları

- **TypeScript** kullanın
- **ESLint** kurallarına uyun
- **Prettier** formatını kullanın
- **Jest** testleri yazın

### 3. Commit Mesajları

Conventional Commits formatını kullanın:

```
feat: yeni özellik eklendi
fix: bug düzeltildi
docs: dokümantasyon güncellendi
style: kod formatı düzenlendi
refactor: kod refactor edildi
test: test eklendi
chore: build process güncellendi
```

### 4. Test Etme

```bash
# Linting
npm run lint

# Type check
npm run type-check

# Tests
npm test

# Android build test
npm run android
```

## 🔄 Pull Request Süreci

1. **Branch'inizi güncel tutun**:

   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-branch
   git rebase main
   ```

2. **PR oluşturun**:

   - Açıklayıcı başlık yazın
   - Değişiklikleri detaylı açıklayın
   - Ekran görüntüleri ekleyin (UI değişiklikleri için)
   - Test sonuçlarını paylaşın

3. **Review bekleyin**:
   - CI/CD pipeline'ın geçmesini bekleyin
   - Code review feedback'lerini uygulayın
   - Merge onayını bekleyin

## 🎨 UI/UX Katkıları

- Türkiye temalı renk paletini kullanın
- Responsive tasarım yapın
- Accessibility standartlarına uyun
- Modern React Native component'ları tercih edin

## 🐛 Bug Raporlama

1. **Issue oluşturun** GitHub'da
2. **Şu bilgileri ekleyin**:
   - Cihaz/OS bilgisi
   - React Native versiyonu
   - Hata adımları
   - Beklenen/gerçek sonuç
   - Ekran görüntüsü/log

## 📚 Dokümantasyon

- README.md güncellemeleri
- Kod içi yorum ekleme
- API dokümantasyonu
- Kullanım kılavuzları

## 🌍 Çeviri Katkıları

Türkçe ve İngilizce dil desteği için:

- `src/locales/` klasöründe çeviri dosyaları
- i18n formatında key-value yapısı
- Kültürel uyum (Türk kültürü referansları)

## 📞 İletişim

- **Issues**: GitHub Issues kullanın
- **Discussions**: GitHub Discussions
- **Email**: mehmetemrekayacan@example.com

## 📄 Lisans

Bu projeye katkıda bulunarak [MIT License](LICENSE) şartlarını kabul etmiş sayılırsınız.

---

**Teşekkürler!** 🙏 Her katkınız TravelTurkey'i daha iyi yapar.
