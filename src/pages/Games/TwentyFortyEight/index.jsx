import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Button from '../../../components/common/Button';
import Scoreboard from '../../../components/Games/Scoreboard';
import { useAudio, useConfetti } from '../../../helpers/hooks';
import { saveScore, getBestScore } from '../../../helpers/scoreboard';
import './styles.scss';

const GRID_SIZE = 4;
const INITIAL_TILES = 2;
const WIN_TILE = 2048;

/**
 * Generate a new empty grid
 * @returns {number[][]} Empty grid filled with zeros
 */
const generateEmptyGrid = () =>
  Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0));

/**
 * Get random empty position from grid
 * @param {number[][]} grid - Current game grid
 * @returns {object|null} Random empty position {row, col} or null if grid is full
 */
const getRandomEmptyPosition = grid => {
  const emptyPositions = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        emptyPositions.push({ row, col });
      }
    }
  }

  return emptyPositions.length > 0
    ? emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
    : null;
};

/**
 * Add a new tile (2 or 4) to a random empty position
 * @param {number[][]} grid - Current game grid
 * @returns {number[][]} New grid with added tile
 */
const addNewTile = grid => {
  const newGrid = grid.map(row => [...row]);
  const emptyPosition = getRandomEmptyPosition(newGrid);

  if (emptyPosition) {
    // 90% chance for 2, 10% chance for 4
    newGrid[emptyPosition.row][emptyPosition.col] = Math.random() < 0.9 ? 2 : 4;
  }

  return newGrid;
};

/**
 * Initialize game grid with starting tiles
 * @returns {number[][]} Initial game grid
 */
const initializeGrid = () => {
  let grid = generateEmptyGrid();

  for (let i = 0; i < INITIAL_TILES; i++) {
    grid = addNewTile(grid);
  }

  return grid;
};

/**
 * Move and merge tiles in a single row to the left
 * @param {number[]} row - Array representing a row
 * @returns {object} Object with new row and score gained
 */
const moveRowLeft = row => {
  // Filter out zeros and move tiles left
  const filteredRow = row.filter(val => val !== 0);
  const newRow = [...filteredRow];
  let scoreGained = 0;

  // Merge adjacent identical tiles
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      scoreGained += newRow[i];
      newRow[i + 1] = 0;
    }
  }

  // Remove zeros again and pad with zeros
  const finalRow = newRow.filter(val => val !== 0);
  while (finalRow.length < GRID_SIZE) {
    finalRow.push(0);
  }

  return { row: finalRow, score: scoreGained };
};

/**
 * Check if two grids are identical
 * @param {number[][]} grid1 - First grid
 * @param {number[][]} grid2 - Second grid
 * @returns {boolean} True if grids are identical
 */
const areGridsEqual = (grid1, grid2) => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid1[row][col] !== grid2[row][col]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Move tiles in specified direction
 * @param {number[][]} grid - Current game grid
 * @param {string} direction - Direction to move ('left', 'right', 'up', 'down')
 * @returns {object} Object with new grid and score gained
 */
const moveGrid = (grid, direction) => {
  const newGrid = grid.map(row => [...row]);
  let totalScore = 0;

  switch (direction) {
    case 'left':
      for (let row = 0; row < GRID_SIZE; row++) {
        const result = moveRowLeft(newGrid[row]);
        newGrid[row] = result.row;
        totalScore += result.score;
      }
      break;

    case 'right':
      for (let row = 0; row < GRID_SIZE; row++) {
        const reversedRow = [...newGrid[row]].reverse();
        const result = moveRowLeft(reversedRow);
        newGrid[row] = result.row.reverse();
        totalScore += result.score;
      }
      break;

    case 'up':
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = [];
        for (let row = 0; row < GRID_SIZE; row++) {
          column.push(newGrid[row][col]);
        }
        const result = moveRowLeft(column);
        for (let row = 0; row < GRID_SIZE; row++) {
          newGrid[row][col] = result.row[row];
        }
        totalScore += result.score;
      }
      break;

    case 'down':
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = [];
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
          column.push(newGrid[row][col]);
        }
        const result = moveRowLeft(column);
        for (let row = 0; row < GRID_SIZE; row++) {
          newGrid[GRID_SIZE - 1 - row][col] = result.row[row];
        }
        totalScore += result.score;
      }
      break;

    default:
      break;
  }

  return { grid: newGrid, score: totalScore };
};

/**
 * Check if any moves are possible
 * @param {number[][]} grid - Current game grid
 * @returns {boolean} True if moves are possible
 */
const canMove = grid => {
  // Check for empty cells
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        return true;
      }
    }
  }

  // Check for possible merges
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const currentTile = grid[row][col];

      // Check right neighbor
      if (col < GRID_SIZE - 1 && grid[row][col + 1] === currentTile) {
        return true;
      }

      // Check bottom neighbor
      if (row < GRID_SIZE - 1 && grid[row + 1][col] === currentTile) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Check if player has won (reached 2048 tile)
 * @param {number[][]} grid - Current game grid
 * @returns {boolean} True if won
 */
const hasWon = grid => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === WIN_TILE) {
        return true;
      }
    }
  }
  return false;
};

