/**
 * Navigation Test Script
 * Run this to verify React Navigation 6 setup is working correctly
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Simple test screens
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      <Text style={styles.subtitle}>React Navigation 6 Test</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ExploreTab')}
      >
        <Text style={styles.buttonText}>Go to Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlansTab')}
      >
        <Text style={styles.buttonText}>Go to Plans</Text>
      </TouchableOpacity>
    </View>
  );
}

function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Explore Screen</Text>
      <Text style={styles.subtitle}>Navigation working!</Text>
    </View>
  );
}

function PlansScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Plans Screen</Text>
      <Text style={styles.subtitle}>Navigation working!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile Screen</Text>
      <Text style={styles.subtitle}>Navigation working!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name='HomeTab'
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name='ExploreTab'
        component={ExploreScreen}
        options={{ title: 'Explore' }}
      />
      <Tab.Screen
        name='PlansTab'
        component={PlansScreen}
        options={{ title: 'Plans' }}
      />
      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function NavigationTest() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Main' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 5,
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
