/**
 * TravelTurkey - Smart Search Component with Storage Integration
 * Advanced search component with history, favorites, and persistence
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Keyboard,
  AccessibilityInfo,
  Modal,
  Switch,
} from 'react-native';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import { Colors } from '../../constants/Colors';
import { useEnhancedSearch } from '../../hooks/enhanced/useEnhancedSearch';
import { useSearchStorage } from '../../hooks/enhanced/useSearchStorage';

interface SmartSearchComponentProps {
  onFilter: (filteredResults: (TouristPlace | EnhancedTouristPlace)[]) => void;
  onPlaceSelect?: (place: TouristPlace | EnhancedTouristPlace) => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: any;
  showHistory?: boolean;
  showFavorites?: boolean;
  showSettings?: boolean;
}

interface SearchSettingsProps {
  visible: boolean;
  onClose: () => void;
  preferences: any;
  onUpdatePreferences: (prefs: any) => void;
}

const SearchSettings: React.FC<SearchSettingsProps> = ({
  visible,
  onClose,
  preferences,
  onUpdatePreferences,
}) => {
  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <View style={styles.settingsContainer}>
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsTitle}>Arama Ayarları</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsContent}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Önerileri Göster</Text>
            <Switch
              value={preferences.enableSuggestions}
              onValueChange={value =>
                onUpdatePreferences({ enableSuggestions: value })
              }
              trackColor={{
                false: Colors.neutral.grayLight,
                true: Colors.primary.blue,
              }}
              thumbColor={
                preferences.enableSuggestions
                  ? Colors.neutral.white
                  : Colors.neutral.grayMedium
              }
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Otomatik Tamamlama</Text>
            <Switch
              value={preferences.enableAutoComplete}
              onValueChange={value =>
                onUpdatePreferences({ enableAutoComplete: value })
              }
              trackColor={{
                false: Colors.neutral.grayLight,
                true: Colors.primary.blue,
              }}
              thumbColor={
                preferences.enableAutoComplete
                  ? Colors.neutral.white
                  : Colors.neutral.grayMedium
              }
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Maksimum Geçmiş Sayısı</Text>
            <Text style={styles.settingValue}>
              {preferences.maxHistoryItems}
            </Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Arama Yarıçapı (km)</Text>
            <Text style={styles.settingValue}>{preferences.searchRadius}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const SmartSearchComponent: React.FC<SmartSearchComponentProps> = ({
  onFilter,
  onPlaceSelect,
  placeholder = 'Yer, şehir veya kategori arayın...',
  autoFocus = false,
  style,
  showHistory = true,
  showFavorites = true,
  showSettings = true,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'search' | 'history' | 'favorites'
  >('search');
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const searchContainerAnim = useRef(new Animated.Value(0)).current;

  // Hooks
  const [searchState, searchActions] = useEnhancedSearch({
    debounceMs: 300,
    maxResults: 10,
    enableCaching: true,
    enableSuggestions: true,
    minQueryLength: 1,
  });

  const {
    recentSearches,
    favoritePlaces,
    preferences,
    addSearchToHistory,
    clearSearchHistory,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    updatePreferences,
  } = useSearchStorage();

  // Handle search results
  useEffect(() => {
    onFilter(searchState.results);

    // Add to history when search is performed
    if (searchState.hasSearched && searchState.query.trim()) {
      addSearchToHistory(searchState.query, searchState.results.length);
    }
  }, [
    searchState.results,
    searchState.hasSearched,
    searchState.query,
    onFilter,
    addSearchToHistory,
  ]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);

    Animated.timing(searchContainerAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchContainerAnim]);

  // Handle input blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);

    Animated.timing(searchContainerAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchContainerAnim]);

  // Handle place selection
  const handlePlaceSelect = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      searchActions.selectPlace(place);
      Keyboard.dismiss();
      onPlaceSelect?.(place);

      AccessibilityInfo.announceForAccessibility(`${place.name} seçildi`);
    },
    [searchActions, onPlaceSelect],
  );

  // Handle history item selection
  const handleHistorySelect = useCallback(
    (query: string) => {
      searchActions.setQuery(query);
      inputRef.current?.focus();
    },
    [searchActions],
  );

  // Handle favorite toggle
  const handleFavoriteToggle = useCallback(
    (place: TouristPlace | EnhancedTouristPlace) => {
      if (isFavorite(place.id)) {
        removeFromFavorites(place.id);
      } else {
        addToFavorites(place);
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites],
  );

  // Render search result item
  const renderSearchResult = useCallback(
    ({ item }: { item: TouristPlace | EnhancedTouristPlace }) => {
      const getLocationText = () => {
        if ('address' in item && typeof item.address === 'object') {
          return `${item.address.city}, ${item.address.district}`;
        }
        return 'Konum bilgisi yok';
      };

      const getRating = () => {
        if ('rating' in item && typeof item.rating === 'object') {
          if ('overall' in item.rating) {
            return (item.rating as any).overall.average;
          } else if ('average' in item.rating) {
            return item.rating.average;
          }
        }
        return 0;
      };

      return (
        <View style={styles.resultItem}>
          <TouchableOpacity
            style={styles.resultContent}
            onPress={() => handlePlaceSelect(item)}
            accessibilityRole='button'
            accessibilityLabel={`${item.name} seçeneği`}
          >
            <View style={styles.resultIcon}>
              <Text style={styles.resultIconText}>
                {'icon' in item && item.icon ? item.icon : '📍'}
              </Text>
            </View>
            <View style={styles.resultInfo}>
              <Text style={styles.resultName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.resultLocation} numberOfLines={1}>
                📍 {getLocationText()}
              </Text>
              <View style={styles.resultMeta}>
                <Text style={styles.resultRating}>
                  ⭐ {getRating().toFixed(1)}
                </Text>
                <Text style={styles.resultCategory}>{item.category}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleFavoriteToggle(item)}
              accessibilityRole='button'
              accessibilityLabel={
                isFavorite(item.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'
              }
            >
              <Text
                style={[
                  styles.favoriteIcon,
                  {
                    color: isFavorite(item.id)
                      ? Colors.secondary.golden
                      : Colors.neutral.grayMedium,
                  },
                ]}
              >
                {isFavorite(item.id) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      );
    },
    [handlePlaceSelect, handleFavoriteToggle, isFavorite],
  );

  // Render history item
  const renderHistoryItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        style={styles.historyItem}
        onPress={() => handleHistorySelect(item)}
        accessibilityRole='button'
        accessibilityLabel={`Geçmiş arama: ${item}`}
      >
        <Text style={styles.historyIcon}>🕐</Text>
        <Text style={styles.historyText}>{item}</Text>
      </TouchableOpacity>
    ),
    [handleHistorySelect],
  );

  // Render favorite item
  const renderFavoriteItem = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity
        style={styles.favoriteItem}
        onPress={() => handlePlaceSelect(item.place)}
        accessibilityRole='button'
        accessibilityLabel={`Favori yer: ${item.place.name}`}
      >
        <View style={styles.favoriteItemIcon}>
          <Text style={styles.favoriteItemIconText}>
            {'icon' in item.place && item.place.icon ? item.place.icon : '📍'}
          </Text>
        </View>
        <View style={styles.favoriteItemInfo}>
          <Text style={styles.favoriteItemName}>{item.place.name}</Text>
          <Text style={styles.favoriteItemDate}>
            Eklenme: {new Date(item.addedAt).toLocaleDateString('tr-TR')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeFavoriteButton}
          onPress={() => removeFromFavorites(item.place.id)}
          accessibilityRole='button'
          accessibilityLabel='Favorilerden çıkar'
        >
          <Text style={styles.removeFavoriteIcon}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [handlePlaceSelect, removeFromFavorites],
  );

  const animatedBorderColor = searchContainerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.neutral.grayLight, Colors.primary.blue],
  });

  return (
    <View style={[styles.container, style]}>
      {/* Search Input */}
      <Animated.View
        style={[
          styles.searchInputContainer,
          { borderColor: animatedBorderColor },
        ]}
      >
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={Colors.neutral.grayMedium}
            value={searchState.query}
            onChangeText={searchActions.setQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            autoCorrect={false}
            autoCapitalize='none'
            accessibilityLabel='Arama giriş alanı'
            accessibilityRole='search'
          />

          {searchState.isLoading && (
            <ActivityIndicator
              size='small'
              color={Colors.primary.blue}
              style={styles.loadingIndicator}
            />
          )}

          {searchState.query.length > 0 && !searchState.isLoading && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={searchActions.clearSearch}
              accessibilityRole='button'
              accessibilityLabel='Aramayı temizle'
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}

          {showSettings && (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setShowSettingsModal(true)}
              accessibilityRole='button'
              accessibilityLabel='Arama ayarları'
            >
              <Text style={styles.settingsButtonText}>⚙️</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Tab Navigation */}
      {(isFocused || searchState.query.length > 0) && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'search' && styles.activeTabText,
              ]}
            >
              Arama ({searchState.results.length})
            </Text>
          </TouchableOpacity>

          {showHistory && (
            <TouchableOpacity
              style={[styles.tab, activeTab === 'history' && styles.activeTab]}
              onPress={() => setActiveTab('history')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'history' && styles.activeTabText,
                ]}
              >
                Geçmiş ({recentSearches.length})
              </Text>
            </TouchableOpacity>
          )}

          {showFavorites && (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'favorites' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('favorites')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'favorites' && styles.activeTabText,
                ]}
              >
                Favoriler ({favoritePlaces.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Content based on active tab */}
      {(isFocused || searchState.query.length > 0) && (
        <View style={styles.contentContainer}>
          {activeTab === 'search' && (
            <>
              {searchState.results.length > 0 ? (
                <FlatList
                  data={searchState.results}
                  renderItem={renderSearchResult}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  style={styles.resultsList}
                />
              ) : searchState.hasSearched && !searchState.isLoading ? (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsIcon}>🔍</Text>
                  <Text style={styles.noResultsTitle}>Sonuç bulunamadı</Text>
                  <Text style={styles.noResultsSubtitle}>
                    "{searchState.query}" için eşleşen yer bulunamadı
                  </Text>
                </View>
              ) : null}
            </>
          )}

          {activeTab === 'history' && (
            <>
              {recentSearches.length > 0 ? (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Son Aramalar</Text>
                    <TouchableOpacity onPress={clearSearchHistory}>
                      <Text style={styles.clearHistoryText}>Temizle</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={recentSearches}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item, index) => `history-${index}`}
                    showsVerticalScrollIndicator={false}
                    style={styles.historyList}
                  />
                </View>
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateIcon}>🕐</Text>
                  <Text style={styles.emptyStateTitle}>
                    Henüz arama yapmadınız
                  </Text>
                </View>
              )}
            </>
          )}

          {activeTab === 'favorites' && (
            <>
              {favoritePlaces.length > 0 ? (
                <View>
                  <Text style={styles.sectionTitle}>Favori Yerler</Text>
                  <FlatList
                    data={favoritePlaces}
                    renderItem={renderFavoriteItem}
                    keyExtractor={item => item.place.id}
                    showsVerticalScrollIndicator={false}
                    style={styles.favoritesList}
                  />
                </View>
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateIcon}>❤️</Text>
                  <Text style={styles.emptyStateTitle}>
                    Henüz favori yeriniz yok
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      )}

      {/* Settings Modal */}
      <SearchSettings
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchInputContainer: {
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: Colors.neutral.white,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    color: Colors.neutral.grayMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral.charcoal,
    fontWeight: '500',
  },
  loadingIndicator: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: Colors.neutral.grayMedium,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 4,
    marginLeft: 8,
  },
  settingsButtonText: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.grayLight,
    marginTop: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary.blue,
  },
  tabText: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary.blue,
    fontWeight: '600',
  },
  contentContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    shadowColor: Colors.neutral.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 400,
  },
  resultsList: {
    maxHeight: 300,
  },
  resultItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.neutral.white,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultIconText: {
    fontSize: 20,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 4,
  },
  resultLocation: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    marginBottom: 4,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultRating: {
    fontSize: 12,
    color: Colors.secondary.golden,
    fontWeight: '600',
    marginRight: 12,
  },
  resultCategory: {
    fontSize: 12,
    color: Colors.primary.blue,
    fontWeight: '500',
    backgroundColor: Colors.primary.blue + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  historyList: {
    maxHeight: 200,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  historyIcon: {
    fontSize: 16,
    marginRight: 12,
    color: Colors.neutral.grayMedium,
  },
  historyText: {
    fontSize: 15,
    color: Colors.neutral.charcoal,
    fontWeight: '500',
  },
  favoritesList: {
    maxHeight: 300,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: Colors.neutral.white,
  },
  favoriteItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.neutral.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  favoriteItemIconText: {
    fontSize: 18,
  },
  favoriteItemInfo: {
    flex: 1,
  },
  favoriteItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 2,
  },
  favoriteItemDate: {
    fontSize: 12,
    color: Colors.neutral.grayMedium,
  },
  removeFavoriteButton: {
    padding: 8,
  },
  removeFavoriteIcon: {
    fontSize: 16,
    color: Colors.neutral.grayMedium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
  },
  clearHistoryText: {
    fontSize: 14,
    color: Colors.primary.blue,
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 24,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.6,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.charcoal,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.grayMedium,
    textAlign: 'center',
  },
  // Settings Modal Styles
  settingsContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.grayLight,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral.charcoal,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.neutral.grayMedium,
  },
  settingsContent: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.grayLight,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.neutral.charcoal,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 16,
    color: Colors.primary.blue,
    fontWeight: '600',
  },
});

export default SmartSearchComponent;
