import {
  checkLocalUserExists,
  fetchLocalUser,
  createLocalUser,
} from './localUser';
import {
  checkServerUserSavedLocally,
  saveServerUserLocally,
  checkServerUserExists,
  createServerUser,
} from './serverUser';

export const getLocalUser = () => {
  const userExists = checkLocalUserExists();

  const uid = userExists ? fetchLocalUser() : createLocalUser();

  return uid;
};

export const checkUserExistsOnServer = async (luid) => {
  const isUserSaved = checkServerUserSavedLocally();

  if (isUserSaved) {
    return true;
  }

  const userExistsOnServer = await checkServerUserExists(luid);

  // This is here so users that exist locally and on server set new localStorage value.
  if (userExistsOnServer && !isUserSaved) {
    saveServerUserLocally();
  }

  return userExistsOnServer;
};

export const createUserOnServer = async (luid) => {
  const user = await createServerUser(luid);

  saveServerUserLocally();

  return user;
};
