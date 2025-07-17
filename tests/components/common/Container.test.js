/**
 * Tests for Container component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '../../../src/components/common/Container';

describe('Container Component', () => {
  test('renders with default props', () => {
    const { container } = render(<Container />);

    const containerDiv = container.querySelector('div');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('w-full', 'min-h-full', 'bg-background');
  });

  test('renders children correctly', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies center styles when center prop is true', () => {
    const { container } = render(
      <Container center={true}>
        <p>Centered content</p>
      </Container>
    );

    const containerDiv = container.querySelector('div');
    expect(containerDiv).toHaveClass('flex', 'items-center', 'justify-center');
    expect(screen.getByText('Centered content')).toBeInTheDocument();
  });

  test('does not apply center styles when center prop is false', () => {
    const { container } = render(
      <Container center={false}>
        <p>Non-centered content</p>
      </Container>
    );

    const containerDiv = container.querySelector('div');
    expect(containerDiv).not.toHaveClass('flex');
    expect(containerDiv).not.toHaveClass('items-center');
    expect(containerDiv).not.toHaveClass('justify-center');
  });

  test('renders with multiple children', () => {
    render(
      <Container>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </Container>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  test('renders with complex nested children', () => {
    render(
      <Container center={true}>
        <div>
          <header>
            <h1>Header Title</h1>
          </header>
          <main>
            <p>Main content</p>
          </main>
        </div>
      </Container>
    );

    expect(screen.getByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  test('handles null and undefined children gracefully', () => {
    const { container } = render(<Container>{null}</Container>);

    const containerDiv = container.querySelector('div');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toBeEmptyDOMElement();
  });

  test('applies all CSS classes correctly', () => {
    const { container } = render(<Container center={true} />);

    const containerDiv = container.querySelector('div');
    expect(containerDiv).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'w-full',
      'min-h-full',
      'bg-background'
    );
  });
});
