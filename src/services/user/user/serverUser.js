import db from '@/services/db';

export const createUserOnServer = async (luid) => {
  const { error, response } = await db.newUser(luid);

  const {
    createUser: { uid },
  } = response;

  if (!error) {
    return uid;
  }

  return null;
};

export const checkUserExistsOnServer = async (luid) => {
  const { error, response } = await db.checkUserExists(luid);

  const {
    findUser: { exists },
  } = response;

  if (!error) {
    return exists;
  }

  return null;
};
