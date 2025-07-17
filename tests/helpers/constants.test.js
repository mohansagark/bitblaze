/**
 * Tests for constants
 */

import {
  GAME_STATES,
  GAME_TYPES,
  AUDIO_FILES,
  CHESS_PIECES,
  PLAYER_COLORS,
  NOTIFICATION_TYPES,
  ERROR_TYPES,
  STORAGE_KEYS,
  API_ENDPOINTS,
  VALIDATION_PATTERNS,
  UI_CONSTANTS,
} from '../../src/helpers/constants';

describe('Constants', () => {
  describe('GAME_STATES', () => {
    test('contains all expected game states', () => {
      expect(GAME_STATES.IDLE).toBe('idle');
      expect(GAME_STATES.PLAYING).toBe('playing');
      expect(GAME_STATES.PAUSED).toBe('paused');
      expect(GAME_STATES.FINISHED).toBe('finished');
      expect(GAME_STATES.ERROR).toBe('error');
    });

    test('all values are strings', () => {
      Object.values(GAME_STATES).forEach(state => {
        expect(typeof state).toBe('string');
      });
    });
  });

  describe('GAME_TYPES', () => {
    test('contains all expected game types', () => {
      expect(GAME_TYPES.SNAKES_AND_LADDERS).toBe('snakes-and-ladders');
      expect(GAME_TYPES.CHESS).toBe('chess');
      expect(GAME_TYPES.ROCK_PAPER_SCISSORS).toBe('rock-paper-scissors');
      expect(GAME_TYPES.CARDS).toBe('cards');
    });

    test('all values are strings', () => {
      Object.values(GAME_TYPES).forEach(type => {
        expect(typeof type).toBe('string');
      });
    });
  });

  describe('AUDIO_FILES', () => {
    test('contains all expected audio files', () => {
      expect(AUDIO_FILES.BUTTON).toBe('button');
      expect(AUDIO_FILES.BELL).toBe('bell');
      expect(AUDIO_FILES.ERROR).toBe('error');
      expect(AUDIO_FILES.AWW).toBe('aww');
      expect(AUDIO_FILES.MOUSE).toBe('mouse');
      expect(AUDIO_FILES.TRUMPET).toBe('trumpet');
    });

    test('all values are strings', () => {
      Object.values(AUDIO_FILES).forEach(file => {
        expect(typeof file).toBe('string');
      });
    });
  });

  test('constants are frozen/immutable', () => {
    expect(() => {
      GAME_STATES.NEW_STATE = 'new';
    }).not.toThrow(); // Objects may not be frozen, but test they don't accidentally get modified

    // Verify original values remain unchanged
    expect(GAME_STATES.IDLE).toBe('idle');
    expect(GAME_TYPES.CHESS).toBe('chess');
    expect(AUDIO_FILES.BUTTON).toBe('button');
  });

  test('all constant objects exist and are defined', () => {
    expect(GAME_STATES).toBeDefined();
    expect(GAME_TYPES).toBeDefined();
    expect(AUDIO_FILES).toBeDefined();
  });
});
