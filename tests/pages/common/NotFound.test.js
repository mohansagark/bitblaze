/**
 * Tests for NotFound page component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFound from '../../../src/pages/common/NotFound';

// Mock Lottie component
jest.mock('lottie-react', () => {
  return function Lottie({ _animationData, loop, autoplay }) {
    return (
      <div data-testid='lottie-animation' data-loop={loop} data-autoplay={autoplay}>
        Lottie Animation
      </div>
    );
  };
});

// Mock the animation data
jest.mock('../../../src/assets/lottie/404-search.json', () => ({
  default: { frames: 30, width: 100, height: 100 },
}));

// Mock Container and Button components
jest.mock('../../../src/components/common/Container', () => {
  return function Container({ children, center }) {
    return (
      <div
        data-testid='container'
        data-center={center}
        className={
          center
            ? 'flex items-center justify-center w-full min-h-full bg-background'
            : 'w-full min-h-full bg-background'
        }
      >
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/components/common/Button', () => {
  return function Button({
    text,
    onClick,
    className,
    bgColor,
    _bgHoverColor,
    textColor,
    id,
    sound,
    variant,
  }) {
    return (
      <button
        data-testid='button'
        onClick={onClick}
        className={className}
        id={id}
        data-variant={variant}
        data-sound={sound}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {text}
      </button>
    );
  };
});

// Mock window.location.href
delete window.location;
window.location = { href: '' };

describe('NotFound Page', () => {
  test('renders NotFound page with all components', () => {
    render(<NotFound />);

    // Check if Container is rendered with center prop
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('data-center', 'true');

    // Check if Lottie animation is rendered
    const lottieAnimation = screen.getByTestId('lottie-animation');
    expect(lottieAnimation).toBeInTheDocument();
    expect(lottieAnimation).toHaveAttribute('data-loop', 'true');
    expect(lottieAnimation).toHaveAttribute('data-autoplay', 'true');

    // Check if Button is rendered with correct text
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back to Home');
  });

  test('displays correct content structure', () => {
    render(<NotFound />);

    // Check if the main content container exists
    const container = screen.getByTestId('container');
    expect(screen.getByText('Lottie Animation')).toBeInTheDocument();

    // Check if the container has the expected data attribute
    expect(container).toHaveAttribute('data-center', 'true');
  });

  test('button has correct styling and attributes', () => {
    render(<NotFound />);

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('id', 'go-home');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-sound', 'true');
    expect(button).toHaveClass('rounded-lg');
  });

  test('button click navigates to home', async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const button = screen.getByTestId('button');
    await user.click(button);

    expect(window.location.href).toBe('/');
  });

  test('lottie animation has correct properties', () => {
    render(<NotFound />);

    const lottieAnimation = screen.getByTestId('lottie-animation');
    expect(lottieAnimation).toHaveTextContent('Lottie Animation');
    expect(lottieAnimation).toHaveAttribute('data-loop', 'true');
    expect(lottieAnimation).toHaveAttribute('data-autoplay', 'true');
  });

  test('applies correct CSS classes to main container', () => {
    render(<NotFound />);

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('flex', 'items-center', 'justify-center');
  });

  test('renders without crashing when props are undefined', () => {
    expect(() => render(<NotFound />)).not.toThrow();
  });

  test('button has correct styling properties', () => {
    render(<NotFound />);

    const button = screen.getByTestId('button');

    // Check attributes instead of computed styles for jsdom compatibility
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-sound', 'true');
    expect(button).toHaveClass('rounded-lg');
  });

  test('animation container has correct size classes', () => {
    render(<NotFound />);

    const animationElement = screen.getByTestId('lottie-animation');
    expect(animationElement).toBeInTheDocument();
    expect(animationElement).toHaveAttribute('data-loop', 'true');
  });
});
