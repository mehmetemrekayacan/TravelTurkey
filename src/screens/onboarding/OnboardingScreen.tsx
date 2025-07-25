import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';
import TravelTurkeyLogo from '../../components/common/TravelTurkeyLogo';

const OnboardingScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Hoş Geldiniz' icon='👋' />

      {/* Hero Logo Section */}
      <View style={styles.heroSection}>
        <TravelTurkeyLogo size='xlarge' />
        <Text style={styles.heroTitle}>TravelTurkey'e Hoş Geldiniz!</Text>
        <Text style={styles.heroSubtitle}>
          Türkiye'nin en güzel yerlerini keşfetmek için uygulamayı kullanmaya
          başlayın.
        </Text>
      </View>

      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>🌟 Özellikler</Text>
        <Text style={GlobalStyles.bodySmall}>
          • Türkiye'nin turistik yerlerini keşfedin{'\n'}• Seyahat planlarınızı
          oluşturun{'\n'}• Fotoğraflarınızı paylaşın{'\n'}• Yerel rehberlerden
          öneriler alın
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 24,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default OnboardingScreen;
