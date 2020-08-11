import { getUser, setUser, checkUser } from './user';

const user = () => ({
  getUser,
  setUser,
  checkUser,
});

export default user();
