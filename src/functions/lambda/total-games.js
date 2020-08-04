import { formatQuery, client } from '../apollo';

const query = formatQuery(`
  query {
    totalGames {
      count
    }
  }
`);

// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function handler() {
  try {
    const body = await client.query({ query });

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
