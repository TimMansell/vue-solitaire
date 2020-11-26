import { getAUser, getUserStats, getGlobalStats, getStatsCount } from './queries';
import { createUser, newGame, gameLost, gameWon, gameCompleted } from './mutations';

const db = () => ({
  getAUser,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
