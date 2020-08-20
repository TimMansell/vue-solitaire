import { getLocalUser, getServerUser, getUserStats, setUserStats } from './user';

const user = () => ({
  getLocalUser,
  getServerUser,
  getUserStats,
  setUserStats,
});

export default user();
