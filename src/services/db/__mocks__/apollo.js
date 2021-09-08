import {
  mockUid,
  mockDeck,
  mockHistory,
  mockPlayerName,
  mockLeaderboardsMoves,
  mockStats,
} from '@/mockData';
import { version } from '../../../../package.json';

const checkUserExistsOnServer = ({ uid }) => {
  const exists = uid === mockUid;

  return exists;
};

const query = ({ variables }) => {
  return {
    data: {
      userStats: { ...mockStats },
      globalStats: { ...mockStats },
      version: { number: version, matches: true },
      user: {
        history: mockHistory,
        exists: checkUserExistsOnServer(variables),
        name: checkUserExistsOnServer(variables)
          ? mockPlayerName
          : `New ${mockPlayerName}`,
      },
      leaderboards: { moves: mockLeaderboardsMoves },
    },
  };
};

const mutate = () => ({
  data: {
    createUser: { name: mockPlayerName },
    newGame: {
      cards: mockDeck,
    },
    saveGame: {
      outcome: 'Won',
    },
  },
});

export default {
  query,
  mutate,
};
