export const won = async ({ uid }, __, { client }) => {
  const db = await client();

  const wonQuery = await db
    .collection('game')
    .find({ uid, won: true }, { projection: { won: 1 } });

  return wonQuery.count();
};

export const lost = async ({ uid }, __, { client }) => {
  const db = await client();

  const lostQuery = await db
    .collection('game')
    .find({ uid, lost: true }, { projection: { lost: 1 } });

  return lostQuery.count();
};

export const completed = async ({ uid }, __, { client }) => {
  const db = await client();

  const completedQuery = await db
    .collection('game')
    .find({ uid, completed: true }, { projection: { completed: 1 } });

  return completedQuery.count();
};

export const userStats = {
  won,
  lost,
  completed,
};
