import {
  focusManager,
  getFocusableElements,
  announceToScreenReader,
  prefersReducedMotion,
  getContrastRatio,
  meetsContrastRequirements,
  aria,
} from '../../src/helpers/accessibility';

// Mock DOM methods
global.document.createElement = jest.fn(() => ({
  setAttribute: jest.fn(),
  className: '',
  textContent: '',
  style: {},
  focus: jest.fn(),
  click: jest.fn(),
  addEventListener: jest.fn(),
}));

global.document.body = {
  appendChild: jest.fn(),
  removeChild: jest.fn(),
};

global.document.querySelector = jest.fn();
global.document.querySelectorAll = jest.fn(() => []);

describe('Accessibility Utilities', () => {
  describe('focusManager', () => {
    test('saves and restores focus', () => {
      const mockElement = { focus: jest.fn() };
      global.document.activeElement = mockElement;

      focusManager.store();
      expect(focusManager.storedElement).toBe(mockElement);

      focusManager.restore();
      expect(mockElement.focus).toHaveBeenCalled();
    });

    test('focusFirstElement sets focus to first focusable element', () => {
      const mockElement = { focus: jest.fn() };
      // Mock getFocusableElements to return our mock element
      const originalGetFocusableElements = getFocusableElements;
      global.getFocusableElements = jest.fn(() => [mockElement]);

      focusManager.focusFirstElement(document.createElement('div'));
      expect(mockElement.focus).toHaveBeenCalled();

      // Restore original function
      global.getFocusableElements = originalGetFocusableElements;
    });

    test('handles null elements gracefully', () => {
      expect(() => focusManager.restore()).not.toThrow();
    });
  });

  describe('getFocusableElements', () => {
    test('returns empty array when no container provided', () => {
      const result = getFocusableElements(null);
      expect(result).toEqual([]);
    });

    test('queries for focusable elements', () => {
      const mockContainer = {
        querySelectorAll: jest.fn(() => [
          { disabled: false },
          { disabled: false },
        ]),
      };

      const result = getFocusableElements(mockContainer);
      expect(mockContainer.querySelectorAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    });
  });

  describe('announceToScreenReader', () => {
    beforeEach(() => {
      // Reset DOM mocks
      global.document.createElement = jest.fn(() => ({
        setAttribute: jest.fn(),
        className: '',
        textContent: '',
        style: {},
      }));
    });

    test('creates and removes announcement element', () => {
      const mockElement = {
        setAttribute: jest.fn(),
        className: '',
        textContent: '',
        style: {},
      };
      global.document.createElement.mockReturnValue(mockElement);

      announceToScreenReader('Test message');

      expect(global.document.createElement).toHaveBeenCalledWith('div');
      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-live',
        'polite'
      );
      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-atomic',
        'true'
      );
      expect(mockElement.textContent).toBe('Test message');
    });
  });

  describe('prefersReducedMotion', () => {
    test('returns boolean for motion preference', () => {
      // Mock matchMedia
      global.window.matchMedia = jest.fn(() => ({ matches: true }));
      expect(prefersReducedMotion()).toBe(true);

      global.window.matchMedia = jest.fn(() => ({ matches: false }));
      expect(prefersReducedMotion()).toBe(false);
    });
  });

  describe('getContrastRatio', () => {
    test('calculates contrast ratio between colors', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(typeof ratio).toBe('number');
      expect(ratio).toBeGreaterThan(1);
    });

    test('returns same ratio for same colors', () => {
      const ratio = getContrastRatio('#ff0000', '#ff0000');
      expect(ratio).toBe(1);
    });
  });

  describe('meetsContrastRequirements', () => {
    test('validates high contrast combinations', () => {
      expect(
        meetsContrastRequirements('#000000', '#ffffff', 'AA', 'normal')
      ).toBe(true);
    });

    test('rejects low contrast combinations', () => {
      expect(
        meetsContrastRequirements('#cccccc', '#ffffff', 'AA', 'normal')
      ).toBe(false);
    });
  });

  describe('aria', () => {
    test('setAttributes sets ARIA attributes', () => {
      const element = { setAttribute: jest.fn() };
      aria.setAttributes(element, { label: 'Test', expanded: 'true' });

      expect(element.setAttribute).toHaveBeenCalledWith('aria-label', 'Test');
      expect(element.setAttribute).toHaveBeenCalledWith(
        'aria-expanded',
        'true'
      );
    });

    test('toggleExpanded sets expanded state', () => {
      const element = { setAttribute: jest.fn() };
      aria.toggleExpanded(element, true);

      expect(element.setAttribute).toHaveBeenCalledWith(
        'aria-expanded',
        'true'
      );
    });

    test('setSelected sets selected state', () => {
      const element = { setAttribute: jest.fn() };
      aria.setSelected(element, true);

      expect(element.setAttribute).toHaveBeenCalledWith(
        'aria-selected',
        'true'
      );
    });

    test('setDisabled sets disabled state', () => {
      const element = {
        setAttribute: jest.fn(),
        disabled: false,
      };

      aria.setDisabled(element, true);
      expect(element.setAttribute).toHaveBeenCalledWith(
        'aria-disabled',
        'true'
      );
      expect(element.disabled).toBe(true);
    });
  });
});
