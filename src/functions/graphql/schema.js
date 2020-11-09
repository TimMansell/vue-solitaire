import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    getUser(uid: String!): userLID
    getUserStats(uid: String!): UserStats
    globalStats: GlobalStats
  }
  type Mutation {
    createUser(uid: String!): User!
    newGame(uid: String!): Game!
    wonGame(id: ID!, data: GameInput!): Game!
    lostGame(id: ID!, data: GameInput!): Game!
    completedGame(id: ID!, data: GameInput!): Game!
  }
  type userLID {
    uid: String!
  }
  type User {
    _id: ID!
  }
  type Game {
    _id: ID!
    gameNumber: Int
  }
  type GlobalStats {
    count: Int
    won: Int
    lost: Int
    completed: Int
  }
  input GameInput {
    won: Boolean
    lost: Boolean
    completed: Boolean
    moves: Int
    time: Int
  }
  type UserStats {
    count: Int
    won: Int
    lost: Int
    completed: Int
  }
`;
