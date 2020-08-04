import { format } from 'date-fns';
import { formatQuery, client } from '../apollo';

const mutation = formatQuery`
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
