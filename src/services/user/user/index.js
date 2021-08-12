import {
  checkLocalUserExists,
  fetchLocalUser,
  createLocalUser,
} from './localUser';

export { createUser, getUser } from './serverUser';

export { getUsersGames } from './history';

export const getLocalUser = () => {
  const userExists = checkLocalUserExists();

  const uid = userExists ? fetchLocalUser() : createLocalUser();

  return uid;
};
