import { gql } from 'apollo-boost';
import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const mutations = {
  newGame: async (obj, args, context) => {
    const { client } = context;

    const mutation = gql`
      mutation {
        newGame {
          _id
          gameNumber
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

    const { newGame } = body.data;
    const { _id: id } = newGame;

    return {
      ...newGame,
      id,
    };
  },
  updateGame: async (obj, args, context) => {
    const { client } = context;

    const mutation = gql`
      mutation UpdateAGame($id: ID!, $data: GameInput!) {
        updateGame(id: $id, data: $data) {
          _id
          date
          lost
          won
          completed
          time
          moves
          gameNumber
        }
      }
    `;

    const body = await client.mutate({
      mutation,
      variables: args,
    });

    const { updateGame } = body.data;
    const { _id: id } = updateGame;

    return {
      ...updateGame,
      id,
    };
  },
};
