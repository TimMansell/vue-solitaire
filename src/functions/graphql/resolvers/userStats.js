import { countItemsInDb } from './helpers';

export const won = async (parent, args, context) => {
  const { client } = context;
  const collection = 'games';
  const params = {
    findFields: { ...parent, won: true },
    returnFields: { projection: { won: 1 } },
  };

  const itemCount = countItemsInDb(client, collection, params);

  return itemCount;
};

export const lost = async (parent, args, context) => {
  const { client } = context;
  const collection = 'games';
  const params = {
    findFields: { ...parent, lost: true },
    returnFields: { projection: { won: 1 } },
  };

  const itemCount = countItemsInDb(client, collection, params);

  return itemCount;
};

export const completed = async (parent, args, context) => {
  const { client } = context;
  const collection = 'games';
  const params = {
    findFields: { ...parent, completed: true },
    returnFields: { projection: { won: 1 } },
  };

  const itemCount = countItemsInDb(client, collection, params);

  return itemCount;
};

export const userStats = {
  won,
  lost,
  completed,
};
