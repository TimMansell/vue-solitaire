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
    date: '2021-05-20T23:34:49.564Z',
    won: false,
    lost: false,
    moves: 0,
    time: 12,
  },
];

const checkUserExists = (uid) => {
  const exists = uid === mockUid;
  const response = formatResponse({ data: { findUser: { exists } } });

  return response;
};

const getStatsCount = () =>
  formatResponse({ data: { userStats, globalStats } });

const getStats = () => formatResponse({ data: { userStats, globalStats } });

const newUser = () => formatResponse({ data: { createUser: mockUidResult } });

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

const db = () => ({
  checkUserExists,
  getStats,
  getStatsCount,
  newUser,
  gameNew,
  gameWon,
  gameLost,
  gameQuit,
  getAppVersion,
  getUsersGames,
});

export default db();
