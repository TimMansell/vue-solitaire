import { countItemsInDb } from './helpers';

export const won = async (parent, _, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, won: true },
    returnFields: { won: 1 },
  });
};

export const lost = async (parent, _, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, lost: true },
    returnFields: { lost: 1 },
  });
};

export const completed = async (parent, _, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, completed: true },
    returnFields: { completed: 1 },
  });
};

export const userStats = {
  won,
  lost,
  completed,
};
