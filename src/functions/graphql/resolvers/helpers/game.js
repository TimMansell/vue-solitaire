import { differenceInSeconds, parseISO } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const calculateTime = (startDate, finishDate, paused) => {
  const pauseMoves = paused
    .filter(({ isGamePaused }) => isGamePaused)
    .map(({ date }) => date);

  const resumeMoves = paused
    .filter(({ isGamePaused }) => !isGamePaused)
    .map(({ date }) => date);

  const pauseResumeMoves = pauseMoves.map((date, index) => ({
    pause: date,
    resume: resumeMoves[index],
  }));

  console.log({ pauseResumeMoves });

  const time = differenceInSeconds(parseISO(finishDate), parseISO(startDate));

  const pauseMoveTimes = pauseResumeMoves.reduce(
    (totalTime, { pause, resume }) => {
      return (
        totalTime +
        differenceInSeconds(parseISO(resume), parseISO(pause), {
          roundingMethod: 'ceil',
        })
      );
    },
    0
  );
  const gameTime = time - pauseMoveTimes;

  console.log({ time, gameTime, pauseMoveTimes });

  return gameTime;
};
