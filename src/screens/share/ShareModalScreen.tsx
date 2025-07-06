import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const ShareModalScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Paylaş' icon='🔗' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Paylaşım Seçenekleri</Text>
        <Text style={GlobalStyles.bodySmall}>Seçilen yerin paylaşım seçenekleri burada gösterilecek (placeholder).</Text>
      </View>
    </SafeAreaView>
  );
};

export default ShareModalScreen; 