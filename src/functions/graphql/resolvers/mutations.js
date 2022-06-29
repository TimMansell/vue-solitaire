import { createPlayerName, insertIntoDb, findAllItems } from './helpers';
import { createISODate } from '../../../helpers/dates';

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
