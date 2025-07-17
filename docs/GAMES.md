# Game Documentation

This document provides detailed information about each game implemented in the BitBlaze application.

## Games Overview

The BitBlaze application features multiple interactive games, each designed with unique gameplay mechanics and modern UI/UX principles.

### Game Architecture

All games follow a consistent architecture pattern:

```javascript
const useGameState = () => {
  const [gameState, setGameState] = useState("idle"); // idle, playing, paused, finished
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameBoard, setGameBoard] = useState([]);

  // Game control methods
  const startGame = () => {
    /* ... */
  };
  const pauseGame = () => {
    /* ... */
  };
  const resetGame = () => {
    /* ... */
  };
  const endGame = (result) => {
    /* ... */
  };

  return {
    /* game state and methods */
  };
};
```

## Individual Games

### 1. Snakes and Ladders 🐍🪜

**Location**: `src/pages/Games/SnakesAndLadders/index.jsx`
**Route**: `/snakes-and-ladders`

#### Game Description

A digital implementation of the classic board game where players race from square 1 to 100, climbing ladders for shortcuts and sliding down snakes.

#### Features

- **Board Size**: 10x10 grid (100 squares)
- **Players**: 1-4 players supported
- **Dice Rolling**: Animated dice with random outcomes (1-6)
- **Snake & Ladder Positions**: Traditional placement
- **Win Condition**: First player to reach square 100

#### Game Rules

1. Players take turns rolling the dice
2. Move forward by the number shown on dice
3. Landing on ladder bottom: climb to ladder top
4. Landing on snake head: slide to snake tail
5. Must roll exact number to reach square 100
6. If roll exceeds remaining squares, player bounces back

#### Technical Implementation

```javascript
const snakesAndLadders = {
  // Snake positions (head -> tail)
  snakes: {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
  },

  // Ladder positions (bottom -> top)
  ladders: {
    1: 38,
    4: 14,
    9: 21,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
  },

  // Game logic
  movePlayer: (currentPosition, diceRoll) => {
    let newPosition = currentPosition + diceRoll;

    // Check if exceeds 100
    if (newPosition > 100) {
      newPosition = 100 - (newPosition - 100);
    }

    // Check for snakes
    if (snakes[newPosition]) {
      newPosition = snakes[newPosition];
    }

    // Check for ladders
    if (ladders[newPosition]) {
      newPosition = ladders[newPosition];
    }

    return newPosition;
  },
};
```

#### Audio Effects

- Dice roll sound
- Ladder climb sound
- Snake slide sound
- Victory fanfare

---

### 2. Chess Board ♟️

**Location**: `src/pages/Games/ChessBoard/index.jsx`
**Route**: `/chessboard`

#### Game Description

An interactive chess board interface with piece movement validation and basic chess rules implementation.

#### Features

- **Standard 8x8 Board**: Traditional chess board layout
- **All Chess Pieces**: King, Queen, Rook, Bishop, Knight, Pawn
- **Move Validation**: Legal move checking for each piece type
- **Turn Management**: Alternating player turns
- **Check Detection**: Basic check/checkmate detection
- **Piece Capture**: Visual feedback for captures

#### Chess Rules Implementation

```javascript
const chessPieces = {
  pawn: {
    moves: (position, board, isFirstMove) => {
      const direction = piece.color === "white" ? -1 : 1;
      const moves = [];

      // Forward movement
      if (isFirstMove) {
        moves.push([position[0] + direction, position[1]]);
        moves.push([position[0] + 2 * direction, position[1]]);
      } else {
        moves.push([position[0] + direction, position[1]]);
      }

      // Diagonal captures
      if (
        board[position[0] + direction][position[1] - 1]?.color !== piece.color
      ) {
        moves.push([position[0] + direction, position[1] - 1]);
      }
      if (
        board[position[0] + direction][position[1] + 1]?.color !== piece.color
      ) {
        moves.push([position[0] + direction, position[1] + 1]);
      }

      return moves;
    },
  },

  rook: {
    moves: (position, board) => {
      // Horizontal and vertical moves
      return getLinearMoves(position, board, [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]);
    },
  },

  bishop: {
    moves: (position, board) => {
      // Diagonal moves
      return getLinearMoves(position, board, [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
    },
  },

  queen: {
    moves: (position, board) => {
      // Combination of rook and bishop
      return [...rook.moves(position, board), ...bishop.moves(position, board)];
    },
  },

  king: {
    moves: (position, board) => {
      // One square in any direction
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      return directions
        .map(([dx, dy]) => [position[0] + dx, position[1] + dy])
        .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);
    },
  },

  knight: {
    moves: (position, board) => {
      // L-shaped moves
      const knightMoves = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
      ];

      return knightMoves
        .map(([dx, dy]) => [position[0] + dx, position[1] + dy])
        .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);
    },
  },
};
```

