import db from '@/services/db';

export const getServerUserID = () => localStorage.getItem('suid');

export const checkServerUser = () => getServerUserID() !== null;

export const createServerUser = async (luid) => {
  const { error, response } = await db.createUser(luid);

  if (!error) {
    // eslint-disable-next-line no-underscore-dangle
    return response._id;
  }

  return null;
};

export const getServerUser = async (luid) => {
  const { error, response } = await db.getAUser(luid);

  if (!error) {
    const suid = !response ? await createServerUser(luid) : response.uid;

    localStorage.setItem('suid', suid);

    return suid;
  }

  return null;
};
