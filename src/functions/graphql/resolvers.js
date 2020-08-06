import { format } from 'date-fns';

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

      const { totalGames } = body.data;

      return totalGames;
    },
  },
  Mutation: {
    createGame: async (obj, args, context) => {
      const { client, formatQuery } = context;

      const mutation = formatQuery(`
        mutation CreateGame($data: GameInput!) {
          createGame(data: $data) {
            _id
            date
            won
            lost
            abandoned
            time
          }
        }
      `);

      const variables = {
        data: {
          date: format(new Date(), 'yyyy-MM-dd'),
          won: false,
          lost: false,
          abandoned: false,
          time: 0,
        },
      };

      const body = await client.mutate({
        mutation,
        variables,
      });

      const { createGame } = body.data;
      const { _id: id } = createGame;

      return {
        ...createGame,
        id,
      };
    },
    updateGame: async (obj, args, context) => {
      const { client, formatQuery } = context;

      const mutation = formatQuery`
        mutation UpdateAGame($id: ID!, $data: GameInput!) {
          updateGame(id: $id, data: $data) {
            date
            lost
            won
            abandoned
            time
          }
        }
      `;

      const body = await client.mutate({
        mutation,
        variables: args,
      });

      const { updateGame } = body.data;

      return {
        ...updateGame,
      };
    },
  },
};
