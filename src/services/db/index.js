import { getAUser, createUser, newGame, gameLost, gameWon, gameCompleted } from './queries';

const db = () => ({
  getAUser,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
});

export default db();
