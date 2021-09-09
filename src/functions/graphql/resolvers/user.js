import {
  findItemInDb,
  findItemsInDb,
  countItemsInDb,
  formatHistoryGames,
} from './helpers';

export const exists = async (parent, __, context) => {
  const { client } = context;

  const user = await findItemInDb({
    client,
    collection: 'users',
    findFields: { ...parent },
    returnFields: { uid: 1 },
  });

  return user !== null;
};

export const history = async (parent, args, context) => {
  const { client } = context;
  const { offset } = args;

  const findGames = findItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent },
    returnFields: { date: 1, won: 1, lost: 1, moves: 1, time: 1 },
    sortBy: { date: -1 },
    ...args,
  });

  const findGamesPlayed = countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent },
    returnFields: { date: 1, won: 1, lost: 1, moves: 1, time: 1 },
    sortBy: { date: -1 },
    ...args,
  });

  const [games, gamesPlayed] = await Promise.all([findGames, findGamesPlayed]);

  const formattedGames = formatHistoryGames(games, offset, gamesPlayed);

  return formattedGames;
};

export const name = async (parent, _, context) => {
  const { client } = context;

  const user = await findItemInDb({
    client,
    collection: 'users',
    findFields: { ...parent },
    returnFields: { name: 1 },
  });

  return user?.name;
};

export const user = {
  exists,
  history,
  name,
};
