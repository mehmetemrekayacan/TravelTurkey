/**
 * TravelTurkey - Base Screen Template
 * React Native Screen Component şablonu
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

// Props interface (opsiyonel)
interface BaseScreenProps {
  title?: string;
  showHeader?: boolean;
}

export default function BaseScreen({
  title = 'Ekran Başlığı',
  showHeader = true,
}: BaseScreenProps) {
  // State management
  const [isLoading, setIsLoading] = React.useState(false);

  // Event handlers
  const handleButtonPress = () => {
    // TODO: Handle button press
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleListItemPress = (_item: any) => {
    // TODO: Handle list item press
  };

  // Sample data
  const sampleData = [
    { id: 1, title: 'Örnek 1', description: 'Açıklama 1', icon: '📱' },
    { id: 2, title: 'Örnek 2', description: 'Açıklama 2', icon: '🚀' },
    { id: 3, title: 'Örnek 3', description: 'Açıklama 3', icon: '✨' },
  ];

  // Render functions
  const renderListItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={GlobalStyles.touchableCard}
      onPress={() => handleListItemPress(item)}
    >
      <View style={GlobalStyles.cardContent}>
        <View style={GlobalStyles.cardIcon}>
          <Text style={GlobalStyles.iconMedium}>{item.icon}</Text>
        </View>
        <View style={GlobalStyles.cardText}>
          <Text style={GlobalStyles.titleSmall}>{item.title}</Text>
          <Text style={GlobalStyles.bodySmall}>{item.description}</Text>
        </View>
        <View style={GlobalStyles.cardArrow}>
          <Text style={GlobalStyles.iconMedium}>➡️</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      {/* Header - Opsiyonel */}
      {showHeader && (
        <View style={GlobalStyles.header}>
          <Text style={GlobalStyles.headerTitle}>{title}</Text>
        </View>
      )}

      {/* Main Content */}
      <ScrollView style={GlobalStyles.container}>
        {/* Hero Section */}
        <View style={[GlobalStyles.card, GlobalStyles.bosphorusTheme]}>
          <Text style={GlobalStyles.titleLargeWhite}>Hero Başlık</Text>
          <Text style={GlobalStyles.bodyMediumWhite}>
            Bu alan hero section için kullanılabilir. Önemli bilgiler ve
            call-to-action butonları burada yer alabilir.
          </Text>
        </View>

        {/* Action Card */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Hızlı İşlemler</Text>
          <TouchableOpacity
            style={GlobalStyles.buttonPrimary}
            onPress={handleButtonPress}
            disabled={isLoading}
          >
            <Text style={GlobalStyles.buttonTextPrimary}>
              {isLoading ? 'Yükleniyor...' : 'İşlem Yap'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* List Section */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Liste Örneği</Text>
        </View>

        <FlatList
          data={sampleData}
          renderItem={renderListItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />

        {/* Info Card */}
        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>💡 Bilgi</Text>
          <Text style={GlobalStyles.bodySmall}>
            Bu template React Native screen component oluşturmak için temel bir
            şablon sunar. İhtiyacınıza göre özelleştirebilirsiniz.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Export etmeden önce PropTypes veya default props tanımlanabilir
BaseScreen.defaultProps = {
  title: 'Ekran Başlığı',
  showHeader: true,
};
