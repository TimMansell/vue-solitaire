import { checkLocalUser, getLocalUserID, setLocalUserID } from './localUser';
import { checkServerUser, getServerUserID, setServerUserID } from './serverUser';

export const getLocalUser = () => {
  const userExists = checkLocalUser();

  const uid = userExists ? getLocalUserID() : setLocalUserID();

  return uid;
};

export const getServerUser = async (luid) => {
  const isUserSaved = checkServerUser();

  const suid = isUserSaved ? getServerUserID() : await setServerUserID(luid);

  return suid;
};
