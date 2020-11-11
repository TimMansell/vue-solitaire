import { setupMutation } from './helpers';

export const createUser = (_, variables, context) => {
  const mutation = setupMutation('createUser');
  const result = mutation(variables, context);

  return result;
};

export const wonGame = (_, variables, context) => {
  const mutation = setupMutation('wonGame');
  const result = mutation(variables, context);

  return result;
};

export const lostGame = (_, variables, context) => {
  const mutation = setupMutation('lostGame');
  const result = mutation(variables, context);

  return result;
};

export const completedGame = (_, variables, context) => {
  const mutation = setupMutation('completedGame');
  const result = mutation(variables, context);

  return result;
};

export const newGame = (_, variables, context) => {
  const mutation = setupMutation('newGame');
  const result = mutation(variables, context);

  return result;
};
