import { findItemsInDb } from './helpers';

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

  const items = findItemsInDb(client, collection, params);

  return items;
};

export const user = {
  history,
};
