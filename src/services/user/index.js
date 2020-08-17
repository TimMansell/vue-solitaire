import { getLocalUser, getServerUser } from './user';

const user = () => ({
  getLocalUser,
  getServerUser,
});

export default user();
