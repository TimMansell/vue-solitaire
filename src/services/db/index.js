import {
  checkUserExists,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  getAppVersion,
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
  getAppVersion,
});

export default db();
