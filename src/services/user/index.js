import {
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
  getUsersGames,
} from './user';

const user = () => ({
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
  getUsersGames,
});

export default user();
