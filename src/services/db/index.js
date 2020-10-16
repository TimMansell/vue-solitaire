import { getAUser, getGlobalStats } from './queries';
import { createUser, newGame, gameLost, gameWon, gameCompleted } from './mutations';

const db = () => ({
  getAUser,
  getGlobalStats,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
