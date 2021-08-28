import { newUser, getUserByID } from '@/services/db';

export const createUser = async (luid) => {
  const { error, response } = await newUser(luid);

  if (!error) {
    return response;
  }

  return { name: '' };
};

export const getUser = async (luid) => {
  const { error, response } = await getUserByID(luid);

  if (!error) {
    return response;
  }

  return { name: '', exists: false };
};
