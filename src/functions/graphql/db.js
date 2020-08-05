import fetch from 'node-fetch';
import ApolloClient, { gql } from 'apollo-boost';

const { FAUNA_URL, FAUNA_ACCESS_TOKEN } = process.env;

export const client = new ApolloClient({
  uri: FAUNA_URL,
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
