/**
 * TravelTurkey - Profile Screen
 * Profil sayfası
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

// Profil menü öğeleri
const profileMenuItems = [
  { id: 1, title: 'Kişisel Bilgiler', icon: '👤', action: 'personal' },
  { id: 2, title: 'Rezervasyonlarım', icon: '📅', action: 'reservations' },
  { id: 3, title: 'Favori Yerler', icon: '❤️', action: 'favorites' },
  { id: 4, title: 'Seyahat Geçmişi', icon: '📝', action: 'history' },
  { id: 5, title: 'Ayarlar', icon: '⚙️', action: 'settings' },
  { id: 6, title: 'Yardım', icon: '❓', action: 'help' },
  { id: 7, title: 'İletişim', icon: '📞', action: 'contact' },
  { id: 8, title: 'Hakkında', icon: 'ℹ️', action: 'about' },
];

// Kullanıcı istatistikleri
const userStats = [
  { label: 'Toplam Plan', value: '3', icon: '�' },
  { label: 'Ziyaret Edilen', value: '8', icon: '📍' },
  { label: 'Favori Yer', value: '12', icon: '❤️' },
  { label: 'Kaydedilen', value: '25', icon: '�' },
];

export default function ProfileScreen() {
  const handleMenuPress = (_action: string) => {
    // TODO: Handle menu action
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Profil' icon='👤' />

      <ScrollView style={GlobalStyles.container}>
        {/* User Info Card */}
        <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
          <View style={GlobalStyles.center}>
            <Text style={[GlobalStyles.iconLarge, GlobalStyles.profileAvatar]}>
              👤
            </Text>
            <Text style={GlobalStyles.titleMediumWhite}>Hoş Geldiniz!</Text>
            <Text style={GlobalStyles.bodyMediumWhite}>Misafir Kullanıcı</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Seyahat İstatistiklerim</Text>
          <View style={GlobalStyles.categoryGrid}>
            {userStats.map((stat, index) => (
              <View
                key={index}
                style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}
              >
                <Text style={GlobalStyles.iconMedium}>{stat.icon}</Text>
                <Text style={[GlobalStyles.titleSmall, GlobalStyles.statValue]}>
                  {stat.value}
                </Text>
                <Text style={GlobalStyles.captionSecondary}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Menü</Text>
        </View>

        {profileMenuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[GlobalStyles.card, GlobalStyles.touchableCard]}
            onPress={() => handleMenuPress(item.action)}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconMedium}>{item.icon}</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>{item.title}</Text>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* App Info */}
        <View style={[GlobalStyles.card, GlobalStyles.turkishFlag]}>
          <Text style={GlobalStyles.bodyMediumWhiteCenter}>
            🇹🇷 TravelTurkey v1.0.0 🇹🇷{'\n'}
            Made with ❤️ in Turkey
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
