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
        confetti: false,
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

      expect(store.getState().general.confetti).toBe(true);

      act(() => {
        result.current.hideConfetti();
      });

      expect(store.getState().general.confetti).toBe(false);
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
      expect(typeof result.current.headerHeight).toBe('number');
      expect(typeof result.current.footerHeight).toBe('number');
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
    // Mock document.createElement for audio elements
    beforeEach(() => {
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
        return {};
      });
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

      global.document.createElement = jest.fn(() => mockAudio);

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
