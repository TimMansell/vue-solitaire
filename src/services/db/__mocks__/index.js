import {
  mockUid,
  mockDeck,
  mockHistory,
  mockPlayerName,
  mockLeaderboardsMoves,
  mockStats,
  mockVersionNumber,
} from '@/mockData';
import { formatResponse } from '../helpers';

const getUser = (uid) => {
  const exists = uid === mockUid;
  const name = uid === mockUid ? mockPlayerName : '';

  const response = formatResponse({ data: { user: { exists, name } } });

  return response;
};

const getStatsCount = () =>
  formatResponse({
    data: { userStats: { ...mockStats }, globalStats: { ...mockStats } },
  });

const getStats = () =>
  formatResponse({
    data: { userStats: { ...mockStats }, globalStats: { ...mockStats } },
  });

const newUser = () =>
  formatResponse({ data: { createUser: { name: mockPlayerName } } });

const newGame = () =>
  formatResponse({ data: { newGame: { cards: mockDeck } } });

const gameWon = () => formatResponse({ data: { wonGame: { uid: mockUid } } });

const gameLost = () => formatResponse({ data: { lostGame: { uid: mockUid } } });

const gameQuit = () => formatResponse({ data: { quitGame: { uid: mockUid } } });

const getAppVersion = () =>
  formatResponse({ data: { version: { number: mockVersionNumber } } });

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
  newGame,
  gameWon,
  gameLost,
  gameQuit,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
});

export default db();
