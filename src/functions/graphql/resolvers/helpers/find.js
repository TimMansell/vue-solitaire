import { formatDate } from '../../../../helpers/dates';
import { formatTime, formatTimeFromDate } from '../../../../helpers/times';
import { formatNumber } from '../../../../helpers/numbers';
import { findItemsInDb, findAllItems, countItemsInDb } from './db';

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

export const findHistoryItems = async (client, collection, params) => {
  const { offset } = params;

  const findGames = findItemsInDb(client, collection, params);
  const findGamesPlayed = countItemsInDb(client, collection, params);

  const [games, gamesPlayed] = await Promise.all([findGames, findGamesPlayed]);

  const gameOutcome = ({ won, lost }) => {
    if (won) {
      return 'Won';
    }

    if (lost) {
      return 'Lost';
    }

    return 'Gave Up';
  };

  const formattedItems = games.map(
    ({ date, won, lost, time, moves }, index) => ({
      number: formatNumber(gamesPlayed - offset - index),
      date: formatDate(date),
      time: formatTimeFromDate(date),
      outcome: gameOutcome({ won, lost }),
      moves,
      duration: formatTime(time),
    })
  );

  return formattedItems;
};
