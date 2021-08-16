import { findItemsInDb, countItemsInDb, findItemInDb } from './helpers';

export const exists = async (parent, __, { client }) => {
  const collection = 'users';
  const params = {
    findFields: parent,
    returnFields: { projection: { uid: 1 } },
  };

  const itemCount = await countItemsInDb(client, collection, params);

  return itemCount;
};

export const history = async (parent, args, context) => {
  const { client } = context;
  const collection = 'games';
  const params = {
    ...args,
    findFields: parent,
    returnFields: {
      projection: { date: 1, won: 1, lost: 1, moves: 1, time: 1 },
    },
    sortBy: { date: -1 },
  };

  const items = await findItemsInDb(client, collection, params);

  return items;
};

export const name = async (parent, args, context) => {
  const { client } = context;
  const collection = 'users';
  const params = {
    ...args,
    findFields: parent,
    returnFields: {
      projection: { name: 1 },
    },
  };

  const user = await findItemInDb(client, collection, params);

  return user?.name;
};

export const user = {
  exists,
  history,
  name,
};
