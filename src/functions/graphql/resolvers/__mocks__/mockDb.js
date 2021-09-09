export const wrapClient = (content) => ({
  client: () => ({
    collection: () => ({
      ...content,
    }),
  }),
});

export const createMockFind = (content) => ({
  find: () => ({
    ...content,
  }),
});

export const createMockCount = (count) => ({
  count: () => count,
});

export const createMockSort = (value) => ({
  sort: () => ({
    toArray: () => value,
  }),
});

export const createMockFiltered = (value) => ({
  skip: () => ({
    limit: () => ({
      sort: () => ({
        toArray: () => value,
      }),
    }),
  }),
});

export const createMockFindOne = (value) => ({
  findOne: () => value,
});

export const createMockInsertOne = (value) => ({
  insertOne: () => value,
});

export const createMockDeleteOne = (value) => ({
  findOneAndDelete: () => value,
});
