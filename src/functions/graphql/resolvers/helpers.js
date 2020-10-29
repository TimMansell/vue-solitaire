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

export const getUserStatsQuery = async (client, variables) => {
  const query = gql`
    query GetUserStats($uid: String!) {
      userStats(uid: $uid) {
        count
        won
        lost
      }
    }
  `;

  try {
    const body = await client.query({ query, variables, fetchPolicy: 'no-cache' });

    return body.data.userStats;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const globalStatsQuery = async (client) => {
  const query = gql`
    query {
      globalStats {
        count
      }
    }
  `;

  const variables = {};

  try {
    const body = await client.query({ query, variables, fetchPolicy: 'no-cache' });

    return body.data.globalStats;
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
