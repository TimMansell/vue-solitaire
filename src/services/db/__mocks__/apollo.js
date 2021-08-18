import { version } from '../../../../package.json';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

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

const checkUserExistsOnServer = ({ uid }) => {
  const exists = uid === mockUid;

  return exists;
};

const query = ({ variables }) => {
  const stats = {
    won: 1,
    lost: 2,
    completed: 3,
  };
  return {
    data: {
      userStats: { ...stats },
      globalStats: { ...stats },
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
