export const createMockCount = (count) => ({
  client: () => ({
    collection: () => ({
      find: () => ({
        count: () => count,
      }),
    }),
  }),
});

export const createMockFind = (value) => ({
  client: () => ({
    collection: () => ({
      find: () => ({
        skip: () => ({
          limit: () => ({
            sort: () => ({
              toArray: () => value,
            }),
          }),
        }),
      }),
    }),
  }),
});

export const createMockInsertOne = (value) => ({
  client: () => ({
    collection: () => ({
      insertOne: () => value,
    }),
  }),
});
