import { differenceInSeconds, parseISO } from 'date-fns';

export const calculateTime = (deck, moves) => {
  const startTime = deck;
  const [endTime] = moves.slice(-1);

  console.log({ startTime, endTime });

  const pauseMoves = moves
    .filter(({ isPaused }) => isPaused)
    .map(({ date }) => date);

  const resumeMoves = moves
    .filter(({ isResumed }) => isResumed)
    .map(({ date }) => date);

  const pauseResumeMoves = pauseMoves
    .map((date, index) => ({
      pause: date,
      resume: resumeMoves[index],
    }))
    .filter(({ resume }) => resume);

  console.log({ pauseResumeMoves });

  const startStopTimes = differenceInSeconds(
    parseISO(endTime.date),
    parseISO(startTime.date)
  );

  const pauseMoveTimes = pauseResumeMoves.reduce(
    (totalTime, { pause, resume }) =>
      totalTime + differenceInSeconds(parseISO(resume), parseISO(pause)),
    0
  );

  const gameTime = startStopTimes - pauseMoveTimes;

  console.log({ gameTime, startStopTimes, pauseMoveTimes });

  return gameTime;
};

export const calculateMoves = (moves) => {
  const cardMoves = moves.filter(
    ({ isBoard, isFoundation }) => isBoard || isFoundation
  );

  return cardMoves.length;
};
