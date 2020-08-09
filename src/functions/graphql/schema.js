import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    totalGames: totalGames!
  }
  type Mutation {
    newGame: Game!
    updateGame(id: ID!, data: GameInput!): Game!
  }
  type totalGames {
    count: Int
  }
  type Game {
    id: ID!
    gameNumber: Int
  }
  input GameInput {
    won: Boolean
    lost: Boolean
    completed: Boolean
    time: Int
    moves: Int
  }
`;
