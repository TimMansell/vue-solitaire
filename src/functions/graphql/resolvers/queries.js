export const userStats = (_, { uid }) => ({ uid });

export const globalStats = () => ({});

export const findUser = (_, { uid }) => ({ uid });

export const queries = {
  userStats: (_, { uid }) => ({ uid }),
  globalStats: () => ({}),
  findUser: (_, { uid }) => ({ uid }),
};
