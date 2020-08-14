import { v4 as uuidv4 } from 'uuid';

export const getLocalUserID = () => localStorage.getItem('luid');

export const setLocalUserID = () => {
  const luid = uuidv4();

  localStorage.setItem('luid', luid);

  return luid;
};

export const checkLocalUser = () => getLocalUserID() !== null;
