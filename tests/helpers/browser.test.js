import {
  getBrowserInfo,
  features,
  device,
  performance,
  safeFeatures,
} from '../../src/helpers/browser';

// Mock navigator and window objects for testing
const mockNavigator = {
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  vendor: 'Google Inc.',
  maxTouchPoints: 0,
};

const mockWindow = {
  localStorage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
  sessionStorage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
  matchMedia: jest.fn(() => ({ matches: false })),
  innerWidth: 1920,
  devicePixelRatio: 2,
};

// Mock global objects
Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
});

Object.defineProperty(window, 'localStorage', {
  value: mockWindow.localStorage,
  writable: true,
});

describe('Browser Utilities', () => {
  describe('getBrowserInfo', () => {
    test('detects Chrome browser', () => {
      const info = getBrowserInfo();
      expect(info.name).toBe('chrome');
      expect(info.version).toBe('91');
      expect(info.isModern).toBe(true);
    });
  });

  describe('features', () => {
    test('detects localStorage availability', () => {
      expect(typeof features.localStorage).toBe('boolean');
    });

    test('detects sessionStorage availability', () => {
      expect(typeof features.sessionStorage).toBe('boolean');
    });

    test('detects canvas support', () => {
      expect(typeof features.canvas).toBe('boolean');
    });

    test('detects touch support', () => {
      expect(typeof features.touch).toBe('boolean');
    });
  });

  describe('device', () => {
    test('detects device type', () => {
      expect(typeof device.isMobile).toBe('boolean');
      expect(typeof device.isTablet).toBe('boolean');
      expect(typeof device.isDesktop).toBe('boolean');
    });

    test('detects pixel ratio', () => {
      expect(typeof device.pixelRatio).toBe('number');
      expect(device.pixelRatio).toBeGreaterThan(0);
    });

    test('determines screen size category', () => {
      const screenSize = device.getScreenSize();
      expect(['xs', 'sm', 'md', 'lg', 'xl']).toContain(screenSize);
    });
  });

  describe('performance', () => {
    test('measures function execution time', () => {
      const testFn = () => {
        for (let i = 0; i < 1000; i++) {
          // Simple operation
        }
        return 'done';
      };

      const result = performance.measure(testFn);
      expect(result.result).toBe('done');
      expect(typeof result.executionTime).toBe('number');
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
    });

    test('debounce function delays execution', done => {
      const mockFn = jest.fn();
      const debouncedFn = performance.debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      }, 150);
    });

    test('throttle function limits execution frequency', done => {
      const mockFn = jest.fn();
      const throttledFn = performance.throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        throttledFn();
        expect(mockFn).toHaveBeenCalledTimes(2);
        done();
      }, 150);
    });
  });

  describe('safeFeatures', () => {
    test('localStorage methods handle errors gracefully', () => {
      // Mock localStorage to be available but throw error when used
      const originalFeature = features.localStorage;

      // Mock features.localStorage to return true (pretend localStorage is available)
      Object.defineProperty(features, 'localStorage', {
        value: true,
        writable: true,
        configurable: true,
      });

      // Mock localStorage object to exist but setItem throws
      const originalLocalStorage = global.localStorage;
      global.localStorage = {
        setItem: jest.fn(() => {
          throw new Error('Storage error');
        }),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      };

      // The safeFeatures.localStorage.setItem should catch the error and return false
      const result = safeFeatures.localStorage.setItem('test', 'value');
      expect(result).toBe(false);

      // Restore original values
      global.localStorage = originalLocalStorage;
      Object.defineProperty(features, 'localStorage', {
        value: originalFeature,
        writable: true,
        configurable: true,
      });
    });

    test('copyToClipboard handles missing API gracefully', async () => {
      // Mock missing clipboard API
      const originalClipboard = navigator.clipboard;
      delete navigator.clipboard;

      const result = await safeFeatures.copyToClipboard('test text');
      expect(typeof result).toBe('boolean');

      navigator.clipboard = originalClipboard;
    });
  });
});
