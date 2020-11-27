import db from '@/services/db';

export const getServerUserID = () => localStorage.getItem('suid');

export const checkServerUser = () => getServerUserID() !== null;

export const createServerUser = async (luid) => {
  const { error, response } = await db.newUser(luid);
  const {
    createUser: { _id: id },
  } = response;

  if (!error) {
    return id;
  }

  return null;
};

export const setServerUserID = async (luid) => {
  const { error, response } = await db.getAUser(luid);

  if (!error) {
    const suid = !response.findUserByLID
      ? await createServerUser(luid)
      : response.findUserByLID.uid;

    if (suid !== null) {
      localStorage.setItem('suid', suid);
    }

    return suid;
  }

  return null;
};
