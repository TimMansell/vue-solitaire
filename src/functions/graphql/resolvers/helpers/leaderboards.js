import { formatTime } from './times';
import { formatDate } from './dates';
import { findItemsInDb, findAllItems } from './db';

export const formatLeaderboardGames = (games, players, sortBy) =>
  games.map((item, index) => {
    const { uid, date, time, moves } = item;

    const player = players.find(({ uid: id }) => id === uid);

    const defaultItems = {
      rank: index + 1,
      date: formatDate(date),
      player: player.name,
    };

    if (sortBy === 'moves') {
      return {
        ...defaultItems,
        moves,
      };
    }

    if (sortBy === 'time') {
      return {
        ...defaultItems,
        time: formatTime(time),
      };
    }

    return defaultItems;
  });

// eslint-disable-next-line import/prefer-default-export
export const findLeaderboardItems = async ({ context, parent, find }) => {
  const { client } = context;

  const games = await findItemsInDb({
    client,
    collection: 'games',
    findFields: { won: true },
    returnFields: { date: 1, uid: 1, [find]: 1 },
    sortBy: { [find]: 1, date: 1 },
    ...parent,
  });

  const uids = [...new Set(games.map(({ uid }) => uid))];

  const players = await findAllItems({
    client,
    collection: 'users',
    findFields: { uid: { $in: uids } },
    returnFields: { uid: 1, name: 1 },
  });

  const formattedGames = formatLeaderboardGames(games, players, find);

  return formattedGames;
};
