import { initCards } from '../../../services/solitaire';
import { createPlayerName, insertIntoDb, findAllItems } from './helpers';
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
  const date = createISODate();

  const document = { date, ...variables };

  await insertIntoDb(client, 'moves', document);

  return { ...variables.move };
};

export const mutations = {
  createUser,
  newGame,
  wonGame,
  lostGame,
  quitGame,
  moveCard,
};
