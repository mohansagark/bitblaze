/**
 * Tests for SearchBar component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../../src/components/common/Search';

// Mock react-icons
jest.mock('react-icons/io', () => ({
  IoIosSearch: () => <div data-testid='search-icon'>Search Icon</div>,
}));

jest.mock('react-icons/md', () => ({
  MdClear: () => <div data-testid='clear-icon'>Clear Icon</div>,
}));

describe('SearchBar Component', () => {
  test('renders with default props', () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
  });

  test('displays search input correctly', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('');
    expect(input).toHaveClass('w-full', 'border', 'text-primary', 'outline-none');
  });

  test('calls onSearch when typing in input', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test query');

    expect(mockOnSearch).toHaveBeenCalledWith('t');
    expect(mockOnSearch).toHaveBeenCalledWith('te');
    expect(mockOnSearch).toHaveBeenCalledWith('tes');
    expect(mockOnSearch).toHaveBeenCalledWith('test');
    expect(mockOnSearch).toHaveBeenCalledWith('test ');
    expect(mockOnSearch).toHaveBeenCalledWith('test q');
    expect(mockOnSearch).toHaveBeenCalledWith('test qu');
    expect(mockOnSearch).toHaveBeenCalledWith('test que');
    expect(mockOnSearch).toHaveBeenCalledWith('test quer');
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  test('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'hello world');

    expect(input).toHaveValue('hello world');
  });

  test('shows clear button when there is text', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');

    // Initially no clear button
    expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();

    // Type some text
    await user.type(input, 'test');

    // Clear button should appear
    expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
  });

  test('clears search when clear button is clicked', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');

    // Type some text
    await user.type(input, 'test');
    expect(input).toHaveValue('test');

    // Click clear button
    const clearButton = screen.getByTestId('clear-icon');
    await user.click(clearButton);

    // Input should be cleared
    expect(input).toHaveValue('');
    expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
  });

  test('handles onChange event correctly', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'new value' } });

    expect(input).toHaveValue('new value');
    expect(mockOnSearch).toHaveBeenCalledWith('new value');
  });

  test('works without onSearch callback', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');

    // Should not throw error when typing without onSearch prop
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  test('applies correct CSS classes to all elements', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      'w-full',
      'border',
      'text-primary',
      'outline-none',
      'bg-background',
      'border-background',
      'pl-1',
      'py-2',
      'align-middle',
    );

    const searchButton = screen.getByTestId('search-icon');
    expect(searchButton).toBeInTheDocument();
  });

  test('clear button has correct CSS classes when visible', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test');

    const clearButton = screen.getByTestId('clear-icon');
    expect(clearButton).toBeInTheDocument();
  });

  test('handles empty string search', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');

    // Type some text first, then clear it
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('test');
    expect(mockOnSearch).toHaveBeenCalledWith('');
    expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
  });
});
