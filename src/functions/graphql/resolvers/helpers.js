import { gql } from 'apollo-boost';

export const formatVariables = (args, params) => {
  const { id, data } = args;

  const variables = {
    id,
    data: {
      ...data,
      ...params,
    },
  };

  return variables;
};

export const updateGameMutation = async (client, variables) => {
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
};

export const newGameMutation = async (client, variables) => {
  const mutation = gql`
    mutation NewGame($date: String!) {
      newGame(date: $date) {
        _id
        gameNumber
      }
    }
  `;

  const body = await client.mutate({
    mutation,
    variables,
  });

  return body.data.newGame;
};
