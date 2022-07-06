import { runGameMoves } from './run';
import { isBoardEmpty } from '../board';
import { checkHasMoves } from '../moves';

// eslint-disable-next-line import/prefer-default-export
export const checkGameState = ({ cards, moves, time }) => {
  const board = runGameMoves(moves, cards);

  const isGameFinished = isBoardEmpty(board);

  const hasMoves = checkHasMoves(board);

  const hasWon = isGameFinished && !hasMoves;
  const hasLost = !isGameFinished && !hasMoves;

  return {
    moves: moves.length,
    time,
    won: hasWon,
    lost: hasLost,
    completed: true,
  };
};
