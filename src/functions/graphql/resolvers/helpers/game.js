import 'dotenv/config';

import { differenceInSeconds, parseISO, isAfter, isBefore } from 'date-fns';

export const validateTime = ({ times, duration, startDate, finishDate }) => {
  const { TIMER_THRESHOLD } = process.env;
  const clientTime = times.length;
  const threshold = parseInt(TIMER_THRESHOLD, 10);

  const isAfterStartTime = isAfter(
    parseISO(times[0].date),
    parseISO(startDate)
  );

  const [{ date }] = times.slice(-1);
  const isBeforeFinishTime = isBefore(parseISO(date), parseISO(finishDate));

  const doesTimeMatch =
    duration === clientTime ||
    duration + threshold === clientTime ||
    duration - threshold === clientTime;

  console.log({
    clientTime,
    doesTimeMatch,
    isAfterStartTime,
    isBeforeFinishTime,
  });

  return doesTimeMatch && isAfterStartTime && isBeforeFinishTime;
};

export const calculateTime = (startDate, moves, times) => {
  const movesWithoutLastPause = moves.slice(0, moves.length - 1);

  const time = times.map(({ date }) => date);
  const [finishDate] = time.slice(-1);

  const pauseMoves = movesWithoutLastPause
    .filter(({ isGamePaused }) => isGamePaused)
    .map(({ date }) => date);

  const resumeMoves = movesWithoutLastPause
    .filter(({ isGamePaused }) => !isGamePaused)
    .map(({ date }) => date);

  const pauseResumeMoves = pauseMoves.map((date, index) => ({
    pause: date,
    resume: resumeMoves[index],
  }));

  console.log({ pauseResumeMoves });

  const gameTime = differenceInSeconds(
    parseISO(finishDate),
    parseISO(startDate)
  );

  console.log({ startDate, finishDate });

  const pauseTime = pauseResumeMoves.reduce((totalTime, { pause, resume }) => {
    return totalTime + differenceInSeconds(parseISO(resume), parseISO(pause));
  }, 0);

  console.log({ gameTime, pauseTime });

  const duration = gameTime - pauseTime;

  return duration;
};
