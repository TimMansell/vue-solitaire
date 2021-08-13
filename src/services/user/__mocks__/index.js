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
const mockPlayerName = 'Player Name';

const initUser = () => localStorage.getItem('luid');

const getUser = (uid) => {
  const exists = uid === mockUid;

  if (exists) {
    return { name: mockPlayerName, exists };
  }

  return { name: '', exists };
};

const getUsersGames = () => mockHistory;

const createUser = (uid) => {
  const exists = uid === mockUid;

  if (exists) {
    return { name: mockPlayerName };
  }

  return { name: 'New Player Name' };
};

const user = () => ({
  initUser,
  getUser,
  createUser,
  getUsersGames,
});

export default user();
