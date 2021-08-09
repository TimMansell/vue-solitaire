import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
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
    name: String
    exists: Boolean
    played: Boolean
    history(offset: Int!, limit: Int!): [Game]!
  }
  input UserInput {
    uid: String!
  }
  type Game {
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
  type LeaderboardGame {
    rank: Int
    player: String
    date: String
    won: Boolean
    moves: Int
    time: String
  }
  type Leaderboards {
    moves: [LeaderboardGame]!
    times: [LeaderboardGame]!
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
