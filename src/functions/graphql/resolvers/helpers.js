import { ApolloError } from 'apollo-server-lambda';

export const runQuery = async ({ client, query, variables }) => {
  try {
    const body = await client.query({
      query,
      variables,
      fetchPolicy: 'no-cache',
    });

    return body.data;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const runMutation = async ({ client, query, variables }) => {
  try {
    const body = await client.mutate({
      mutation: query,
      variables,
    });

    return body.data;
  } catch (error) {
    throw new ApolloError(error);
  }
};
