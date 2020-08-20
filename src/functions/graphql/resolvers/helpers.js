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

export const getUserQuery = async (client, variables) => {
  const query = gql`
    query FindAUserByLID($uid: String!) {
      findUserByLID(uid: $uid) {
        uid
      }
    }
  `;

  try {
    const body = await client.query({ query, variables, fetchPolicy: 'no-cache' });

    return body.data.findUserByLID;
  } catch (error) {
    throw new ApolloError(error);
  }
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
    throw new ApolloError(error);
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
    throw new ApolloError(error);
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
    throw new ApolloError(error);
  }
};
