import { newUser, getUserByID } from '@/services/db';

export const createUser = async (luid) => {
  const { error, response } = await newUser(luid);

  if (!error) {
    const {
      createUser: { name },
    } = response;

    return { name };
  }

  return { name: '' };
};

export const getUser = async (luid) => {
  const { error, response } = await getUserByID(luid);

  if (!error) {
    const {
      user: { name, exists },
    } = response;

    return { name, exists };
  }

  return { name: '', exists: false };
};
