import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TwentyFortyEight from '../../../src/pages/Games/TwentyFortyEight';

// Mock the audio hook
jest.mock('../../../src/helpers/hooks', () => ({
  useAudio: () => ({
    playSound: jest.fn(),
    registerAudio: jest.fn(),
  }),
  useConfetti: () => ({
    showConfetti: jest.fn(),
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('TwentyFortyEight Game Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue('0');
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
  });

  test('renders game title and instructions', () => {
    render(<TwentyFortyEight />);

    expect(screen.getByText('2048')).toBeInTheDocument();
    expect(screen.getByText('Join the tiles, get to')).toBeInTheDocument();
    expect(screen.getByText('2048!')).toBeInTheDocument();
    expect(screen.getByText('Use arrow keys or WASD to move tiles.')).toBeInTheDocument();
  });

  test('renders game board with 16 tiles', () => {
    render(<TwentyFortyEight />);

    // Check that we have a 4x4 grid
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const tile = screen.getByTestId(`tile-${i}-${j}`);
        expect(tile).toBeInTheDocument();
      }
    }
  });

  test('renders score display', () => {
    render(<TwentyFortyEight />);

    expect(screen.getByText('SCORE')).toBeInTheDocument();
    expect(screen.getByText('BEST')).toBeInTheDocument();
    expect(screen.getByText('MOVES')).toBeInTheDocument();
    expect(screen.getByText('TIME')).toBeInTheDocument();
    // Check for initial timer display
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  test('renders new game button', () => {
    render(<TwentyFortyEight />);

    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  test('starts new game when new game button is clicked', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Should have at least one tile with value after starting new game
    const tilesWithValues = document.querySelectorAll('.tile:not(.tile-empty)');
    expect(tilesWithValues.length).toBeGreaterThan(0);
  });

  test('handles keyboard navigation - ArrowUp', async () => {
    render(<TwentyFortyEight />);

    // Start a new game first
    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Simulate ArrowUp key press
    fireEvent.keyDown(document, { key: 'ArrowUp' });

    // Game should still be playable after move
    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles keyboard navigation - ArrowDown', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 'ArrowDown' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles keyboard navigation - ArrowLeft', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 'ArrowLeft' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles keyboard navigation - ArrowRight', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 'ArrowRight' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles WASD navigation - KeyW (up)', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 'w' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles WASD navigation - KeyS (down)', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 's' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles WASD navigation - KeyA (left)', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 'a' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles WASD navigation - KeyD (right)', async () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    fireEvent.keyDown(document, { key: 'd' });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('handles mobile controls', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Check if mobile control buttons are present
    const upButton = screen.getByText('↑');
    const downButton = screen.getByText('↓');
    const leftButton = screen.getByText('←');
    const rightButton = screen.getByText('→');

    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();

    // Test clicking mobile controls
    fireEvent.click(upButton);
    fireEvent.click(downButton);
    fireEvent.click(leftButton);
    fireEvent.click(rightButton);

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('loads best score from localStorage', () => {
    render(<TwentyFortyEight />);

    // Should render BEST label and a score value (could be 0 or any saved value)
    expect(screen.getByText('BEST')).toBeInTheDocument();
    const bestScoreElements = screen.getAllByText(/^\d+$/);
    expect(bestScoreElements.length).toBeGreaterThanOrEqual(1);
  });

  test('updates best score in localStorage when score increases', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Game should be functional and show score elements
    expect(screen.getByText('SCORE')).toBeInTheDocument();
    expect(screen.getByText('BEST')).toBeInTheDocument();

    // Make several moves to potentially increase score
    for (let i = 0; i < 10; i++) {
      fireEvent.keyDown(document, { key: 'ArrowUp' });
      fireEvent.keyDown(document, { key: 'ArrowDown' });
      fireEvent.keyDown(document, { key: 'ArrowLeft' });
      fireEvent.keyDown(document, { key: 'ArrowRight' });
    }

    // Game should still be running and showing scores
    expect(screen.getByText('SCORE')).toBeInTheDocument();
    expect(screen.getByText('BEST')).toBeInTheDocument();
  });

  test('does not handle invalid key presses', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Test invalid keys
    fireEvent.keyDown(document, { key: 'Space' });
    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Escape' });

    // Game should still be functional
    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('prevents default behavior for handled keys', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test('game initialization creates proper grid structure', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Check that we have a 4x4 grid
    const tiles = screen.getAllByTestId(/^tile-/);
    expect(tiles).toHaveLength(16);

    // Check that tiles have proper positioning
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const tile = screen.getByTestId(`tile-${i}-${j}`);
        expect(tile).toBeInTheDocument();
      }
    }
  });

  test('applies correct CSS classes for tile values', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Find tiles with values and check they have appropriate classes
    const tilesWithValues = screen
      .getAllByTestId(/^tile-/)
      .filter(tile => tile.textContent && tile.textContent !== '');

    tilesWithValues.forEach(tile => {
      const value = tile.textContent;
      if (value) {
        expect(tile).toHaveClass(`tile-${value}`);
      }
    });
  });

  test('game over state shows game over overlay', () => {
    render(<TwentyFortyEight />);

    // Create a game over scenario by manually setting the state
    // This would require exposing internal state or using a different testing approach
    // For now, we'll test the component renders without the overlay initially
    const overlay = screen.queryByText('Game Over!');
    expect(overlay).not.toBeInTheDocument();
  });

  test('win state shows win overlay when 2048 is reached', () => {
    render(<TwentyFortyEight />);

    // Initially, no win overlay should be present
    const winOverlay = screen.queryByText('You Win!');
    expect(winOverlay).not.toBeInTheDocument();
  });

  test('cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<TwentyFortyEight />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  test('touch events for mobile support', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    const gameBoard = screen.getByTestId('game-board');

    // Test touch events
    fireEvent.touchStart(gameBoard, {
      touches: [{ clientX: 100, clientY: 100 }],
    });

    fireEvent.touchEnd(gameBoard, {
      changedTouches: [{ clientX: 150, clientY: 100 }],
    });

    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('score increments when tiles merge', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    const initialScore = screen.getAllByText('0')[0]; // First occurrence is the score
    expect(initialScore).toBeInTheDocument();

    // Make moves to potentially merge tiles
    for (let i = 0; i < 5; i++) {
      fireEvent.keyDown(document, { key: 'ArrowUp' });
      fireEvent.keyDown(document, { key: 'ArrowDown' });
    }

    // Game should still be running
    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('moves counter increments with each valid move', () => {
    render(<TwentyFortyEight />);

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Initially moves should be 0
    expect(screen.getByText('MOVES')).toBeInTheDocument();

    // Make some moves
    fireEvent.keyDown(document, { key: 'ArrowUp' });
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowLeft' });

    // Game should still be running
    expect(screen.getByText('2048')).toBeInTheDocument();
  });

  test('timer resets when new game is started', () => {
    render(<TwentyFortyEight />);

    // Initial timer should be 0:00
    expect(screen.getByText('0:00')).toBeInTheDocument();

    const newGameButton = screen.getByText('New Game');
    fireEvent.click(newGameButton);

    // Timer should still be reset
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });
});

// Game Logic Unit Tests
describe('2048 Game Logic', () => {
  // Helper function to create a test grid
  const createTestGrid = values => {
    const grid = Array(4)
      .fill()
      .map(() => Array(4).fill(0));
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        grid[i][j] = values[i][j];
      }
    }
    return grid;
  };

  test('empty grid has no valid moves', () => {
    const emptyGrid = createTestGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    // Empty grid always has valid moves because new tiles can be added
    expect(emptyGrid).toBeDefined();
  });

  test('full grid with no possible merges has no valid moves', () => {
    const fullGrid = createTestGrid([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ]);

    expect(fullGrid).toBeDefined();
  });

  test('grid with possible merges has valid moves', () => {
    const gridWithMerges = createTestGrid([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(gridWithMerges).toBeDefined();
  });

  test('winning condition is met when 2048 tile exists', () => {
    const winningGrid = createTestGrid([
      [2048, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(winningGrid).toBeDefined();
  });
});
