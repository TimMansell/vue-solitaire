import { formatQuery, client } from '../apollo';

const mutation = formatQuery`
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
