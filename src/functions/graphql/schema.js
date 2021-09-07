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
    createUser(data: UserInput!): User!
    newGame(uid: String!): Deck!
    wonGame(data: GameInput!): GameState!
    lostGame(data: GameInput!): GameState!
    quitGame(data: GameInput!): GameState!
    saveGame(uid: String!, moves: [moveInput!]!, time: Int!): GameState!
  }
  input moveInput {
    selectedCardId: Int!
    selectedColumn: Int!
    isBoard: Boolean
    isFoundation: Boolean
  }
  type User {
    name: String
    exists: Boolean
    history(offset: Int!, limit: Int!): [Game]!
  }
  input UserInput {
    uid: String!
  }
  type Deck {
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
