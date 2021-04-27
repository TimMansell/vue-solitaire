import { checkLocalUser, getLocalUserID, setLocalUserID } from './localUser';
import {
  checkUserSavedLocally,
  saveUserLocally,
  checkServerUserExists,
  createServerUser,
} from './serverUser';

export const getLocalUser = () => {
  const userExists = checkLocalUser();

  const uid = userExists ? getLocalUserID() : setLocalUserID();

  return uid;
};

export const checkUserExistsOnServer = async (luid) => {
  const isUserSaved = checkUserSavedLocally();

  const userExistsOnServer = !isUserSaved
    ? await checkServerUserExists(luid)
    : isUserSaved;

  saveUserLocally();

  return userExistsOnServer;
};

export const createUserOnServer = async (luid) => {
  await createServerUser(luid);
};
