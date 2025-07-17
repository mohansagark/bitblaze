/**
 * Tests for general helper functions
 */

import {
  fetchStore,
  persistData,
  changeTheme,
  changePrimaryColor,
  capitalizeFirstLetter,
} from '../../src/helpers/general';

describe('General Helper Functions', () => {
  // Mock sessionStorage
  const mockSessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });

    // Mock document.querySelector
    document.querySelector = jest.fn();

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('fetchStore', () => {
    test('returns value from sessionStorage when key exists', () => {
      mockSessionStorage.getItem.mockReturnValue('test-value');

      const result = fetchStore('test-key');

      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toBe('test-value');
    });

    test('returns null when key is empty', () => {
      const result = fetchStore('');

      expect(mockSessionStorage.getItem).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    test('returns null when key is null/undefined', () => {
      expect(fetchStore(null)).toBeNull();
      expect(fetchStore(undefined)).toBeNull();
      expect(mockSessionStorage.getItem).not.toHaveBeenCalled();
    });
  });

  describe('persistData', () => {
    test('stores data in sessionStorage when key and value are provided', () => {
      const result = persistData('test-key', 'test-value');

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test-key', 'test-value');
      expect(result).toBeNull();
    });

    test('does not store when key is missing', () => {
      persistData('', 'test-value');
      persistData(null, 'test-value');
      persistData(undefined, 'test-value');

      expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
    });

    test('does not store when value is missing', () => {
      persistData('test-key', '');
      persistData('test-key', null);
      persistData('test-key', undefined);

      expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('changeTheme', () => {
    test('sets data-theme attribute on html element', () => {
      const mockHtmlElement = {
        setAttribute: jest.fn(),
      };
      document.querySelector.mockReturnValue(mockHtmlElement);

      changeTheme('dark');

      expect(document.querySelector).toHaveBeenCalledWith('html');
      expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });

    test('handles case when html element is not found', () => {
      document.querySelector.mockReturnValue(null);

      expect(() => changeTheme('dark')).not.toThrow();
      expect(document.querySelector).toHaveBeenCalledWith('html');
    });
  });

  describe('changePrimaryColor', () => {
    test('sets primary-color attribute on html element', () => {
      const mockHtmlElement = {
        setAttribute: jest.fn(),
      };
      document.querySelector.mockReturnValue(mockHtmlElement);

      changePrimaryColor('blue');

      expect(document.querySelector).toHaveBeenCalledWith('html');
      expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith('primary-color', 'blue');
    });

    test('handles case when html element is not found', () => {
      document.querySelector.mockReturnValue(null);

      expect(() => changePrimaryColor('blue')).not.toThrow();
      expect(document.querySelector).toHaveBeenCalledWith('html');
    });
  });

  describe('capitalizeFirstLetter', () => {
    test('capitalizes first letter of each word', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello World');
      expect(capitalizeFirstLetter('test')).toBe('Test');
      expect(capitalizeFirstLetter('multiple word string')).toBe('Multiple Word String');
    });

    test('handles single character strings', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('z')).toBe('Z');
    });

    test('handles empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    test('handles strings with numbers and special characters', () => {
      expect(capitalizeFirstLetter('test123 word')).toBe('Test123 Word');
      expect(capitalizeFirstLetter('hello-world')).toBe('Hello-World');
    });

    test('handles already capitalized strings', () => {
      expect(capitalizeFirstLetter('Hello World')).toBe('Hello World');
    });
  });
});
