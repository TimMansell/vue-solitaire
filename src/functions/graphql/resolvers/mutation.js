import { setupMutation } from './helpers';

export const createUser = (obj, variables, context) => {
  const mutation = setupMutation('createUser');
  const result = mutation(variables, context);

  return result;
};

export const wonGame = (obj, variables, context) => {
  const mutation = setupMutation('wonGame');
  const result = mutation(variables, context);

  return result;
};

export const lostGame = (obj, variables, context) => {
  const mutation = setupMutation('lostGame');
  const result = mutation(variables, context);

  return result;
};

export const completedGame = (obj, variables, context) => {
  const mutation = setupMutation('completedGame');
  const result = mutation(variables, context);

  return result;
};

export const newGame = (obj, variables, context) => {
  const mutation = setupMutation('newGame');
  const result = mutation(variables, context);

  return result;
};
