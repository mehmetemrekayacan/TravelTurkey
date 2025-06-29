/**
 * TravelTurkey - Tourist Places Database
 * Türkiye'nin popüler turistik yerlerinin kapsamlı veritabanı
 */

import { TouristPlace, Category, City } from '../types/touristPlaces';

// Kategoriler
export const categories: Category[] = [
  {
    id: 'historical',
    name: 'Tarihi Yerler',
    description: 'Antik şehirler, kaleler, müzeler ve tarihi yapılar',
    icon: '🏛️',
    color: '#8B4513',
    placesCount: 11,
  },
  {
    id: 'natural',
    name: 'Doğal Güzellikler',
    description: 'Milli parklar, göller, şelaleler ve doğa harikası yerler',
    icon: '🌿',
    color: '#228B22',
    placesCount: 4,
  },
  {
    id: 'cultural',
    name: 'Kültürel Alanlar',
    description: 'Müzeler, sanat galerileri ve kültürel mekânlar',
    icon: '🎭',
    color: '#4B0082',
    placesCount: 3,
  },
  {
    id: 'religious',
    name: 'Dini Yerler',
    description: 'Camiler, kiliseler ve manastırlar',
    icon: '🕌',
    color: '#DAA520',
    placesCount: 2,
  },
  {
    id: 'beach',
    name: 'Plajlar',
    description: 'Sahiller ve deniz kenarı tatil bölgeleri',
    icon: '🏖️',
    color: '#1E90FF',
    placesCount: 1,
  },
];

// Şehirler
export const cities: City[] = [
  {
    id: 'istanbul',
    name: 'İstanbul',
    region: 'marmara',
    coordinates: { latitude: 41.0082, longitude: 28.9784 },
    description: 'Tarihi ve modern İstanbul',
    photo: 'https://example.com/istanbul.jpg',
    placesCount: 4,
    isPopular: true,
  },
  {
    id: 'ankara',
    name: 'Ankara',
    region: 'ic_anadolu',
    coordinates: { latitude: 39.9334, longitude: 32.8597 },
    description: "Türkiye'nin başkenti",
    photo: 'https://example.com/ankara.jpg',
    placesCount: 2,
    isPopular: true,
  },
  // Diğer şehirler...
];

