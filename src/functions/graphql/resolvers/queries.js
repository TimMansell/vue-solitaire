// eslint-disable-next-line import/prefer-default-export
export const queries = {
  userStats: (_, { uid }) => ({ uid }),
  globalStats: () => ({}),
  findUser: (_, { uid }) => ({ uid }),
};
