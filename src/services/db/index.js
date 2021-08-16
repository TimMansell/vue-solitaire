import {
  getUser,
  getStats,
  getStatsCount,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
} from './queries';
import { newUser, gameLost, gameWon, gameQuit } from './mutations';

const db = () => ({
  getUser,
  newUser,
  getStatsCount,
  getStats,
  gameWon,
  gameLost,
  gameQuit,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
});

export default db();
