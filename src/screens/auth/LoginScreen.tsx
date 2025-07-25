import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';
import TravelTurkeyLogo from '../../components/common/TravelTurkeyLogo';

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Giriş Yap' icon='🔑' />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <TravelTurkeyLogo size='large' />
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
      </View>

      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Kullanıcı Girişi</Text>
        <Text style={GlobalStyles.bodySmall}>
          Kullanıcı adı ve şifre ile giriş yapın (placeholder).
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 16,
  },
});

export default LoginScreen;
