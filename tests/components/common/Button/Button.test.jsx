import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../src/redux/store';
import Button from '../../../../src/components/common/Button';

const renderWithProvider = component => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Button Component', () => {
  test('renders button with text', () => {
    renderWithProvider(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithProvider(<Button text="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    renderWithProvider(<Button text="Click me" disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('applies custom className', () => {
    renderWithProvider(<Button text="Click me" className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  test('renders with icon', () => {
    const icon = <span data-testid="test-icon">🎮</span>;
    renderWithProvider(<Button text="Click me" icon={icon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('applies secondary variant styles', () => {
    renderWithProvider(<Button text="Click me" variant="secondary" />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: 'transparent' });
  });

  test('handles different button types', () => {
    renderWithProvider(<Button text="Submit" type="submit" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
