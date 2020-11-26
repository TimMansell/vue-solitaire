import { runQuery } from './helpers';

export const findUserByLID = async (_, __, context) => {
  const result = await runQuery(context);

  return result.findUserByLID;
};

export const userStats = async (_, __, context) => {
  const result = await runQuery(context);

  return result.userStats;
};

export const globalStats = async (_, __, context) => {
  const result = await runQuery(context);

  return result.globalStats;
};
