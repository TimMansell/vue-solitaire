import { runMutation } from './helpers';

export const createUser = async (_, __, context) => {
  const result = await runMutation(context);

  return result.createUser;
};

export const wonGame = async (_, __, context) => {
  const {
    variables: { data },
  } = context;

  const document = { ...data, won: true, lost: false, completed: true };

  const db = await context.client();

  await db.collection('game').insertOne({ ...document });

  return { ...document };
};

export const lostGame = async (_, __, context) => {
  const {
    variables: { data },
  } = context;

  const document = { ...data, won: false, lost: true, completed: true };

  const db = await context.client();

  await db.collection('game').insertOne({ ...document });

  return { ...document };
};

export const completedGame = async (_, __, context) => {
  const {
    variables: { data },
  } = context;

  const document = { ...data, won: false, lost: false, completed: true };

  const db = await context.client();

  await db.collection('game').insertOne({ ...document });

  return { ...document };
};

export const newGame = async (_, __, context) => {
  const result = await runMutation(context);

  return result.newGame;
};
