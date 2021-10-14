import { getLeaderboadSortBy, formatLeaderboardGames } from '@/services/stats';

export const getUserCounts = async (db, uid) => {
  const completed = await db
    .collection('games')
    .find({ uid, completed: true }, { projection: { completed: 1 } })
    .count();

  return { completed };
};

export const getGlobalCounts = async (db) => {
  const getCompleted = db
    .collection('games')
    .find({ completed: true }, { projection: { completed: 1 } })
    .count();

  const getPlayers = db
    .collection('users')
    .find({}, { projection: {} })
    .count();

  const [completed, players] = await Promise.all([getCompleted, getPlayers]);

  return { completed, players };
};

export const getPlayerStats = async (db, uid) => {
  const getCompleted = db
    .collection('games')
    .find({ uid, completed: true }, { projection: { completed: 1 } })
    .count();

  const getWon = db
    .collection('games')
    .find({ uid, won: true }, { projection: { won: 1 } })
    .count();

  const getLost = db
    .collection('games')
    .find({ uid, lost: true }, { projection: { lost: 1 } })
    .count();

  const [completed, won, lost] = await Promise.all([
    getCompleted,
    getWon,
    getLost,
  ]);

  return { completed, won, lost };
};

export const getGlobalStats = async (db) => {
  const getCompleted = db
    .collection('games')
    .find({ completed: true }, { projection: { completed: 1 } })
    .count();

  const getWon = db
    .collection('games')
    .find({ won: true }, { projection: { won: 1 } })
    .count();

  const getLost = db
    .collection('games')
    .find({ lost: true }, { projection: { lost: 1 } })
    .count();

  const [completed, won, lost] = await Promise.all([
    getCompleted,
    getWon,
    getLost,
  ]);

  return { completed, won, lost };
};

export const getLeaderboards = async (db, showBest, limit) => {
  const sortBy = getLeaderboadSortBy(showBest);

  console.log({ sortBy, showBest });

  const games = await db
    .collection('games')
    .find(
      { won: true },
      { projection: { _id: 0, date: 1, uid: 1, time: 1, moves: 1 } }
    )
    .limit(limit)
    .sort({ [sortBy]: 1, date: 1 })
    .toArray();

  const uids = [...new Set(games.map(({ uid }) => uid))];

  const players = await db
    .collection('users')
    .find({ uid: { $in: uids } }, { projection: { _id: 0, uid: 1, name: 1 } })
    .toArray();

  const formattedGames = formatLeaderboardGames(games, players, sortBy);

  return formattedGames;
};
