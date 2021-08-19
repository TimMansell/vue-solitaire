import {
  mockUid,
  mockHistory,
  mockPlayerName,
  mockLeaderboardsMoves,
  mockStats,
  mockVersionNumber,
} from '@/mockData';
import { formatResponse } from '../helpers';

const userStats = { ...mockStats };
const globalStats = { ...mockStats };
const mockUidResult = { uid: mockUid };
const mockVersion = { number: mockVersionNumber };

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
