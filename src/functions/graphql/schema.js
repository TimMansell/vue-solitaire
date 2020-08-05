import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    totalGames: totalGames!
  }
  type totalGames {
    count: Int
  }
`;
