/**
 * TravelTurkey - Simple React Navigation Test
 * Minimal setup without Reanimated for testing
 */

import React from 'react';
import { StatusBar, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import theme and navigators
import { Theme } from './src/styles/theme';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function SimpleApp(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
            backgroundColor={Theme.colors.primary[500]}
            translucent={false}
          />
          <BottomTabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default SimpleApp;
