import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  useTheme,
  useConfetti,
  useMenu,
  useAudio,
} from '../../src/helpers/hooks';
import { ThemeContext } from '../../src/themes';
import generalSlice from '../../src/redux/slices/generalSlice';

// Mock theme context
const mockTheme = {
  primary: '#000000',
  secondary: '#ffffff',
};

const MockThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={mockTheme}>{children}</ThemeContext.Provider>
);

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      general: generalSlice,
    },
    preloadedState: {
      general: {
        menubar: false,
        isMobile: false,
        confetti: {
          show: false,
          width: 1920,
          height: 1080,
          recycle: false,
          numberOfPieces: 200,
        },
        ...initialState,
      },
    },
  });
};

const MockReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Custom Hooks', () => {
  describe('useTheme', () => {
    test('returns theme context', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: MockThemeProvider,
      });

      expect(result.current).toEqual(mockTheme);
    });
  });

  describe('useConfetti', () => {
    test('provides confetti control functions', () => {
      const store = createTestStore();
      const wrapper = ({ children }) => (
        <MockReduxProvider store={store}>{children}</MockReduxProvider>
      );

      const { result } = renderHook(() => useConfetti(), { wrapper });

      expect(typeof result.current.showConfetti).toBe('function');
      expect(typeof result.current.hideConfetti).toBe('function');
    });

    test('dispatches confetti actions', () => {
      const store = createTestStore();
      const wrapper = ({ children }) => (
        <MockReduxProvider store={store}>{children}</MockReduxProvider>
      );

      const { result } = renderHook(() => useConfetti(), { wrapper });

      act(() => {
        result.current.showConfetti();
      });

      expect(store.getState().general.confetti.show).toBe(true);

      act(() => {
        result.current.hideConfetti();
      });

      expect(store.getState().general.confetti.show).toBe(false);
    });
  });

  describe('useMenu', () => {
    test('provides menu state and controls', () => {
      const store = createTestStore();
      const wrapper = ({ children }) => (
        <MockReduxProvider store={store}>{children}</MockReduxProvider>
      );

      const { result } = renderHook(() => useMenu(), { wrapper });

      expect(typeof result.current.menu).toBe('boolean');
      expect(typeof result.current.toggleMenu).toBe('function');
      expect(typeof result.current.isMobile).toBe('boolean');
      expect(typeof result.current.sidebarWidth).toBe('number');
      expect(typeof result.current.headerHeight).toBe('string');
      expect(typeof result.current.footerHeight).toBe('string');
    });

    test('toggles menu state', () => {
      const store = createTestStore({ menubar: false });
      const wrapper = ({ children }) => (
        <MockReduxProvider store={store}>{children}</MockReduxProvider>
      );

      const { result } = renderHook(() => useMenu(), { wrapper });

      expect(result.current.menu).toBe(false);

      act(() => {
        result.current.toggleMenu();
      });

      expect(store.getState().general.menubar).toBe(true);
    });
  });

  describe('useAudio', () => {
    // Mock document.createElement and DOM environment for audio elements
    beforeEach(() => {
      // Create a proper DOM container
      const container = global.document.createElement('div');
      container.setAttribute('id', 'test-container');
      global.document.body.appendChild(container);

      // Store original createElement
      const originalCreateElement = global.document.createElement;

      // Mock createElement for audio only
      global.document.createElement = jest.fn(tagName => {
        if (tagName === 'audio') {
          return {
            src: '',
            preload: '',
            currentTime: 0,
            volume: 1,
            play: jest.fn(() => Promise.resolve()),
            pause: jest.fn(),
            addEventListener: jest.fn(),
          };
        }
        // Use original for other elements
        return originalCreateElement.call(global.document, tagName);
      });
    });

    afterEach(() => {
      // Clean up DOM
      const container = global.document.getElementById('test-container');
      if (container) {
        global.document.body.removeChild(container);
      }
      jest.restoreAllMocks();
    });

    test('provides audio control functions', () => {
      const { result } = renderHook(() => useAudio());

      expect(typeof result.current.playSound).toBe('function');
      expect(typeof result.current.registerAudio).toBe('function');
      expect(typeof result.current.stopSound).toBe('function');
      expect(typeof result.current.setVolume).toBe('function');
    });

    test('registers audio elements', () => {
      const { result } = renderHook(() => useAudio());

      act(() => {
        result.current.registerAudio('test-audio', 'button');
      });

      expect(document.createElement).toHaveBeenCalledWith('audio');
    });

    test('plays registered audio', () => {
      const mockAudio = {
        src: '',
        preload: '',
        currentTime: 0,
        volume: 1,
        play: jest.fn(() => Promise.resolve()),
        pause: jest.fn(),
        addEventListener: jest.fn(),
      };

      // Store original createElement for fallback
      const originalCreateElement = global.document.createElement;

      global.document.createElement = jest.fn(tagName => {
        if (tagName === 'audio') {
          return mockAudio;
        }
        // Use original for other elements
        return originalCreateElement.call(global.document, tagName);
      });

      const { result } = renderHook(() => useAudio());

      act(() => {
        result.current.registerAudio('test-audio', 'button');
      });

      act(() => {
        result.current.playSound('test-audio');
      });

      expect(mockAudio.play).toHaveBeenCalled();
    });
  });
});
