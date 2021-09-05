import { initCards } from '../../../services/solitaire';
import {
  createPlayerName,
  insertIntoDb,
  findAllItems,
  deleteFromDb,
  deleteAllFromDb,
  // validateMoves,
} from './helpers';
import { createISODate } from '../../../helpers/dates';
import { gameOutcome } from '../../../helpers/game';

export const createUser = async (_, __, { client, variables }) => {
  const {
    data: { uid },
  } = variables;

  const playerNamesInUse = await findAllItems(client, 'users', {
    findFields: {},
    returnFields: {
      projection: { name: 1 },
    },
  });

  const name = createPlayerName(playerNamesInUse);

  const document = { uid, name };

  await insertIntoDb(client, 'users', document);

  return { name };
};

export const newGame = async (_, __, { client, variables }) => {
  const { data } = variables;

  const date = createISODate();
  const cards = initCards();

  await Promise.all([
    deleteFromDb(client, 'decks', data),
    deleteAllFromDb(client, 'moves', data),
  ]);

  insertIntoDb(client, 'decks', { ...data, date, cards });

  return { cards };
};

export const wonGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();
  const outcome = gameOutcome({ won: true });

  const document = { date, ...data, won: true, lost: false, completed: true };

  await insertIntoDb(client, 'games', document);

  return { outcome };
};

export const lostGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();
  const outcome = gameOutcome({ lost: true });

  const document = { date, ...data, won: false, lost: true, completed: true };

  await insertIntoDb(client, 'games', document);

  return { outcome };
};

export const quitGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();
  const outcome = gameOutcome({ completed: true });

  const document = { date, ...data, won: false, lost: false, completed: true };

  await insertIntoDb(client, 'games', document);

  return { outcome };
};

export const moveCard = async (_, __, { client, variables }) => {
  const { uid, move } = variables;
  const date = createISODate();

  const document = { date, uid, ...move };

  await insertIntoDb(client, 'moves', document);

  // validateMoves(client, uid);

  return { ...variables.move };
};

export const pauseGame = async (_, __, { client, variables }) => {
  const { uid, isPaused } = variables;
  const date = createISODate();
  const pausedState = {
    paused: isPaused,
    resumed: !isPaused,
  };

  const document = { date, uid, ...pausedState };

  await insertIntoDb(client, 'moves', document);

  return { type: 'pause' };
};

export const mutations = {
  createUser,
  newGame,
  wonGame,
  lostGame,
  quitGame,
  moveCard,
  pauseGame,
};
