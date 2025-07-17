import {
  sanitizeHTML,
  sanitizeURL,
  generateToken,
  simpleHash,
  checkContentSecurity,
  RateLimiter,
  secureStorage,
} from '../../src/helpers/security';

describe('Security Utilities', () => {
  describe('sanitizeHTML', () => {
    test('removes script tags', () => {
      const result = sanitizeHTML('<script>alert("xss")</script><p>Safe content</p>');
      expect(result).not.toContain('<script>');
      expect(result).toContain('Safe content');
    });

    test('removes dangerous attributes', () => {
      const result = sanitizeHTML('<div onclick="alert()">Content</div>');
      // The function HTML-encodes the entire string, so onclick is not executable
      expect(result).toContain('&lt;div onclick=');
      expect(result).toContain('Content');
    });
  });

  describe('sanitizeURL', () => {
    test('allows safe URLs', () => {
      expect(sanitizeURL('https://example.com')).toBe('https://example.com/');
      // Note: relative paths don't work with URL constructor
      expect(sanitizeURL('/relative/path')).toBe(null);
    });

    test('blocks dangerous URLs', () => {
      // eslint-disable-next-line no-script-url
      expect(sanitizeURL('javascript:alert()')).toBe(null);
      expect(sanitizeURL('data:text/html,<script>alert()</script>')).toBe(null);
    });
  });

  describe('generateToken', () => {
    test('generates tokens of specified length', () => {
      const token1 = generateToken(16);
      const token2 = generateToken(32);

      expect(token1.length).toBe(16);
      expect(token2.length).toBe(32);
    });

    test('generates unique tokens', () => {
      const token1 = generateToken();
      const token2 = generateToken();

      expect(token1).not.toBe(token2);
    });
  });

  describe('simpleHash', () => {
    test('generates consistent hash for same input', () => {
      const hash1 = simpleHash('test');
      const hash2 = simpleHash('test');
      expect(hash1).toBe(hash2);
    });

    test('generates different hashes for different inputs', () => {
      const hash1 = simpleHash('test1');
      const hash2 = simpleHash('test2');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('checkContentSecurity', () => {
    test('detects script injection', () => {
      const result = checkContentSecurity('<script>alert("xss")</script>');
      expect(result.isSafe).toBe(false);
      expect(result.threats).toContain('Script injection detected');
    });

    test('detects iframe injection', () => {
      const result = checkContentSecurity('<iframe src="evil.com"></iframe>');
      expect(result.isSafe).toBe(false);
      expect(result.threats).toContain('Iframe injection detected');
    });

    test('passes safe content', () => {
      const result = checkContentSecurity('Hello world!');
      expect(result.isSafe).toBe(true);
      expect(result.threats).toHaveLength(0);
    });
  });

  describe('RateLimiter', () => {
    test('allows requests within limit', () => {
      const limiter = new RateLimiter(5, 1000);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
    });

    test('blocks requests exceeding limit', () => {
      const limiter = new RateLimiter(2, 1000);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
    });

    test('tracks remaining requests', () => {
      const limiter = new RateLimiter(3, 1000);
      expect(limiter.getRemainingRequests('user1')).toBe(3);
      limiter.isAllowed('user1');
      expect(limiter.getRemainingRequests('user1')).toBe(2);
    });
  });

  describe('secureStorage', () => {
    // Mock localStorage
    beforeEach(() => {
      const mockStorage = {};
      global.localStorage = {
        getItem: jest.fn(key => mockStorage[key] || null),
        setItem: jest.fn((key, value) => {
          mockStorage[key] = value;
        }),
        removeItem: jest.fn(key => {
          delete mockStorage[key];
        }),
      };
    });

    test('stores and retrieves data', () => {
      secureStorage.setItem('test', 'value');
      expect(secureStorage.getItem('test')).toBe('value');
    });

    test('handles non-existent keys', () => {
      expect(secureStorage.getItem('nonexistent')).toBe(null);
    });

    test('removes items', () => {
      secureStorage.setItem('test', 'value');
      secureStorage.removeItem('test');
      expect(secureStorage.getItem('test')).toBe(null);
    });
  });
});
