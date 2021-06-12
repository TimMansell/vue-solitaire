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

const getLocalUser = () => localStorage.getItem('luid');

const checkUserExistsOnServer = (uid) => {
  const exists = uid === mockUid;

  return exists;
};

const getUsersGames = () => mockHistory;

const createUserOnServer = () => true;

const user = () => ({
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
  getUsersGames,
});

export default user();
