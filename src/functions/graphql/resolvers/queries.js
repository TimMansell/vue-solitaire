import { version as serverVersion } from '../../../../package.json';

export const userStats = (_, { uid }) => ({ uid });

export const globalStats = () => ({});

export const version = (_, { localVersion }) => ({
  number: serverVersion,
  matches: localVersion === serverVersion,
});

export const user = (_, { uid }) => ({ uid });

export const leaderboards = (_, { offset, limit }) => ({ offset, limit });

export const queries = {
  userStats,
  globalStats,
  version,
  user,
  leaderboards,
};
