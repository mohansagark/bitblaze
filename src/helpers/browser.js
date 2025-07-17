/**
 * Browser compatibility and feature detection utilities
 */

/**
 * Detect browser information
 * @returns {Object} Browser information
 */
export const getBrowserInfo = () => {
  if (typeof navigator === 'undefined') {
    return {
      name: 'unknown',
      version: 'unknown',
      userAgent: '',
      isModern: true,
    };
  }

  const userAgent = navigator.userAgent;
  const browsers = {
    chrome: /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor),
    firefox: /Firefox/.test(userAgent),
    safari: /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor),
    edge: /Edg/.test(userAgent),
    ie: /MSIE|Trident/.test(userAgent),
    opera: /Opera|OPR/.test(userAgent),
  };

  const browserName = Object.keys(browsers).find(key => browsers[key]) || 'unknown';

  // Extract version
  let version = 'unknown';
  if (browserName === 'chrome') {
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'unknown';
  } else if (browserName === 'firefox') {
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'unknown';
  } else if (browserName === 'safari') {
    version = userAgent.match(/Version\/(\d+)/)?.[1] || 'unknown';
  } else if (browserName === 'edge') {
    version = userAgent.match(/Edg\/(\d+)/)?.[1] || 'unknown';
  }

  return {
    name: browserName,
    version,
    userAgent,
    isModern: !browsers.ie,
  };
};

/**
 * Feature detection utilities
 */
export const features = {
  /**
   * Check if local storage is available
   */
  localStorage: (() => {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  })(),

  /**
   * Check if session storage is available
   */
  sessionStorage: (() => {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  })(),

  /**
   * Check if IndexedDB is available
   */
  indexedDB: typeof window !== 'undefined' && 'indexedDB' in window,

  /**
   * Check if Web Workers are supported
   */
  webWorkers: typeof Worker !== 'undefined',

  /**
   * Check if Service Workers are supported
   */
  serviceWorkers: typeof navigator !== 'undefined' && 'serviceWorker' in navigator,

  /**
   * Check if Push API is supported
   */
  pushNotifications: typeof window !== 'undefined' && 'PushManager' in window,

  /**
   * Check if Notifications API is supported
   */
  notifications: typeof window !== 'undefined' && 'Notification' in window,

  /**
   * Check if Geolocation API is supported
   */
  geolocation: typeof navigator !== 'undefined' && 'geolocation' in navigator,

  /**
   * Check if Touch events are supported
   */
  touch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0)),

  /**
   * Check if WebGL is supported
   */
  webgl: (() => {
    if (typeof document === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  })(),

  /**
   * Check if WebRTC is supported
   */
  webRTC: typeof window !== 'undefined' && 'RTCPeerConnection' in window,

  /**
   * Check if Web Audio API is supported
   */
  webAudio:
    typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window),

  /**
   * Check if Canvas is supported
   */
  canvas: (() => {
    if (typeof document === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext && canvas.getContext('2d'));
    } catch (e) {
      return false;
    }
  })(),

  /**
   * Check if CSS Grid is supported
   */
  cssGrid: typeof document !== 'undefined' && 'grid' in document.createElement('div').style,

  /**
   * Check if CSS Flexbox is supported
   */
  flexbox: typeof document !== 'undefined' && 'flex' in document.createElement('div').style,

  /**
   * Check if CSS Custom Properties (variables) are supported
   */
  cssVariables:
    typeof window !== 'undefined' &&
    window.CSS &&
    window.CSS.supports &&
    window.CSS.supports('color', 'var(--fake-var)'),

  /**
   * Check if Intersection Observer is supported
   */
  intersectionObserver: typeof window !== 'undefined' && 'IntersectionObserver' in window,

  /**
   * Check if ResizeObserver is supported
   */
  resizeObserver: typeof window !== 'undefined' && 'ResizeObserver' in window,

  /**
   * Check if Clipboard API is supported
   */
  clipboard:
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function',

  /**
   * Check if File API is supported
   */
  fileAPI:
    typeof window !== 'undefined' &&
    'File' in window &&
    'FileReader' in window &&
    'FileList' in window &&
    'Blob' in window,

  /**
   * Check if ES6 modules are supported
   */
  es6Modules: typeof document !== 'undefined' && 'noModule' in document.createElement('script'),

  /**
   * Check if Passive event listeners are supported
   */
  passiveEvents: (() => {
    if (typeof window === 'undefined') return false;
    let supportsPassive = false;
    try {
      const options = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
          return false;
        },
      });
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      supportsPassive = false;
    }
    return supportsPassive;
  })(),
};

