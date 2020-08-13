import { getLocalUser, setLocalUser, checkLocalUser, createServerUser } from './user';

const user = () => ({
  getLocalUser,
  setLocalUser,
  checkLocalUser,
  createServerUser,
});

export default user();
