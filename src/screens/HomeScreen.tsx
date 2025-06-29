/**
 * TravelTurkey - Home Screen Template
 * Ana sayfa - Hoş geldin ekranı
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { GlobalStyles } from '../styles/GlobalStyles';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'HomeTab'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  // Event handlers
  const handleExplorePress = () => {
    navigation.navigate('ExploreTab');
  };

  const handlePlansPress = () => {
    navigation.navigate('PlansTab');
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileTab');
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      {/* Header */}
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>🏠 Ana Sayfa</Text>
      </View>

      {/* Content */}
      <ScrollView style={GlobalStyles.container}>
        {/* Welcome Card */}
        <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
          <View style={GlobalStyles.center}>
            <Text style={GlobalStyles.titleLargeWhite}>
              🇹🇷 TravelTurkey'e Hoş Geldiniz!
            </Text>
            <Text style={GlobalStyles.bodyMediumWhite}>
              Türkiye'nin eşsiz güzelliklerini keşfetmeye hazır mısınız?
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Hızlı Başlangıç</Text>

          <TouchableOpacity
            style={GlobalStyles.touchableCard}
            onPress={handleExplorePress}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>🗺️</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>Yerleri Keşfet</Text>
                <Text style={GlobalStyles.bodySmall}>
                  Türkiye'deki popüler destinasyonları görün
                </Text>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.touchableCard}
            onPress={handlePlansPress}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>📋</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>Plan Oluştur</Text>
                <Text style={GlobalStyles.bodySmall}>
                  Seyahat planınızı oluşturmaya başlayın
                </Text>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.touchableCard}
            onPress={handleProfilePress}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>👤</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>Profil</Text>
                <Text style={GlobalStyles.bodySmall}>
                  Hesabınızı yönetin ve istatistiklerinizi görün
                </Text>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>💡 İpucu</Text>
          <Text style={GlobalStyles.bodySmall}>
            Bu uygulama ile Türkiye'deki en güzel yerleri keşfedebilir, seyahat
            planlarınızı oluşturabilir ve deneyimlerinizi takip edebilirsiniz.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
