/**
 * TravelTurkey - Simple Profile Screen (Profil)
 * Placeholder component for user profile screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../constants/Colors';

const SimpleProfileScreen: React.FC = () => {
  const handleMenuPress = (action: string) => {
    // TODO: Implement navigation to specific screens
    console.log('Menu action:', action);
  };

  const menuItems = [
    {
      id: 'personal',
      title: 'Kişisel Bilgiler',
      icon: 'person',
      color: AppColors.PRIMARY,
    },
    {
      id: 'reservations',
      title: 'Rezervasyonlarım',
      icon: 'event',
      color: AppColors.SECONDARY,
    },
    {
      id: 'favorites',
      title: 'Favori Yerler',
      icon: 'favorite',
      color: AppColors.ERROR,
    },
    {
      id: 'history',
      title: 'Seyahat Geçmişi',
      icon: 'history',
      color: AppColors.INFO,
    },
    {
      id: 'settings',
      title: 'Ayarlar',
      icon: 'settings',
      color: AppColors.TEXT_SECONDARY,
    },
    { id: 'help', title: 'Yardım', icon: 'help', color: AppColors.WARNING },
    { id: 'about', title: 'Hakkında', icon: 'info', color: AppColors.INFO },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Icon name='person' size={60} color={AppColors.BG_PRIMARY} />
          </View>
          <Text style={styles.userName}>Mehmet Özkan</Text>
          <Text style={styles.userEmail}>mehmet.ozkan@email.com</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Ziyaret</Text>
            </View>
            <View style={[styles.statItem, styles.statItemMiddle]}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Plan</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Favori</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Hesap</Text>

          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.id)}
            >
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: `${item.color}15` },
                ]}
              >
                <Icon name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Icon
                name='chevron-right'
                size={24}
                color={AppColors.TEXT_SECONDARY}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Travel Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Seyahat Başarıları</Text>

          <View style={styles.achievementGrid}>
            <View style={styles.achievementCard}>
              <Icon name='explore' size={32} color={AppColors.GOLDEN_HORN} />
              <Text style={styles.achievementTitle}>Kaşif</Text>
              <Text style={styles.achievementDesc}>10+ şehir ziyaret etti</Text>
            </View>

            <View style={styles.achievementCard}>
              <Icon name='camera-alt' size={32} color={AppColors.BOSPHORUS} />
              <Text style={styles.achievementTitle}>Fotoğrafçı</Text>
              <Text style={styles.achievementDesc}>50+ fotoğraf paylaştı</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleMenuPress('logout')}
        >
          <Icon name='logout' size={24} color={AppColors.ERROR} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: AppColors.BG_PRIMARY,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statItemMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.BORDER_LIGHT,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.PRIMARY,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
    fontWeight: '500',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  achievementGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginTop: 8,
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: AppColors.ERROR,
  },
  logoutText: {
    fontSize: 16,
    color: AppColors.ERROR,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SimpleProfileScreen;
