import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type Query {
    userStats(uid: String!): UserStats!
    globalStats: GlobalStats!
    version(localVersion: String!): Version!
    user(uid: String!): User!
    leaderboards(offset: Int!, limit: Int!): Leaderboards!
  }
  type Mutation {
    createUser(uid: String!): User!
    newGame(uid: String!): Deck!
    saveGame(
      uid: String!
      moves: [moveInput!]!
      times: [timeInput!]!
    ): GameState!
    pauseGame(uid: String!, isGamePaused: Boolean!): pauseState!
  }
  input moveInput {
    date: String!
    selectedCardId: Int
    selectedColumn: Int
    isBoard: Boolean
    isFoundation: Boolean
    isGamePaused: Boolean
  }
  input timeInput {
    date: String!
  }
  type User {
    name: String
    exists: Boolean
    history(offset: Int!, limit: Int!): [Game]!
  }
  type Deck {
    date: String
    cards: [Card]
  }
  type Card {
    id: Int
    value: String
    order: Int
    suit: String
  }
  type Game {
    number: Int
    date: String
    time: String
    outcome: String
    moves: Int
    duration: String
  }
  type GameState {
    outcome: String
  }
  type pauseState {
    saved: Boolean
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
    duration: String
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
    number: String
    matches: Boolean
  }
`;
