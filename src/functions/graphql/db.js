import fetch from 'node-fetch';
import ApolloClient, { gql } from 'apollo-boost';

const { FAUNA_ACCESS_TOKEN } = process.env;
const URL = 'https://graphql.fauna.com/graphql';

export const client = new ApolloClient({
  uri: URL,
  fetch,
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${FAUNA_ACCESS_TOKEN}`,
      },
    });
  },
});

export const formatQuery = (query) => gql`
  ${query}
`;
