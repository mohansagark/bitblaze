/**
 * Tests for environment helper functions
 */

import {
  getEnvVar,
  isDevelopment,
  isProduction,
  isDebugEnabled,
  isFeatureEnabled,
  getApiUrl,
  getAppVersion,
  getBuildInfo,
} from '../../src/helpers/environment';

describe('Environment Helper Functions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getEnvVar', () => {
    test('returns environment variable when it exists', () => {
      process.env.TEST_VAR = 'test-value';

      const result = getEnvVar('TEST_VAR');

      expect(result).toBe('test-value');
    });

    test('returns fallback when environment variable does not exist', () => {
      delete process.env.TEST_VAR;

      const result = getEnvVar('TEST_VAR', 'fallback-value');

      expect(result).toBe('fallback-value');
    });

    test('returns empty string as default fallback', () => {
      delete process.env.TEST_VAR;

      const result = getEnvVar('TEST_VAR');

      expect(result).toBe('');
    });

    test('returns environment variable even if fallback is provided', () => {
      process.env.TEST_VAR = 'env-value';

      const result = getEnvVar('TEST_VAR', 'fallback-value');

      expect(result).toBe('env-value');
    });
  });

  describe('isDevelopment', () => {
    test('returns true when REACT_APP_ENV is development', () => {
      process.env.REACT_APP_ENV = 'development';

      const result = isDevelopment();

      expect(result).toBe(true);
    });

    test('returns false when REACT_APP_ENV is production', () => {
      process.env.REACT_APP_ENV = 'production';

      const result = isDevelopment();

      expect(result).toBe(false);
    });

    test('returns true by default when REACT_APP_ENV is not set', () => {
      delete process.env.REACT_APP_ENV;

      const result = isDevelopment();

      expect(result).toBe(true);
    });
  });

  describe('isProduction', () => {
    test('returns true when REACT_APP_ENV is production', () => {
      process.env.REACT_APP_ENV = 'production';

      const result = isProduction();

      expect(result).toBe(true);
    });

    test('returns false when REACT_APP_ENV is development', () => {
      process.env.REACT_APP_ENV = 'development';

      const result = isProduction();

      expect(result).toBe(false);
    });

    test('returns false by default when REACT_APP_ENV is not set', () => {
      delete process.env.REACT_APP_ENV;

      const result = isProduction();

      expect(result).toBe(false);
    });
  });

  describe('isDebugEnabled', () => {
    test('returns true when REACT_APP_DEBUG is true', () => {
      process.env.REACT_APP_DEBUG = 'true';

      const result = isDebugEnabled();

      expect(result).toBe(true);
    });

    test('returns false when REACT_APP_DEBUG is false', () => {
      process.env.REACT_APP_DEBUG = 'false';

      const result = isDebugEnabled();

      expect(result).toBe(false);
    });

    test('returns false by default when REACT_APP_DEBUG is not set', () => {
      delete process.env.REACT_APP_DEBUG;

      const result = isDebugEnabled();

      expect(result).toBe(false);
    });

    test('returns false for any value other than "true"', () => {
      process.env.REACT_APP_DEBUG = 'yes';
      expect(isDebugEnabled()).toBe(false);

      process.env.REACT_APP_DEBUG = '1';
      expect(isDebugEnabled()).toBe(false);

      process.env.REACT_APP_DEBUG = 'True';
      expect(isDebugEnabled()).toBe(false);
    });
  });

  test('environment functions work together correctly', () => {
    // Test development environment
    process.env.REACT_APP_ENV = 'development';
    process.env.REACT_APP_DEBUG = 'true';

    expect(isDevelopment()).toBe(true);
    expect(isProduction()).toBe(false);
    expect(isDebugEnabled()).toBe(true);

    // Test production environment
    process.env.REACT_APP_ENV = 'production';
    process.env.REACT_APP_DEBUG = 'false';

    expect(isDevelopment()).toBe(false);
    expect(isProduction()).toBe(true);
    expect(isDebugEnabled()).toBe(false);
  });
});
