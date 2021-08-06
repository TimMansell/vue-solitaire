import { findItemsInDb } from './helpers';

export const moves = async (parent, _, context) => {
  const { client } = context;
  const collection = 'games';
  const params = {
    ...parent,
    findFields: { won: true },
    returnFields: {
      projection: { date: 1, uid: 1, moves: 1 },
    },
    sortBy: { moves: 1, date: 1 },
  };

  const items = findItemsInDb(client, collection, params);

  return items;
};

export const time = async (parent, _, context) => {
  const { client } = context;
  const collection = 'games';
  const params = {
    ...parent,
    findFields: { won: true },
    returnFields: {
      projection: { date: 1, uid: 1, time: 1 },
    },
    sortBy: { time: 1, date: 1 },
  };

  const items = findItemsInDb(client, collection, params);

  return items;
};

export const leaderboards = {
  moves,
  time,
};
