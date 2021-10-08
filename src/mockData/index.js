import { initBoard } from '../services/solitaire/board';

export const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

export const mockDeck = [
  {
    id: 3,
    value: '3',
    order: 3,
    suit: '♣',
  },
  {
    id: 36,
    value: '10',
    order: 10,
    suit: '♥',
  },
  {
    id: 19,
    value: '6',
    order: 6,
    suit: '♠',
  },
  {
    id: 48,
    value: '9',
    order: 9,
    suit: '♦',
  },
  {
    id: 47,
    value: '8',
    order: 8,
    suit: '♦',
  },
  {
    id: 4,
    value: '4',
    order: 4,
    suit: '♣',
  },
  {
    id: 15,
    value: '2',
    order: 2,
    suit: '♠',
  },
  {
    id: 52,
    value: 'K',
    order: 13,
    suit: '♦',
  },
  {
    id: 42,
    value: '3',
    order: 3,
    suit: '♦',
  },
  {
    id: 43,
    value: '4',
    order: 4,
    suit: '♦',
  },
  {
    id: 39,
    value: 'K',
    order: 13,
    suit: '♥',
  },
  {
    id: 38,
    value: 'Q',
    order: 12,
    suit: '♥',
  },
  {
    id: 41,
    value: '2',
    order: 2,
    suit: '♦',
  },
  {
    id: 37,
    value: 'J',
    order: 11,
    suit: '♥',
  },
  {
    id: 2,
    value: '2',
    order: 2,
    suit: '♣',
  },
  {
    id: 34,
    value: '8',
    order: 8,
    suit: '♥',
  },
  {
    id: 11,
    value: 'J',
    order: 11,
    suit: '♣',
  },
  {
    id: 50,
    value: 'J',
    order: 11,
    suit: '♦',
  },
  {
    id: 16,
    value: '3',
    order: 3,
    suit: '♠',
  },
  {
    id: 25,
    value: 'Q',
    order: 12,
    suit: '♠',
  },
  {
    id: 7,
    value: '7',
    order: 7,
    suit: '♣',
  },
  {
    id: 23,
    value: '10',
    order: 10,
    suit: '♠',
  },
  {
    id: 21,
    value: '8',
    order: 8,
    suit: '♠',
  },
  {
    id: 18,
    value: '5',
    order: 5,
    suit: '♠',
  },
  {
    id: 46,
    value: '7',
    order: 7,
    suit: '♦',
  },
  {
    id: 29,
    value: '3',
    order: 3,
    suit: '♥',
  },
  {
    id: 12,
    value: 'Q',
    order: 12,
    suit: '♣',
  },
  {
    id: 22,
    value: '9',
    order: 9,
    suit: '♠',
  },
  {
    id: 30,
    value: '4',
    order: 4,
    suit: '♥',
  },
  {
    id: 8,
    value: '8',
    order: 8,
    suit: '♣',
  },
  {
    id: 28,
    value: '2',
    order: 2,
    suit: '♥',
  },
  {
    id: 45,
    value: '6',
    order: 6,
    suit: '♦',
  },
  {
    id: 27,
    value: 'A',
    order: 1,
    suit: '♥',
  },
  {
    id: 33,
    value: '7',
    order: 7,
    suit: '♥',
  },
  {
    id: 14,
    value: 'A',
    order: 1,
    suit: '♠',
  },
  {
    id: 6,
    value: '6',
    order: 6,
    suit: '♣',
  },
  {
    id: 9,
    value: '9',
    order: 9,
    suit: '♣',
  },
  {
    id: 13,
    value: 'K',
    order: 13,
    suit: '♣',
  },
  {
    id: 32,
    value: '6',
    order: 6,
    suit: '♥',
  },
  {
    id: 51,
    value: 'Q',
    order: 12,
    suit: '♦',
  },
  {
    id: 44,
    value: '5',
    order: 5,
    suit: '♦',
  },
  {
    id: 31,
    value: '5',
    order: 5,
    suit: '♥',
  },
  {
    id: 26,
    value: 'K',
    order: 13,
    suit: '♠',
  },
  {
    id: 40,
    value: 'A',
    order: 1,
    suit: '♦',
  },
  {
    id: 10,
    value: '10',
    order: 10,
    suit: '♣',
  },
  {
    id: 1,
    value: 'A',
    order: 1,
    suit: '♣',
  },
  {
    id: 24,
    value: 'J',
    order: 11,
    suit: '♠',
  },
  {
    id: 5,
    value: '5',
    order: 5,
    suit: '♣',
  },
  {
    id: 35,
    value: '9',
    order: 9,
    suit: '♥',
  },
  {
    id: 49,
    value: '10',
    order: 10,
    suit: '♦',
  },
  {
    id: 17,
    value: '4',
    order: 4,
    suit: '♠',
  },
  {
    id: 20,
    value: '7',
    order: 7,
    suit: '♠',
  },
];

export const mockBoard = initBoard(mockDeck);

export const mockFoundation = [
  [
    { id: 1, suit: '♠', value: 'A', visible: false },
    { id: 2, suit: '♠', value: 2, visible: true },
    { id: 3, suit: '♠', value: 3, visible: false },
    { id: 4, suit: '♠', value: 4, visible: true },
  ],
  [],
  [],
  [],
];

export const mockPlayerName = 'Player Name';

export const mockHistoryApi = [
  {
    date: '2021-05-20T23:34:49.564Z',
    won: false,
    lost: false,
    moves: 1,
    time: 12,
  },
  {
    date: '2021-05-19T23:34:49.564Z',
    won: true,
    lost: false,
    moves: 2,
    time: 12,
  },
  {
    date: '2021-05-19T23:34:49.564Z',
    won: false,
    lost: true,
    moves: 2,
    time: 12,
  },
  {
    date: '2021-05-19T23:34:49.564Z',
    won: true,
    lost: false,
    moves: 2,
    time: 12,
  },
];

export const mockHistory = [
  {
    date: '20-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 1,
    number: '4',
    outcome: 'Gave Up',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '3',
    outcome: 'Won',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '2',
    outcome: 'Lost',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '1',
    outcome: 'Won',
  },
];

export const mockLeaderboardsMovesAPI = [
  {
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    moves: 2,
  },
];

export const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    moves: 2,
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
    moves: 2,
  },
];

export const mockLeaderboardsTimesAPI = [
  {
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    time: 20,
  },
  {
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    time: 200,
  },
];

export const mockLeaderboardsTimes = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    duration: '0:00:20',
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
    duration: '0:03:20',
  },
];

export const mockPlayers = [
  { uid: '7dac9d78-353f-409b-8a7f-2192409c44a2', name: 'Player 1' },
  { uid: '2cbf658a-3102-4e9d-b749-bac853efed0d', name: 'Player 2' },
];

export const mockStats = { won: 2, lost: 4, completed: 9, players: 4 };

export const mockVersionNumber = '0.0.1';
