export const createMockCount = (count) => ({
  client: () => ({
    collection: () => ({
      find: () => ({
        count: () => count,
      }),
    }),
  }),
});

export const createMockFind = (value1, value2) => ({
  client: () => ({
    collection: () => ({
      find: () => ({
        skip: () => ({
          limit: () => ({
            sort: () => ({
              toArray: () => value1,
            }),
          }),
        }),
        sort: () => ({
          toArray: () => value2,
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
