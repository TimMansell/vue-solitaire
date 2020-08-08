import { newGame, updateGame, getTotalGames } from './queries';

const graphql = () => ({
  newGame,
  updateGame,
  getTotalGames,
});

export default graphql();
