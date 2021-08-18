import { formatLeaderboardGames, formatHistoryGames } from './find/find';
import { findItemsInDb, findAllItems, countItemsInDb } from './db';

export const findLeaderboardItems = async (client, parent, find) => {
  const findGames = findItemsInDb(client, 'games', {
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

  const [games, players] = await Promise.all([findGames, findPlayers]);

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
