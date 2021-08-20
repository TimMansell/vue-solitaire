import {
  mockUid,
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
      version: { number: version },
      user: {
        history: mockHistory,
        exists: checkUserExistsOnServer(variables),
        name: checkUserExistsOnServer(variables)
          ? mockPlayerName
          : 'New Player Name',
      },
      leaderboards: { moves: mockLeaderboardsMoves },
    },
  };
};

const mutate = () => ({
  data: {
    createUser: { name: mockPlayerName },
    wonGame: {
      outcome: 'Won',
    },
    lostGame: {
      outcome: 'Lost',
    },
    quitGame: {
      outcome: 'Gave Up',
    },
  },
});

export default {
  query,
  mutate,
};
