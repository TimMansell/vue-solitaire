import { insertIntoDb } from './helpers';
import { createISODate } from '../../../helpers/dates';

export const createUser = async (_, __, { client, variables }) => {
  const { data } = variables;

  const document = { ...data };

  await insertIntoDb(client, 'users', document);

  return { ...document };
};

export const wonGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: true, lost: false, completed: true };

  await insertIntoDb(client, 'games', document);

  return { ...document };
};

export const lostGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: false, lost: true, completed: true };

  await insertIntoDb(client, 'games', document);

  return { ...document };
};

export const quitGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: false, lost: false, completed: true };

  await insertIntoDb(client, 'games', document);

  return { ...document };
};

export const mutations = {
  createUser,
  wonGame,
  lostGame,
  quitGame,
};
