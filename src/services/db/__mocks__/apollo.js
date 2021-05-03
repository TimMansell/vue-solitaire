import { version } from '../../../../package.json';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

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
