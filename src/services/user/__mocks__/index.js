import { mockUid, mockHistory, mockPlayerName } from '@/mockData';

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
