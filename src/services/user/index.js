import { getLocalUser, createLocalUser } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const initUser = () => {
  const user = getLocalUser();

  const uid = user || createLocalUser();

  return uid;
};
