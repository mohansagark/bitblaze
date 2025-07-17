/**
 * Tests for Footer component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../../src/components/Layout/Footer';

// Mock the config helper
jest.mock('../../../src/helpers/config', () => ({
  footerHeight: '60px',
}));

describe('Footer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders footer element', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    test('applies correct CSS classes', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-background');
      expect(footer).toHaveClass('p-5');
      expect(footer).toHaveClass('pr-20');
      expect(footer).toHaveClass('text-typography');
    });

    test('applies correct height from config', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveStyle({ height: '60px' });
    });
  });

  describe('Footer Structure', () => {
    test('renders as semantic footer element', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    test('has proper semantic structure', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    test('applies responsive padding classes', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('p-5'); // Base padding
      expect(footer).toHaveClass('pr-20'); // Right padding
    });
  });

  describe('Styling Integration', () => {
    test('uses theme-based background class', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-background');
    });

    test('uses theme-based text color class', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('text-typography');
    });
  });

  describe('Configuration Integration', () => {
    test('uses footerHeight from config', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveStyle({ height: '60px' });
    });
  });

  describe('Accessibility', () => {
    test('has appropriate ARIA role', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    test('is semantically correct footer element', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });
  });

  describe('Component Isolation', () => {
    test('renders independently without props', () => {
      expect(() => render(<Footer />)).not.toThrow();
    });

    test('does not require any props', () => {
      const { container } = render(<Footer />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('CSS Classes Validation', () => {
    test('contains all expected Tailwind classes', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      const expectedClasses = [
        'bg-background',
        'p-5',
        'pr-20',
        'text-typography',
      ];

      expectedClasses.forEach(className => {
        expect(footer).toHaveClass(className);
      });
    });
  });
});
