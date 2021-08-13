import { initUser } from './local';
import { getUser, createUser } from './server';
import { getUsersGames } from './history';

const user = () => ({
  initUser,
  getUser,
  createUser,
  getUsersGames,
});

export default user();
