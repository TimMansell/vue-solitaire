import db from '@/services/db';

export const createUserOnServer = async (luid) => {
  const { error, response } = await db.newUser(luid);

  if (!error) {
    const {
      createUser: { name },
    } = response;

    return { name };
  }

  return { name: '' };
};

export const getUser = async (luid) => {
  const { error, response } = await db.getUser(luid);

  if (!error) {
    const {
      user: { name, exists },
    } = response;

    return { name, exists };
  }

  return { name: '', exists: false };
};
