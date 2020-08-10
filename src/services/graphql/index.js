import { newGame, gameLost, gameWon, gameCompleted, getTotalGames } from './queries';

const db = () => ({
  newGame,
  gameWon,
  gameLost,
  gameCompleted,
  getTotalGames,
});

export default db();
