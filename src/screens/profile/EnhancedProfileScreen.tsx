/**
 * TravelTurkey - Enhanced Profile Screen with Camera Integration (2025)
 * Profile management with photo capture and AI recommendations
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Theme } from '../../styles/theme';
import { useCamera } from '../../hooks/useCamera';
import {
  generateRecommendations,
  updateUserPreferences,
} from '../../services/ai/RecommendationEngine';
import { touristPlaces } from '../../data/touristPlaces';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  visitedPlacesCount: number;
  favoriteCategories: string[];
}

// Separate component for profile header
interface ProfileHeaderProps {
  userProfile: UserProfile;
  isCameraLoading: boolean;
  selectedPhoto: any;
  handlePhotoUpdate: () => void;
  recommendations: any[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  isCameraLoading,
  selectedPhoto,
  handlePhotoUpdate,
  recommendations,
}) => (
  <Animated.View entering={FadeIn.duration(800)} style={styles.headerContainer}>
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={handlePhotoUpdate}
      disabled={isCameraLoading}
    >
      {isCameraLoading ? (
        <ActivityIndicator size='large' color={Theme.colors.primary[500]} />
      ) : selectedPhoto ? (
        <Image
          source={{ uri: selectedPhoto.uri }}
          style={styles.profilePhoto}
        />
      ) : userProfile.profilePhoto ? (
        <Image
          source={{ uri: userProfile.profilePhoto }}
          style={styles.profilePhoto}
        />
      ) : (
        <View style={styles.placeholderPhoto}>
          <Text style={styles.placeholderText}>👤</Text>
          <Text style={styles.photoHint}>Fotoğraf Ekle</Text>
        </View>
      )}
      <View style={styles.cameraIcon}>
        <Text style={styles.cameraIconText}>📷</Text>
      </View>
    </TouchableOpacity>

    <Text style={styles.userName}>{userProfile.name}</Text>
    <Text style={styles.userEmail}>{userProfile.email}</Text>

    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{userProfile.visitedPlacesCount}</Text>
        <Text style={styles.statLabel}>Ziyaret Edilen</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>
          {userProfile.favoriteCategories.length}
        </Text>
        <Text style={styles.statLabel}>Favori Kategori</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{recommendations.length}</Text>
        <Text style={styles.statLabel}>AI Önerisi</Text>
      </View>
    </View>
  </Animated.View>
);

// Separate component for AI recommendations
interface AIRecommendationsProps {
  recommendations: any[];
  isLoadingRecommendations: boolean;
  loadRecommendations: () => void;
  markPlaceAsVisited: (placeId: string) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  isLoadingRecommendations,
  loadRecommendations,
  markPlaceAsVisited,
}) => (
  <Animated.View entering={SlideInDown.delay(400)} style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>🤖 AI Önerileri</Text>
      <TouchableOpacity
        onPress={loadRecommendations}
        disabled={isLoadingRecommendations}
      >
        <Text style={styles.refreshText}>
          {isLoadingRecommendations ? 'Yükleniyor...' : 'Yenile'}
        </Text>
      </TouchableOpacity>
    </View>

    {isLoadingRecommendations ? (
      <ActivityIndicator
        size='small'
        color={Theme.colors.primary[500]}
        style={styles.loader}
      />
    ) : (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recommendationsScroll}
      >
        {recommendations.map((rec, _index) => (
          <TouchableOpacity
            key={rec.place.id}
            style={styles.recommendationCard}
            onPress={() => markPlaceAsVisited(rec.place.id)}
          >
            <Text style={styles.recommendationIcon}>{rec.place.icon}</Text>
            <Text style={styles.recommendationName}>{rec.place.name}</Text>
            <Text style={styles.recommendationScore}>
              Uyum: {Math.round(rec.score * 100)}%
            </Text>
            <Text style={styles.recommendationReason} numberOfLines={2}>
              {rec.reasons[0] || 'Sizin için önerilen'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
  </Animated.View>
);

// Separate component for quick actions
const QuickActions: React.FC = () => (
  <Animated.View entering={SlideInDown.delay(600)} style={styles.section}>
    <Text style={styles.sectionTitle}>🚀 Hızlı İşlemler</Text>

    <View style={styles.actionsGrid}>
      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionIcon}>📱</Text>
        <Text style={styles.actionText}>Fotoğraf Çek</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionIcon}>🎯</Text>
        <Text style={styles.actionText}>Hedefler</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionIcon}>📊</Text>
        <Text style={styles.actionText}>İstatistikler</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Text style={styles.actionIcon}>⚙️</Text>
        <Text style={styles.actionText}>Ayarlar</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>
);

const EnhancedProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Mehmet Yılmaz',
    email: 'mehmet@example.com',
    visitedPlacesCount: 12,
    favoriteCategories: ['historical', 'cultural'],
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  const {
    isLoading: isCameraLoading,
    selectedPhoto,
    showPhotoSelector,
    clearSelectedPhoto,
    savePhoto,
  } = useCamera();

  // Load AI recommendations
  const loadRecommendations = useCallback(async () => {
    setIsLoadingRecommendations(true);
    try {
      const aiRecommendations = await generateRecommendations(touristPlaces, 5);
      setRecommendations(aiRecommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, []);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  // Handle profile photo update
  const handlePhotoUpdate = useCallback(async () => {
    if (!selectedPhoto) {
      await showPhotoSelector();
      return;
    }

    Alert.alert(
      'Profil Fotoğrafı',
      'Bu fotoğrafı profil resmi olarak kullanmak ister misiniz?',
      [
        { text: 'İptal', style: 'cancel', onPress: clearSelectedPhoto },
        {
          text: 'Kaydet',
          onPress: async () => {
            try {
              const saveSuccess = await savePhoto(
                `profile_${userProfile.id}.jpg`,
              );
              if (saveSuccess) {
                // In a real implementation, this would be the actual saved path
                const savedPath = selectedPhoto?.uri || '';
                setUserProfile(prev => ({ ...prev, profilePhoto: savedPath }));
                clearSelectedPhoto();
                Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi!');
              }
            } catch (error) {
              Alert.alert('Hata', 'Fotoğraf kaydedilemedi.');
            }
          },
        },
      ],
    );
  }, [
    selectedPhoto,
    showPhotoSelector,
    clearSelectedPhoto,
    savePhoto,
    userProfile.id,
  ]);

  // Handle place visit (for testing AI)
  const markPlaceAsVisited = useCallback(
    async (placeId: string) => {
      const place = touristPlaces.find(p => p.id === placeId);
      if (place) {
        await updateUserPreferences('visit', { placeId, place });
        setUserProfile(prev => ({
          ...prev,
          visitedPlacesCount: prev.visitedPlacesCount + 1,
        }));
        // Reload recommendations after visit
        loadRecommendations();
        Alert.alert('✅', `${place.name} ziyaret edildi olarak işaretlendi!`);
      }
    },
    [loadRecommendations],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          userProfile={userProfile}
          isCameraLoading={isCameraLoading}
          selectedPhoto={selectedPhoto}
          handlePhotoUpdate={handlePhotoUpdate}
          recommendations={recommendations}
        />
        <AIRecommendations
          recommendations={recommendations}
          isLoadingRecommendations={isLoadingRecommendations}
          loadRecommendations={loadRecommendations}
          markPlaceAsVisited={markPlaceAsVisited}
        />
        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Theme.colors.primary[500],
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Theme.colors.neutral[100],
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme.colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Theme.colors.neutral[100],
  },
  placeholderText: {
    fontSize: 40,
    marginBottom: 4,
  },
  photoHint: {
    fontSize: 12,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Theme.colors.accent.turquoise[500],
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Theme.colors.neutral[100],
  },
  cameraIconText: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.neutral[100],
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: Theme.colors.neutral[200],
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.neutral[100],
  },
  statLabel: {
    fontSize: 12,
    color: Theme.colors.neutral[200],
    marginTop: 4,
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 16,
    ...Theme.shadows.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.neutral[800],
  },
  refreshText: {
    color: Theme.colors.primary[500],
    fontSize: 14,
    fontWeight: '600',
  },
  loader: {
    paddingVertical: 20,
  },
  recommendationsScroll: {
    marginHorizontal: -8,
  },
  recommendationCard: {
    width: 140,
    padding: 12,
    marginHorizontal: 8,
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  recommendationIcon: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  recommendationName: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.neutral[800],
    textAlign: 'center',
    marginBottom: 4,
  },
  recommendationScore: {
    fontSize: 12,
    color: Theme.colors.primary[500],
    textAlign: 'center',
    marginBottom: 4,
  },
  recommendationReason: {
    fontSize: 10,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.neutral[700],
  },
});

export default EnhancedProfileScreen;
