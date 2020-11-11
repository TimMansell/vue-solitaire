import { ApolloError } from 'apollo-server-lambda';

export const setupQuery = (id) => async (variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.query({
      query,
      variables,
      fetchPolicy: 'no-cache',
    });

    return body.data[id];
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const setupMutation = (id) => async (variables, context) => {
  const { client, query } = context;

  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data[id];
  } catch (error) {
    throw new ApolloError(error);
  }
};
