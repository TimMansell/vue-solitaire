import { countItemsInDb } from './helpers';

export const exists = async ({ uid }, __, { client }) => {
  const findFields = { uid };
  const returnFields = { projection: { uid: 1 } };

  const itemCount = countItemsInDb(client, 'users', findFields, returnFields);

  return itemCount;
};

export const findUser = {
  exists,
};
