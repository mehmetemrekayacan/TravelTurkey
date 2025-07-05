/**
 * TravelTurkey - Modern Profile Screen Template
 * Advanced TypeScript component with user settings and preferences
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Alert,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../constants/Colors';
import { Typography, Spacing, Shadows } from '../../styles/theme';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../types/navigation';

// TypeScript Interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  location?: string;
  joinDate: string;
  preferences: UserPreferences;
  stats: UserStats;
}

interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    locationTracking: boolean;
    dataCollection: boolean;
  };
  display: {
    darkMode: boolean;
    language: string;
    currency: string;
  };
}

interface UserStats {
  totalTrips: number;
  visitedPlaces: number;
  savedPlaces: number;
  reviewsWritten: number;
}

interface ProfileScreenProps
  extends BottomTabScreenProps<BottomTabParamList, 'ProfileTab'> {}

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface StatsCard {
  title: string;
  value: number;
  icon: string;
  color: string;
}

// Profile Header Component
const ProfileHeader: React.FC<{
  profile: UserProfile;
  onEditPress: () => void;
}> = React.memo(({ profile, onEditPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <View style={styles.profileHeader}>
      <TouchableOpacity
        onPress={onEditPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View
          style={[
            styles.avatarContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.avatar}>
            <Icon name='person' size={48} color={AppColors.WHITE} />
          </View>
          <View style={styles.editBadge}>
            <Icon name='edit' size={16} color={AppColors.WHITE} />
          </View>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
        {profile.location && (
          <View style={styles.locationContainer}>
            <Icon
              name='location-on'
              size={16}
              color={AppColors.TEXT_SECONDARY}
            />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
        )}
        <Text style={styles.joinDate}>
          {profile.joinDate} tarihinden beri üye
        </Text>
      </View>
    </View>
  );
});

// Stats Grid Component
const StatsGrid: React.FC<{ stats: UserStats }> = React.memo(({ stats }) => {
  const statsData: StatsCard[] = [
    {
      title: 'Gezilen Yerler',
      value: stats.visitedPlaces,
      icon: 'place',
      color: AppColors.PRIMARY,
    },
    {
      title: 'Toplam Seyahat',
      value: stats.totalTrips,
      icon: 'flight',
      color: AppColors.SUCCESS,
    },
    {
      title: 'Kaydedilen',
      value: stats.savedPlaces,
      icon: 'bookmark',
      color: AppColors.WARNING,
    },
    {
      title: 'Değerlendirme',
      value: stats.reviewsWritten,
      icon: 'star',
      color: AppColors.INFO,
    },
  ];

  return (
    <View style={styles.statsGrid}>
      {statsData.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
            <Icon name={stat.icon} size={24} color={AppColors.WHITE} />
          </View>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statTitle}>{stat.title}</Text>
        </View>
      ))}
    </View>
  );
});

// Settings Section Component
const SettingsSection: React.FC<{
  title: string;
  items: SettingItem[];
  onItemToggle: (itemId: string, value: boolean) => void;
}> = React.memo(({ title, items, onItemToggle }) => {
  return (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.settingItem}
          onPress={item.onPress}
          disabled={item.type === 'toggle'}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Icon
                name={item.icon}
                size={20}
                color={AppColors.TEXT_SECONDARY}
              />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>
          </View>

          <View style={styles.settingRight}>
            {item.type === 'toggle' && (
              <Switch
                value={item.value || false}
                onValueChange={value => {
                  if (item.onToggle) {
                    item.onToggle(value);
                  }
                  onItemToggle(item.id, value);
                }}
                trackColor={{
                  false: AppColors.BG_SECONDARY,
                  true: `${AppColors.PRIMARY}80`,
                }}
                thumbColor={
                  item.value ? AppColors.PRIMARY : AppColors.TEXT_LIGHT
                }
              />
            )}
            {item.type === 'navigation' && (
              <Icon
                name='chevron-right'
                size={20}
                color={AppColors.TEXT_SECONDARY}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

// Main Profile Screen Component
const ProfileScreenTemplate: React.FC<ProfileScreenProps> = ({
  navigation: _navigation,
}) => {
  // State Management
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Animation References
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockProfile: UserProfile = {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        location: 'İstanbul, Türkiye',
        joinDate: 'Ocak 2024',
        preferences: {
          notifications: {
            push: true,
            email: true,
            marketing: false,
          },
          privacy: {
            profileVisible: true,
            locationTracking: true,
            dataCollection: false,
          },
          display: {
            darkMode: false,
            language: 'tr',
            currency: 'TRY',
          },
        },
        stats: {
          totalTrips: 12,
          visitedPlaces: 45,
          savedPlaces: 23,
          reviewsWritten: 8,
        },
      };

      setProfile(mockProfile);
      setIsLoading(false);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    };

    loadProfile();
  }, [fadeAnim, slideAnim]);

  // Handlers
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleEditProfile = useCallback(() => {
    console.log('Edit profile');
  }, []);

  const handleSettingToggle = useCallback(
    (itemId: string, value: boolean) => {
      if (!profile) return;

      setProfile(prev => {
        if (!prev) return prev;

        const updatedProfile = { ...prev };

        // Update preferences based on item ID
        if (itemId.includes('notifications.')) {
          const key = itemId.split(
            '.',
          )[1] as keyof typeof prev.preferences.notifications;
          updatedProfile.preferences.notifications[key] = value;
        } else if (itemId.includes('privacy.')) {
          const key = itemId.split(
            '.',
          )[1] as keyof typeof prev.preferences.privacy;
          updatedProfile.preferences.privacy[key] = value;
        } else if (itemId.includes('display.')) {
          const key = itemId.split(
            '.',
          )[1] as keyof typeof prev.preferences.display;
          if (key === 'darkMode') {
            updatedProfile.preferences.display[key] = value;
          }
        }

        return updatedProfile;
      });
    },
    [profile],
  );

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => console.log('Logout'),
        },
      ],
    );
  }, []);

  // Settings configuration
  const settingsData = useMemo(() => {
    if (!profile) return [];

    return [
      {
        title: 'Bildirimler',
        items: [
          {
            id: 'notifications.push',
            title: 'Push Bildirimleri',
            subtitle: 'Uygulama bildirimleri',
            icon: 'notifications',
            type: 'toggle' as const,
            value: profile.preferences.notifications.push,
          },
          {
            id: 'notifications.email',
            title: 'E-posta Bildirimleri',
            subtitle: 'E-posta ile bildirimler',
            icon: 'mail',
            type: 'toggle' as const,
            value: profile.preferences.notifications.email,
          },
          {
            id: 'notifications.marketing',
            title: 'Pazarlama Bildirimleri',
            subtitle: 'Promosyon ve kampanyalar',
            icon: 'campaign',
            type: 'toggle' as const,
            value: profile.preferences.notifications.marketing,
          },
        ],
      },
      {
        title: 'Gizlilik',
        items: [
          {
            id: 'privacy.profileVisible',
            title: 'Profil Görünürlüğü',
            subtitle: 'Profiliniz diğer kullanıcılara görünsün',
            icon: 'visibility',
            type: 'toggle' as const,
            value: profile.preferences.privacy.profileVisible,
          },
          {
            id: 'privacy.locationTracking',
            title: 'Konum Takibi',
            subtitle: 'Öneriler için konumunuzu kullan',
            icon: 'location-on',
            type: 'toggle' as const,
            value: profile.preferences.privacy.locationTracking,
          },
          {
            id: 'privacy.dataCollection',
            title: 'Veri Toplama',
            subtitle: 'Analitik ve geliştirme',
            icon: 'analytics',
            type: 'toggle' as const,
            value: profile.preferences.privacy.dataCollection,
          },
        ],
      },
      {
        title: 'Görünüm',
        items: [
          {
            id: 'display.darkMode',
            title: 'Karanlık Mod',
            subtitle: 'Gece modu aktif et',
            icon: 'dark-mode',
            type: 'toggle' as const,
            value: profile.preferences.display.darkMode,
          },
          {
            id: 'language',
            title: 'Dil',
            subtitle: 'Türkçe',
            icon: 'language',
            type: 'navigation' as const,
            onPress: () => console.log('Language settings'),
          },
          {
            id: 'currency',
            title: 'Para Birimi',
            subtitle: 'Türk Lirası (₺)',
            icon: 'attach-money',
            type: 'navigation' as const,
            onPress: () => console.log('Currency settings'),
          },
        ],
      },
      {
        title: 'Hesap',
        items: [
          {
            id: 'help',
            title: 'Yardım ve Destek',
            icon: 'help',
            type: 'navigation' as const,
            onPress: () => console.log('Help'),
          },
          {
            id: 'about',
            title: 'Hakkında',
            icon: 'info',
            type: 'navigation' as const,
            onPress: () => console.log('About'),
          },
          {
            id: 'logout',
            title: 'Çıkış Yap',
            icon: 'logout',
            type: 'action' as const,
            onPress: handleLogout,
          },
        ],
      },
    ];
  }, [profile, handleLogout]);

  if (isLoading || !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Profil yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[AppColors.PRIMARY]}
            tintColor={AppColors.PRIMARY}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ProfileHeader profile={profile} onEditPress={handleEditProfile} />
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <StatsGrid stats={profile.stats} />
        </Animated.View>

        {/* Settings Sections */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {settingsData.map((section: any, index: number) => (
            <SettingsSection
              key={index}
              title={section.title}
              items={section.items}
              onItemToggle={handleSettingToggle}
            />
          ))}
        </Animated.View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>TravelTurkey v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: AppColors.BG_PRIMARY,
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AppColors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.SUCCESS,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: AppColors.BG_PRIMARY,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: Spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  locationText: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
    marginLeft: Spacing.xs,
  },
  joinDate: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  statCard: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
  },
  settingsSection: {
    backgroundColor: AppColors.BG_PRIMARY,
    marginBottom: Spacing.md,
    paddingVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    color: AppColors.TEXT_PRIMARY,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.BG_SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs / 2,
  },
  settingSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
  },
  settingRight: {
    marginLeft: Spacing.md,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_LIGHT,
  },
});

export default ProfileScreenTemplate;
