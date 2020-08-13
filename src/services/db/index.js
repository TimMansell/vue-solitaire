import {
  getAUser,
  createUser,
  newGame,
  gameLost,
  gameWon,
  gameCompleted,
  getTotalGames,
} from './queries';

const db = () => ({
  getAUser,
  createUser,
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
  getTotalGames,
});

export default db();
