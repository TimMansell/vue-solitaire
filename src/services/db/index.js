import { getAUser, getUserStats, getGlobalStats, getStatsCount } from './queries';
import { newUser, gameNew, gameLost, gameWon, gameCompleted } from './mutations';

const db = () => ({
  getAUser,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  newUser,
  gameNew,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
