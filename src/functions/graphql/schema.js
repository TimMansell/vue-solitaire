import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    findUser(uid: String!): FindUser!
    userStats(uid: String!): UserStats!
    globalStats: GlobalStats!
    version: Version!
  }
  type Mutation {
    createUser(data: UserInput!): User!
    wonGame(data: GameInput!): Game!
    lostGame(data: GameInput!): Game!
    quitGame(data: GameInput!): Game!
  }
  type User {
    uid: String
    exists: Boolean
  }
  input UserInput {
    uid: String!
  }
  type FindUser {
    uid: String
    exists: Boolean
  }
  type Game {
    uid: String
  }
  input GameInput {
    uid: String!
    won: Boolean
    lost: Boolean
    completed: Boolean
    moves: Int!
    time: Int!
  }
  type GlobalStats {
    won: Int
    lost: Int
    completed: Int
    players: Int
  }
  type UserStats {
    won: Int
    lost: Int
    completed: Int
  }
  type Version {
    number: String!
  }
`;
