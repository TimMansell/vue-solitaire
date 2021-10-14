import { findItemsInDb, findAllItems } from './db';
import { formatLeaderboardGames } from '../../../../services/stats';

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
