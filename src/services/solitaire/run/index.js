import sha1 from 'crypto-js/sha1';
import { parseISO, isAfter, isBefore } from 'date-fns';
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
  const initialValidTime = true;

  const gameTimeReduce = (prevValue, currentValue) => {
    const { date, hash } = currentValue;

    if (!prevValue) return prevValue;

    const hashCheck = sha1(date, gameHash).toString();

    return hashCheck === hash;
  };

  const isValidTime = times.reduce(gameTimeReduce, initialValidTime);

  return isValidTime;
};

export const checkGameMoves = (moves, times, startTime, endTime) => {
  if (!moves.length) return true;

  const hashMap = times.map(({ hash }) => hash);
  const initialValidMove = true;
  const initialValidTime = true;
  const { date: lastTime } = moves.slice(-1)[0];

  const gameMovesReduce = (prevValue, currentValue) => {
    const [isValidMove, isValidTime, prevTime, hashes] = prevValue;
    const { date, hash } = currentValue;

    if (!isValidTime || !isValidMove) return [false, false, date, hashes];

    const isAfterPrevMove = isAfter(parseISO(date), parseISO(prevTime));
    const isMoveInTime = hashMap.includes(hash);

    return [isMoveInTime, isAfterPrevMove, date, hashMap];
  };

  const [isValidMove, isValidTime] = moves.reduce(gameMovesReduce, [
    initialValidMove,
    initialValidTime,
    startTime,
    hashMap,
  ]);

  const isValidEndTime = isBefore(parseISO(lastTime), parseISO(endTime));

  return isValidMove && isValidTime && isValidEndTime;
};
