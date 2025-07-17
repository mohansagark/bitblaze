import {
  isValidEmail,
  validatePassword,
  sanitizeInput,
  isEmpty,
} from '../../src/helpers/validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    test('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    test('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    test('detects empty values', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    test('detects non-empty values', () => {
      expect(isEmpty('test')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('validates strong passwords', () => {
      const result = validatePassword('StrongPass123!');
      expect(result.isValid).toBe(true);
      expect(result.strength).toBe(5);
      expect(result.errors).toHaveLength(0);
    });

    test('rejects weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.strength).toBeLessThan(5);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });
  });

  describe('sanitizeInput', () => {
    test('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>hello')).toBe('hello');
    });

    test('preserves safe content', () => {
      expect(sanitizeInput('Hello World!')).toBe('Hello World!');
    });
  });
});
