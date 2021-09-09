import {
  mockUid,
  mockDeck,
  mockHistory,
  mockPlayerName,
  mockLeaderboardsMoves,
  mockStats,
} from '@/mockData';

export const getUser = (uid) => {
  const exists = uid === mockUid;
  const name = exists ? mockPlayerName : '';

  const response = { exists, name };

  return response;
};

export const getStats = () => ({
  userStats: { ...mockStats },
  globalStats: { ...mockStats },
});

export const createUser = (uid) => {
  const exists = uid === mockUid;
  const name = exists ? mockPlayerName : `New ${mockPlayerName}`;

  return { name };
};

export const newGame = () => ({ cards: mockDeck });

export const getUsersGames = () => ({
  history: mockHistory,
});

export const getLeaderboards = () => mockLeaderboardsMoves;
