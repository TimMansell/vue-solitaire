import { insertIntoDb } from './helpers';
import { createISODate } from '../../../helpers/dates';

export const wonGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: true, lost: false, completed: true };

  insertIntoDb({
    client,
    collection: 'games',
    document,
  });

  return { ...document };
};

export const lostGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: false, lost: true, completed: true };

  insertIntoDb({
    client,
    collection: 'games',
    document,
  });

  return { ...document };
};

export const quitGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: false, lost: false, completed: true };

  insertIntoDb({
    client,
    collection: 'games',
    document,
  });

  return { ...document };
};

export const mutations = {
  wonGame,
  lostGame,
  quitGame,
};
