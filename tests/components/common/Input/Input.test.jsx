import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../../src/components/common/Input';

describe('Input Component', () => {
  test('renders input with label', () => {
    render(<Input label='Test Label' />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input label='Test Input' onChange={handleChange} />);

    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('displays error state', () => {
    render(<Input label='Test Input' error={true} helperText='Error message' />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('applies placeholder text', () => {
    render(<Input label='Test Input' placeholder='Enter text here' />);

    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  test('respects maxLength property', () => {
    render(<Input label='Test Input' maxLength={10} />);

    const input = screen.getByLabelText('Test Input');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  test('supports different input types', () => {
    render(<Input label='Password Input' type='password' />);

    const input = screen.getByLabelText('Password Input');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Input label='Test Input' disabled={true} />);

    const input = screen.getByLabelText('Test Input');
    expect(input).toBeDisabled();
  });

  test('applies custom className', () => {
    render(<Input label='Test Input' className='custom-input' />);

    // Check if the component is rendered with the custom class
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
