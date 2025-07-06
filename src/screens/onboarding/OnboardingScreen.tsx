import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const OnboardingScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Hoş Geldiniz' icon='👋' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>TravelTurkey'e Hoş Geldiniz!</Text>
        <Text style={GlobalStyles.bodySmall}>Türkiye'nin en güzel yerlerini keşfetmek için uygulamayı kullanmaya başlayın.</Text>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen; 