import {
  differenceInMilliseconds,
  parseISO,
  isAfter,
  isBefore,
} from 'date-fns';

export const validateTime = ({
  times,
  duration,
  timeLength,
  startDate,
  finishDate,
}) => {
  const isAfterStartTime = isAfter(
    parseISO(times[0].date),
    parseISO(startDate)
  );

  const [{ date }] = times.slice(-1);
  const isBeforeFinishTime = isBefore(parseISO(date), parseISO(finishDate));

  const doesTimeMatch = duration === timeLength;

  console.log({ doesTimeMatch, isAfterStartTime, isBeforeFinishTime });

  return doesTimeMatch && isAfterStartTime && isBeforeFinishTime;
};

export const calculateTime = (moves, times) => {
  const newMoves = moves.slice(0, moves.length - 1);
  const time = times.map(({ date }) => date);
  const timeLength = times.length;
  const ACCOUNT_FIRST_SECOND = 1;

  const [startTime] = time.slice(0);
  const [finishTime] = time.slice(-1);

  const pauseMoves = newMoves
    .filter(({ isGamePaused }) => isGamePaused)
    .map(({ date }) => date);

  const resumeMoves = newMoves
    .filter(({ isGamePaused }) => !isGamePaused)
    .map(({ date }) => date);

  const pauseResumeMoves = pauseMoves.map((date, index) => ({
    pause: date,
    resume: resumeMoves[index],
  }));

  console.log({ pauseResumeMoves });

  const gameTime = differenceInMilliseconds(
    parseISO(finishTime),
    parseISO(startTime)
  );

  const pauseTime = pauseResumeMoves.reduce((totalTime, { pause, resume }) => {
    return (
      totalTime + differenceInMilliseconds(parseISO(resume), parseISO(pause))
    );
  }, 0);

  console.log({ gameTime, pauseTime });

  const duration =
    Math.ceil((gameTime - pauseTime) / 1000) + ACCOUNT_FIRST_SECOND;

  console.log({ duration, timeLength });

  return { duration, timeLength };
};
