/**
 * TravelTurkey - Profile Screen Template
 * Profil sayfası - Kullanıcı bilgileri ve ayarlar
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

// Types
interface MenuItem {
  id: number;
  title: string;
  icon: string;
  action: string;
}

interface UserStat {
  label: string;
  value: string;
  icon: string;
}

export default function ProfileScreen() {
  // Sample data
  const menuItems: MenuItem[] = [
    { id: 1, title: 'Kişisel Bilgiler', icon: '👤', action: 'personal' },
    { id: 2, title: 'Rezervasyonlarım', icon: '📅', action: 'reservations' },
    { id: 3, title: 'Favori Yerler', icon: '❤️', action: 'favorites' },
    { id: 4, title: 'Seyahat Geçmişi', icon: '📝', action: 'history' },
    { id: 5, title: 'Ayarlar', icon: '⚙️', action: 'settings' },
    { id: 6, title: 'Yardım', icon: '❓', action: 'help' },
  ];

  const userStats: UserStat[] = [
    { label: 'Toplam Plan', value: '3', icon: '📋' },
    { label: 'Ziyaret Edilen', value: '8', icon: '📍' },
    { label: 'Favori Yer', value: '12', icon: '❤️' },
    { label: 'Kaydedilen', value: '25', icon: '💾' },
  ];

  // Event handlers
  const handleMenuPress = (_action: string) => {
    // TODO: Handle menu action navigation
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
  };

  // Render functions
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={GlobalStyles.touchableCard}
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
  );

  const renderUserStat = ({ item }: { item: UserStat }) => (
    <View style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}>
      <Text style={GlobalStyles.iconMedium}>{item.icon}</Text>
      <Text style={[GlobalStyles.titleSmall, GlobalStyles.statValue]}>
        {item.value}
      </Text>
      <Text style={GlobalStyles.captionSecondary}>{item.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      {/* Header */}
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>👤 Profil</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* User Info Card */}
        <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
          <View style={GlobalStyles.center}>
            <Text style={[GlobalStyles.iconLarge, GlobalStyles.profileAvatar]}>
              👤
            </Text>
            <Text style={GlobalStyles.titleMediumWhite}>Hoş Geldiniz!</Text>
            <Text style={GlobalStyles.bodyMediumWhite}>Misafir Kullanıcı</Text>
            
            <TouchableOpacity 
              style={GlobalStyles.buttonPrimary}
              onPress={handleEditProfile}
            >
              <Text style={GlobalStyles.buttonTextPrimary}>Profili Düzenle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Stats */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Seyahat İstatistiklerim</Text>
          <View style={GlobalStyles.categoryGrid}>
            <FlatList
              data={userStats}
              renderItem={renderUserStat}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Menu */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Menü</Text>
        </View>

        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />

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
