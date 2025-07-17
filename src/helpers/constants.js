/**
 * Application constants
 */

// Game states
export const GAME_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
  ERROR: 'error',
};

// Game types
export const GAME_TYPES = {
  SNAKES_AND_LADDERS: 'snakes-and-ladders',
  CHESS: 'chess',
  ROCK_PAPER_SCISSORS: 'rock-paper-scissors',
  CARDS: 'cards',
};

// Audio file mappings
export const AUDIO_FILES = {
  BUTTON: 'button',
  BELL: 'bell',
  ERROR: 'error',
  AWW: 'aww',
  MOUSE: 'mouse',
  TRUMPET: 'trumpet',
};

// Theme modes
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Theme colors
export const THEME_COLORS = {
  BLUE: 'blue',
  GREEN: 'green',
  INDIGO: 'indigo',
  ORANGE: 'orange',
  PURPLE: 'purple',
  RED: 'red',
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

// Layout constants
export const LAYOUT = {
  HEADER_HEIGHT: '64px',
  FOOTER_HEIGHT: '100px',
  SIDEBAR_WIDTH: '250px',
  MOBILE_SIDEBAR_WIDTH: '80vw',
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME_MODE: 'themeMode',
  COLOR_MODE: 'colorMode',
  SOUND_ENABLED: 'soundEnabled',
  USER_PREFERENCES: 'userPreferences',
  GAME_SCORES: 'gameScores',
};

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUDIO_LOAD_FAILED: 'Failed to load audio file.',
  GAME_LOAD_FAILED: 'Failed to load game. Please refresh the page.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  GAME_WON: 'Congratulations! You won!',
  GAME_SAVED: 'Game progress saved successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
};

// Game specific constants
export const ROCK_PAPER_SCISSORS = {
  CHOICES: ['rock', 'paper', 'scissors'],
  RULES: {
    rock: { beats: 'scissors', losesTo: 'paper' },
    paper: { beats: 'rock', losesTo: 'scissors' },
    scissors: { beats: 'paper', losesTo: 'rock' },
  },
};

export const CHESS = {
  BOARD_SIZE: 8,
  PIECES: {
    PAWN: 'pawn',
    ROOK: 'rook',
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    QUEEN: 'queen',
    KING: 'king',
  },
  COLORS: {
    WHITE: 'white',
    BLACK: 'black',
  },
};

export const CARDS = {
  SUITS: ['hearts', 'diamonds', 'clubs', 'spades'],
  RANKS: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  DECK_SIZE: 52,
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
  GAMES: '/api/games',
  SCORES: '/api/scores',
  USER: '/api/user',
};

// Performance thresholds
export const PERFORMANCE = {
  SLOW_RENDER_THRESHOLD: 16, // milliseconds
  MEMORY_WARNING_THRESHOLD: 50 * 1024 * 1024, // 50MB
};

// Feature flags
export const FEATURES = {
  CONFETTI: 'confetti',
  SOUND: 'sound',
  ANALYTICS: 'analytics',
  PERFORMANCE_MONITORING: 'performance_monitoring',
};

const constants = {
  APP_NAME: 'BitBlaze',
  APP_VERSION: '0.1.0',
  AUTHOR: 'Mohan Sagar',
  DESCRIPTION: 'A collection of fun and interactive games built with React',
  KEYWORDS: ['games', 'react', 'entertainment', 'fun'],
  GAME_STATES,
  GAME_TYPES,
  AUDIO_FILES,
  THEME_MODES,
  THEME_COLORS,
  BREAKPOINTS,
  LAYOUT,
  ANIMATION_DURATION,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROCK_PAPER_SCISSORS,
  CHESS,
  CARDS,
  API_ENDPOINTS,
  PERFORMANCE,
  FEATURES,
};

export default constants;
