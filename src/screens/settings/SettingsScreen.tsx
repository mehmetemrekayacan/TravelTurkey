import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Ayarlar' icon='⚙️' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Kullanıcı Tercihleri</Text>
        <Text style={GlobalStyles.bodySmall}>Burada offline, senkronizasyon ve kişisel ayarlarınızı yönetebilirsiniz.</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen; 