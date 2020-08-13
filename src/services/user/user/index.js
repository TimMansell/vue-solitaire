import { v4 as uuidv4 } from 'uuid';
import db from '@/services/db';

export const getLocalUser = () => localStorage.getItem('luid');

export const setLocalUser = () => {
  const luid = uuidv4();

  localStorage.setItem('luid', luid);

  return luid;
};

export const checkLocalUser = () => getLocalUser() !== null;

export const createServerUser = async () => {
  let suid = localStorage.getItem('suid');

  if (!suid) {
    const luid = getLocalUser();

    const { error, response } = await db.getAUser(luid);

    console.log({ response });

    if (!error) {
      if (!response) {
        const { error: e2, response: r2 } = await db.createUser(luid);

        if (!e2) {
          // eslint-disable-next-line no-underscore-dangle
          suid = r2._id;
        }
      } else {
        suid = response.uid;
      }

      localStorage.setItem('suid', suid);
    }
  }

  return suid;
};
