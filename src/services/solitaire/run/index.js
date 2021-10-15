import sha1 from 'crypto-js/sha1';
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

export const checkGameTime = (times, gameHash) => {
  const isValidTime = times.reduce((prevValue, { date, hash }) => {
    if (!prevValue) return prevValue;

    const hashCheck = sha1(date, gameHash).toString();

    return hashCheck === hash;
  }, true);

  return isValidTime;
};

export const checkGameMoves = (moves, times) => {
  const isValidMoves = moves.reduce((prevValue, { hash: moveHash }) => {
    if (!prevValue) return prevValue;

    const hashes = times.map(({ hash }) => hash);
    const moveInTime = hashes.includes(moveHash);

    return moveInTime;
  }, true);

  return isValidMoves;
};
