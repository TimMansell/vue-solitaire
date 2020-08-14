import { gql } from 'apollo-boost';
import { AuthenticationError } from 'apollo-server-lambda';

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

export const createUserMutation = async (client, variables) => {
  const mutation = gql`
    mutation CreateAUser($data: UserInput!) {
      createUser(data: $data) {
        _id
      }
    }
  `;

  try {
    const body = await client.mutate({
      mutation,
      variables,
    });

    return body.data.createUser;
  } catch (error) {
    throw new AuthenticationError(error);
  }
};

export const updateGameMutation = async (client, variables) => {
  const mutation = gql`
    mutation UpdateGameStatus($id: ID!, $data: GameInput!) {
      updateGameStatus(id: $id, data: $data) {
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

    return body.data.updateGameStatus;
  } catch (error) {
    throw new AuthenticationError(error);
  }
};

export const newGameMutation = async (client, variables) => {
  const mutation = gql`
    mutation NewGame($uid: String!) {
      newGame(uid: $uid) {
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

    return body.data.newGame;
  } catch (error) {
    throw new AuthenticationError(error);
  }
};
