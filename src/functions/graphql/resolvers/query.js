import { setupQuery } from './helpers';

export const findUserByLID = (_, variables, context) => {
  const query = setupQuery('findUserByLID');
  const result = query(variables, context);

  return result;
};

export const userStats = (_, variables, context) => {
  const query = setupQuery('userStats');
  const result = query(variables, context);

  return result;
};

export const globalStats = (_, variables, context) => {
  const query = setupQuery('globalStats');
  const result = query(variables, context);

  return result;
};
