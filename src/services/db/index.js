import {
  checkUserExists,
  getUserStats,
  getGlobalStats,
  getStatsCount,
} from './queries';
import { newUser, gameLost, gameWon, gameAbandoned } from './mutations';

const db = () => ({
  checkUserExists,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  newUser,
  gameWon,
  gameLost,
  gameAbandoned,
});

export default db();
