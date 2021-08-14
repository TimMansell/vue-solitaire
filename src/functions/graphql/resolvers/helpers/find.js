import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { formatDate } from '../../../../helpers/dates';
import { formatTime } from '../../../../helpers/times';
import { findItemsInDb, findAllItems } from './db';

export const createPlayerName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

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
    const { uid, ...fields } = item;
    const { date, time } = fields;

    const player = players.find(({ uid: id }) => id === uid);

    const defaultItems = {
      ...fields,
      rank: index + 1,
      date: formatDate(date),
      player: player?.name,
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
