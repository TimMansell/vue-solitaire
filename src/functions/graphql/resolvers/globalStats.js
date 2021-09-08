import { countItemsInDb } from './helpers';

export const won = async (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { won: true },
    returnFields: { won: 1 },
  });
};

export const lost = async (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { lost: true },
    returnFields: { lost: 1 },
  });
};

export const completed = async (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { completed: true },
    returnFields: { completed: 1 },
  });
};

export const players = async (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'users',
    findFields: {},
    returnFields: { uid: 1 },
  });
};

export const globalStats = {
  won,
  lost,
  completed,
  players,
};
