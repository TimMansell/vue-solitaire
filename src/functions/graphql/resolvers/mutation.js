import { gql } from 'apollo-boost';
import { ApolloError } from 'apollo-server-lambda';
import { formatVariables } from './helpers';

export const createUser = async (obj, variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data.createUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const wonGame = async (obj, args, context) => {
  const { client } = context;

  const variables = formatVariables(args, {
    won: true,
    lost: false,
    completed: true,
  });

  const mutation = gql`
    mutation UpdateGame($id: ID!, $data: GameInput!) {
      updateGame(id: $id, data: $data) {
        _id
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

export const lostGame = async (obj, args, context) => {
  const { client } = context;

  const variables = formatVariables(args, {
    won: false,
    lost: true,
    completed: true,
  });

  const mutation = gql`
    mutation UpdateGame($id: ID!, $data: GameInput!) {
      updateGame(id: $id, data: $data) {
        _id
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

export const completedGame = async (obj, args, context) => {
  const { client } = context;

  const variables = formatVariables(args, {
    won: false,
    lost: false,
    completed: true,
  });

  const mutation = gql`
    mutation UpdateGame($id: ID!, $data: GameInput!) {
      updateGame(id: $id, data: $data) {
        _id
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

export const newGame = async (obj, variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data.newGame;
  } catch (error) {
    throw new ApolloError(error);
  }
};
