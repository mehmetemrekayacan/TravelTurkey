import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const PlaceDetailScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Yer Detayı' icon='📍' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Yer Detayları</Text>
        <Text style={GlobalStyles.bodySmall}>Seçilen yerin detayları burada gösterilecek (placeholder).</Text>
      </View>
    </SafeAreaView>
  );
};

export default PlaceDetailScreen; 