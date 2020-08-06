import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    totalGames: totalGames!
  }
  type Mutation {
    createGame: Game!
    updateGame(id: ID!, data: GameInput!): Game!
  }
  type totalGames {
    count: Int
  }
  type Game {
    id: ID!
    date: String
    won: Boolean
    lost: Boolean
    abandoned: Boolean
    time: Int
  }
  input GameInput {
    date: String
    won: Boolean
    lost: Boolean
    abandoned: Boolean
    time: Int
  }
`;
