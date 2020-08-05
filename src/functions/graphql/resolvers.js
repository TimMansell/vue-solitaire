// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    totalGames: async (obj, args, context) => {
      const { client, formatQuery } = context;

      const query = formatQuery(`
        query {
          totalGames {
            count
          }
        }
      `);

      const body = await client.query({ query });

      return body.data.totalGames;
    },
  },
};
