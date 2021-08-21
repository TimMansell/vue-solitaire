import {
  getUser,
  getStats,
  getStatsCount,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
} from './queries';
import { newUser, newGame, gameLost, gameWon, gameQuit } from './mutations';

const db = () => ({
  getUser,
  newUser,
  getStatsCount,
  getStats,
  newGame,
  gameWon,
  gameLost,
  gameQuit,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
});

export default db();
