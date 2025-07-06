import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const AboutScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Hakkında' icon='ℹ️' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>TravelTurkey v1.0.0</Text>
        <Text style={GlobalStyles.bodySmall}>Türkiye'nin turizm uygulaması. 2025 React Native modern mimarisi ile geliştirilmiştir.</Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen; 