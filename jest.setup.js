// Jest setup for TravelTurkey

// Mock react-native modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock StatusBar
jest.mock(
  'react-native/Libraries/Components/StatusBar/StatusBar',
  () => 'StatusBar',
);

// Console warnings'ları suppress et (test output'unu temizlemek için)
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test timeout
jest.setTimeout(10000);
