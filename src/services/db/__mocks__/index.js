import { formatResponse } from '../helpers';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
const mockStats = { won: 1, lost: 2, competed: 3 };

const userStats = { ...mockStats };
const globalStats = { ...mockStats };
const mockUidResult = { uid: mockUid };

const checkUserExists = (uid) => {
  const exists = uid === mockUid;
  const response = formatResponse({ data: { findUser: { exists } } });

  return response;
};

const getStatsCount = () =>
  formatResponse({ data: { userStats, globalStats } });

const getGlobalStats = () => formatResponse({ data: { globalStats } });

const getUserStats = () => formatResponse({ data: { userStats } });

const newUser = () => formatResponse({ data: { createUser: mockUidResult } });

const gameNew = () => formatResponse({ data: { newGame: mockUidResult } });

const gameWon = () => formatResponse({ data: { wonGame: mockUidResult } });

const gameLost = () => formatResponse({ data: { lostGame: mockUidResult } });

const gameQuit = () => formatResponse({ data: { quitGame: mockUidResult } });

const db = () => ({
  checkUserExists,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  newUser,
  gameNew,
  gameWon,
  gameLost,
  gameQuit,
});

export default db();
