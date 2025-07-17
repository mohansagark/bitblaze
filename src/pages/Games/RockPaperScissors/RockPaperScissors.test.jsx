import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import RockPaperScissors from './index';

const renderWithProvider = component => {
  return render(<Provider store={store}>{component}</Provider>);
};

// Mock audio hooks
jest.mock('../../../helpers/hooks', () => ({
  useAudio: () => ({
    playSound: jest.fn(),
    registerAudio: jest.fn(),
  }),
  useConfetti: () => ({
    showConfetti: jest.fn(),
  }),
}));

describe('RockPaperScissors Game', () => {
  test('renders game interface', () => {
    renderWithProvider(<RockPaperScissors />);

    expect(screen.getByText(/Rock, Paper, Scissors/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rock/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /paper/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /scissors/i })
    ).toBeInTheDocument();
  });

  test('allows player to make a choice', () => {
    renderWithProvider(<RockPaperScissors />);

    const rockButton = screen.getByRole('button', { name: /rock/i });
    fireEvent.click(rockButton);

    // After clicking, should show result and choices
    expect(screen.getByText(/Your choice:/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer's choice:/i)).toBeInTheDocument();
  });

  test('shows game result after making a choice', () => {
    renderWithProvider(<RockPaperScissors />);

    const rockButton = screen.getByRole('button', { name: /rock/i });
    fireEvent.click(rockButton);

    // Should have result message (win, lose, or tie)
    const resultTexts = ['You win!', 'You lose!', "It's a tie!"];
    const hasResult = resultTexts.some(text => {
      try {
        screen.getByText(text);
        return true;
      } catch {
        return false;
      }
    });
    expect(hasResult).toBe(true);
  });
});
