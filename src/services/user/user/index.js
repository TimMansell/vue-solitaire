import { checkLocalUser, getLocalUserID, setLocalUserID } from './localUser';
import { checkServerUser, getServerUserID, getServerUser } from './serverUser';

export const getLocalUser = () => {
  const userExists = checkLocalUser();

  const uid = userExists ? getLocalUserID() : setLocalUserID();

  return uid;
};

export const getUser = async () => {
  const isUserSaved = checkServerUser();

  if (!isUserSaved) {
    const luid = getLocalUserID();
    const suid = await getServerUser(luid);

    return suid;
  }

  const suid = getServerUserID();

  return suid;
};
