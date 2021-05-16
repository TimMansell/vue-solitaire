import { findItemsInDb } from './helpers';

export const history = async (parent, args, context) => {
  const params = {
    ...args,
    findFields: parent,
    returnFields: {
      projection: { date: 1, won: 1, lost: 1, moves: 1, time: 1 },
    },
  };

  const items = findItemsInDb(context.client, 'games', params);

  return items;
};

export const user = {
  history,
};
