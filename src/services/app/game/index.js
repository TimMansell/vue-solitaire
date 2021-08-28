import { newGame } from '@/services/db';
import { saveQuery } from './game';

export const getNewGame = async (luid) => {
  const { error, response } = await newGame(luid);

  if (!error) {
    return response;
  }

  return {};
};

export const saveGame = async (luid, game, gameStatus) => {
  const { error, response } = await saveQuery(luid, game, gameStatus);

  if (!error) {
    return response;
  }

  return {};
};
