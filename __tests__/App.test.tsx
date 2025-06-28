/**
 * TravelTurkey App Tests
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock react-native modules that might cause issues
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

describe('App Component', () => {
  it('renders correctly without crashing', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<App />);
    });
  });
});
