import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    totalGames: totalGames!
  }
  type Mutation {
    newGame: Game!
    wonGame(id: ID!, data: GameInput!): Game!
    lostGame(id: ID!, data: GameInput!): Game!
    completedGame(id: ID!, data: GameInput!): Game!
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
