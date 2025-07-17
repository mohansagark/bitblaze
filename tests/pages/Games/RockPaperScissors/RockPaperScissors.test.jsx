import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../src/redux/store';
import RockPaperScissors from '../../../../src/pages/Games/RockPaperScissors';

const renderWithProvider = component => {
  return render(<Provider store={store}>{component}</Provider>);
};

// Mock audio hooks
jest.mock('../../../../src/helpers/hooks', () => ({
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

  test('shows game result after making a choice', async () => {
    renderWithProvider(<RockPaperScissors />);

    const rockButton = screen.getByRole('button', { name: /rock/i });
    fireEvent.click(rockButton);

    // Wait for the result to appear
    await waitFor(() => {
      const resultElements = screen.getAllByText(/tie|win|computer wins/i);
      expect(resultElements.length).toBeGreaterThan(0);
    });
  });

  test('resets game state when making multiple choices', () => {
    renderWithProvider(<RockPaperScissors />);

    const rockButton = screen.getByRole('button', { name: /rock/i });
    const paperButton = screen.getByRole('button', { name: /paper/i });

    // Make first choice
    fireEvent.click(rockButton);
    expect(screen.getByText(/Your choice:/i)).toBeInTheDocument();

    // Make second choice
    fireEvent.click(paperButton);
    expect(screen.getByText(/Your choice:/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer's choice:/i)).toBeInTheDocument();
  });
});
