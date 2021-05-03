import { countItemsInDb } from './helpers';

export const won = async ({ uid }, __, { client }) => {
  const findFields = { uid, won: true };
  const returnFields = { projection: { won: 1 } };

  const itemCount = countItemsInDb(client, 'games', findFields, returnFields);

  return itemCount;
};

export const lost = async ({ uid }, __, { client }) => {
  const findFields = { uid, lost: true };
  const returnFields = { projection: { lost: 1 } };

  const itemCount = countItemsInDb(client, 'games', findFields, returnFields);

  return itemCount;
};

export const completed = async ({ uid }, __, { client }) => {
  const findFields = { uid, completed: true };
  const returnFields = { projection: { completed: 1 } };

  const itemCount = countItemsInDb(client, 'games', findFields, returnFields);

  return itemCount;
};

export const userStats = {
  won,
  lost,
  completed,
};
