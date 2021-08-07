import { parseISO, isValid, format } from 'date-fns';

export const createISODate = () => new Date().toISOString();

export const parseAndValidDate = (date) => isValid(parseISO(date));

export const insertIntoDb = async (client, collection, document) => {
  const db = await client();

  return db.collection(collection).insertOne({ ...document });
};

export const countItemsInDb = async (
  client,
  collection,
  findFields,
  returnFields
) => {
  const db = await client();

  return db
    .collection(collection)
    .find(findFields, returnFields)
    .count();
};

export const findItemsInDb = async (client, collection, params) => {
  const db = await client();

  const { offset, limit, findFields, returnFields, sortBy } = params;

  return db
    .collection(collection)
    .find(findFields, returnFields)
    .skip(offset)
    .limit(limit)
    .sort(sortBy)
    .toArray();
};

export const formatLeaderboardItems = (items) => {
  const formattedItems = items.map((item, index) => {
    const { date } = item;

    return {
      ...item,
      rank: index + 1,
      date: format(parseISO(date), 'dd-MM-yyyy'),
    };
  });

  return formattedItems;
};
