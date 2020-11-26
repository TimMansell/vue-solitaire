import { runMutation } from './helpers';

export const createUser = async (_, __, context) => {
  const result = await runMutation(context);

  return result.createUser;
};

export const wonGame = async (_, __, context) => {
  const result = await runMutation(context);

  return result.wonGame;
};

export const lostGame = async (_, __, context) => {
  const result = await runMutation(context);

  return result.lostGame;
};

export const completedGame = async (_, __, context) => {
  const result = await runMutation(context);

  return result.completedGame;
};

export const newGame = async (_, __, context) => {
  const result = await runMutation(context);

  return result.newGame;
};
