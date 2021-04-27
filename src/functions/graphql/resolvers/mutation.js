export const createUser = async (_, __, { client, variables }) => {
  const { data } = variables;

  const db = await client();

  await db.collection('users').insertOne({ ...data });

  return { ...data };
};

export const wonGame = async (_, __, { client, variables }) => {
  const { data } = variables;

  const document = { ...data, won: true, lost: false, completed: true };

  const db = await client();

  await db.collection('game').insertOne({ ...document });

  return { ...document };
};

export const lostGame = async (_, __, { client, variables }) => {
  const { data } = variables;

  const document = { ...data, won: false, lost: true, completed: true };

  const db = await client();

  await db.collection('game').insertOne({ ...document });

  return { ...document };
};

export const completedGame = async (_, __, { client, variables }) => {
  const { data } = variables;

  const document = { ...data, won: false, lost: false, completed: true };

  const db = await client();

  await db.collection('game').insertOne({ ...document });

  return { ...document };
};
