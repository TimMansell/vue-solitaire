export const getUserCounts = async (db, uid) => {
  const userCompleted = await db
    .collection('games')
    .find({ uid, completed: true }, { projection: { completed: 1 } })
    .count();

  return { userCompleted };
};

export const getGlobalCounts = async (db) => {
  const getGlobalCompleted = db
    .collection('games')
    .find({ completed: true }, { projection: { completed: 1 } })
    .count();

  const getPlayers = db
    .collection('users')
    .find({}, { projection: {} })
    .count();

  const [globalCompleted, players] = await Promise.all([
    getGlobalCompleted,
    getPlayers,
  ]);

  return { globalCompleted, players };
};
