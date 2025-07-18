/**
 * Scoreboard utility for managing 2048 game scores
 */

const SCOREBOARD_KEY = '2048-scoreboard';
const MAX_SCORES = 10; // Keep top 10 scores

/**
 * Score entry structure:
 * {
 *   id: string,
 *   score: number,
 *   moves: number,
 *   time: number (in seconds),
 *   date: string (ISO date),
 *   won: boolean
 * }
 */

/**
 * Get all scores from localStorage
 * @returns {Array} Array of score entries
 */
export const getScores = () => {
  try {
    const scores = localStorage.getItem(SCOREBOARD_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch {
    return [];
  }
};

/**
 * Save a new score to the scoreboard
 * @param {number} score - Game score
 * @param {number} moves - Number of moves taken
 * @param {number} time - Time taken in seconds
 * @param {boolean} won - Whether the game was won
 * @returns {boolean} True if score was added to top scores
 */
export const saveScore = (score, moves, time, won = false) => {
  try {
    const scores = getScores();

    const newScore = {
      id: Date.now().toString(),
      score,
      moves,
      time,
      date: new Date().toISOString(),
      won,
    };

    // Add new score
    scores.push(newScore);

    // Sort by score (descending), then by moves (ascending), then by time (ascending)
    scores.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      if (a.moves !== b.moves) return a.moves - b.moves;
      return a.time - b.time;
    });

    // Keep only top scores
    const topScores = scores.slice(0, MAX_SCORES);

    // Save to localStorage
    localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(topScores));

    // Return true if this score made it to the top list
    return topScores.some(s => s.id === newScore.id);
  } catch {
    return false;
  }
};

/**
 * Get the best score
 * @returns {number} Best score or 0 if no scores
 */
export const getBestScore = () => {
  const scores = getScores();
  return scores.length > 0 ? scores[0].score : 0;
};

/**
 * Get statistics from all games
 * @returns {Object} Game statistics
 */
export const getGameStats = () => {
  const scores = getScores();

  if (scores.length === 0) {
    return {
      totalGames: 0,
      averageScore: 0,
      averageMoves: 0,
      averageTime: 0,
      winRate: 0,
      bestScore: 0,
      bestMoves: 0,
      bestTime: 0,
    };
  }

  const totalGames = scores.length;
  const wins = scores.filter(s => s.won).length;
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const totalMoves = scores.reduce((sum, s) => sum + s.moves, 0);
  const totalTime = scores.reduce((sum, s) => sum + s.time, 0);

  // Find best metrics
  const bestScore = Math.max(...scores.map(s => s.score));
  const bestMovesEntry = scores.reduce(
    (best, current) => (current.score > 0 && current.moves < best.moves ? current : best),
    { moves: Infinity },
  );
  const bestTimeEntry = scores.reduce(
    (best, current) => (current.score > 0 && current.time < best.time ? current : best),
    { time: Infinity },
  );

  return {
    totalGames,
    averageScore: Math.round(totalScore / totalGames),
    averageMoves: Math.round(totalMoves / totalGames),
    averageTime: Math.round(totalTime / totalGames),
    winRate: Math.round((wins / totalGames) * 100),
    bestScore,
    bestMoves: bestMovesEntry.moves === Infinity ? 0 : bestMovesEntry.moves,
    bestTime: bestTimeEntry.time === Infinity ? 0 : bestTimeEntry.time,
  };
};

/**
 * Clear all scores
 */
export const clearScoreboard = () => {
  try {
    localStorage.removeItem(SCOREBOARD_KEY);
  } catch (error) {
    throw error;
  }
};

/**
 * Format time for display
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time (MM:SS)
 */
export const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Format date for display
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = isoDate => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
