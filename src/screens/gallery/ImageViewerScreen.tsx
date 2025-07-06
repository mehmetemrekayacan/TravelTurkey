import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ScreenHeader from '../../components/common/ScreenHeader';

const ImageViewerScreen: React.FC = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Galeri' icon='🖼️' />
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.titleMedium}>Görseller</Text>
        <Text style={GlobalStyles.bodySmall}>Seçilen yerin görselleri burada gösterilecek (placeholder).</Text>
      </View>
    </SafeAreaView>
  );
};

export default ImageViewerScreen; 