import {
  checkUserExists,
  getStats,
  getStatsCount,
  getAppVersion,
  getUsersGames,
} from './queries';
import { newUser, gameLost, gameWon, gameQuit } from './mutations';

const db = () => ({
  checkUserExists,
  newUser,
  getStatsCount,
  getStats,
  gameWon,
  gameLost,
  gameQuit,
  getAppVersion,
  getUsersGames,
});

export default db();
