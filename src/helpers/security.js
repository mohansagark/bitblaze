/**
 * Security utilities for the application
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = html => {
  if (typeof html !== 'string') return '';

  // Create a temporary div element
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

/**
 * Validate and sanitize URL
 * @param {string} url - URL to validate
 * @returns {string|null} Sanitized URL or null if invalid
 */
export const sanitizeURL = url => {
  if (typeof url !== 'string') return null;

  try {
    const parsedUrl = new URL(url);

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }

    return parsedUrl.toString();
  } catch (error) {
    return null;
  }
};

/**
 * Generate a random token
 * @param {number} length - Length of the token
 * @returns {string} Random token
 */
export const generateToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Hash a string using a simple hash function
 * @param {string} str - String to hash
 * @returns {number} Hash value
 */
export const simpleHash = str => {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
};

/**
 * Check if content contains potential security threats
 * @param {string} content - Content to check
 * @returns {object} Security check result
 */
export const checkContentSecurity = content => {
  const threats = [];

  // Check for script tags
  if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(content)) {
    threats.push('Script injection detected');
  }

  // Check for iframe tags
  if (/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi.test(content)) {
    threats.push('Iframe injection detected');
  }

  // Check for javascript: URLs
  if (/javascript:/gi.test(content)) {
    threats.push('JavaScript URL detected');
  }

  // Check for data: URLs
  if (/data:(?!image\/[a-z]+;base64,)/gi.test(content)) {
    threats.push('Suspicious data URL detected');
  }

  return {
    isSafe: threats.length === 0,
    threats,
  };
};

/**
 * Rate limiting utility
 */
export class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  /**
   * Check if request is allowed
   * @param {string} identifier - Unique identifier for the requester
   * @returns {boolean} True if request is allowed
   */
  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => now - timestamp < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  /**
   * Get remaining requests for identifier
   * @param {string} identifier - Unique identifier
   * @returns {number} Remaining requests
   */
  getRemainingRequests(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(timestamp => now - timestamp < this.windowMs);

    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

/**
 * Create a rate limiter for audio playback
 */
export const audioRateLimiter = new RateLimiter(50, 1000); // 50 plays per second

/**
 * Create a rate limiter for API calls
 */
export const apiRateLimiter = new RateLimiter(100, 60000); // 100 calls per minute

/**
 * Secure local storage wrapper
 */
export const secureStorage = {
  /**
   * Set item in localStorage with optional encryption
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @param {boolean} encrypt - Whether to encrypt the value
   */
  setItem: (key, value, encrypt = false) => {
    try {
      let stringValue = JSON.stringify(value);

      if (encrypt) {
        // Simple encoding (not real encryption - for demo purposes)
        stringValue = btoa(stringValue);
      }

      localStorage.setItem(key, stringValue);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error saving to localStorage:', error);
      }
    }
  },

  /**
   * Get item from localStorage with optional decryption
   * @param {string} key - Storage key
   * @param {boolean} decrypt - Whether to decrypt the value
   * @returns {*} Retrieved value
   */
  getItem: (key, decrypt = false) => {
    try {
      let value = localStorage.getItem(key);

      if (value === null) return null;

      if (decrypt) {
        // Simple decoding (not real decryption - for demo purposes)
        value = atob(value);
      }

      return JSON.parse(value);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error reading from localStorage:', error);
      }
      return null;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  removeItem: key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error removing from localStorage:', error);
      }
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error clearing localStorage:', error);
      }
    }
  },
};

const securityHelpers = {
  sanitizeHTML,
  sanitizeURL,
  generateToken,
  simpleHash,
  checkContentSecurity,
  RateLimiter,
  audioRateLimiter,
  apiRateLimiter,
  secureStorage,
};

export default securityHelpers;
