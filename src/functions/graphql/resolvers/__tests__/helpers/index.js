// eslint-disable-next-line import/prefer-default-export
export const createMockContext = (count) => ({
  client: () => ({
    collection: () => ({
      find: () => ({
        count: () => count,
      }),
    }),
  }),
});
