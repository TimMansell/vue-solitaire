import { runQuery } from './helpers';

export const findUserByLID = async (_, variables, context) => {
  const result = await runQuery(variables, context);

  return result.findUserByLID;
};

export const userStats = async (_, variables, context) => {
  const result = await runQuery(variables, context);

  return result.userStats;
};

export const globalStats = async (_, variables, context) => {
  const result = await runQuery(variables, context);

  return result.globalStats;
};
