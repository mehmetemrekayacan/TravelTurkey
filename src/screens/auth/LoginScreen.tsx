import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Giriş Yap' icon='🔑' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Kullanıcı Girişi</Text>
        <Text style={GlobalStyles.bodySmall}>Kullanıcı adı ve şifre ile giriş yapın (placeholder).</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen; 