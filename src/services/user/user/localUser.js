import { v4 as uuidv4 } from 'uuid';

export const fetchLocalUser = () => localStorage.getItem('luid');

export const createLocalUser = () => {
  const luid = uuidv4();

  localStorage.setItem('luid', luid);

  return luid;
};

export const checkLocalUserExists = () => fetchLocalUser() !== null;
