/**
 * TravelTurkey - Detail Screen Components Export
 * Modern detail page with 2025 UI trends and advanced animations
 */

export { DetailScreen } from './DetailScreen';
export { default as DetailScreenDemo } from '../demo/DetailScreenDemo';
export { default as DetailScreenDemoSimple } from '../demo/DetailScreenDemoSimple';
export { default as DetailScreenImplementationGuide } from './DetailScreen.guide';

// Types
export type { TouristPlace } from '../../types/touristPlaces';

// Usage example for navigation
/*
import { DetailScreen } from './screens/detail';

// In your stack navigator
<Stack.Screen 
  name="DetailScreen" 
  component={DetailScreen}
  options={{ 
    headerShown: false,
    presentation: 'card',
    animationTypeForReplace: 'push',
  }}
/>

// Navigate to detail screen
const navigateToDetail = (place: TouristPlace) => {
  navigation.navigate('DetailScreen', { place });
};
*/
