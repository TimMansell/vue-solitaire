import { formatDate } from '../../../helpers/dates';
import { formatTime } from '../../../helpers/times';

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
      date: formatDate(date),
    };
  });

  return formattedItems;
};

export const formatLeaderboardTimes = (items) => {
  const formattedItems = items.map((item) => {
    const { time } = item;

    return {
      ...item,
      time: formatTime(time),
    };
  });

  return formattedItems;
};
