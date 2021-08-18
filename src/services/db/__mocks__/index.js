import { formatResponse } from '../helpers';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
const mockVersionNumber = '1.0.0';
const mockStats = { won: 1, lost: 2, competed: 3 };

const userStats = { ...mockStats };
const globalStats = { ...mockStats };
const mockUidResult = { uid: mockUid };
const mockVersion = { number: mockVersionNumber };
const mockHistory = [
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

const mockLeaderboardsMoves = [
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

const mockPlayerName = 'Player Name';

const getUser = (uid) => {
  const exists = uid === mockUid;
  const name = uid === mockUid ? mockPlayerName : '';

  const response = formatResponse({ data: { user: { exists, name } } });

  return response;
};

const getStatsCount = () =>
  formatResponse({ data: { userStats, globalStats } });

const getStats = () => formatResponse({ data: { userStats, globalStats } });

const newUser = () =>
  formatResponse({ data: { createUser: { name: mockPlayerName } } });

const gameNew = () => formatResponse({ data: { newGame: mockUidResult } });

const gameWon = () => formatResponse({ data: { wonGame: mockUidResult } });

const gameLost = () => formatResponse({ data: { lostGame: mockUidResult } });

const gameQuit = () => formatResponse({ data: { quitGame: mockUidResult } });

const getAppVersion = () => formatResponse({ data: { version: mockVersion } });

const getUsersGames = () =>
  formatResponse({
    data: {
      user: {
        history: mockHistory,
      },
    },
  });

const getLeaderboards = () =>
  formatResponse({
    data: {
      leaderboards: mockLeaderboardsMoves,
    },
  });

const db = () => ({
  getUser,
  getStats,
  getStatsCount,
  newUser,
  gameNew,
  gameWon,
  gameLost,
  gameQuit,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
});

export default db();