const TwentyFortyEight = () => {
  const [grid, setGrid] = useState(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => getBestScore());
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [hasWonOnce, setHasWonOnce] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [showScoreboard, setShowScoreboard] = useState(false);

  const { showConfetti } = useConfetti();
  const { playSound, registerAudio } = useAudio();

  const audioIds = {
    win: 'win-audio',
    gameOver: 'gameover-audio',
  };

  useEffect(() => {
    registerAudio(audioIds.win, 'trumpet');
    registerAudio(audioIds.gameOver, 'error');
  }, [registerAudio, audioIds.win, audioIds.gameOver]);

  // Timer effect - updates every second when game is playing
  useEffect(() => {
    let interval;
    if (gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStatus, startTime]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    if (hasWon(grid) && !hasWonOnce) {
      setGameStatus('won');
      setHasWonOnce(true);
      showConfetti();
      playSound(audioIds.win);
      // Save winning score
      saveScore(score, moves, timer, true);
      setBestScore(getBestScore()); // Update best score from scoreboard
    } else if (!canMove(grid) && gameStatus === 'playing') {
      setGameStatus('lost');
      playSound(audioIds.gameOver);
      // Save losing score
      saveScore(score, moves, timer, false);
      setBestScore(getBestScore()); // Update best score from scoreboard
    }
  }, [
    grid,
    gameStatus,
    hasWonOnce,
    showConfetti,
    playSound,
    audioIds.win,
    audioIds.gameOver,
    score,
    moves,
    timer,
  ]);

  const handleMove = useCallback(
    direction => {
      if (gameStatus === 'lost') return;

      const result = moveGrid(grid, direction);

      // Only update if the grid actually changed
      if (!areGridsEqual(grid, result.grid)) {
        const newGrid = addNewTile(result.grid);
        setGrid(newGrid);
        setScore(prevScore => prevScore + result.score);
        setMoves(prevMoves => prevMoves + 1);
      }
    },
    [grid, gameStatus],
  );

  useEffect(() => {
    const handleKeyPress = event => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          handleMove('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          handleMove('right');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          handleMove('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          handleMove('down');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleMove]);

  const resetGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setGameStatus('playing');
    setHasWonOnce(false);
    setMoves(0);
    setTimer(0);
    setStartTime(Date.now());
    setBestScore(getBestScore()); // Refresh best score
  };

  const continueGame = () => {
    setGameStatus('playing');
  };

  const getTileClass = value => {
    if (value === 0) return 'tile-empty';
    return `tile-${value}`;
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container className='twenty-forty-eight-game' maxWidth='sm'>
      <Box className='game-header' mb={3}>
        <Typography variant='h3' component='h1' className='game-title'>
          2048
        </Typography>

        <Box className='score-container'>
          <Box className='score-box'>
            <Typography variant='body2' className='score-label'>
              SCORE
            </Typography>
            <Typography variant='h6' className='score-value'>
              {score}
            </Typography>
          </Box>

          <Box className='score-box'>
            <Typography variant='body2' className='score-label'>
              BEST
            </Typography>
            <Typography variant='h6' className='score-value'>
              {bestScore}
            </Typography>
          </Box>

          <Box className='score-box'>
            <Typography variant='body2' className='score-label'>
              MOVES
            </Typography>
            <Typography variant='h6' className='score-value'>
              {moves}
            </Typography>
          </Box>

          <Box className='score-box'>
            <Typography variant='body2' className='score-label'>
              TIME
            </Typography>
            <Typography variant='h6' className='score-value'>
              {formatTime(timer)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className='game-instructions' mb={2}>
        <Typography variant='body2' color='text.primary'>
          Join the tiles, get to <strong>2048!</strong>
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Use arrow keys or WASD to move tiles.
        </Typography>
      </Box>

      <Box className='game-board-container'>
        <div className='game-board' data-testid='game-board'>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`tile ${getTileClass(cell)}`}
                data-testid={`tile-${rowIndex}-${colIndex}`}
              >
                {cell !== 0 && <span className='tile-value'>{cell}</span>}
              </div>
            )),
          )}
        </div>

        {gameStatus === 'won' && (
          <div className='game-overlay won'>
            <div className='overlay-content'>
              <Typography variant='h4' className='overlay-title'>
                You Win!
              </Typography>
              <Box className='overlay-buttons'>
                <Button onClick={continueGame} className='continue-btn'>
                  Keep Going
                </Button>
                <Button onClick={resetGame} className='restart-btn'>
                  Try Again
                </Button>
              </Box>
            </div>
          </div>
        )}

        {gameStatus === 'lost' && (
          <div className='game-overlay lost'>
            <div className='overlay-content'>
              <Typography variant='h4' className='overlay-title'>
                Game Over!
              </Typography>
              <Box className='overlay-buttons'>
                <Button onClick={resetGame} className='restart-btn'>
                  Try Again
                </Button>
              </Box>
            </div>
          </div>
        )}
      </Box>

      <Box className='game-controls' mt={3}>
        <Box className='control-buttons'>
          <Button text='New Game' onClick={resetGame} className='new-game-btn' />
          <Button
            text='Scoreboard'
            onClick={() => setShowScoreboard(true)}
            className='scoreboard-btn'
          />
        </Box>
      </Box>

      <Box className='mobile-controls' mt={2}>
        <Box className='control-row'>
          <Button text='↑' onClick={() => handleMove('up')} className='control-btn' />
        </Box>
        <Box className='control-row'>
          <Button text='←' onClick={() => handleMove('left')} className='control-btn' />
          <Button text='↓' onClick={() => handleMove('down')} className='control-btn' />
          <Button text='→' onClick={() => handleMove('right')} className='control-btn' />
        </Box>
      </Box>

      <Scoreboard open={showScoreboard} onClose={() => setShowScoreboard(false)} />
    </Container>
  );
};

export default TwentyFortyEight;
