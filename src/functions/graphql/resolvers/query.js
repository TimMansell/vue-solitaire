// eslint-disable-next-line import/prefer-default-export
export const queries = {
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

    const { totalGames } = body.data;

    return totalGames;
  },
};
