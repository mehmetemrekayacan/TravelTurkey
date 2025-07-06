import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { EnhancedSearchComponent } from '../../components/search';
import { OptimizedTouristicPlacesList } from '../../components/common';
import { useEnhancedSearch } from '../../hooks/enhanced/useEnhancedSearch';
import { useSearchStorage } from '../../hooks/enhanced/useSearchStorage';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { TouristPlace } from '../../types/touristPlaces';
import { EnhancedTouristPlace } from '../../types/enhanced/touristPlace2025';
import ScreenHeader from '../../components/common/ScreenHeader';

const SearchScreen: React.FC = () => {
  const [filteredPlaces, setFilteredPlaces] = useState<(TouristPlace | EnhancedTouristPlace)[]>([]);
  const handleFilter = (results: (TouristPlace | EnhancedTouristPlace)[]) => setFilteredPlaces(results);

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenHeader title='Gelişmiş Arama' icon='🔍' />
      <EnhancedSearchComponent
        onFilter={handleFilter}
        placeholder='Yer, şehir veya kategori arayın...'
        maxResults={15}
        showSuggestions={true}
        autoFocus={false}
      />
      <OptimizedTouristicPlacesList
        data={filteredPlaces}
        variant='default'
        showImages={true}
      />
    </SafeAreaView>
  );
};

export default SearchScreen; 