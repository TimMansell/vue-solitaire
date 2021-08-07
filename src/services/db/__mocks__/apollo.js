import { version } from '../../../../package.json';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockHistory = [
  {
    date: '2021-05-20T23:34:49.564Z',
    won: false,
    lost: false,
    moves: 0,
    time: 12,
  },
];

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    rank: 2,
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    moves: 2,
  },
];

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
      findUser: { exists: checkUserExistsOnServer(variables) },
      userStats: { ...stats },
      globalStats: { ...stats },
      version: { number: version },
      user: { history: mockHistory },
      leaderboards: { moves: mockLeaderboardsMoves },
    },
  };
};

const mutate = ({ variables }) => {
  const {
    data: { moves, time },
  } = variables;

  const gameObject = {
    date: '2021',
    completed: true,
    time,
    moves,
  };

  return {
    data: {
      createUser: { uid: mockUid },
      wonGame: {
        ...gameObject,
        won: true,
        lost: false,
      },
      lostGame: {
        ...gameObject,
        won: false,
        lost: true,
      },
      quitGame: {
        ...gameObject,
        won: false,
        lost: false,
      },
    },
  };
};

export default {
  query,
  mutate,
};
