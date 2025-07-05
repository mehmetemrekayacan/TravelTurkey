/**
 * TravelTurkey - Modern Plans Screen Template
 * Advanced TypeScript component for travel planning with forms and task management
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Modal,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../constants/Colors';
import { Typography, Spacing, Shadows } from '../../styles/theme';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../types/navigation';

// TypeScript Interfaces
interface TravelPlan {
  id: string;
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number;
  status: 'draft' | 'active' | 'completed';
  tasks: PlanTask[];
  createdAt: string;
  updatedAt: string;
}

interface PlanTask {
  id: string;
  title: string;
  description?: string;
  category: 'accommodation' | 'transport' | 'activity' | 'food' | 'other';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  cost?: number;
}

interface PlansScreenProps
  extends BottomTabScreenProps<BottomTabParamList, 'PlansTab'> {}

interface PlanFormData {
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
}

// Plan Status Colors
const STATUS_COLORS = {
  draft: AppColors.TEXT_SECONDARY,
  active: AppColors.PRIMARY,
  completed: AppColors.SUCCESS,
};

// Modern Plan Card Component
const PlanCard: React.FC<{
  plan: TravelPlan;
  onPress: (plan: TravelPlan) => void;
  onEdit: (plan: TravelPlan) => void;
  onDelete: (plan: TravelPlan) => void;
}> = React.memo(({ plan, onPress, onEdit, onDelete }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const completedTasks = plan.tasks.filter(task => task.completed).length;
  const totalTasks = plan.tasks.length;
  const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Planı Sil',
      `"${plan.title}" planını silmek istediğinizden emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Sil', style: 'destructive', onPress: () => onDelete(plan) },
      ],
    );
  }, [plan, onDelete]);

  return (
    <TouchableOpacity
      onPress={() => onPress(plan)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[styles.planCard, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Header */}
        <View style={styles.planHeader}>
          <View style={styles.planInfo}>
            <Text style={styles.planTitle} numberOfLines={2}>
              {plan.title}
            </Text>
            <Text style={styles.planDestination} numberOfLines={1}>
              {plan.destination}
            </Text>
            <Text style={styles.planDates}>
              {plan.startDate} - {plan.endDate}
            </Text>
          </View>

          <View style={styles.planActions}>
            <TouchableOpacity
              onPress={() => onEdit(plan)}
              style={styles.actionButton}
            >
              <Icon name='edit' size={20} color={AppColors.TEXT_SECONDARY} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.actionButton}
            >
              <Icon name='delete' size={20} color={AppColors.ERROR} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLORS[plan.status] },
          ]}
        >
          <Text style={styles.statusText}>
            {plan.status === 'draft'
              ? 'Taslak'
              : plan.status === 'active'
              ? 'Aktif'
              : 'Tamamlandı'}
          </Text>
        </View>

        {/* Progress */}
        {totalTasks > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                Görevler: {completedTasks}/{totalTasks}
              </Text>
              <Text style={styles.progressPercentage}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progress * 100}%` }]}
              />
            </View>
          </View>
        )}

        {/* Budget */}
        {plan.budget && (
          <View style={styles.budgetContainer}>
            <Icon
              name='account-balance-wallet'
              size={16}
              color={AppColors.TEXT_SECONDARY}
            />
            <Text style={styles.budgetText}>
              ₺{plan.budget.toLocaleString()}
            </Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
});

// Plan Form Modal Component
const PlanFormModal: React.FC<{
  visible: boolean;
  editingPlan?: TravelPlan;
  onClose: () => void;
  onSave: (data: PlanFormData) => void;
}> = ({ visible, editingPlan, onClose, onSave }) => {
  const [formData, setFormData] = useState<PlanFormData>({
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
  });

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        title: editingPlan.title,
        description: editingPlan.description || '',
        destination: editingPlan.destination,
        startDate: editingPlan.startDate,
        endDate: editingPlan.endDate,
        budget: editingPlan.budget?.toString() || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        destination: '',
        startDate: '',
        endDate: '',
        budget: '',
      });
    }
  }, [editingPlan, visible]);

  const handleSave = useCallback(() => {
    if (!formData.title.trim() || !formData.destination.trim()) {
      Alert.alert('Hata', 'Başlık ve varış noktası zorunludur.');
      return;
    }
    onSave(formData);
    onClose();
  }, [formData, onSave, onClose]);

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalCancelButton}>İptal</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {editingPlan ? 'Planı Düzenle' : 'Yeni Plan'}
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.modalSaveButton}>Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Plan Başlığı *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={text =>
                setFormData(prev => ({ ...prev, title: text }))
              }
              placeholder='Örn: İstanbul Gezisi'
              placeholderTextColor={AppColors.TEXT_SECONDARY}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Açıklama</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={text =>
                setFormData(prev => ({ ...prev, description: text }))
              }
              placeholder='Plan hakkında detaylar...'
              placeholderTextColor={AppColors.TEXT_SECONDARY}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Varış Noktası *</Text>
            <TextInput
              style={styles.input}
              value={formData.destination}
              onChangeText={text =>
                setFormData(prev => ({ ...prev, destination: text }))
              }
              placeholder='Örn: İstanbul, Türkiye'
              placeholderTextColor={AppColors.TEXT_SECONDARY}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.formRowLeft]}>
              <Text style={styles.label}>Başlangıç Tarihi</Text>
              <TextInput
                style={styles.input}
                value={formData.startDate}
                onChangeText={text =>
                  setFormData(prev => ({ ...prev, startDate: text }))
                }
                placeholder='GG.AA.YYYY'
                placeholderTextColor={AppColors.TEXT_SECONDARY}
              />
            </View>
            <View style={[styles.formGroup, styles.formRowRight]}>
              <Text style={styles.label}>Bitiş Tarihi</Text>
              <TextInput
                style={styles.input}
                value={formData.endDate}
                onChangeText={text =>
                  setFormData(prev => ({ ...prev, endDate: text }))
                }
                placeholder='GG.AA.YYYY'
                placeholderTextColor={AppColors.TEXT_SECONDARY}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Bütçe (₺)</Text>
            <TextInput
              style={styles.input}
              value={formData.budget}
              onChangeText={text =>
                setFormData(prev => ({ ...prev, budget: text }))
              }
              placeholder='0'
              placeholderTextColor={AppColors.TEXT_SECONDARY}
              keyboardType='numeric'
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Main Plans Screen Component
const PlansScreenTemplate: React.FC<PlansScreenProps> = ({
  navigation: _navigation,
}) => {
  // State Management
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TravelPlan | undefined>();

  // Animation References
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Load data effect
  useEffect(() => {
    const loadPlans = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockPlans: TravelPlan[] = [
        {
          id: '1',
          title: 'İstanbul Keşif Turu',
          description: 'Boğaz turu ve tarihi yerler',
          destination: 'İstanbul, Türkiye',
          startDate: '15.07.2025',
          endDate: '20.07.2025',
          budget: 5000,
          status: 'active',
          tasks: [
            {
              id: '1',
              title: 'Otel rezervasyonu yap',
              category: 'accommodation',
              completed: true,
              priority: 'high',
            },
            {
              id: '2',
              title: 'Uçak bileti al',
              category: 'transport',
              completed: false,
              priority: 'high',
            },
          ],
          createdAt: '2025-01-01',
          updatedAt: '2025-01-02',
        },
        {
          id: '2',
          title: 'Kapadokya Balon Turu',
          destination: 'Nevşehir, Türkiye',
          startDate: '01.08.2025',
          endDate: '05.08.2025',
          budget: 3500,
          status: 'draft',
          tasks: [],
          createdAt: '2025-01-03',
          updatedAt: '2025-01-03',
        },
      ];

      setPlans(mockPlans);
      setIsLoading(false);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    };

    loadPlans();
  }, [fadeAnim, slideAnim]);

  // Handlers
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleCreatePlan = useCallback(() => {
    setEditingPlan(undefined);
    setShowForm(true);
  }, []);

  const handleEditPlan = useCallback((plan: TravelPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  }, []);

  const handleDeletePlan = useCallback((plan: TravelPlan) => {
    setPlans(prev => prev.filter(p => p.id !== plan.id));
  }, []);

  const handleSavePlan = useCallback(
    (formData: PlanFormData) => {
      if (editingPlan) {
        // Update existing plan
        setPlans(prev =>
          prev.map(plan =>
            plan.id === editingPlan.id
              ? {
                  ...plan,
                  ...formData,
                  budget: formData.budget
                    ? parseFloat(formData.budget)
                    : undefined,
                  updatedAt: new Date().toISOString().split('T')[0],
                }
              : plan,
          ),
        );
      } else {
        // Create new plan
        const newPlan: TravelPlan = {
          id: Date.now().toString(),
          title: formData.title,
          description: formData.description || undefined,
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate,
          budget: formData.budget ? parseFloat(formData.budget) : undefined,
          status: 'draft',
          tasks: [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        };
        setPlans(prev => [newPlan, ...prev]);
      }
    },
    [editingPlan],
  );

  const handlePlanPress = useCallback((plan: TravelPlan) => {
    // Navigate to plan details
    console.log('Open plan details:', plan.title);
  }, []);

  // Render plan item
  const renderPlan = useCallback(
    ({ item }: { item: TravelPlan }) => (
      <PlanCard
        plan={item}
        onPress={handlePlanPress}
        onEdit={handleEditPlan}
        onDelete={handleDeletePlan}
      />
    ),
    [handlePlanPress, handleEditPlan, handleDeletePlan],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Planlarım</Text>
            <Text style={styles.headerSubtitle}>
              {plans.length} plan •{' '}
              {plans.filter(p => p.status === 'active').length} aktif
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleCreatePlan}>
            <Icon name='add' size={24} color={AppColors.WHITE} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Planlar yükleniyor...</Text>
          </View>
        ) : (
          <FlatList
            data={plans}
            renderItem={renderPlan}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[AppColors.PRIMARY]}
                tintColor={AppColors.PRIMARY}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon
                  name='assignment'
                  size={64}
                  color={AppColors.TEXT_LIGHT}
                />
                <Text style={styles.emptyTitle}>Henüz plan yok</Text>
                <Text style={styles.emptyText}>
                  İlk seyahat planınızı oluşturmak için + butonuna dokunun
                </Text>
                <TouchableOpacity
                  style={styles.createFirstPlanButton}
                  onPress={handleCreatePlan}
                >
                  <Text style={styles.createFirstPlanText}>
                    İlk Planını Oluştur
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </Animated.View>

      {/* Plan Form Modal */}
      <PlanFormModal
        visible={showForm}
        editingPlan={editingPlan}
        onClose={() => setShowForm(false)}
        onSave={handleSavePlan}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  planCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  planInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  planTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.xs,
  },
  planDestination: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: Spacing.xs,
  },
  planDates: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
  },
  planActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.WHITE,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  progressText: {
    fontSize: Typography.fontSize.sm,
    color: AppColors.TEXT_SECONDARY,
  },
  progressPercentage: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_PRIMARY,
  },
  progressBar: {
    height: 4,
    backgroundColor: AppColors.BG_SECONDARY,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 2,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_PRIMARY,
    marginLeft: Spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
    color: AppColors.TEXT_PRIMARY,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  createFirstPlanButton: {
    backgroundColor: AppColors.PRIMARY,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
  createFirstPlanText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.WHITE,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LIGHT,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    color: AppColors.TEXT_PRIMARY,
  },
  modalCancelButton: {
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_SECONDARY,
  },
  modalSaveButton: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.PRIMARY,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  formRow: {
    flexDirection: 'row',
  },
  formRowLeft: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  formRowRight: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: AppColors.TEXT_PRIMARY,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: AppColors.TEXT_PRIMARY,
    borderWidth: 1,
    borderColor: AppColors.BORDER_LIGHT,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default PlansScreenTemplate;
