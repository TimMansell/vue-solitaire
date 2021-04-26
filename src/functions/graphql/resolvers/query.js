export const userStats = async (_, __, context) => {
  const {
    variables: { uid },
  } = context;

  const db = await context.client();

  const wonQuery = db
    .collection('game')
    .find({ uid, won: true }, { projection: { won: 1 } });

  const lostQuery = db
    .collection('game')
    .find({ uid, lost: true }, { projection: { lost: 1 } });

  const completedQuery = db
    .collection('game')
    .find({ uid, completed: true }, { projection: { completed: 1 } });

  const result = await Promise.all([wonQuery, lostQuery, completedQuery]).then(
    (values) => values
  );

  const [won, lost, completed] = result;

  return {
    won: won.count(),
    lost: lost.count(),
    completed: completed.count(),
  };
};

export const globalStats = async (_, __, context) => {
  const db = await context.client();

  const wonQuery = db
    .collection('game')
    .find({ won: true }, { projection: { won: 1 } });

  const lostQuery = db
    .collection('game')
    .find({ lost: true }, { projection: { lost: 1 } });

  const completedQuery = db
    .collection('game')
    .find({ completed: true }, { projection: { completed: 1 } });

  const result = await Promise.all([wonQuery, lostQuery, completedQuery]).then(
    (values) => values
  );

  const [won, lost, completed] = result;

  return {
    won: won.count(),
    lost: lost.count(),
    completed: completed.count(),
    players: 8,
  };
};
