import { getLocalUser, getUser, createUser, getUsersGames } from './user';

const user = () => ({
  getLocalUser,
  getUser,
  createUser,
  getUsersGames,
});

export default user();
