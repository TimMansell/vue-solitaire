import { differenceInSeconds, parseISO } from 'date-fns';
import { findAllItems, findItemInDb } from './db';
import { validateGame } from '../../../../services/solitaire';

export const calculateTime = (moves) => {
  const pauseMoves = moves
    .filter(({ type }) => type === 'pause')
    .map(({ date }) => date);

  const resumeMoves = moves
    .filter(({ type }) => type === 'resume')
    .map(({ date }) => date);

  const cardMoves = moves
    .filter(({ type }) => type === 'board' || type === 'foundation')
    .map(({ date }) => date);

  const pauseResumeMoves = pauseMoves.map((date, index) => ({
    pause: date,
    resume: resumeMoves[index],
  }));

  console.log({ pauseResumeMoves });

  const [firstMove] = cardMoves;
  const lastMove = cardMoves[cardMoves.length - 1];

  const cardMoveTimes = differenceInSeconds(
    parseISO(lastMove),
    parseISO(firstMove)
  );

  const pauseMoveTimes = pauseResumeMoves.reduce(
    (totalTime, { pause, resume }) =>
      totalTime + differenceInSeconds(parseISO(resume), parseISO(pause)),
    0
  );

  const gameTime = cardMoveTimes - pauseMoveTimes;

  console.log({ gameTime, cardMoveTimes, pauseMoveTimes });

  return gameTime;
};

// eslint-disable-next-line import/prefer-default-export
export const validateMoves = async (client, uid) => {
  const findGame = findItemInDb(client, 'decks', {
    findFields: { uid },
    returnFields: {
      projection: { cards: 1 },
    },
  });

  const findMoves = findAllItems(client, 'moves', {
    findFields: { uid },
    returnFields: {
      projection: {
        date: 1,
        selectedCardId: 1,
        selectedColumn: 1,
        type: 1,
        value: 1,
        suit: 1,
      },
    },
  });

  const [deck, moves] = await Promise.all([findGame, findMoves]);

  const cardMoves = moves.filter(
    ({ type }) => type === 'board' || type === 'foundation'
  );

  const isValidGame = validateGame(deck.cards, cardMoves);

  console.log({ isValidGame });
};
