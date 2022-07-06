import { findItemsInDb, countItemsInDb, findItemInDb } from './helpers';

export const exists = async (parent, __, context) => {
  const { client } = context;

  const itemCount = await countItemsInDb({
    client,
    collection: 'users',
    findFields: { ...parent },
    returnFields: { uid: 1 },
  });

  return itemCount;
};

export const history = async (parent, args, context) => {
  const { client } = context;

  const items = await findItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent },
    returnFields: { date: 1, won: 1, lost: 1, moves: 1, time: 1 },
    sortBy: { date: -1 },
    ...args,
  });

  return items;
};

export const name = async (parent, args, context) => {
  const { client } = context;

  const user = await findItemInDb({
    client,
    collection: 'users',
    findFields: { ...parent },
    returnFields: { name: 1 },
    ...args,
  });

  return user?.name;
};

export const user = {
  exists,
  history,
  name,
};
