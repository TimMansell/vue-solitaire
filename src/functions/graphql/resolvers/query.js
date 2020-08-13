import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const queries = {
  getUser: async (obj, args, context) => {
    const { client } = context;
    const { uid } = args;

    const query = gql`
      query FindAUserByLID($uid: String!) {
        findUserByLID(uid: $uid) {
          uid
        }
      }
    `;

    const variables = {
      uid,
    };

    const body = await client.query({ query, variables });

    const { findUserByLID } = body.data;

    return findUserByLID;
  },

  totalGames: async (obj, args, context) => {
    const { client } = context;

    const query = gql`
      query {
        totalGames {
          count
        }
      }
    `;

    const body = await client.query({ query });

    const { totalGames } = body.data;

    return totalGames;
  },
};
