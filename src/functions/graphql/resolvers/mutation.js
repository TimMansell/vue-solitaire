import { gql } from 'apollo-boost';
import { format } from 'date-fns';
import { formatVariables } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const mutations = {
  newGame: async (obj, args, context) => {
    const { client } = context;

    const mutation = gql`
      mutation NewGame($date: String!) {
        newGame(date: $date) {
          _id
          gameNumber
        }
      }
    `;

    const variables = {
      date: format(new Date(), 'yyyy-MM-dd'),
    };

    const body = await client.mutate({
      mutation,
      variables,
    });

    return body.data.newGame;
  },
  wonGame: async (obj, args, context) => {
    const { client } = context;

    const variables = formatVariables(args, {
      won: true,
      lost: false,
      completed: true,
    });

    const mutation = gql`
      mutation UpdateAGame($id: ID!, $data: GameInput!) {
        updateGame(id: $id, data: $data) {
          _id
          gameNumber
        }
      }
    `;

    const body = await client.mutate({
      mutation,
      variables,
    });

    return body.data.updateGame;
  },
  lostGame: async (obj, args, context) => {
    const { client } = context;

    const variables = formatVariables(args, {
      won: false,
      lost: true,
      completed: true,
    });

    const mutation = gql`
      mutation UpdateAGame($id: ID!, $data: GameInput!) {
        updateGame(id: $id, data: $data) {
          _id
          gameNumber
        }
      }
    `;

    const body = await client.mutate({
      mutation,
      variables,
    });

    return body.data.updateGame;
  },
  completedGame: async (obj, args, context) => {
    const { client } = context;

    const variables = formatVariables(args, {
      won: false,
      lost: false,
      completed: true,
    });

    const mutation = gql`
      mutation UpdateAGame($id: ID!, $data: GameInput!) {
        updateGame(id: $id, data: $data) {
          _id
          gameNumber
        }
      }
    `;

    const body = await client.mutate({
      mutation,
      variables,
    });

    return body.data.updateGame;
  },
};
