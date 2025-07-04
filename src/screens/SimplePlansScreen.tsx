/**
 * TravelTurkey - Simple Plans Screen (Planlarım)
 * Placeholder component for travel plans screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../constants/Colors';

const SimplePlansScreen: React.FC = () => {
  const handleCreatePlan = () => {
    // TODO: Implement plan creation
    console.log('Create new plan');
  };

  const handleViewPlan = (planId: string) => {
    // TODO: Implement plan viewing
    console.log('View plan:', planId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planlarım</Text>
        <Text style={styles.headerSubtitle}>Seyahat planlarınızı yönetin</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Create New Plan Card */}
        <TouchableOpacity style={styles.createCard} onPress={handleCreatePlan}>
          <Icon name='add-circle-outline' size={48} color={AppColors.PRIMARY} />
          <Text style={styles.createCardTitle}>Yeni Plan Oluştur</Text>
          <Text style={styles.createCardSubtitle}>
            Türkiye geziniz için yeni bir plan başlatın
          </Text>
        </TouchableOpacity>

        {/* Sample Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Mevcut Planlarım</Text>

          <TouchableOpacity
            style={styles.planCard}
            onPress={() => handleViewPlan('1')}
          >
            <View style={styles.planHeader}>
              <Icon name='location-on' size={24} color={AppColors.SECONDARY} />
              <View style={styles.planInfo}>
                <Text style={styles.planTitle}>İstanbul Turu</Text>
                <Text style={styles.planDate}>15-20 Mart 2025</Text>
              </View>
              <Icon
                name='chevron-right'
                size={24}
                color={AppColors.TEXT_SECONDARY}
              />
            </View>
            <View style={styles.planDetails}>
              <Text style={styles.planDescription}>
                Ayasofya, Sultanahmet, Galata Kulesi...
              </Text>
              <View style={styles.planProgress}>
                <Text style={styles.progressText}>%75 tamamlandı</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill75} />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.planCard}
            onPress={() => handleViewPlan('2')}
          >
            <View style={styles.planHeader}>
              <Icon name='landscape' size={24} color={AppColors.CAPPADOCIA} />
              <View style={styles.planInfo}>
                <Text style={styles.planTitle}>Kapadokya Macerası</Text>
                <Text style={styles.planDate}>1-5 Nisan 2025</Text>
              </View>
              <Icon
                name='chevron-right'
                size={24}
                color={AppColors.TEXT_SECONDARY}
              />
            </View>
            <View style={styles.planDetails}>
              <Text style={styles.planDescription}>
                Balon turu, yeraltı şehri, peri bacaları...
              </Text>
              <View style={styles.planProgress}>
                <Text style={styles.progressText}>%40 tamamlandı</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill40} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  header: {
    backgroundColor: AppColors.BG_PRIMARY,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  createCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: AppColors.PRIMARY,
    borderStyle: 'dashed',
  },
  createCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginTop: 12,
    marginBottom: 8,
  },
  createCardSubtitle: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
  },
  plansSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: AppColors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planInfo: {
    flex: 1,
    marginLeft: 12,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  planDate: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
  },
  planDetails: {
    marginLeft: 36,
  },
  planDescription: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 12,
  },
  planProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
    marginRight: 12,
    minWidth: 80,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: AppColors.BORDER_LIGHT,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 2,
  },
  progressFill75: {
    height: '100%',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 2,
    width: '75%',
  },
  progressFill40: {
    height: '100%',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 2,
    width: '40%',
  },
});

export default SimplePlansScreen;
