/**
 * TravelTurkey - Home Screen Template
 * Ana sayfa - Hoş geldin ekranı
 */

import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { BottomTabScreenProps } from '../../types/navigation';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';
import {
  WelcomeCard,
  ActionCard,
  InfoCard,
} from '../../components/common/Cards';

type HomeScreenProps = BottomTabScreenProps<'ExploreTab'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  // Event handlers
  const handleExplorePress = () => {
    navigation.navigate({ name: 'ExploreTab', params: {} });
  };

  const handlePlansPress = () => {
    navigation.navigate({ name: 'PlansTab', params: undefined });
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileTab');
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Ana Sayfa' icon='🏠' />

      <ScrollView style={GlobalStyles.container}>
        {/* Welcome Card */}
        <WelcomeCard
          title="🇹🇷 TravelTurkey'e Hoş Geldiniz!"
          subtitle="Türkiye'nin eşsiz güzelliklerini keşfetmeye hazır mısınız?"
        />

        {/* Quick Actions */}
        <InfoCard title='Hızlı Başlangıç'>
          <ActionCard
            icon='🗺️'
            title='Yerleri Keşfet'
            subtitle="Türkiye'deki popüler destinasyonları görün"
            onPress={handleExplorePress}
          />

          <ActionCard
            icon='📋'
            title='Plan Oluştur'
            subtitle='Seyahat planınızı oluşturmaya başlayın'
            onPress={handlePlansPress}
          />

          <ActionCard
            icon='👤'
            title='Profil'
            subtitle='Hesabınızı yönetin ve istatistiklerinizi görün'
            onPress={handleProfilePress}
          />
        </InfoCard>

        {/* Info Card */}
        <InfoCard>
          <Text style={GlobalStyles.titleSmall}>💡 İpucu</Text>
          <Text style={GlobalStyles.bodySmall}>
            Bu uygulama ile Türkiye'deki en güzel yerleri keşfedebilir, seyahat
            planlarınızı oluşturabilir ve deneyimlerinizi takip edebilirsiniz.
          </Text>
        </InfoCard>
      </ScrollView>
    </SafeAreaView>
  );
}
