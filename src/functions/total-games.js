import fetch from 'node-fetch';
import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';

const { FAUNA_ACCESS_TOKEN } = process.env;
const URL = 'https://graphql.fauna.com/graphql';

const query = gql`
  query {
    totalGames {
      count
    }
  }
`;

const client = new ApolloClient({
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

// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function handler() {
  try {
    const body = await client.query({ query });

    console.log({ body });

    return {
      statusCode: 200,
      body: `${JSON.stringify(body)}`,
    };
  } catch (error) {
    console.log({ error });
  }
}
