import { getAUser, getUserStats, getGlobalStats } from './queries';
import { createUser, newGame, gameLost, gameWon, gameCompleted } from './mutations';

const db = () => ({
  getAUser,
  getUserStats,
  getGlobalStats,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
