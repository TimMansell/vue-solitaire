import { getAUser } from './queries';
import { createUser, newGame, gameLost, gameWon, gameCompleted } from './mutations';

const db = () => ({
  getAUser,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
