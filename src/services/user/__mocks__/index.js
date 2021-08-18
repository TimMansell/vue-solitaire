const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockHistory = [
  {
    date: '21-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 1,
    number: '4',
    outcome: 'Gave Up',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '3',
    outcome: 'Won',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '2',
    outcome: 'Lost',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '1',
    outcome: 'Won',
  },
];

const mockPlayerName = 'Player Name';

const initUser = () => localStorage.getItem('luid');

const getUser = (uid) => {
  const exists = uid === mockUid;
  const name = exists ? mockPlayerName : '';

  return { name, exists };
};

const getUsersGames = () => mockHistory;

const createUser = (uid) => {
  const exists = uid === mockUid;
  const name = exists ? mockPlayerName : 'New Player Name';

  return { name };
};

const user = () => ({
  initUser,
  getUser,
  createUser,
  getUsersGames,
});

export default user();
