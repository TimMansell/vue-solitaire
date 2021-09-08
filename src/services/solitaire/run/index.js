import { runGameMoves } from './run';
import { isBoardEmpty } from '../board';
import { checkHasMoves } from '../moves';

// eslint-disable-next-line import/prefer-default-export
export const checkGameState = (moves, deck) => {
  const { cards, foundation } = runGameMoves(moves, deck);

  const isGameFinished = isBoardEmpty({ cards });

  const hasMoves = checkHasMoves({
    cards,
    foundation,
  });

  return { isGameFinished, hasMoves };
};
