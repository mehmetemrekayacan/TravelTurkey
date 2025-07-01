/**
 * TravelTurkey - Plans Screen
 * Planlarım sayfası - Seyahat planlarım ve rezervasyonlarım
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';

// Types
interface Plan {
  id: number;
  title: string;
  dates: string;
  status: string;
  places: string[];
  icon: string;
  progress: number;
}

interface Reservation {
  id: number;
  type: string;
  name: string;
  date: string;
  status: string;
  icon: string;
}

interface QuickAction {
  id: number;
  title: string;
  icon: string;
  action: string;
}

// Mevcut planlar verisi
const myPlans: Plan[] = [
  {
    id: 1,
    title: 'İstanbul Hafta Sonu',
    dates: '15-17 Temmuz 2025',
    status: 'Aktif',
    places: ['Sultanahmet', 'Galata Kulesi', 'Boğaz Turu'],
    icon: '🕌',
    progress: 75,
  },
  {
    id: 2,
    title: 'Kapadokya Macerası',
    dates: '22-25 Ağustos 2025',
    status: 'Planlanan',
    places: ['Göreme', 'Uçhisar', 'Avanos'],
    icon: '🎈',
    progress: 30,
  },
  {
    id: 3,
    title: 'Antalya Tatili',
    dates: '5-12 Eylül 2025',
    status: 'Taslak',
    places: ['Kaleiçi', 'Olimpos', 'Patara'],
    icon: '🏖️',
    progress: 10,
  },
];

// Rezervasyonlar verisi
const reservations: Reservation[] = [
  {
    id: 1,
    type: 'Otel',
    name: 'Four Seasons Sultanahmet',
    date: '15 Temmuz 2025',
    status: 'Onaylandı',
    icon: '🏨',
  },
  {
    id: 2,
    type: 'Tur',
    name: 'Kapadokya Balon Turu',
    date: '23 Ağustos 2025',
    status: 'Beklemede',
    icon: '🎈',
  },
  {
    id: 3,
    type: 'Rehber',
    name: 'Ahmet Kaya - İstanbul Turu',
    date: '16 Temmuz 2025',
    status: 'Onaylandı',
    icon: '👨‍🏫',
  },
];

const quickActions: QuickAction[] = [
  { id: 1, title: 'Yeni Plan', icon: '➕', action: 'new_plan' },
  { id: 2, title: 'Otel Ara', icon: '🏨', action: 'find_hotel' },
  { id: 3, title: 'Rehber Bul', icon: '👨‍💼', action: 'find_guide' },
  { id: 4, title: 'Favori Yerler', icon: '❤️', action: 'favorites' },
];

export default function PlansScreen() {
  const handlePlanPress = (plan: Plan) => {
    console.log(`${plan.title} planı seçildi`);
  };

  const handleReservationPress = (reservation: Reservation) => {
    console.log(`${reservation.name} rezervasyonu seçildi`);
  };

  const handleQuickAction = (action: string) => {
    console.log(`${action} aksiyonu seçildi`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif':
        return '#27ae60';
      case 'Planlanan':
        return '#f39c12';
      case 'Taslak':
        return '#95a5a6';
      case 'Onaylandı':
        return '#27ae60';
      case 'Beklemede':
        return '#e67e22';
      default:
        return '#bdc3c7';
    }
  };

  const renderProgressBar = (progress: number) => {
    return (
      <View style={GlobalStyles.progressBarContainer}>
        <View
          style={[GlobalStyles.progressBar, { width: `${progress}%` as any }]}
        />
        <Text style={GlobalStyles.progressText}>{progress}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle}>📋 Planlarım</Text>
      </View>

      <ScrollView style={GlobalStyles.container}>
        {/* Quick Actions */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Hızlı İşlemler</Text>
          <View style={GlobalStyles.categoryGrid}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={[GlobalStyles.touchableCard, GlobalStyles.categoryItem]}
                onPress={() => handleQuickAction(action.action)}
              >
                <Text style={GlobalStyles.iconMedium}>{action.icon}</Text>
                <Text style={GlobalStyles.titleSmall}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* My Plans */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Seyahat Planlarım</Text>
        </View>

        {myPlans.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[GlobalStyles.card, GlobalStyles.touchableCard]}
            onPress={() => handlePlanPress(plan)}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>{plan.icon}</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>{plan.title}</Text>
                <Text style={GlobalStyles.bodySmall}>📅 {plan.dates}</Text>
                <Text style={GlobalStyles.bodySmall}>
                  📍 {plan.places.join(' • ')}
                </Text>
                <View style={[GlobalStyles.row, GlobalStyles.planStatus]}>
                  <Text
                    style={[
                      GlobalStyles.captionSecondary,
                      { color: getStatusColor(plan.status) },
                    ]}
                  >
                    ● {plan.status}
                  </Text>
                  {renderProgressBar(plan.progress)}
                </View>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Reservations */}
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.titleMedium}>Rezervasyonlarım</Text>
        </View>

        {reservations.map(reservation => (
          <TouchableOpacity
            key={reservation.id}
            style={[GlobalStyles.card, GlobalStyles.touchableCard]}
            onPress={() => handleReservationPress(reservation)}
          >
            <View style={GlobalStyles.cardContent}>
              <View style={GlobalStyles.cardIcon}>
                <Text style={GlobalStyles.iconLarge}>{reservation.icon}</Text>
              </View>
              <View style={GlobalStyles.cardText}>
                <Text style={GlobalStyles.titleSmall}>{reservation.name}</Text>
                <Text style={GlobalStyles.bodySmall}>
                  🏷️ {reservation.type}
                </Text>
                <Text style={GlobalStyles.bodySmall}>
                  📅 {reservation.date}
                </Text>
                <Text
                  style={[
                    GlobalStyles.captionSecondary,
                    GlobalStyles.reservationStatus,
                    { color: getStatusColor(reservation.status) },
                  ]}
                >
                  ● {reservation.status}
                </Text>
              </View>
              <View style={GlobalStyles.cardArrow}>
                <Text style={GlobalStyles.iconMedium}>➡️</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Information Card */}
        <View style={[GlobalStyles.card, GlobalStyles.infoCard]}>
          <Text style={GlobalStyles.titleSmall}>📝 Plan İpuçları</Text>
          <Text style={GlobalStyles.bodySmall}>
            • Planlarınızı detaylandırın ve liste halinde takip edin{'\n'}•
            Rezervasyonları önceden yaparak daha iyi fiyatlar alın{'\n'}•
            Alternatif planlar oluşturmayı unutmayın{'\n'}• Hava durumunu
            kontrol ederek esnek kalın
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
