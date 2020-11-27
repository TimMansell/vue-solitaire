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
    // eslint-disable-next-line no-underscore-dangle
    // return response.createUser._id;
  }

  return null;
};

export const setServerUserID = async (luid) => {
  const { error, response } = await db.getAUser(luid);
  // const { findUserByLID } = response;

  if (!error) {
    // const suid = !findUserByLID ? await createServerUser(luid) : findUserByLID.uid;
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
