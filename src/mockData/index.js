export const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

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

export const mockVersionNumber = '1.0.0';
