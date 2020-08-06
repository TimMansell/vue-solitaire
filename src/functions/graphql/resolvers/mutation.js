import { gql } from 'apollo-boost';
import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const mutations = {
  createGame: async (obj, args, context) => {
    const { client } = context;

    const mutation = gql`
      mutation CreateGame($data: GameInput!) {
        createGame(data: $data) {
          _id
          date
          won
          lost
          completed
          time
          moves
        }
      }
    `;

    const variables = {
      data: {
        date: format(new Date(), 'yyyy-MM-dd'),
        won: false,
        lost: false,
        completed: false,
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
    const { client } = context;

    const mutation = gql`
      mutation UpdateAGame($id: ID!, $data: GameInput!) {
        updateGame(id: $id, data: $data) {
          date
          lost
          won
          completed
          time
          moves
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
};
