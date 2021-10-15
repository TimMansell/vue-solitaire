import { countItemsInDb } from './helpers';

export const won = (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { won: true },
    returnFields: { won: 1 },
  });
};

export const lost = (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { lost: true },
    returnFields: { lost: 1 },
  });
};

export const completed = (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { completed: true },
    returnFields: { completed: 1 },
  });
};

export const players = (_, __, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'users',
    findFields: {},
    returnFields: { uid: 1 },
  });
};

export const abandoned = async (parent, _, context) => {
  const { client } = context;

  const getCompleted = countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, completed: true },
    returnFields: { completed: 1 },
  });

  const getWon = countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, won: true },
    returnFields: { completed: 1 },
  });

  const getLost = countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, lost: true },
    returnFields: { completed: 1 },
  });

  const [completedGames, wonGames, lostGames] = await Promise.all([
    getCompleted,
    getWon,
    getLost,
  ]);

  const abandonedGames = completedGames - wonGames - lostGames;

  return abandonedGames;
};

export const globalStats = {
  won,
  lost,
  completed,
  abandoned,
  players,
};