#### Special Features

- **Piece Highlighting**: Valid moves highlighted on selection
- **Drag & Drop**: Intuitive piece movement
- **Move History**: Track all moves made
- **Board Rotation**: View from either player's perspective

---

### 3. Rock Paper Scissors ✂️📄🗿

**Location**: `src/pages/Games/RockPaperScissors/index.jsx`
**Route**: `/rock-paper-scissors`

#### Game Description

The classic hand game implemented with smooth animations and sound effects.

#### Features

- **Player vs Computer**: AI opponent with random choice selection
- **Score Tracking**: Running score for both players
- **Visual Feedback**: Animated hand gestures
- **Sound Effects**: Different sounds for win/lose/draw
- **Celebration Effects**: Confetti for wins

#### Game Logic

```javascript
const gameLogic = {
  choices: ["rock", "paper", "scissors"],

  rules: {
    rock: { beats: "scissors", losesTo: "paper" },
    paper: { beats: "rock", losesTo: "scissors" },
    scissors: { beats: "paper", losesTo: "rock" },
  },

  determineWinner: (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) return "tie";
    if (gameLogic.rules[playerChoice].beats === computerChoice) return "player";
    return "computer";
  },

  getComputerChoice: () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return gameLogic.choices[randomIndex];
  },
};
```

#### Animations

- Hand gesture animations using Framer Motion
- Choice reveal with staggered timing
- Score counter animations
- Result announcement effects

---

### 4. Card Game (52-Card Deck) 🃏

**Location**: `src/pages/Games/Cards/index.jsx`
**Route**: `/cards`

#### Game Description

An interactive card game featuring a complete 52-card deck with circular arrangement and card selection mechanics.

#### Features

- **Full Deck**: 52 cards (4 suits × 13 ranks)
- **Circular Layout**: Cards arranged in a circle
- **Card Selection**: Click to pick cards
- **Shuffle Algorithm**: Fisher-Yates shuffle implementation
- **Visual Effects**: Smooth card animations and transitions

#### Card System

```javascript
const cardSystem = {
  suits: [
    { id: 1, name: "hearts", symbol: "♥️", color: "red" },
    { id: 2, name: "diamonds", symbol: "♦️", color: "red" },
    { id: 3, name: "clubs", symbol: "♣️", color: "black" },
    { id: 4, name: "spades", symbol: "♠️", color: "black" },
  ],

  ranks: [
    { id: 1, name: "ace", symbol: "A" },
    { id: 2, name: "two", symbol: "2" },
    { id: 3, name: "three", symbol: "3" },
    { id: 4, name: "four", symbol: "4" },
    { id: 5, name: "five", symbol: "5" },
    { id: 6, name: "six", symbol: "6" },
    { id: 7, name: "seven", symbol: "7" },
    { id: 8, name: "eight", symbol: "8" },
    { id: 9, name: "nine", symbol: "9" },
    { id: 10, name: "ten", symbol: "10" },
    { id: 11, name: "jack", symbol: "J" },
    { id: 12, name: "queen", symbol: "Q" },
    { id: 13, name: "king", symbol: "K" },
  ],

  generateDeck: () => {
    const deck = [];
    cardSystem.suits.forEach((suit) => {
      cardSystem.ranks.forEach((rank) => {
        deck.push({
          id: `${suit.id}-${rank.id}`,
          suit: suit,
          rank: rank,
          value: rank.id,
        });
      });
    });
    return deck;
  },

  shuffleDeck: (deck) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
};
```

