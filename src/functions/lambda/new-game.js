import fetch from 'node-fetch';
import ApolloClient, { gql } from 'apollo-boost';
import { format } from 'date-fns';
import 'dotenv/config';

const { FAUNA_ACCESS_TOKEN } = process.env;
const URL = 'https://graphql.fauna.com/graphql';

const mutation = gql`
  mutation CreateGame($data: GameInput!) {
    createGame(data: $data) {
      date
      lost
      won
      abandoned
      time
      _id
    }
  }
`;

const variables = {
  data: {
    date: format(new Date(), 'yyyy-MM-dd'),
    won: false,
    lost: false,
    abandoned: false,
    time: 0,
  },
};

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

  try {
    const body = await client.mutate({
      mutation,
      variables,
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