/**
 * Device detection utilities
 */
export const device = {
  /**
   * Check if device is mobile
   */
  isMobile:
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

  /**
   * Check if device is tablet
   */
  isTablet:
    typeof navigator !== 'undefined' && /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),

  /**
   * Check if device is desktop
   */
  isDesktop:
    typeof navigator !== 'undefined' &&
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

  /**
   * Check if device is iOS
   */
  isIOS: typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent),

  /**
   * Check if device is Android
   */
  isAndroid: typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent),

  /**
   * Get device pixel ratio
   */
  pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,

  /**
   * Check if device supports hover
   */
  canHover: typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,

  /**
   * Get screen size category
   */
  getScreenSize: () => {
    if (typeof window === 'undefined') return 'lg'; // Default fallback
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
  },
};

/**
 * Polyfill utilities
 */
export const polyfills = {
  /**
   * Polyfill for Array.from
   */
  arrayFrom: () => {
    if (!Array.from) {
      Array.from = function (arrayLike, mapFn, thisArg) {
        const O = Object(arrayLike);
        const len = parseInt(O.length) || 0;
        const result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = mapFn ? mapFn.call(thisArg, O[i], i) : O[i];
        }
        return result;
      };
    }
  },

  /**
   * Polyfill for Object.assign
   */
  objectAssign: () => {
    if (typeof Object.assign !== 'function') {
      Object.assign = function (target) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index];
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      };
    }
  },

  /**
   * Polyfill for requestAnimationFrame
   */
  requestAnimationFrame: () => {
    if (typeof window !== 'undefined' && !window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  },

  /**
   * Polyfill for CustomEvent
   */
  customEvent: () => {
    if (typeof window.CustomEvent !== 'function') {
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      window.CustomEvent = CustomEvent;
    }
  },

  /**
   * Apply all polyfills
   */
  applyAll: () => {
    polyfills.arrayFrom();
    polyfills.objectAssign();
    polyfills.requestAnimationFrame();
    polyfills.customEvent();
  },
};

/**
 * Performance utilities
 */
export const performance = {
  /**
   * Measure function execution time
   * @param {Function} fn - Function to measure
   * @param {...any} args - Arguments to pass to function
   * @returns {Object} Result and execution time
   */
  measure: (fn, ...args) => {
    const start = Date.now();
    const result = fn(...args);
    const end = Date.now();
    return {
      result,
      executionTime: end - start,
    };
  },

  /**
   * Debounce function calls
   * @param {Function} fn - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  debounce: (fn, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * Throttle function calls
   * @param {Function} fn - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle: (fn, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: () => {
    return (
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  },
};

/**
 * Safe feature usage with fallbacks
 */
export const safeFeatures = {
  /**
   * Safe localStorage usage with fallback
   */
  localStorage: {
    setItem: (key, value) => {
      if (features.localStorage) {
        try {
          localStorage.setItem(key, value);
          return true;
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('localStorage.setItem failed:', e);
          }
        }
      }
      return false;
    },

    getItem: key => {
      if (features.localStorage) {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('localStorage.getItem failed:', e);
          }
        }
      }
      return null;
    },

    removeItem: key => {
      if (features.localStorage) {
        try {
          localStorage.removeItem(key);
          return true;
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('localStorage.removeItem failed:', e);
          }
        }
      }
      return false;
    },
  },

  /**
   * Safe clipboard usage with fallback
   */
  copyToClipboard: async text => {
    if (features.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Clipboard API failed:', e);
        }
      }
    }

    // Fallback to document.execCommand
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Copy fallback failed:', e);
      }
      return false;
    }
  },

  /**
   * Safe notification usage
   */
  showNotification: (title, options = {}) => {
    if (!features.notifications) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Notifications not supported');
      }
      return null;
    }

    if (Notification.permission === 'granted') {
      return new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          return new Notification(title, options);
        }
      });
    }
    return null;
  },
};

const browserHelpers = {
  getBrowserInfo,
  features,
  device,
  polyfills,
  performance,
  safeFeatures,
};

export default browserHelpers;
