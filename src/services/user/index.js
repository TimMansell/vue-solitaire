import {
  getLocalUser,
  getUser,
  createUserOnServer,
  getUsersGames,
} from './user';

const user = () => ({
  getLocalUser,
  getUser,
  createUserOnServer,
  getUsersGames,
});

export default user();
