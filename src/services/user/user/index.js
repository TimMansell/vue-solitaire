import { checkLocalUser, getLocalUserID, setLocalUserID } from './localUser';
import { checkServerUser } from './serverUser';

export const getLocalUser = () => {
  const userExists = checkLocalUser();

  const uid = userExists ? getLocalUserID() : setLocalUserID();

  return uid;
};

export const getServerUser = async (luid) => {
  const isUserSaved = checkServerUser();

  console.log({ isUserSaved });

  const suid = luid;

  return suid;
};
