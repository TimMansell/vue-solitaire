import { v4 as uuidv4 } from 'uuid';

export const getLocalUser = () => localStorage.getItem('luid');

export const createLocalUser = () => {
  const luid = uuidv4();

  localStorage.setItem('luid', luid);

  return luid;
};
