import { ApolloError } from 'apollo-server-lambda';

export const findUserByLID = async (obj, args, context) => {
  const { client, query } = context;
  const { uid } = args;

  const variables = {
    uid,
  };

  try {
    const body = await client.query({ query, variables, fetchPolicy: 'no-cache' });

    return body.data.findUserByLID;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const userStats = async (obj, args, context) => {
  const { client, query } = context;
  const { uid } = args;

  const variables = {
    uid,
  };

  try {
    const body = await client.query({ query, variables, fetchPolicy: 'no-cache' });

    return body.data.userStats;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const globalStats = async (obj, args, context) => {
  const { client, query } = context;

  const variables = {};

  try {
    const body = await client.query({ query, variables, fetchPolicy: 'no-cache' });

    return body.data.globalStats;
  } catch (error) {
    throw new ApolloError(error);
  }
};
