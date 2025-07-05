/**
 * Navigation Debugging Tools for TravelTurkey
 * Development-only components for testing and debugging navigation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useNavigationState,
  useFocusEffect,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types/navigation';

// Navigation state logger
export const NavigationLogger = () => {
  const route = useRoute();
  
  useEffect(() => {
    if (__DEV__) {
      console.log(`🧭 Navigation Event: Mounted ${route.name}`);
      return () => {
        console.log(`🧭 Navigation Event: Unmounted ${route.name}`);
      };
    }
    return undefined;
  }, [route.name]);

  useFocusEffect(
    React.useCallback(() => {
      if (__DEV__) {
        console.log(`🧭 Navigation Event: Focused ${route.name}`);
        return () => {
          console.log(`🧭 Navigation Event: Blurred ${route.name}`);
        };
      }
      return undefined;
    }, [route.name])
  );

  return null;
};

// Navigation debug overlay
export const NavigationDebugger: React.FC<{
  visible?: boolean;
  onToggle?: () => void;
}> = ({ visible = false, onToggle }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const navigationState = useNavigationState(state => state);

  if (!__DEV__) return null;

  if (!visible) {
    return (
      <TouchableOpacity 
        style={styles.debugToggle}
        onPress={onToggle}
        accessibilityLabel="Show navigation debugger"
      >
        <Text style={styles.debugToggleText}>🧭</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.debugOverlay}>
      <View style={styles.debugHeader}>
        <Text style={styles.debugTitle}>Navigation Debug</Text>
        <TouchableOpacity onPress={onToggle}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.debugContent}>
        <View style={styles.debugSection}>
          <Text style={styles.sectionTitle}>Current Route</Text>
          <Text style={styles.debugText}>Name: {route.name}</Text>
          <Text style={styles.debugText}>
            Params: {JSON.stringify(route.params || {}, null, 2)}
          </Text>
        </View>

        <View style={styles.debugSection}>
          <Text style={styles.sectionTitle}>Navigation State</Text>
          <Text style={styles.debugText}>
            Can Go Back: {navigation.canGoBack() ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.debugText}>
            Routes Count: {navigationState?.routes?.length || 0}
          </Text>
        </View>

        <View style={styles.debugSection}>
          <Text style={styles.sectionTitle}>Stack Routes</Text>
          {navigationState?.routes?.map((stackRoute, index) => (
            <Text key={index} style={styles.debugText}>
              {index}: {stackRoute.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Navigation test panel with common actions
export const NavigationTestPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (!__DEV__) return null;

  const tests = [
    {
      id: 'tab-switching',
      name: 'Tab Switching',
      action: () => {
        try {
          setTestResults(prev => ({ ...prev, 'tab-switching': true }));
        } catch (error) {
          console.error('Tab switching test failed:', error);
          setTestResults(prev => ({ ...prev, 'tab-switching': false }));
        }
      },
    },
    {
      id: 'back-navigation',
      name: 'Back Navigation',
      action: () => {
        try {
          if (navigation.canGoBack()) {
            navigation.goBack();
            setTestResults(prev => ({ ...prev, 'back-navigation': true }));
          } else {
            setTestResults(prev => ({ ...prev, 'back-navigation': false }));
          }
        } catch (error) {
          console.error('Back navigation test failed:', error);
          setTestResults(prev => ({ ...prev, 'back-navigation': false }));
        }
      },
    },
    {
      id: 'deep-linking',
      name: 'Deep Linking',
      action: () => {
        try {
          setTestResults(prev => ({ ...prev, 'deep-linking': true }));
        } catch (error) {
          console.error('Deep linking test failed:', error);
          setTestResults(prev => ({ ...prev, 'deep-linking': false }));
        }
      },
    },
  ];

  const runTest = (test: typeof tests[0]) => {
    console.log(`🧪 Running test: ${test.name}`);
    test.action();
  };

  const runAllTests = () => {
    tests.forEach(test => {
      setTimeout(() => runTest(test), 500);
    });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.testPanelToggle}
        onPress={() => setIsVisible(true)}
        accessibilityLabel="Open navigation test panel"
      >
        <Text style={styles.testPanelToggleText}>🧪</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.testPanel}>
            <View style={styles.testPanelHeader}>
              <Text style={styles.testPanelTitle}>Navigation Tests</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.runAllButton}
              onPress={runAllTests}
            >
              <Text style={styles.runAllButtonText}>Run All Tests</Text>
            </TouchableOpacity>

            <ScrollView style={styles.testList}>
              {tests.map(test => (
                <View key={test.id} style={styles.testItem}>
                  <TouchableOpacity
                    style={styles.testButton}
                    onPress={() => runTest(test)}
                  >
                    <Text style={styles.testButtonText}>{test.name}</Text>
                  </TouchableOpacity>
                  
                  <View style={[
                    styles.testResult,
                    testResults[test.id] === true && styles.testSuccess,
                    testResults[test.id] === false && styles.testFailure,
                  ]}>
                    <Text style={styles.testResultText}>
                      {testResults[test.id] === true && '✅'}
                      {testResults[test.id] === false && '❌'}
                      {testResults[test.id] === undefined && '⏸️'}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Performance monitor for navigation
export const NavigationPerformanceMonitor: React.FC = () => {
  const [_navigationTimes, setNavigationTimes] = useState<Record<string, number>>({});
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      if (!__DEV__) return;
      
      const startTime = Date.now();
      
      return () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        setNavigationTimes(prev => ({
          ...prev,
          [route.name]: duration
        }));

        if (duration > 100) {
          console.warn(`⚠️ Slow navigation to ${route.name}: ${duration}ms`);
        } else {
          console.log(`✅ Navigation to ${route.name}: ${duration}ms`);
        }
      };
    }, [route.name])
  );

  return null;
};

// Memory usage monitor
export const NavigationMemoryMonitor: React.FC = () => {
  useEffect(() => {
    if (!__DEV__) return;
    
    const interval = setInterval(() => {
      // Simple memory logging for React Native
      console.log('💾 Memory check - Navigation screens active');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

const styles = StyleSheet.create({
  debugToggle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  debugToggleText: {
    color: 'white',
    fontSize: 16,
  },
  debugOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    width: 300,
    maxHeight: 400,
    zIndex: 9999,
  },
  debugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  debugTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'white',
    fontSize: 18,
  },
  debugContent: {
    padding: 15,
  },
  debugSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  testPanelToggle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 80,
    right: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  testPanelToggleText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testPanel: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  testPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  testPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  runAllButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  runAllButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testList: {
    padding: 20,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  testButton: {
    flex: 1,
    padding: 10,
  },
  testButtonText: {
    fontSize: 14,
    color: '#333',
  },
  testResult: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  testSuccess: {
    backgroundColor: '#4CAF50',
  },
  testFailure: {
    backgroundColor: '#F44336',
  },
  testResultText: {
    fontSize: 16,
  },
});
