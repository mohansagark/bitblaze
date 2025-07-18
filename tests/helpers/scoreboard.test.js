import {
  getScores,
  saveScore,
  getBestScore,
  getGameStats,
  clearScoreboard,
  formatTime,
  formatDate,
} from '../../src/helpers/scoreboard';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Scoreboard Helper Functions', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('saveScore and getScores', () => {
    test('saves a score and retrieves it', () => {
      const result = saveScore(1000, 50, 120, false);
      expect(result).toBe(true);

      const scores = getScores();
      expect(scores).toHaveLength(1);
      expect(scores[0].score).toBe(1000);
      expect(scores[0].moves).toBe(50);
      expect(scores[0].time).toBe(120);
      expect(scores[0].won).toBe(false);
    });

    test('sorts scores correctly by score, then moves, then time', () => {
      saveScore(1000, 60, 120, false);
      saveScore(2000, 40, 100, true);
      saveScore(1000, 50, 120, false);
      saveScore(1000, 50, 110, false);

      const scores = getScores();
      expect(scores).toHaveLength(4);

      // First should be highest score
      expect(scores[0].score).toBe(2000);

      // Among same scores, should be sorted by moves then time
      expect(scores[1].score).toBe(1000);
      expect(scores[1].moves).toBe(50);
      expect(scores[1].time).toBe(110);

      expect(scores[2].score).toBe(1000);
      expect(scores[2].moves).toBe(50);
      expect(scores[2].time).toBe(120);

      expect(scores[3].score).toBe(1000);
      expect(scores[3].moves).toBe(60);
    });

    test('limits to maximum number of scores', () => {
      // Add 15 scores (more than MAX_SCORES = 10)
      for (let i = 0; i < 15; i++) {
        saveScore(i * 100, 50, 120, false);
      }

      const scores = getScores();
      expect(scores).toHaveLength(10);

      // Should keep the highest scores
      expect(scores[0].score).toBe(1400);
      expect(scores[9].score).toBe(500);
    });
  });

  describe('getBestScore', () => {
    test('returns 0 when no scores exist', () => {
      expect(getBestScore()).toBe(0);
    });

    test('returns highest score when scores exist', () => {
      saveScore(1000, 50, 120, false);
      saveScore(2000, 40, 100, true);
      saveScore(1500, 60, 140, false);

      expect(getBestScore()).toBe(2000);
    });
  });

  describe('getGameStats', () => {
    test('returns empty stats when no games played', () => {
      const stats = getGameStats();
      expect(stats.totalGames).toBe(0);
      expect(stats.averageScore).toBe(0);
      expect(stats.winRate).toBe(0);
    });

    test('calculates stats correctly', () => {
      saveScore(1000, 50, 120, false);
      saveScore(2000, 40, 100, true);
      saveScore(1500, 60, 140, false);
      saveScore(2048, 80, 200, true);

      const stats = getGameStats();
      expect(stats.totalGames).toBe(4);
      expect(stats.averageScore).toBe(1637); // (1000+2000+1500+2048)/4
      expect(stats.averageMoves).toBe(58); // (50+40+60+80)/4
      expect(stats.averageTime).toBe(140); // (120+100+140+200)/4
      expect(stats.winRate).toBe(50); // 2 wins out of 4 games
      expect(stats.bestScore).toBe(2048);
    });
  });

  describe('clearScoreboard', () => {
    test('clears all scores', () => {
      saveScore(1000, 50, 120, false);
      saveScore(2000, 40, 100, true);

      expect(getScores()).toHaveLength(2);

      clearScoreboard();

      expect(getScores()).toHaveLength(0);
    });
  });

  describe('formatTime', () => {
    test('formats time correctly', () => {
      expect(formatTime(0)).toBe('0:00');
      expect(formatTime(30)).toBe('0:30');
      expect(formatTime(60)).toBe('1:00');
      expect(formatTime(125)).toBe('2:05');
      expect(formatTime(3661)).toBe('61:01');
    });
  });

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const testDate = '2024-01-15T10:30:00.000Z';
      const formatted = formatDate(testDate);

      // The exact format depends on locale, but should contain month and day
      expect(formatted).toMatch(/Jan|January/);
      expect(formatted).toMatch(/15/);
      expect(formatted).toMatch(/2024/);
    });
  });

  describe('error handling', () => {
    test('handles localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const scores = getScores();
      expect(scores).toEqual([]);
    });

    test('handles invalid JSON in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');

      const scores = getScores();
      expect(scores).toEqual([]);
    });
  });
});
