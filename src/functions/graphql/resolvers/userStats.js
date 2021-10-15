import { countItemsInDb } from './helpers';

export const won = (parent, _, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, won: true },
    returnFields: { won: 1 },
  });
};

export const lost = (parent, _, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, lost: true },
    returnFields: { lost: 1 },
  });
};

export const completed = (parent, _, context) => {
  const { client } = context;

  return countItemsInDb({
    client,
    collection: 'games',
    findFields: { ...parent, completed: true },
    returnFields: { completed: 1 },
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

export const userStats = {
  won,
  lost,
  completed,
  abandoned,
};
