import {
  getAUser,
  getUserStats,
  getGlobalStats,
  getStatsCount,
} from './queries';
import {
  newUser,
  gameNew,
  gameLost,
  gameWon,
  gameAbandoned,
} from './mutations';

const db = () => ({
  getAUser,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  newUser,
  gameNew,
  gameWon,
  gameLost,
  gameAbandoned,
});

export default db();
