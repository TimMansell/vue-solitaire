import { createISODate } from './helpers';

export const createUser = async (_, __, { client, variables }) => {
  const { data } = variables;

  const db = await client();

  await db.collection('users').insertOne({ ...data });

  return { ...data };
};

export const wonGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: true, lost: false, completed: true };

  const db = await client();

  await db.collection('games').insertOne({ ...document });

  return { ...document };
};

export const lostGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: false, lost: true, completed: true };

  const db = await client();

  await db.collection('games').insertOne({ ...document });

  return { ...document };
};

export const completedGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();

  const document = { date, ...data, won: false, lost: false, completed: true };

  const db = await client();

  await db.collection('games').insertOne({ ...document });

  return { ...document };
};
