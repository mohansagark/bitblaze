/**
 * Tests for Logo component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from '../../../src/components/Layout/Logo';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock Material-UI Typography
jest.mock('@mui/material/Typography', () => {
  return function Typography({ children, ...props }) {
    return (
      <span data-testid='typography' {...props}>
        {children}
      </span>
    );
  };
});

// Mock react-icons
jest.mock('react-icons/fa6', () => ({
  FaCode: ({ size, className }) => (
    <svg data-testid='code-icon' className={className} width={size} height={size}>
      <title>Code Icon</title>
    </svg>
  ),
}));

describe('Logo Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderLogo = () => {
    return render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>,
    );
  };

  test('renders logo with icon and text', () => {
    renderLogo();

    expect(screen.getByTestId('code-icon')).toBeInTheDocument();
    expect(screen.getByTestId('typography')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    renderLogo();

    const logoContainer = screen.getByRole('button');
    expect(logoContainer).toHaveClass('flex', 'whitespace-nowrap', 'cursor-pointer');
  });

  test('icon has correct size and styling', () => {
    renderLogo();

    const icon = screen.getByTestId('code-icon');
    expect(icon).toHaveAttribute('width', '36');
    expect(icon).toHaveAttribute('height', '36');
    expect(icon).toBeInTheDocument();
  });

  test('typography has correct styling', () => {
    renderLogo();

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveClass('text-primary');
  });

  test('navigates to home when clicked', () => {
    renderLogo();

    const logoContainer = screen.getByRole('button');
    fireEvent.click(logoContainer);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('is clickable and has cursor pointer', () => {
    renderLogo();

    const logoContainer = screen.getByRole('button');
    expect(logoContainer).toHaveClass('cursor-pointer');
  });

  test('component structure is correct', () => {
    renderLogo();

    const logoContainer = screen.getByRole('button');
    const icon = screen.getByTestId('code-icon');
    const typography = screen.getByTestId('typography');

    expect(logoContainer).toContainElement(icon);
    expect(logoContainer).toContainElement(typography);
  });
});
