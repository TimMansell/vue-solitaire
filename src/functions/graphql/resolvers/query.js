export const userStats = async (_, __, context) => {
  const {
    variables: { uid },
  } = context;

  const db = await context.client();

  const won = await db
    .collection('game')
    .find({ uid, won: true }, { projection: { won: 1 } });

  const lost = await db
    .collection('game')
    .find({ uid, lost: true }, { projection: { lost: 1 } });

  const completed = await db
    .collection('game')
    .find({ uid, completed: true }, { projection: { completed: 1 } });

  return {
    won: won.count(),
    lost: lost.count(),
    completed: completed.count(),
  };
};

export const globalStats = async (_, __, context) => {
  const db = await context.client();

  const won = await db
    .collection('game')
    .find({ won: true }, { projection: { won: 1 } });

  const lost = await db
    .collection('game')
    .find({ lost: true }, { projection: { lost: 1 } });

  const completed = await db
    .collection('game')
    .find({ completed: true }, { projection: { completed: 1 } });

  return {
    won: won.count(),
    lost: lost.count(),
    completed: completed.count(),
    players: 8,
  };
};
