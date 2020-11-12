import { runMutation } from './helpers';

export const createUser = async (_, variables, context) => {
  const result = await runMutation(variables, context);

  return result.createUser;
};

export const wonGame = async (_, variables, context) => {
  const result = await runMutation(variables, context);

  return result.wonGame;
};

export const lostGame = async (_, variables, context) => {
  const result = await runMutation(variables, context);

  return result.lostGame;
};

export const completedGame = async (_, variables, context) => {
  const result = await runMutation(variables, context);

  return result.completedGame;
};

export const newGame = async (_, variables, context) => {
  const result = await runMutation(variables, context);

  return result.newGame;
};
