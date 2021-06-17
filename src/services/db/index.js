import {
  checkUserExists,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  getAppVersion,
  getUsersGames,
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
  getUsersGames,
});

export default db();
