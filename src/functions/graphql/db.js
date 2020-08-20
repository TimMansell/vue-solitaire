import fetch from 'node-fetch';
import ApolloClient from 'apollo-boost';
import 'dotenv/config';

const { FAUNA_URL, FAUNA_ACCESS_TOKEN } = process.env;

// eslint-disable-next-line import/prefer-default-export
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
