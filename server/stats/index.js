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
