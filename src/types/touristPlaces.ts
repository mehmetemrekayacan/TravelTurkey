/**
 * TravelTurkey - Tourist Places Database Types
 * Turistik yerler veritabanı tip tanımları
 */

// Koordinat bilgisi
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Adres bilgisi
export interface Address {
  city: string;
  district: string;
  neighborhood?: string;
  fullAddress: string;
}

// Fiyat bilgisi
export interface PriceInfo {
  currency: string;
  adult: number;
  child?: number;
  student?: number;
  senior?: number;
  family?: number;
  isFree: boolean;
}

// Çalışma saatleri
export interface WorkingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  notes?: string;
}

// Değerlendirme bilgisi
export interface Rating {
  average: number;
  count: number;
  breakdown: {
    location: number;
    service: number;
    value: number;
    cleanliness: number;
    atmosphere: number;
  };
}

// Fotoğraf bilgisi
export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  photographer?: string;
  isPrimary: boolean;
}

// İletişim bilgisi
export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

// Ana turistik yer interface'i
export interface TouristPlace {
  // Temel bilgiler
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;

  // Kategori ve etiketler
  category:
    | 'historical'
    | 'natural'
    | 'cultural'
    | 'religious'
    | 'entertainment'
    | 'beach'
    | 'adventure'
    | 'shopping';
  subcategory: string;
  tags: string[];

  // Konum bilgileri
  coordinates: Coordinates;
  address: Address;
  region:
    | 'marmara'
    | 'ege'
    | 'akdeniz'
    | 'ic_anadolu'
    | 'karadeniz'
    | 'dogu_anadolu'
    | 'guneydogu_anadolu';

  // Görsel içerik
  icon: string; // Emoji
  photos: Photo[];
  virtualTourUrl?: string;

  // Değerlendirme ve popülerlik
  rating: Rating;
  popularityScore: number; // 1-100 arası
  visitorsPerYear?: number;

  // Ziyaret bilgileri
  priceInfo: PriceInfo;
  workingHours: WorkingHours;
  bestTimeToVisit: string[];
  estimatedDuration: string; // "2-3 hours", "half day", "full day"

  // Erişibilirlik
  accessibility: {
    wheelchairAccessible: boolean;
    publicTransport: boolean;
    parking: boolean;
    guidedTours: boolean;
    audioGuide: boolean;
    languages: string[];
  };

  // Yakındaki yerler
  nearbyPlaces: string[]; // Other place IDs
  nearbyRestaurants?: string[];
  nearbyHotels?: string[];

  // İletişim ve pratik bilgiler
  contactInfo: ContactInfo;
  tips: string[];
  warnings?: string[];

  // Meta bilgiler
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isFeatured: boolean;
  seasonalAvailability?: string[];
}

// Kategori bilgileri
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  placesCount: number;
}

// Şehir bilgileri
export interface City {
  id: string;
  name: string;
  region: string;
  coordinates: Coordinates;
  description: string;
  photo: string;
  placesCount: number;
  isPopular: boolean;
}
