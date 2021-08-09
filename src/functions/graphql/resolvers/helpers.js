import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { formatDate } from '../../../helpers/dates';
import { formatTime } from '../../../helpers/times';

export const createPlayerName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

export const insertIntoDb = async (client, collection, document) => {
  const db = await client();

  return db.collection(collection).insertOne({ ...document });
};

export const countItemsInDb = async (client, collection, params) => {
  const db = await client();

  const { findFields, returnFields } = params;

  return db
    .collection(collection)
    .find(findFields, returnFields)
    .count();
};

export const findAllItems = async (client, collection, params) => {
  const db = await client();

  const { findFields, returnFields, sortBy } = params;

  return db
    .collection(collection)
    .find(findFields, returnFields)
    .sort(sortBy)
    .toArray();
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

export const findItemInDb = async (client, collection, params) => {
  const db = await client();

  const { findFields, returnFields } = params;

  console.log({ findFields, returnFields });

  return db.collection(collection).findOne(findFields, returnFields);
};

export const findLeaderboardItems = async (client, parent, find) => {
  const findItems = findItemsInDb(client, 'games', {
    ...parent,
    findFields: { won: true },
    returnFields: {
      projection: { date: 1, uid: 1, [find]: 1 },
    },
    sortBy: { [find]: 1, date: 1 },
  });

  const findPlayers = findAllItems(client, 'users', {
    findFields: {},
    returnFields: {
      projection: { uid: 1, name: 1 },
    },
  });

  const [items, players] = await Promise.all([findItems, findPlayers]);

  const formattedItems = items.map((item, index) => {
    const { date, uid, time } = item;
    const { name } = players.find(({ uid: id }) => id === uid);

    const defaultItems = {
      ...item,
      rank: index + 1,
      date: formatDate(date),
      player: name,
    };

    if (time) {
      return {
        ...defaultItems,
        time: formatTime(time),
      };
    }

    return defaultItems;
  });

  return formattedItems;
};
