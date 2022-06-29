export const won = async (_, __, { client }) => {
  const db = await client();

  const wonQuery = await db
    .collection('games')
    .find({ won: true }, { projection: { won: 1 } });

  return wonQuery.count();
};

export const lost = async (_, __, { client }) => {
  const db = await client();

  const lostQuery = await db
    .collection('games')
    .find({ lost: true }, { projection: { lost: 1 } });

  return lostQuery.count();
};

export const completed = async (_, __, { client }) => {
  const db = await client();

  const completedQuery = await db
    .collection('games')
    .find({ completed: true }, { projection: { completed: 1 } });

  return completedQuery.count();
};

export const players = async (_, __, { client }) => {
  const db = await client();

  const playersQuery = await db
    .collection('users')
    .find({}, { projection: { uid: 1 } });

  return playersQuery.count();
};

export const globalStats = {
  won,
  lost,
  completed,
  players,
};
