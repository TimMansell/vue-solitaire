import {
  checkUserExists,
  getUserStats,
  getGlobalStats,
  getStatsCount,
} from './queries';
import { newUser, gameLost, gameWon, gameQuit } from './mutations';

const db = () => ({
  checkUserExists,
  newUser,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  gameWon,
  gameLost,
  gameQuit,
});

export default db();
