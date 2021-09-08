import { formatLeaderboardGames, formatHistoryGames } from './find/find';
import { findItemsInDb, findAllItems, countItemsInDb } from './db';

export const findLeaderboardItems = async (client, parent, find) => {
  const games = await findItemsInDb(client, 'games', {
    ...parent,
    findFields: { won: true },
    returnFields: {
      projection: { date: 1, uid: 1, [find]: 1 },
    },
    sortBy: { [find]: 1, date: 1 },
  });

  const uids = [...new Set(games.map(({ uid }) => uid))];

  const players = await findAllItems(client, 'users', {
    findFields: { uid: { $in: uids } },
    returnFields: {
      projection: { uid: 1, name: 1 },
    },
  });

  const formattedGames = formatLeaderboardGames(games, players);

  return formattedGames;
};

export const findHistoryItems = async (client, collection, params) => {
  const { offset } = params;

  const findGames = findItemsInDb(client, collection, params);
  const findGamesPlayed = countItemsInDb(client, collection, params);

  const [games, gamesPlayed] = await Promise.all([findGames, findGamesPlayed]);

  const formattedGames = formatHistoryGames(games, offset, gamesPlayed);

  return formattedGames;
};
