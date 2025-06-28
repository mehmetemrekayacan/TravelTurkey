/**
 * TravelTurkey - Türkiye Turizm Uygulaması
 * Modern ve çekici arayüz tasarımı
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { AppColors } from './src/constants/Colors';
import { GlobalStyles } from './src/styles/GlobalStyles';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.SECONDARY}
      />

      {/* Header */}
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>TravelTurkey</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* Welcome Section */}
        <View style={[GlobalStyles.card, styles.welcomeCard]}>
          <Text style={GlobalStyles.titleLarge}>
            🇹🇷 Türkiye'ye Hoş Geldiniz!
          </Text>
          <Text style={GlobalStyles.bodyMedium}>
            Binlerce yıllık tarihi, eşsiz doğal güzellikleri ve zengin kültürü
            keşfedin
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={GlobalStyles.card}>
          <View style={GlobalStyles.bosphorusTheme}>
            <Text style={GlobalStyles.titleMediumWhite}>
              🌊 İstanbul Boğazı
            </Text>
            <Text style={GlobalStyles.bodyMediumWhite}>
              İki kıtayı birleştiren eşsiz güzellik
            </Text>
          </View>
        </View>

        <View style={GlobalStyles.card}>
          <View style={GlobalStyles.cappadociaTheme}>
            <Text style={GlobalStyles.titleMediumWhite}>🎈 Kapadokya</Text>
            <Text style={GlobalStyles.bodyMediumWhite}>
              Peri bacaları ve sıcak hava balonu turu
            </Text>
          </View>
        </View>

        <View style={GlobalStyles.card}>
          <View style={GlobalStyles.goldenAccent}>
            <Text style={GlobalStyles.titleMediumWhite}>🏛️ Antik Şehirler</Text>
            <Text style={GlobalStyles.bodyMediumWhite}>
              Efes, Troia ve daha fazlası...
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={GlobalStyles.buttonPrimary}>
            <Text style={GlobalStyles.buttonTextPrimary}>Gezilecek Yerler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[GlobalStyles.buttonSecondary, styles.buttonSpacing]}
          >
            <Text style={GlobalStyles.buttonTextPrimary}>
              Otel Rezervasyonu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[GlobalStyles.buttonOutline, styles.buttonSpacing]}
          >
            <Text style={GlobalStyles.buttonTextOutline}>Rehber İletişim</Text>
          </TouchableOpacity>
        </View>

        {/* Turkish Flag Accent */}
        <View style={[GlobalStyles.turkishFlag, styles.flagAccent]}>
          <Text style={GlobalStyles.bodyMediumWhiteCenter}>
            🇹🇷 Made with love in Turkey 🇹🇷
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeCard: {
    backgroundColor: AppColors.BG_SECONDARY,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.PRIMARY,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonSpacing: {
    marginTop: 12,
  },
  flagAccent: {
    margin: 16,
    marginBottom: 32,
  },
});

export default App;
