export const userStats = (_, { uid }) => ({ uid });

export const globalStats = () => ({});

export const user = (_, { uid }) => ({ uid });

export const leaderboards = (_, { offset, limit }) => ({ offset, limit });

export const queries = {
  userStats,
  globalStats,
  user,
  leaderboards,
};