#### Card Layout Algorithm

```javascript
const circularLayout = {
  calculatePosition: (index, total, radius = 250) => {
    const centerX = -120;
    const centerY = -120;
    const startAngle = -Math.PI / 2;
    const angleIncrement = (2 * Math.PI) / total;
    const angle = startAngle + index * angleIncrement;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      rotation: (angle * 180) / Math.PI + 90,
    };
  },
};
```

---

## Game Development Guidelines

### Adding New Games

1. **Create Game Structure**

   ```bash
   mkdir src/pages/Games/NewGame
   touch src/pages/Games/NewGame/index.jsx
   touch src/pages/Games/NewGame/NewGame.scss
   ```

2. **Implement Game Hook**

   ```javascript
   const useNewGame = () => {
     const [gameState, setGameState] = useState("idle");
     const [score, setScore] = useState(0);

     const startGame = () => setGameState("playing");
     const endGame = () => setGameState("finished");

     return { gameState, score, startGame, endGame };
   };
   ```

3. **Add Route Configuration**

   ```javascript
   // In src/router/routeConstants.js
   export const routePaths = {
     // ...existing paths
     newGame: '/new-game'
   };

   // In src/router/routes.jsx
   {
     path: routePaths.newGame,
     element: <NewGame />
   }
   ```

4. **Add Navigation Menu Item**
   ```javascript
   // In src/helpers/config.js
   export const gameMenuItems = [
     // ...existing items
     {
       label: "New Game",
       path: routePaths.newGame,
       icon: GameIcon,
       description: "Description of the new game",
     },
   ];
   ```

### Game Testing Standards

```javascript
// Game.test.jsx
describe("Game Component", () => {
  test("starts in idle state", () => {
    render(<Game />);
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  test("transitions to playing state", () => {
    render(<Game />);
    fireEvent.click(screen.getByText("Start Game"));
    expect(screen.getByText("Game in progress")).toBeInTheDocument();
  });

  test("handles game completion", () => {
    render(<Game />);
    // Simulate game completion
    expect(screen.getByText("Game Over")).toBeInTheDocument();
  });
});
```

### Performance Considerations

- **Lazy Loading**: Large games should be lazy-loaded
- **State Optimization**: Use useCallback and useMemo for expensive operations
- **Animation Performance**: Use CSS transforms for smooth animations
- **Memory Management**: Clean up intervals and event listeners

### Accessibility Features

- **Keyboard Navigation**: All games support keyboard controls
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast**: Compatible with high contrast themes
- **Focus Management**: Clear focus indicators and logical tab order

## Audio Integration

### Sound Effects System

```javascript
const gameSounds = {
  "dice-roll": "dice.mp3",
  "card-flip": "card.mp3",
  "piece-move": "move.mp3",
  "game-win": "bell.mp3",
  "game-lose": "aww.mp3",
  "button-click": "button.mp3",
};

const useGameAudio = (gameType) => {
  const { playSound, registerAudio } = useAudio();

  useEffect(() => {
    // Register game-specific sounds
    Object.entries(gameSounds).forEach(([id, filename]) => {
      registerAudio(`${gameType}-${id}`, filename);
    });
  }, [gameType, registerAudio]);

  return {
    playMove: () => playSound(`${gameType}-piece-move`),
    playWin: () => playSound(`${gameType}-game-win`),
    playLose: () => playSound(`${gameType}-game-lose`),
  };
};
```

## Future Game Ideas

### Planned Games

1. **Tic Tac Toe** - Classic 3x3 grid game
2. **Memory Game** - Card matching game
3. **Sudoku** - Number puzzle game
4. **Tetris** - Block falling game
5. **Connect Four** - Strategy game
6. **Crossword** - Word puzzle game

### Game Enhancement Ideas

- **Multiplayer Support**: Real-time multiplayer using WebSockets
- **AI Opponents**: Advanced AI for strategy games
- **Tournament Mode**: Compete in game tournaments
- **Achievements**: Unlock achievements and badges
- **Leaderboards**: Global and local scoring systems
- **Game Replays**: Save and replay game sessions
