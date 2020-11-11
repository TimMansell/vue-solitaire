import { ApolloError } from 'apollo-server-lambda';

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

export const wonGame = async (obj, variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data.wonGame;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const lostGame = async (obj, variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data.lostGame;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const completedGame = async (obj, variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data.completedGame;
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
