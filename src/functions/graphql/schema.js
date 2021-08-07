import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    findUser(uid: String!): FindUser!
    userStats(uid: String!): UserStats!
    globalStats: GlobalStats!
    version: Version!
    user(uid: String!): User!
    leaderboards(offset: Int!, limit: Int!): Leaderboards!
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
    history(offset: Int!, limit: Int!): [Game]!
  }
  input UserInput {
    uid: String!
  }
  type FindUser {
    uid: String
    exists: Boolean
  }
  type Game {
    rank: Int
    uid: String
    date: String
    won: Boolean
    lost: Boolean
    completed: Boolean
    moves: Int
    time: Int
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
  type Leaderboards {
    moves: [Game]!
    times: [Game]!
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
