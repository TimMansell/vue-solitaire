import {
  getAUser,
  getUserStats,
  getUserStatsCount,
  getGlobalStats,
  getGlobalStatsCount,
} from './queries';
import { createUser, newGame, gameLost, gameWon, gameCompleted } from './mutations';

const db = () => ({
  getAUser,
  getUserStats,
  getUserStatsCount,
  getGlobalStats,
  getGlobalStatsCount,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
