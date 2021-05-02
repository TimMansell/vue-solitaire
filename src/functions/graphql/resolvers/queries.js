import { version as appVersion } from '../../../../package.json';

export const userStats = (_, { uid }) => ({ uid });

export const globalStats = () => ({});

export const findUser = (_, { uid }) => ({ uid });

export const version = () => ({ number: appVersion });

export const queries = {
  userStats,
  globalStats,
  findUser,
  version,
};
