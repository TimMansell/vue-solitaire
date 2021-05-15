import { findItemsInDb } from './helpers';

export const history = async ({ uid }, __, { client }) => {
  const findFields = { uid };
  const returnFields = {};

  const items = findItemsInDb(client, 'games', findFields, returnFields);

  return items;
};

export const user = {
  history,
};
