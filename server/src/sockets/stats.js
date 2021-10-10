import {
  getCounts,
  getPlayerStats,
  getGlobalStats,
  getLeaderboards,
} from './helpers/stats';

export const initCountsSocket = ({ socket, db }) => {
  socket.on('initCounts', async (uid) => {
    try {
      const { userStats, globalStats } = await getCounts(db, uid);

      socket.emit('getUserGameCount', userStats);
      socket.emit('getGlobalCounts', globalStats);
    } catch (error) {
      console.log({ error });
    }
  });
};

export const getStatsSocket = ({ socket, db }) => {
  socket.on('getStats', async (uid) => {
    try {
      const [userStats, globalStats] = await Promise.all([
        getPlayerStats(db, uid),
        getGlobalStats(db),
      ]);

      socket.emit('getStats', { userStats, globalStats });
    } catch (error) {
      console.log({ error });
    }
  });
};

export const getLeaderboardsSocket = ({ socket, db }) => {
  socket.on('getLeaderboards', async ({ showBest, limit }) => {
    try {
      const games = await getLeaderboards(db, showBest, limit);

      socket.emit('getLeaderboards', games);
    } catch (error) {
      console.log({ error });
    }
  });
};
