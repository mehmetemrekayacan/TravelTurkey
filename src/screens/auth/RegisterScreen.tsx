import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const RegisterScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Kayıt Ol' icon='📝' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Yeni Hesap Oluştur</Text>
        <Text style={GlobalStyles.bodySmall}>Kullanıcı adı, e-posta ve şifre ile kayıt olun (placeholder).</Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen; 