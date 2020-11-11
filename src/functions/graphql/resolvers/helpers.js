import { gql } from 'apollo-boost';
import { ApolloError } from 'apollo-server-lambda';

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
    mutation UpdateGame($id: ID!, $data: GameInput!) {
      updateGame(id: $id, data: $data) {
        _id
        gameNumber
      }
    }
  `;

  try {
    const body = await client.mutate({
      mutation,
      variables,
    });

    return body.data.updateGame;
  } catch (error) {
    throw new ApolloError(error);
  }
};
