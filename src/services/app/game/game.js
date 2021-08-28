import { gameWon, gameLost, gameQuit } from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const saveQuery = (luid, game, gameStatus) => {
  const { won, lost } = gameStatus;

  if (won) {
    return gameWon({ luid, ...game });
  }

  if (lost) {
    return gameLost({ luid, ...game });
  }

  return gameQuit({ luid, ...game });
};
