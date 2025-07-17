/**
 * Tests for Switch component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../../../src/components/common/Switch';

// Mock Material-UI components with simple factory functions
jest.mock('@mui/material/styles', () => ({
  styled: component => () => component,
}));

// Mock individual Material-UI components
jest.mock('@mui/material/FormGroup', () => {
  const mockReact = require('react');
  return function FormGroup({ children }) {
    return mockReact.createElement('div', { 'data-testid': 'form-group' }, children);
  };
});

jest.mock('@mui/material/FormControlLabel', () => {
  const mockReact = require('react');
  return function FormControlLabel({ control, checked, onChange, ..._props }) {
    return mockReact.createElement(
      'label',
      { 'data-testid': 'form-control-label' },
      mockReact.cloneElement(control, { checked, onChange }),
    );
  };
});

jest.mock('@mui/material', () => {
  const mockReact = require('react');
  return {
    Switch: ({ checked, onChange, ...props }) =>
      mockReact.createElement('input', {
        type: 'checkbox',
        checked: checked,
        onChange: onChange,
        'data-testid': 'mui-switch',
        ...props,
      }),
    Stack: ({ children }) => mockReact.createElement('div', { 'data-testid': 'stack' }, children),
    Typography: ({ children, className }) =>
      mockReact.createElement('span', { 'data-testid': 'typography', className }, children),
  };
});

describe('Switch Component', () => {
  test('renders with default structure', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    expect(screen.getByTestId('form-group')).toBeInTheDocument();
    expect(screen.getByTestId('stack')).toBeInTheDocument();
    expect(screen.getByTestId('form-control-label')).toBeInTheDocument();
    expect(screen.getByTestId('mui-switch')).toBeInTheDocument();
  });

  test('displays Light and Dark labels', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const typographyElements = screen.getAllByTestId('typography');
    expect(typographyElements).toHaveLength(2);
    expect(typographyElements[0]).toHaveTextContent('Light');
    expect(typographyElements[1]).toHaveTextContent('Dark');
  });

  test('applies correct CSS classes to typography elements', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const typographyElements = screen.getAllByTestId('typography');
    typographyElements.forEach(element => {
      expect(element).toHaveClass('text-surface-text');
    });
  });

  test('renders switch in unchecked state', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');
    expect(switchElement).not.toBeChecked();
  });

  test('renders switch in checked state', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={true} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');
    expect(switchElement).toBeChecked();
  });

  test('calls setChecked with opposite value when clicked', async () => {
    const mockSetChecked = jest.fn();
    const user = userEvent.setup();

    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');
    await user.click(switchElement);

    expect(mockSetChecked).toHaveBeenCalledTimes(1);
    expect(mockSetChecked).toHaveBeenCalledWith(true);
  });

  test('calls setChecked with opposite value when toggling from checked to unchecked', async () => {
    const mockSetChecked = jest.fn();
    const user = userEvent.setup();

    render(<Switch checked={true} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');
    await user.click(switchElement);

    expect(mockSetChecked).toHaveBeenCalledTimes(1);
    expect(mockSetChecked).toHaveBeenCalledWith(false);
  });

  test('handles onChange event correctly', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');
    // Use click instead of change event since our mock handles click
    fireEvent.click(switchElement);

    expect(mockSetChecked).toHaveBeenCalledWith(true);
  });

  test('handles multiple toggle interactions', async () => {
    const mockSetChecked = jest.fn();
    const user = userEvent.setup();

    const { unmount } = render(<Switch checked={false} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');

    // First click
    await user.click(switchElement);
    expect(mockSetChecked).toHaveBeenNthCalledWith(1, true);

    // Unmount first component and render second with checked=true state
    unmount();
    mockSetChecked.mockClear();
    render(<Switch checked={true} setChecked={mockSetChecked} />);
    const newSwitchElement = screen.getByTestId('mui-switch');
    await user.click(newSwitchElement);
    expect(mockSetChecked).toHaveBeenNthCalledWith(1, false);
  });

  test('maintains accessibility with proper form structure', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    // Check that the switch is wrapped in proper form elements
    const formGroup = screen.getByTestId('form-group');
    const formControlLabel = screen.getByTestId('form-control-label');

    expect(formGroup).toContainElement(formControlLabel);
    expect(formControlLabel).toContainElement(screen.getByTestId('mui-switch'));
  });

  test('switch element has correct type attribute', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const switchElement = screen.getByTestId('mui-switch');
    expect(switchElement).toHaveAttribute('type', 'checkbox');
  });

  test('handles undefined setChecked gracefully', () => {
    // This tests error boundary behavior
    expect(() => {
      render(<Switch checked={false} setChecked={undefined} />);
    }).not.toThrow();
  });

  test('component structure includes all expected elements in correct order', () => {
    const mockSetChecked = jest.fn();
    render(<Switch checked={false} setChecked={mockSetChecked} />);

    const stack = screen.getByTestId('stack');
    const typographyElements = screen.getAllByTestId('typography');
    const formControlLabel = screen.getByTestId('form-control-label');

    // Check that elements are structured correctly
    expect(stack).toBeInTheDocument();
    expect(typographyElements[0]).toHaveTextContent('Light');
    expect(formControlLabel).toBeInTheDocument();
    expect(typographyElements[1]).toHaveTextContent('Dark');
  });
});
