import fetch from 'node-fetch';
import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';

const { FAUNA_ACCESS_TOKEN } = process.env;
const URL = 'https://graphql.fauna.com/graphql';

const mutation = gql`
  mutation UpdateAGame($id: ID!, $data: GameInput!) {
    updateGame(id: $id, data: $data) {
      date
      lost
      won
      abandoned
      time
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
export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 500,
      body: 'restricted',
    };
  }

  const { id, data } = event.queryStringParameters;

  try {
    const body = await client.mutate({
      mutation,
      variables: {
        id,
        data: JSON.parse(data),
      },
    });

    return {
      statusCode: 200,
      body: `${JSON.stringify(body)}`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `${JSON.stringify(error)}`,
    };
  }
}