// Turistik yerler veritabanı
export const touristPlaces: TouristPlace[] = [
  {
    id: 'hagia-sophia',
    name: 'Ayasofya Müzesi',
    slug: 'ayasofya-muzesi',
    description:
      "Ayasofya, İstanbul'da bulunan ve Bizans İmparatorluğu döneminde inşa edilmiş, daha sonra Osmanlı İmparatorluğu tarafından camiye çevrilmiş tarihi bir yapıdır. Bugün müze olarak hizmet veren bu eser, dünya mimarlık tarihinin en önemli yapıtlarından biridir.",
    shortDescription: 'Bizans ve Osmanlı mimarisinin muhteşem örneği',
    category: 'historical',
    subcategory: 'Müze',
    tags: ['İstanbul', 'Bizans', 'Osmanlı', 'Mimarlık', 'UNESCO'],
    coordinates: { latitude: 41.0086, longitude: 28.9802 },
    address: {
      city: 'İstanbul',
      district: 'Fatih',
      neighborhood: 'Sultanahmet',
      fullAddress: 'Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul',
    },
    region: 'marmara',
    icon: '🕌',
    photos: [
      {
        id: 'hagia-1',
        url: 'https://example.com/hagia-sophia-main.jpg',
        thumbnail: 'https://example.com/hagia-sophia-thumb.jpg',
        caption: 'Ayasofya ana giriş',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.8,
      count: 25430,
      breakdown: {
        location: 4.9,
        service: 4.7,
        value: 4.6,
        cleanliness: 4.8,
        atmosphere: 4.9,
      },
    },
    popularityScore: 98,
    visitorsPerYear: 3500000,
    priceInfo: {
      currency: 'TRY',
      adult: 100,
      child: 0,
      student: 50,
      isFree: false,
    },
    workingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '09:00-17:00',
      sunday: '09:00-17:00',
      notes: 'Ramazan ayında saatler değişebilir',
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '2-3 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: false,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca'],
    },
    nearbyPlaces: ['blue-mosque', 'topkapi-palace', 'basilica-cistern'],
    contactInfo: {
      phone: '+90 212 522 1750',
      website: 'https://ayasofyamuzesi.gov.tr',
      socialMedia: {
        instagram: '@ayasofyamuzesi',
      },
    },
    tips: [
      'Erken saatlerde ziyaret edin',
      'Online bilet alımı önerilir',
      'Uygun kıyafet giyinin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'cappadocia',
    name: 'Kapadokya',
    slug: 'kapadokya',
    description:
      'Kapadokya, Nevşehir, Kayseri, Aksaray ve Kırşehir illerini kapsayan, benzersiz coğrafi oluşumları, yeraltı şehirleri ve sıcak hava balonu turlarıyla ünlü bir bölgedir. Peri bacaları ve kayadan oyma kiliseler dünya çapında meşhurdur.',
    shortDescription: 'Peri bacaları ve sıcak hava balonlarının diyarı',
    category: 'natural',
    subcategory: 'Doğal Alan',
    tags: [
      'Nevşehir',
      'Peri Bacaları',
      'Sıcak Hava Balonu',
      'Yeraltı Şehri',
      'UNESCO',
    ],
    coordinates: { latitude: 38.6431, longitude: 34.8289 },
    address: {
      city: 'Nevşehir',
      district: 'Ürgüp',
      fullAddress: 'Kapadokya Bölgesi, Nevşehir',
    },
    region: 'ic_anadolu',
    icon: '🎈',
    photos: [
      {
        id: 'capp-1',
        url: 'https://example.com/cappadocia-main.jpg',
        thumbnail: 'https://example.com/cappadocia-thumb.jpg',
        caption: 'Sıcak hava balonları ve peri bacaları',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.9,
      count: 18750,
      breakdown: {
        location: 4.9,
        service: 4.8,
        value: 4.7,
        cleanliness: 4.8,
        atmosphere: 5.0,
      },
    },
    popularityScore: 95,
    visitorsPerYear: 2800000,
    priceInfo: {
      currency: 'TRY',
      adult: 0,
      isFree: true,
    },
    workingHours: {
      monday: '24 saat',
      tuesday: '24 saat',
      wednesday: '24 saat',
      thursday: '24 saat',
      friday: '24 saat',
      saturday: '24 saat',
      sunday: '24 saat',
      notes: 'Müzeler ve özel alanlar için ayrı giriş ücretleri',
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '2-3 gün',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['goreme-museum', 'underground-city'],
    contactInfo: {
      website: 'https://kapadokya.gov.tr',
    },
    tips: [
      'Sıcak hava balonu için rezervasyon yapın',
      'Rahat yürüyüş ayakkabıları giyin',
      'Hava durumunu kontrol edin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'pamukkale',
    name: 'Pamukkale Travertenleri',
    slug: 'pamukkale-travertenleri',
    description:
      'Pamukkale, Denizli ilinde bulunan ve "pamuk kale" anlamına gelen, beyaz kireç taraçalarıyla ünlü doğal bir oluşumdur. Termal sularıyla oluşan bu travertenler, antik Hierapolis şehriyle birlikte UNESCO Dünya Mirası listesindedir.',
    shortDescription: 'Beyaz kireç taraçaları ve termal havuzlar',
    category: 'natural',
    subcategory: 'Termal Alan',
    tags: ['Denizli', 'Travertenler', 'Termal', 'Hierapolis', 'UNESCO'],
    coordinates: { latitude: 37.9242, longitude: 29.1189 },
    address: {
      city: 'Denizli',
      district: 'Pamukkale',
      fullAddress: 'Pamukkale, 20280 Pamukkale/Denizli',
    },
    region: 'ege',
    icon: '🏔️',
    photos: [
      {
        id: 'pam-1',
        url: 'https://example.com/pamukkale-main.jpg',
        thumbnail: 'https://example.com/pamukkale-thumb.jpg',
        caption: 'Pamukkale travertenleri',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.7,
      count: 15230,
      breakdown: {
        location: 4.8,
        service: 4.6,
        value: 4.7,
        cleanliness: 4.6,
        atmosphere: 4.9,
      },
    },
    popularityScore: 88,
    visitorsPerYear: 2200000,
    priceInfo: {
      currency: 'TRY',
      adult: 80,
      child: 40,
      student: 40,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-19:00',
      tuesday: '08:00-19:00',
      wednesday: '08:00-19:00',
      thursday: '08:00-19:00',
      friday: '08:00-19:00',
      saturday: '08:00-19:00',
      sunday: '08:00-19:00',
      notes: "Kış aylarında 17:00'de kapanır",
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: 'Yarım gün',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['hierapolis'],
    contactInfo: {
      phone: '+90 258 272 2077',
      website: 'https://pamukkale.gov.tr',
    },
    tips: [
      'Çıplak ayakla gezin',
      'Su geçirmez çanta kullanın',
      'Güneş kremi kullanmayı unutmayın',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'ephesus',
    name: 'Efes Antik Kenti',
    slug: 'efes-antik-kenti',
    description:
      "Efes, İzmir'in Selçuk ilçesinde bulunan ve Roma döneminin en iyi korunmuş antik kentlerinden biridir. Artemis Tapınağı, Celsus Kütüphanesi ve Büyük Tiyatro gibi muhteşem yapılarıyla ünlüdür.",
    shortDescription: 'Roma döneminin en iyi korunmuş antik kenti',
    category: 'historical',
    subcategory: 'Antik Kent',
    tags: ['İzmir', 'Roma', 'Artemis', 'Celsus', 'UNESCO'],
    coordinates: { latitude: 37.9755, longitude: 27.3731 },
    address: {
      city: 'İzmir',
      district: 'Selçuk',
      fullAddress: 'Acarlar, Efes Harabeleri, 35920 Selçuk/İzmir',
    },
    region: 'ege',
    icon: '🏛️',
    photos: [
      {
        id: 'eph-1',
        url: 'https://example.com/ephesus-main.jpg',
        thumbnail: 'https://example.com/ephesus-thumb.jpg',
        caption: 'Celsus Kütüphanesi',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.8,
      count: 22150,
      breakdown: {
        location: 4.9,
        service: 4.7,
        value: 4.8,
        cleanliness: 4.7,
        atmosphere: 4.9,
      },
    },
    popularityScore: 92,
    visitorsPerYear: 1800000,
    priceInfo: {
      currency: 'TRY',
      adult: 120,
      child: 60,
      student: 60,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-18:30',
      tuesday: '08:00-18:30',
      wednesday: '08:00-18:30',
      thursday: '08:00-18:30',
      friday: '08:00-18:30',
      saturday: '08:00-18:30',
      sunday: '08:00-18:30',
      notes: "Kış aylarında 17:00'de kapanır",
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '3-4 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca'],
    },
    nearbyPlaces: ['artemis-temple', 'selcuk-museum'],
    contactInfo: {
      phone: '+90 232 892 6010',
      website: 'https://efes.gov.tr',
    },
    tips: [
      'Rahat yürüyüş ayakkabıları giyin',
      'Su ve şapka getirin',
      'Rehberli tur önerilir',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'blue-mosque',
    name: 'Sultan Ahmet Camii (Mavi Cami)',
    slug: 'sultan-ahmet-camii',
    description:
      "Sultan Ahmet Camii, İstanbul'da bulunan ve Mavi Cami olarak da bilinen, Osmanlı mimarisinin en güzel örneklerinden biridir. Altı minaresi ve iç kısmındaki mavi çinileriyle ünlüdür.",
    shortDescription: 'Altı minareli Osmanlı mimarisi harikası',
    category: 'religious',
    subcategory: 'Cami',
    tags: ['İstanbul', 'Osmanlı', 'Mimarlık', 'Sultanahmet', 'Çini'],
    coordinates: { latitude: 41.0054, longitude: 28.9768 },
    address: {
      city: 'İstanbul',
      district: 'Fatih',
      neighborhood: 'Sultanahmet',
      fullAddress: 'Sultan Ahmet, Atmeydanı Cd. No:7, 34122 Fatih/İstanbul',
    },
    region: 'marmara',
    icon: '🕌',
    photos: [
      {
        id: 'blue-1',
        url: 'https://example.com/blue-mosque-main.jpg',
        thumbnail: 'https://example.com/blue-mosque-thumb.jpg',
        caption: 'Sultan Ahmet Camii dış görünüm',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.7,
      count: 31250,
      breakdown: {
        location: 4.8,
        service: 4.6,
        value: 4.9,
        cleanliness: 4.7,
        atmosphere: 4.8,
      },
    },
    popularityScore: 89,
    visitorsPerYear: 3200000,
    priceInfo: {
      currency: 'TRY',
      adult: 0,
      isFree: true,
    },
    workingHours: {
      monday: '08:30-11:30, 13:00-14:30, 15:30-16:45',
      tuesday: '08:30-11:30, 13:00-14:30, 15:30-16:45',
      wednesday: '08:30-11:30, 13:00-14:30, 15:30-16:45',
      thursday: '08:30-11:30, 13:00-14:30, 15:30-16:45',
      friday: '08:30-11:30, 14:30-15:30, 16:45-18:00',
      saturday: '08:30-11:30, 13:00-14:30, 15:30-16:45',
      sunday: '08:30-11:30, 13:00-14:30, 15:30-16:45',
      notes: 'Namaz vakitlerinde ziyaret edilemez',
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '1-2 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: false,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce', 'Arapça'],
    },
    nearbyPlaces: ['hagia-sophia', 'topkapi-palace', 'hippodrome'],
    contactInfo: {
      phone: '+90 212 518 1330',
    },
    tips: [
      'Uygun kıyafet giyinin',
      'Namaz vakitlerini kontrol edin',
      'Ayakkabılarınızı çıkarın',
    ],
    warnings: ['Namaz vakitlerinde ziyaret edilemez'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'antalya-oldtown',
    name: 'Antalya Kaleiçi',
    slug: 'antalya-kaleici',
    description:
      "Kaleiçi, Antalya'nın tarihi merkezi olup, Osmanlı döneminden kalma evleri, dar sokakları ve Akdeniz manzarasıyla büyüleyici bir atmosfere sahiptir. Antik Roma limanı ve Hadrian Kapısı önemli tarihi yapılarıdır.",
    shortDescription: "Antalya'nın büyüleyici tarihi merkezi",
    category: 'historical',
    subcategory: 'Tarihi Merkez',
    tags: ['Antalya', 'Osmanlı', 'Tarihi Sokaklar', 'Hadrian Kapısı', 'Liman'],
    coordinates: { latitude: 36.8844, longitude: 30.7056 },
    address: {
      city: 'Antalya',
      district: 'Muratpaşa',
      neighborhood: 'Kaleiçi',
      fullAddress: 'Kaleiçi, 07100 Muratpaşa/Antalya',
    },
    region: 'akdeniz',
    icon: '🏘️',
    photos: [
      {
        id: 'kal-1',
        url: 'https://example.com/kaleici-main.jpg',
        thumbnail: 'https://example.com/kaleici-thumb.jpg',
        caption: 'Kaleiçi tarihi sokakları',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.6,
      count: 12340,
      breakdown: {
        location: 4.7,
        service: 4.5,
        value: 4.6,
        cleanliness: 4.4,
        atmosphere: 4.8,
      },
    },
    popularityScore: 82,
    visitorsPerYear: 1500000,
    priceInfo: {
      currency: 'TRY',
      adult: 0,
      isFree: true,
    },
    workingHours: {
      monday: '24 saat',
      tuesday: '24 saat',
      wednesday: '24 saat',
      thursday: '24 saat',
      friday: '24 saat',
      saturday: '24 saat',
      sunday: '24 saat',
      notes: 'Dükkanlar ve restoranlar için farklı saatler',
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar', 'Kış'],
    estimatedDuration: 'Yarım gün',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['hadrian-gate', 'antalya-museum'],
    contactInfo: {
      website: 'https://antalya.bel.tr',
    },
    tips: [
      'Rahat yürüyüş ayakkabıları giyin',
      'Akşam saatlerinde daha güzel',
      'Restoranları deneyin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'troy',
    name: 'Truva Antik Kenti',
    slug: 'truva-antik-kenti',
    description:
      "Truva, Çanakkale'de bulunan ve Homer'in İlyada destanında anlatılan ünlü Truva Savaşı'nın geçtiği antik kenttir. UNESCO Dünya Mirası listesinde yer alan bu sit alanında 9 farklı dönem katmanı bulunmaktadır.",
    shortDescription: 'İlyada destanının efsanevi kenti',
    category: 'historical',
    subcategory: 'Antik Kent',
    tags: ['Çanakkale', 'Truva Savaşı', 'Homer', 'İlyada', 'UNESCO'],
    coordinates: { latitude: 39.9576, longitude: 26.239 },
    address: {
      city: 'Çanakkale',
      district: 'Tevfikiye',
      fullAddress: 'Tevfikiye Köyü, 17100 Çanakkale',
    },
    region: 'marmara',
    icon: '⚔️',
    photos: [
      {
        id: 'troy-1',
        url: 'https://example.com/troy-main.jpg',
        thumbnail: 'https://example.com/troy-thumb.jpg',
        caption: 'Truva Atı replikası',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.3,
      count: 8750,
      breakdown: {
        location: 4.5,
        service: 4.2,
        value: 4.3,
        cleanliness: 4.1,
        atmosphere: 4.4,
      },
    },
    popularityScore: 75,
    visitorsPerYear: 650000,
    priceInfo: {
      currency: 'TRY',
      adult: 60,
      child: 30,
      student: 30,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-19:00',
      tuesday: '08:00-19:00',
      wednesday: '08:00-19:00',
      thursday: '08:00-19:00',
      friday: '08:00-19:00',
      saturday: '08:00-19:00',
      sunday: '08:00-19:00',
      notes: "Kış aylarında 17:00'de kapanır",
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '2-3 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: false,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['canakkale-museum'],
    contactInfo: {
      phone: '+90 286 283 0536',
      website: 'https://truva.gov.tr',
    },
    tips: [
      'Rehberli tur önerilir',
      'Su ve şapka getirin',
      'Müzeyi de ziyaret edin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'nemrut-dagi',
    name: 'Nemrut Dağı',
    slug: 'nemrut-dagi',
    description:
      'Nemrut Dağı, Adıyaman ilinde bulunan ve Kommagene Krallığı döneminden kalma dev heykelleriyle ünlü tarihi alandır. 2134 metre yükseklikte bulunan bu UNESCO Dünya Mirası alanı, gündoğumu ve günbatımı manzaralarıyla da meşhurdur.',
    shortDescription: 'Dev heykeller ve muhteşem gündoğumu',
    category: 'historical',
    subcategory: 'Tarihi Alan',
    tags: ['Adıyaman', 'Kommagene', 'Heykeller', 'Gündoğumu', 'UNESCO'],
    coordinates: { latitude: 37.9803, longitude: 38.7406 },
    address: {
      city: 'Adıyaman',
      district: 'Kâhta',
      fullAddress: 'Nemrut Dağı Milli Parkı, Adıyaman',
    },
    region: 'dogu_anadolu',
    icon: '🗿',
    photos: [
      {
        id: 'nem-1',
        url: 'https://example.com/nemrut-main.jpg',
        thumbnail: 'https://example.com/nemrut-thumb.jpg',
        caption: 'Nemrut Dağı dev heykelleri',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.5,
      count: 6850,
      breakdown: {
        location: 4.8,
        service: 4.2,
        value: 4.4,
        cleanliness: 4.3,
        atmosphere: 4.9,
      },
    },
    popularityScore: 78,
    visitorsPerYear: 380000,
    priceInfo: {
      currency: 'TRY',
      adult: 40,
      child: 20,
      student: 20,
      isFree: false,
    },
    workingHours: {
      monday: 'Gün doğumundan gün batımına',
      tuesday: 'Gün doğumundan gün batımına',
      wednesday: 'Gün doğumundan gün batımına',
      thursday: 'Gün doğumundan gün batımına',
      friday: 'Gün doğumundan gün batımına',
      saturday: 'Gün doğumundan gün batımına',
      sunday: 'Gün doğumundan gün batımına',
      notes: 'Kış aylarında hava şartları nedeniyle kapalı olabilir',
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: 'Yarım gün',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: false,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['kahta-castle'],
    contactInfo: {
      phone: '+90 416 725 5097',
    },
    tips: [
      'Gündoğumu için erken gidin',
      'Sıcak kıyafet getirin',
      'Dört çeker araç gerekli',
    ],
    warnings: ['Yol zor olabilir', 'Hava şartlarına dikkat'],
    seasonalAvailability: ['İlkbahar', 'Yaz', 'Sonbahar'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'oludeniz',
    name: 'Ölüdeniz',
    slug: 'oludeniz',
    description:
      "Ölüdeniz, Fethiye'de bulunan ve turkuaz rengi suları ile ünlü bir lagündür. Paraşüt atlama, tekne turları ve plaj keyfi için ideal bir destinasyondur. Blue Flag sertifikalı temiz plajıyla doğaseverları büyüler.",
    shortDescription: 'Turkuaz lagün ve paraşüt cennetİ',
    category: 'beach',
    subcategory: 'Lagün',
    tags: ['Fethiye', 'Lagün', 'Paraşüt', 'Plaj', 'Blue Flag'],
    coordinates: { latitude: 36.55, longitude: 29.1167 },
    address: {
      city: 'Muğla',
      district: 'Fethiye',
      neighborhood: 'Ölüdeniz',
      fullAddress: 'Ölüdeniz, 48300 Fethiye/Muğla',
    },
    region: 'akdeniz',
    icon: '🏖️',
    photos: [
      {
        id: 'olu-1',
        url: 'https://example.com/oludeniz-main.jpg',
        thumbnail: 'https://example.com/oludeniz-thumb.jpg',
        caption: 'Ölüdeniz lagünü',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.8,
      count: 16750,
      breakdown: {
        location: 4.9,
        service: 4.7,
        value: 4.6,
        cleanliness: 4.8,
        atmosphere: 4.9,
      },
    },
    popularityScore: 91,
    visitorsPerYear: 1200000,
    priceInfo: {
      currency: 'TRY',
      adult: 15,
      child: 7,
      isFree: false,
    },
    workingHours: {
      monday: '24 saat',
      tuesday: '24 saat',
      wednesday: '24 saat',
      thursday: '24 saat',
      friday: '24 saat',
      saturday: '24 saat',
      sunday: '24 saat',
      notes: 'Plaj giriş ücreti var',
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: 'Tam gün',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: true,
      guidedTours: false,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['babadağ', 'butterfly-valley'],
    contactInfo: {
      website: 'https://oludeniz.com',
    },
    tips: [
      'Güneş kremi kullanın',
      'Su sporu malzemelerini kiralayın',
      'Paraşüt atlama rezervasyonu yapın',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'sumela-monastery',
    name: 'Sümela Manastırı',
    slug: 'sumela-manastiri',
    description:
      "Sümela Manastırı, Trabzon'da Altındere Vadisi'nde kayaların arasına yapılmış tarihi bir Ortodoks manastırıdır. 4. yüzyılda kurulan bu manastır, Karadeniz'in en önemli turistik yerlerinden biridir.",
    shortDescription: 'Kayalara oyulmuş tarihi manastır',
    category: 'religious',
    subcategory: 'Manastır',
    tags: ['Trabzon', 'Manastır', 'Ortodoks', 'Altındere', 'Tarihi'],
    coordinates: { latitude: 40.6917, longitude: 39.6617 },
    address: {
      city: 'Trabzon',
      district: 'Maçka',
      fullAddress: 'Altındere Köyü, Maçka/Trabzon',
    },
    region: 'karadeniz',
    icon: '⛪',
    photos: [
      {
        id: 'sum-1',
        url: 'https://example.com/sumela-main.jpg',
        thumbnail: 'https://example.com/sumela-thumb.jpg',
        caption: 'Sümela Manastırı',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.6,
      count: 9850,
      breakdown: {
        location: 4.8,
        service: 4.4,
        value: 4.5,
        cleanliness: 4.5,
        atmosphere: 4.8,
      },
    },
    popularityScore: 84,
    visitorsPerYear: 520000,
    priceInfo: {
      currency: 'TRY',
      adult: 50,
      child: 25,
      student: 25,
      isFree: false,
    },
    workingHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00',
      wednesday: '09:00-18:00',
      thursday: '09:00-18:00',
      friday: '09:00-18:00',
      saturday: '09:00-18:00',
      sunday: '09:00-18:00',
      notes: 'Kış aylarında kapalı olabilir',
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: '2-3 saat',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: false,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['altindere-park'],
    contactInfo: {
      phone: '+90 462 531 1172',
    },
    tips: [
      'Rahat yürüyüş ayakkabıları giyin',
      'Hava durumunu kontrol edin',
      'Fotoğraf çekin',
    ],
    warnings: ['Kaygan zemin', 'Yükseklik korkusu olanlar dikkat'],
    seasonalAvailability: ['İlkbahar', 'Yaz', 'Sonbahar'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'galata-tower',
    name: 'Galata Kulesi',
    slug: 'galata-kulesi',
    description:
      "Galata Kulesi, İstanbul'un Beyoğlu ilçesinde bulunan ve şehrin panoramik manzarasını sunan tarihi bir kuledir. 1348 yılında Cenevizliler tarafından inşa edilen kule, İstanbul'un simgesel yapılarından biridir.",
    shortDescription: "İstanbul'un panoramik manzarası",
    category: 'historical',
    subcategory: 'Kule',
    tags: ['İstanbul', 'Beyoğlu', 'Ceneviz', 'Panorama', 'Manzara'],
    coordinates: { latitude: 41.0256, longitude: 28.9744 },
    address: {
      city: 'İstanbul',
      district: 'Beyoğlu',
      neighborhood: 'Galata',
      fullAddress: 'Bereketzade, Galata Kulesi Sk., 34421 Beyoğlu/İstanbul',
    },
    region: 'marmara',
    icon: '🗼',
    photos: [
      {
        id: 'gal-1',
        url: 'https://example.com/galata-main.jpg',
        thumbnail: 'https://example.com/galata-thumb.jpg',
        caption: 'Galata Kulesi',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.4,
      count: 18950,
      breakdown: {
        location: 4.8,
        service: 4.2,
        value: 4.1,
        cleanliness: 4.3,
        atmosphere: 4.6,
      },
    },
    popularityScore: 86,
    visitorsPerYear: 1800000,
    priceInfo: {
      currency: 'TRY',
      adult: 150,
      child: 75,
      student: 75,
      isFree: false,
    },
    workingHours: {
      monday: '08:30-23:00',
      tuesday: '08:30-23:00',
      wednesday: '08:30-23:00',
      thursday: '08:30-23:00',
      friday: '08:30-23:00',
      saturday: '08:30-23:00',
      sunday: '08:30-23:00',
    },
    bestTimeToVisit: ['Her mevsim'],
    estimatedDuration: '1-2 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: false,
      guidedTours: false,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['taksim-square', 'istiklal-street'],
    contactInfo: {
      phone: '+90 212 293 8180',
      website: 'https://galatakulesi.gov.tr',
    },
    tips: [
      'Günbatımı için rezervasyon yapın',
      'Asansör kuyruğu olabilir',
      'Restoranda yemek yiyebilirsiniz',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'topkapi-palace',
    name: 'Topkapı Sarayı',
    slug: 'topkapi-sarayi',
    description:
      "Topkapı Sarayı, İstanbul'da bulunan ve 15-19. yüzyıllar arasında Osmanlı İmparatorluğu'nun yönetim merkezi olan tarihi saraydır. Harem dairesi, hazine ve kutsal emanetler koleksiyonuyla ünlüdür.",
    shortDescription: "Osmanlı İmparatorluğu'nun görkemli sarayı",
    category: 'historical',
    subcategory: 'Saray',
    tags: ['İstanbul', 'Osmanlı', 'Saray', 'Harem', 'Hazine'],
    coordinates: { latitude: 41.0115, longitude: 28.9833 },
    address: {
      city: 'İstanbul',
      district: 'Fatih',
      neighborhood: 'Sultanahmet',
      fullAddress: 'Cankurtaran, 34122 Fatih/İstanbul',
    },
    region: 'marmara',
    icon: '🏰',
    photos: [
      {
        id: 'top-1',
        url: 'https://example.com/topkapi-main.jpg',
        thumbnail: 'https://example.com/topkapi-thumb.jpg',
        caption: 'Topkapı Sarayı',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.6,
      count: 24750,
      breakdown: {
        location: 4.8,
        service: 4.5,
        value: 4.4,
        cleanliness: 4.6,
        atmosphere: 4.7,
      },
    },
    popularityScore: 90,
    visitorsPerYear: 3000000,
    priceInfo: {
      currency: 'TRY',
      adult: 200,
      child: 100,
      student: 100,
      isFree: false,
    },
    workingHours: {
      monday: 'Kapalı',
      tuesday: '09:00-18:45',
      wednesday: '09:00-18:45',
      thursday: '09:00-18:45',
      friday: '09:00-18:45',
      saturday: '09:00-18:45',
      sunday: '09:00-18:45',
      notes: 'Pazartesi günleri kapalı',
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '3-4 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: false,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca'],
    },
    nearbyPlaces: ['hagia-sophia', 'blue-mosque', 'archaeological-museum'],
    contactInfo: {
      phone: '+90 212 512 0480',
      website: 'https://topkapisarayi.gov.tr',
    },
    tips: [
      'Erken saatlerde gidin',
      'Harem için ayrı bilet gerekli',
      'Müze kart kullanın',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'goreme-museum',
    name: 'Göreme Açık Hava Müzesi',
    slug: 'goreme-acik-hava-muzesi',
    description:
      "Göreme Açık Hava Müzesi, Kapadokya'da bulunan ve kayaya oyulmuş kiliseleriyle ünlü bir müzedir. 4-11. yüzyıllar arasında Hristiyan keşişler tarafından kullanılan bu alan, benzersiz fresklerle süslenmiştir.",
    shortDescription: 'Kayaya oyulmuş kiliseler ve freskler',
    category: 'cultural',
    subcategory: 'Açık Hava Müzesi',
    tags: ['Nevşehir', 'Kapadokya', 'Kilise', 'Fresk', 'UNESCO'],
    coordinates: { latitude: 38.6425, longitude: 34.828 },
    address: {
      city: 'Nevşehir',
      district: 'Göreme',
      fullAddress: 'Göreme, 50180 Göreme/Nevşehir',
    },
    region: 'ic_anadolu',
    icon: '⛪',
    photos: [
      {
        id: 'gor-1',
        url: 'https://example.com/goreme-main.jpg',
        thumbnail: 'https://example.com/goreme-thumb.jpg',
        caption: 'Göreme kilisesi',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.7,
      count: 14250,
      breakdown: {
        location: 4.8,
        service: 4.6,
        value: 4.5,
        cleanliness: 4.7,
        atmosphere: 4.9,
      },
    },
    popularityScore: 87,
    visitorsPerYear: 1200000,
    priceInfo: {
      currency: 'TRY',
      adult: 80,
      child: 40,
      student: 40,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-17:00',
      tuesday: '08:00-17:00',
      wednesday: '08:00-17:00',
      thursday: '08:00-17:00',
      friday: '08:00-17:00',
      saturday: '08:00-17:00',
      sunday: '08:00-17:00',
      notes: "Kış aylarında 16:30'da kapanır",
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '2-3 saat',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['cappadocia', 'uchisar-castle'],
    contactInfo: {
      phone: '+90 384 271 2167',
      website: 'https://goreme.gov.tr',
    },
    tips: [
      'Karanlık Kilise için ayrı bilet',
      'Rahat ayakkabı giyin',
      'Fotoğraf çekmek için izin alın',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'aspendos',
    name: 'Aspendos Antik Tiyatrosu',
    slug: 'aspendos-antik-tiyatrosu',
    description:
      "Aspendos, Antalya'da bulunan ve Roma döneminden kalma en iyi korunmuş antik tiyatrolardan biridir. 2. yüzyılda inşa edilen bu tiyatro, mükemmel akustiğiyle ünlüdür ve hala konserler düzenlenmektedir.",
    shortDescription: 'Mükemmel akustikli Roma tiyatrosu',
    category: 'historical',
    subcategory: 'Antik Tiyatro',
    tags: ['Antalya', 'Roma', 'Tiyatro', 'Akustik', 'Konser'],
    coordinates: { latitude: 36.9394, longitude: 31.1719 },
    address: {
      city: 'Antalya',
      district: 'Serik',
      fullAddress: 'Belkıs, 07506 Serik/Antalya',
    },
    region: 'akdeniz',
    icon: '🎭',
    photos: [
      {
        id: 'asp-1',
        url: 'https://example.com/aspendos-main.jpg',
        thumbnail: 'https://example.com/aspendos-thumb.jpg',
        caption: 'Aspendos Tiyatrosu',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.5,
      count: 11250,
      breakdown: {
        location: 4.6,
        service: 4.4,
        value: 4.5,
        cleanliness: 4.4,
        atmosphere: 4.7,
      },
    },
    popularityScore: 81,
    visitorsPerYear: 800000,
    priceInfo: {
      currency: 'TRY',
      adult: 70,
      child: 35,
      student: 35,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-19:00',
      tuesday: '08:00-19:00',
      wednesday: '08:00-19:00',
      thursday: '08:00-19:00',
      friday: '08:00-19:00',
      saturday: '08:00-19:00',
      sunday: '08:00-19:00',
      notes: "Kış aylarında 17:00'de kapanır",
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '1-2 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: false,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['side-antik-kenti', 'perge'],
    contactInfo: {
      phone: '+90 242 735 7038',
    },
    tips: [
      'Konser takvimini kontrol edin',
      'Şapka ve su getirin',
      'Akustiği test edin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'pergamon',
    name: 'Bergama Antik Kenti (Pergamon)',
    slug: 'bergama-antik-kenti',
    description:
      "Bergama, İzmir'de bulunan ve antik Pergamon krallığının başkenti olan tarihi kenttir. Akropolis, Asklepion ve Kızıl Avlu gibi önemli yapılarıyla UNESCO Dünya Mirası listesinde yer almaktadır.",
    shortDescription: 'Antik Pergamon krallığının başkenti',
    category: 'historical',
    subcategory: 'Antik Kent',
    tags: ['İzmir', 'Pergamon', 'Akropolis', 'Asklepion', 'UNESCO'],
    coordinates: { latitude: 39.1203, longitude: 27.1808 },
    address: {
      city: 'İzmir',
      district: 'Bergama',
      fullAddress: 'Akropol, 35700 Bergama/İzmir',
    },
    region: 'ege',
    icon: '🏛️',
    photos: [
      {
        id: 'per-1',
        url: 'https://example.com/pergamon-main.jpg',
        thumbnail: 'https://example.com/pergamon-thumb.jpg',
        caption: 'Pergamon Akropolü',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.4,
      count: 7850,
      breakdown: {
        location: 4.6,
        service: 4.3,
        value: 4.4,
        cleanliness: 4.2,
        atmosphere: 4.5,
      },
    },
    popularityScore: 76,
    visitorsPerYear: 450000,
    priceInfo: {
      currency: 'TRY',
      adult: 60,
      child: 30,
      student: 30,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-19:00',
      tuesday: '08:00-19:00',
      wednesday: '08:00-19:00',
      thursday: '08:00-19:00',
      friday: '08:00-19:00',
      saturday: '08:00-19:00',
      sunday: '08:00-19:00',
      notes: "Kış aylarında 17:00'de kapanır",
    },
    bestTimeToVisit: ['İlkbahar', 'Sonbahar'],
    estimatedDuration: '3-4 saat',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
    },
    nearbyPlaces: ['bergama-museum'],
    contactInfo: {
      phone: '+90 232 631 2884',
    },
    tips: [
      'Teleferik kullanın',
      'Rehberli tur önerilir',
      'Su ve şapka getirin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'ani-ruins',
    name: 'Ani Harabeleri',
    slug: 'ani-harabeleri',
    description:
      'Ani, Kars ilinde bulunan ve Orta Çağ\'da Ermeni krallığının başkenti olan tarihi şehir harabeleridir. "1001 Kilise Şehri" olarak anılan Ani, büyüleyici mimarisi ve tarihi önemiyle UNESCO Dünya Mirası listesindedir.',
    shortDescription: "1001 Kilise Şehri'nin harabeleri",
    category: 'historical',
    subcategory: 'Antik Kent',
    tags: ['Kars', 'Ani', 'Ermeni', 'Kilise', 'UNESCO'],
    coordinates: { latitude: 40.5058, longitude: 43.5719 },
    address: {
      city: 'Kars',
      district: 'Merkez',
      fullAddress: 'Ocaklı Köyü, Kars',
    },
    region: 'dogu_anadolu',
    icon: '⛪',
    photos: [
      {
        id: 'ani-1',
        url: 'https://example.com/ani-main.jpg',
        thumbnail: 'https://example.com/ani-thumb.jpg',
        caption: 'Ani Harabeleri',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.3,
      count: 4250,
      breakdown: {
        location: 4.7,
        service: 4.0,
        value: 4.2,
        cleanliness: 4.1,
        atmosphere: 4.6,
      },
    },
    popularityScore: 72,
    visitorsPerYear: 180000,
    priceInfo: {
      currency: 'TRY',
      adult: 30,
      child: 15,
      student: 15,
      isFree: false,
    },
    workingHours: {
      monday: '08:00-17:00',
      tuesday: '08:00-17:00',
      wednesday: '08:00-17:00',
      thursday: '08:00-17:00',
      friday: '08:00-17:00',
      saturday: '08:00-17:00',
      sunday: '08:00-17:00',
      notes: 'Kış aylarında hava şartlarına bağlı',
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: '2-3 saat',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: false,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['kars-castle'],
    contactInfo: {
      phone: '+90 474 212 1489',
    },
    tips: [
      'Sıcak kıyafet getirin',
      'Rehberli tur önerilir',
      'Hava durumunu kontrol edin',
    ],
    warnings: ['Soğuk hava', 'Rüzgarlı olabilir'],
    seasonalAvailability: ['İlkbahar', 'Yaz', 'Sonbahar'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'safranbolu',
    name: 'Safranbolu Tarihi Evleri',
    slug: 'safranbolu-tarihi-evleri',
    description:
      'Safranbolu, Karabük ilinde bulunan ve geleneksel Osmanlı mimarisinin en güzel örneklerini barındıran tarihi bir şehirdir. Ahşap evleri, çarşısı ve hamamlarıyla UNESCO Dünya Mirası listesindedir.',
    shortDescription: 'Geleneksel Osmanlı mimarisinin şaheseri',
    category: 'cultural',
    subcategory: 'Tarihi Şehir',
    tags: ['Karabük', 'Osmanlı', 'Ahşap Ev', 'Safran', 'UNESCO'],
    coordinates: { latitude: 41.2567, longitude: 32.6939 },
    address: {
      city: 'Karabük',
      district: 'Safranbolu',
      fullAddress: 'Çarşı, 78600 Safranbolu/Karabük',
    },
    region: 'karadeniz',
    icon: '🏘️',
    photos: [
      {
        id: 'saf-1',
        url: 'https://example.com/safranbolu-main.jpg',
        thumbnail: 'https://example.com/safranbolu-thumb.jpg',
        caption: 'Safranbolu tarihi evleri',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.6,
      count: 8950,
      breakdown: {
        location: 4.7,
        service: 4.5,
        value: 4.6,
        cleanliness: 4.5,
        atmosphere: 4.8,
      },
    },
    popularityScore: 83,
    visitorsPerYear: 680000,
    priceInfo: {
      currency: 'TRY',
      adult: 0,
      isFree: true,
    },
    workingHours: {
      monday: '24 saat',
      tuesday: '24 saat',
      wednesday: '24 saat',
      thursday: '24 saat',
      friday: '24 saat',
      saturday: '24 saat',
      sunday: '24 saat',
      notes: 'Müze evler için ayrı giriş ücretleri',
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: 'Tam gün',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['incekaya-aqueduct'],
    contactInfo: {
      phone: '+90 370 725 4001',
      website: 'https://safranboluturizm.gov.tr',
    },
    tips: [
      'Geleneksel konaklarda kalın',
      'Safran ürünleri satın alın',
      'Çarşıyı gezin',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'mevlana-museum',
    name: 'Mevlâna Müzesi',
    slug: 'mevlana-muzesi',
    description:
      "Mevlâna Müzesi, Konya'da bulunan ve büyük İslam mutasavvıfı Mevlâna Celaleddin Rumi'nin türbesinin bulunduğu müzedir. Mevlevi kültürü ve tasavvuf geleneğinin merkezi olan bu müze, manevi atmosferiyle ziyaretçilerini etkiler.",
    shortDescription: "Mevlâna'nın huzurlu mabedi",
    category: 'cultural',
    subcategory: 'Müze',
    tags: ['Konya', 'Mevlâna', 'Tasavvuf', 'Rumi', 'Türbe'],
    coordinates: { latitude: 37.8714, longitude: 32.5047 },
    address: {
      city: 'Konya',
      district: 'Meram',
      neighborhood: 'Aziziye',
      fullAddress: 'Aziziye, Mevlâna Cd. No:1, 42030 Meram/Konya',
    },
    region: 'ic_anadolu',
    icon: '🕌',
    photos: [
      {
        id: 'mev-1',
        url: 'https://example.com/mevlana-main.jpg',
        thumbnail: 'https://example.com/mevlana-thumb.jpg',
        caption: 'Mevlâna Müzesi',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.7,
      count: 16250,
      breakdown: {
        location: 4.8,
        service: 4.6,
        value: 4.8,
        cleanliness: 4.7,
        atmosphere: 4.9,
      },
    },
    popularityScore: 85,
    visitorsPerYear: 2200000,
    priceInfo: {
      currency: 'TRY',
      adult: 0,
      isFree: true,
    },
    workingHours: {
      monday: 'Kapalı',
      tuesday: '09:00-18:30',
      wednesday: '09:00-18:30',
      thursday: '09:00-18:30',
      friday: '09:00-18:30',
      saturday: '09:00-18:30',
      sunday: '09:00-18:30',
      notes: 'Pazartesi günleri kapalı',
    },
    bestTimeToVisit: ['Her mevsim'],
    estimatedDuration: '1-2 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: true,
      guidedTours: true,
      audioGuide: true,
      languages: ['Türkçe', 'İngilizce', 'Arapça', 'Farsça'],
    },
    nearbyPlaces: ['alaeddin-hill', 'karatay-medrese'],
    contactInfo: {
      phone: '+90 332 351 1215',
      website: 'https://mevlanamuzesi.gov.tr',
    },
    tips: ['Saygılı davranın', 'Uygun kıyafet giyinin', 'Sessizce gezin'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'duden-waterfalls',
    name: 'Düden Şelalesi',
    slug: 'duden-selalesi',
    description:
      "Düden Şelalesi, Antalya'da bulunan ve Düden Çayı'nın oluşturduğu muhteşem bir doğa harikasıdır. Üst Düden ve Alt Düden olmak üzere iki bölümden oluşan şelale, özellikle Alt Düden'in denize döküldüğü nokta büyüleyicidir.",
    shortDescription: "Antalya'nın muhteşem doğa harikası",
    category: 'natural',
    subcategory: 'Şelale',
    tags: ['Antalya', 'Şelale', 'Doğa', 'Düden Çayı', 'Piknik'],
    coordinates: { latitude: 36.8403, longitude: 30.5806 },
    address: {
      city: 'Antalya',
      district: 'Kepez',
      fullAddress: 'Düden, 07230 Kepez/Antalya',
    },
    region: 'akdeniz',
    icon: '💧',
    photos: [
      {
        id: 'dud-1',
        url: 'https://example.com/duden-main.jpg',
        thumbnail: 'https://example.com/duden-thumb.jpg',
        caption: 'Düden Şelalesi',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.5,
      count: 13750,
      breakdown: {
        location: 4.6,
        service: 4.4,
        value: 4.7,
        cleanliness: 4.3,
        atmosphere: 4.6,
      },
    },
    popularityScore: 79,
    visitorsPerYear: 950000,
    priceInfo: {
      currency: 'TRY',
      adult: 0,
      isFree: true,
    },
    workingHours: {
      monday: '24 saat',
      tuesday: '24 saat',
      wednesday: '24 saat',
      thursday: '24 saat',
      friday: '24 saat',
      saturday: '24 saat',
      sunday: '24 saat',
    },
    bestTimeToVisit: ['İlkbahar', 'Yaz', 'Sonbahar'],
    estimatedDuration: '2-3 saat',
    accessibility: {
      wheelchairAccessible: true,
      publicTransport: true,
      parking: true,
      guidedTours: false,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['antalya-kaleici', 'konyaalti-beach'],
    contactInfo: {
      website: 'https://antalya.ktb.gov.tr',
    },
    tips: [
      'Piknik malzemesi getirin',
      'Kameraya dikkat edin',
      'Yaz aylarında daha güzel',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },

  {
    id: 'mount-ararat',
    name: 'Ağrı Dağı (Ararat)',
    slug: 'agri-dagi',
    description:
      "Ağrı Dağı, Türkiye'nin en yüksek dağı olup 5137 metre yüksekliğindedir. Nuh'un Gemisi efsanesiyle ünlü bu volkanik dağ, dağcılık ve trekking için popüler bir destinasyondur. Kar örtüsü yıl boyunca görülebilir.",
    shortDescription: "Türkiye'nin en yüksek dağı",
    category: 'natural',
    subcategory: 'Dağ',
    tags: ['Ağrı', 'Dağcılık', 'Trekking', 'Nuh Gemisi', 'Volkan'],
    coordinates: { latitude: 39.7019, longitude: 44.2978 },
    address: {
      city: 'Ağrı',
      district: 'Merkez',
      fullAddress: 'Ağrı Dağı Milli Parkı, Ağrı',
    },
    region: 'dogu_anadolu',
    icon: '🏔️',
    photos: [
      {
        id: 'ara-1',
        url: 'https://example.com/ararat-main.jpg',
        thumbnail: 'https://example.com/ararat-thumb.jpg',
        caption: 'Ağrı Dağı',
        isPrimary: true,
      },
    ],
    rating: {
      average: 4.4,
      count: 3250,
      breakdown: {
        location: 4.8,
        service: 4.0,
        value: 4.3,
        cleanliness: 4.2,
        atmosphere: 4.7,
      },
    },
    popularityScore: 71,
    visitorsPerYear: 120000,
    priceInfo: {
      currency: 'TRY',
      adult: 50,
      child: 25,
      student: 25,
      isFree: false,
    },
    workingHours: {
      monday: 'Mevsimsel',
      tuesday: 'Mevsimsel',
      wednesday: 'Mevsimsel',
      thursday: 'Mevsimsel',
      friday: 'Mevsimsel',
      saturday: 'Mevsimsel',
      sunday: 'Mevsimsel',
      notes: 'Tırmanış için özel izin gerekli',
    },
    bestTimeToVisit: ['Yaz'],
    estimatedDuration: 'Çok günlük',
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: false,
      parking: true,
      guidedTours: true,
      audioGuide: false,
      languages: ['Türkçe', 'İngilizce'],
    },
    nearbyPlaces: ['ishak-pasha-palace'],
    contactInfo: {
      phone: '+90 472 215 1074',
    },
    tips: [
      'Deneyimli rehber alın',
      'Özel izin gerekli',
      'Dağcılık ekipmanı şart',
    ],
    warnings: ['Yüksek irtifa', 'Zorlu tırmanış', 'Hava değişimleri'],
    seasonalAvailability: ['Yaz'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isActive: true,
    isFeatured: false,
  },
];

// Veri arama ve filtreleme fonksiyonları
export const searchPlaces = (query: string): TouristPlace[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase().trim();
  const queryWords = lowercaseQuery.split(' ').filter(word => word.length > 0);

  return touristPlaces
    .filter(place => {
      // 1. İsim araması - En yüksek öncelik
      const nameMatch = place.name.toLowerCase().includes(lowercaseQuery);

      // 2. Kısa açıklama araması
      const shortDescMatch = place.shortDescription
        .toLowerCase()
        .includes(lowercaseQuery);

      // 3. Şehir ve ilçe araması
      const cityMatch = place.address.city
        .toLowerCase()
        .includes(lowercaseQuery);
      const districtMatch = place.address.district
        .toLowerCase()
        .includes(lowercaseQuery);

      // 4. Kategori araması (Türkçe kategori isimleri)
      const categoryMatch = categories.some(
        cat =>
          cat.id === place.category &&
          cat.name.toLowerCase().includes(lowercaseQuery),
      );

      // 5. Alt kategori araması
      const subcategoryMatch =
        place.subcategory?.toLowerCase().includes(lowercaseQuery) || false;

      // 6. Etiket araması
      const tagsMatch = place.tags.some(tag =>
        tag.toLowerCase().includes(lowercaseQuery),
      );

      // 7. Uzun açıklama araması
      const descriptionMatch = place.description
        .toLowerCase()
        .includes(lowercaseQuery);

      // 8. Çoklu kelime araması - Tüm kelimeler bulunmalı
      const multiWordMatch =
        queryWords.length > 1
          ? queryWords.every(
              word =>
                place.name.toLowerCase().includes(word) ||
                place.description.toLowerCase().includes(word) ||
                place.address.city.toLowerCase().includes(word) ||
                place.tags.some(tag => tag.toLowerCase().includes(word)),
            )
          : false;

      // 9. Bölge araması
      const regionMatch = place.region.toLowerCase().includes(lowercaseQuery);

      // 10. İpuçları araması
      const tipsMatch =
        place.tips?.some(tip => tip.toLowerCase().includes(lowercaseQuery)) ||
        false;

      // Herhangi bir eşleşme varsa true döndür
      return (
        nameMatch ||
        shortDescMatch ||
        cityMatch ||
        districtMatch ||
        categoryMatch ||
        subcategoryMatch ||
        tagsMatch ||
        descriptionMatch ||
        multiWordMatch ||
        regionMatch ||
        tipsMatch
      );
    })
    .sort((a, b) => {
      // Sonuçları relevansa göre sırala
      const aScore = calculateRelevanceScore(a, lowercaseQuery);
      const bScore = calculateRelevanceScore(b, lowercaseQuery);
      return bScore - aScore;
    });
};

// Relevans skoru hesaplama fonksiyonu
const calculateRelevanceScore = (
  place: TouristPlace,
  query: string,
): number => {
  let score = 0;

  // İsim eşleşmesi en yüksek puan
  if (place.name.toLowerCase().includes(query)) {
    score += place.name.toLowerCase() === query ? 100 : 50;
  }

  // Şehir eşleşmesi
  if (place.address.city.toLowerCase().includes(query)) {
    score += place.address.city.toLowerCase() === query ? 80 : 30;
  }

  // Kategori eşleşmesi
  const categoryMatch = categories.find(
    cat => cat.id === place.category && cat.name.toLowerCase().includes(query),
  );
  if (categoryMatch) {
    score += 40;
  }

  // Popülerlik bonusu
  score += place.popularityScore * 0.1;

  // Öne çıkan yerler bonusu
  if (place.isFeatured) {
    score += 10;
  }

  // Rating bonusu
  score += place.rating.average * 2;

  return score;
};

export const getPlacesByCategory = (category: string): TouristPlace[] => {
  return touristPlaces.filter(place => place.category === category);
};

export const getPlacesByRegion = (region: string): TouristPlace[] => {
  return touristPlaces.filter(place => place.region === region);
};

export const getFeaturedPlaces = (): TouristPlace[] => {
  return touristPlaces.filter(place => place.isFeatured);
};

export const getPopularPlaces = (limit: number = 10): TouristPlace[] => {
  return touristPlaces
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
};

export const getPlaceById = (id: string): TouristPlace | undefined => {
  return touristPlaces.find(place => place.id === id);
};

export const getPlacesByCity = (city: string): TouristPlace[] => {
  return touristPlaces.filter(
    place => place.address.city.toLowerCase() === city.toLowerCase(),
  );
};

// İstatistikler
export const getStatistics = () => {
  return {
    totalPlaces: touristPlaces.length,
    totalCategories: categories.length,
    totalCities: new Set(touristPlaces.map(p => p.address.city)).size,
    averageRating:
      touristPlaces.reduce((sum, p) => sum + p.rating.average, 0) /
      touristPlaces.length,
    totalVisitorsPerYear: touristPlaces.reduce(
      (sum, p) => sum + (p.visitorsPerYear || 0),
      0,
    ),
  };
};

// Gelişmiş arama özelliklerini destekleyen yardımcı fonksiyonlar

// Arama önerileri fonksiyonu
export const getSearchSuggestions = (query: string): string[] => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  // Şehir önerileri
  touristPlaces.forEach(place => {
    if (place.address.city.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(place.address.city);
    }
    if (place.address.district.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(place.address.district);
    }
  });

  // Kategori önerileri
  categories.forEach(category => {
    if (category.name.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(category.name);
    }
  });

  // Popüler yer isimleri
  touristPlaces
    .filter(place => place.name.toLowerCase().includes(lowercaseQuery))
    .slice(0, 5)
    .forEach(place => suggestions.add(place.name));

  return Array.from(suggestions).slice(0, 8);
};

// Fuzzy search - yakın eşleşmeler için
export const fuzzySearchPlaces = (
  query: string,
  threshold: number = 0.6,
): TouristPlace[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase();

  return touristPlaces
    .filter(place => {
      const similarity = calculateSimilarity(
        place.name.toLowerCase(),
        lowercaseQuery,
      );
      return similarity >= threshold;
    })
    .slice(0, 10);
};

// String similarity hesaplama (Levenshtein distance tabanlı)
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return 1.0;
  }

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

// Levenshtein distance algoritması
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

// Gelişmiş filtreleme seçenekleri
export interface SearchFilters {
  categories?: string[];
  regions?: string[];
  cities?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  minRating?: number;
  isFree?: boolean;
  hasParking?: boolean;
  wheelchairAccessible?: boolean;
  hasGuidedTours?: boolean;
}

// Filtreleme ile arama
export const searchPlacesWithFilters = (
  query: string,
  filters: SearchFilters = {},
): TouristPlace[] => {
  let results = query ? searchPlaces(query) : touristPlaces;

  // Kategori filtresi
  if (filters.categories && filters.categories.length > 0) {
    results = results.filter(place =>
      filters.categories!.includes(place.category),
    );
  }

  // Bölge filtresi
  if (filters.regions && filters.regions.length > 0) {
    results = results.filter(place => filters.regions!.includes(place.region));
  }

  // Şehir filtresi
  if (filters.cities && filters.cities.length > 0) {
    results = results.filter(place =>
      filters.cities!.some(
        city => place.address.city.toLowerCase() === city.toLowerCase(),
      ),
    );
  }

  // Fiyat aralığı filtresi
  if (filters.priceRange) {
    results = results.filter(place => {
      const price = place.priceInfo.adult;
      return (
        price >= filters.priceRange!.min && price <= filters.priceRange!.max
      );
    });
  }

  // Minimum rating filtresi
  if (filters.minRating) {
    results = results.filter(
      place => place.rating.average >= filters.minRating!,
    );
  }

  // Ücretsiz yerler filtresi
  if (filters.isFree !== undefined) {
    results = results.filter(
      place => place.priceInfo.isFree === filters.isFree,
    );
  }

  // Park yeri filtresi
  if (filters.hasParking !== undefined) {
    results = results.filter(
      place => place.accessibility.parking === filters.hasParking,
    );
  }

  // Tekerlekli sandalye erişimi filtresi
  if (filters.wheelchairAccessible !== undefined) {
    results = results.filter(
      place =>
        place.accessibility.wheelchairAccessible ===
        filters.wheelchairAccessible,
    );
  }

  // Rehberli tur filtresi
  if (filters.hasGuidedTours !== undefined) {
    results = results.filter(
      place => place.accessibility.guidedTours === filters.hasGuidedTours,
    );
  }

  return results;
};

// Popüler arama terimleri
export const getPopularSearchTerms = (): string[] => {
  return [
    'İstanbul',
    'Kapadokya',
    'Antalya',
    'Pamukkale',
    'Efes',
    'Ayasofya',
    'Topkapı Sarayı',
    'Galata Kulesi',
    'Ölüdeniz',
    'Sümela Manastırı',
    'Nemrut Dağı',
    'Aspendos',
    'Safranbolu',
    'Mevlâna Müzesi',
    'Truva',
  ];
};
