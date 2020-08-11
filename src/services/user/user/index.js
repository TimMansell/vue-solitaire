import { v4 as uuidv4 } from 'uuid';

export const getUser = () => localStorage.getItem('uid');

export const setUser = () => {
  const uid = uuidv4();

  localStorage.setItem('uid', uid);

  return uid;
};

export const checkUser = () => getUser() !== null;
