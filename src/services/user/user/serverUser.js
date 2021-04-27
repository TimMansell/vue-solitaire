import db from '@/services/db';

export const checkUserSavedLocally = () =>
  localStorage.getItem('userExistsOnServer') !== null;

export const saveUserLocally = () =>
  localStorage.setItem('userExistsOnServer', 'true');

export const createServerUser = async (luid) => {
  const { error, response } = await db.newUser(luid);

  console.log({ response });

  const {
    createUser: { uid },
  } = response;

  if (!error) {
    return uid;
  }

  return null;
};

export const checkServerUserExists = async (luid) => {
  const { error, response } = await db.checkUserExists(luid);
  const {
    findUser: { exists },
  } = response;

  if (!error) {
    return exists;
  }

  return null;
};
