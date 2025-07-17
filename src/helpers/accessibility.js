/**
 * Accessibility utilities for improved user experience
 */

/**
 * Focus management utilities
 */
export const focusManager = {
  /**
   * Store the currently focused element
   */
  storedElement: null,

  /**
   * Store the current focus for later restoration
   */
  store: () => {
    focusManager.storedElement = document.activeElement;
  },

  /**
   * Restore previously stored focus
   */
  restore: () => {
    if (focusManager.storedElement && focusManager.storedElement.focus) {
      focusManager.storedElement.focus();
      focusManager.storedElement = null;
    }
  },

  /**
   * Focus the first focusable element in a container
   * @param {HTMLElement} container - Container to search in
   */
  focusFirstElement: container => {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  },

  /**
   * Focus the last focusable element in a container
   * @param {HTMLElement} container - Container to search in
   */
  focusLastElement: container => {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  },
};

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} container - Container to search in
 * @returns {HTMLElement[]} Array of focusable elements
 */
export const getFocusableElements = container => {
  const focusableSelectors = [
    'a[href]:not([tabindex^="-"])',
    'area[href]:not([tabindex^="-"])',
    'input:not([disabled]):not([tabindex^="-"])',
    'select:not([disabled]):not([tabindex^="-"])',
    'textarea:not([disabled]):not([tabindex^="-"])',
    'button:not([disabled]):not([tabindex^="-"])',
    'iframe:not([tabindex^="-"])',
    'object:not([tabindex^="-"])',
    'embed:not([tabindex^="-"])',
    '[contenteditable]:not([tabindex^="-"])',
    '[tabindex]:not([tabindex^="-"])',
  ];

  return Array.from(container.querySelectorAll(focusableSelectors.join(', '))).filter(element => {
    return (
      element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    );
  });
};

/**
 * Trap focus within a container (useful for modals)
 * @param {HTMLElement} container - Container to trap focus in
 * @returns {Function} Cleanup function to remove the trap
 */
export const trapFocus = container => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = e => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === lastElement) {
      // Tab
      firstElement.focus();
      e.preventDefault();
    }
  };

  container.addEventListener('keydown', handleTabKey);

  // Focus the first element initially
  if (firstElement) {
    firstElement.focus();
  }

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Announce text to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - Priority level ('polite' or 'assertive')
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.textContent = message;

  document.body.appendChild(announcer);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers high contrast
 * @returns {boolean} True if user prefers high contrast
 */
export const prefersHighContrast = () => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Check if user prefers dark color scheme
 * @returns {boolean} True if user prefers dark scheme
 */
export const prefersDarkScheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Get accessible color contrast ratio
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @returns {number} Contrast ratio
 */
export const getContrastRatio = (foreground, background) => {
  const getLuminance = color => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Check if color combination meets WCAG contrast requirements
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @param {string} level - WCAG level ('AA' or 'AAA')
 * @param {string} size - Text size ('normal' or 'large')
 * @returns {boolean} True if combination meets requirements
 */
export const meetsContrastRequirements = (
  foreground,
  background,
  level = 'AA',
  size = 'normal',
) => {
  const ratio = getContrastRatio(foreground, background);

  const requirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  return ratio >= requirements[level][size];
};

/**
 * Create a skip link for keyboard navigation
 * @param {string} targetId - ID of the target element
 * @param {string} text - Link text
 * @returns {HTMLElement} Skip link element
 */
export const createSkipLink = (targetId, text = 'Skip to main content') => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';

  // Add styles for the skip link
  Object.assign(skipLink.style, {
    position: 'absolute',
    top: '-40px',
    left: '6px',
    background: '#000',
    color: '#fff',
    padding: '8px',
    textDecoration: 'none',
    borderRadius: '0 0 6px 0',
    zIndex: '1000',
    transition: 'top 0.3s',
  });

  // Show on focus
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  return skipLink;
};

/**
 * Keyboard navigation helper
 */
export const keyboardNavigation = {
  /**
   * Handle arrow key navigation for a list of elements
   * @param {Event} event - Keyboard event
   * @param {HTMLElement[]} elements - Array of navigable elements
   * @param {number} currentIndex - Current focused element index
   * @param {Function} onNavigate - Callback when navigation occurs
   */
  handleArrowKeys: (event, elements, currentIndex, onNavigate) => {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = elements.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    elements[newIndex].focus();
    if (onNavigate) {
      onNavigate(newIndex);
    }
  },

  /**
   * Handle escape key to close modals or dropdowns
   * @param {Event} event - Keyboard event
   * @param {Function} onEscape - Callback when escape is pressed
   */
  handleEscape: (event, onEscape) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
    }
  },
};

/**
 * ARIA utilities
 */
export const aria = {
  /**
   * Set ARIA attributes on an element
   * @param {HTMLElement} element - Target element
   * @param {Object} attributes - ARIA attributes to set
   */
  setAttributes: (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(`aria-${key}`, value);
    });
  },

  /**
   * Announce a live region update
   * @param {string} message - Message to announce
   * @param {HTMLElement} liveRegion - Live region element
   */
  announceUpdate: (message, liveRegion) => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  },

  /**
   * Toggle ARIA expanded state
   * @param {HTMLElement} trigger - Trigger element
   * @param {boolean} expanded - Whether element is expanded
   */
  toggleExpanded: (trigger, expanded) => {
    trigger.setAttribute('aria-expanded', expanded.toString());
  },

  /**
   * Set ARIA selected state
   * @param {HTMLElement} element - Target element
   * @param {boolean} selected - Whether element is selected
   */
  setSelected: (element, selected) => {
    element.setAttribute('aria-selected', selected.toString());
  },

  /**
   * Set ARIA disabled state
   * @param {HTMLElement} element - Target element
   * @param {boolean} disabled - Whether element is disabled
   */
  setDisabled: (element, disabled) => {
    element.setAttribute('aria-disabled', disabled.toString());
    if (disabled) {
      element.setAttribute('tabindex', '-1');
    } else {
      element.removeAttribute('tabindex');
    }
  },
};

const _accessibilityHelpers = {
  focusManager,
  getFocusableElements,
  trapFocus,
  announceToScreenReader,
  prefersReducedMotion,
  prefersHighContrast,
  prefersDarkScheme,
  getContrastRatio,
  meetsContrastRequirements,
  createSkipLink,
  keyboardNavigation,
  aria,
};
