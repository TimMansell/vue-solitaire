import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    userStats(uid: String!): UserStats!
    globalStats: GlobalStats!
  }
  type Mutation {
    createUser(data: UserInput!): User!
    wonGame(id: ID!, data: GameInput!): Game!
    lostGame(id: ID!, data: GameInput!): Game!
    completedGame(data: GameInput!): Game!
  }
  type userLID {
    uid: String!
  }
  type User {
    _id: ID!
  }
  type Game {
    uid: String
  }
  type GlobalStats {
    won: Int
    lost: Int
    completed: Int
    players: Int
  }
  input GameInput {
    uid: String
    won: Boolean
    lost: Boolean
    completed: Boolean
    moves: Int
    time: Int
  }
  input UserInput {
    uid: String
  }
  type UserStats {
    won: Int
    lost: Int
    completed: Int
  }
`;
