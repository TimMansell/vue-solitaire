import {
  getCounts,
  getPlayerStats,
  getGlobalStats,
  getLeaderboards,
} from '../db/stats';

export const emitCounts = async ({ io, socket, db, uid }) => {
  try {
    const { userStats, globalStats } = await getCounts(db, uid);

    socket.emit('getUserCounts', userStats);

    if (!io) {
      socket.emit('getGlobalCounts', globalStats);
      return;
    }

    io.emit('getGlobalCounts', globalStats);
  } catch (error) {
    console.log({ error });
  }
};

export const emitGetStats = async ({ socket, db, uid }) => {
  try {
    const [userStats, globalStats] = await Promise.all([
      getPlayerStats(db, uid),
      getGlobalStats(db),
    ]);

    socket.emit('getStats', { userStats, globalStats });
  } catch (error) {
    console.log({ error });
  }
};

export const emitGetLeaderboards = async ({ socket, db, showBest, limit }) => {
  try {
    const games = await getLeaderboards(db, showBest, limit);

    socket.emit('getLeaderboards', games);
  } catch (error) {
    console.log({ error });
  }
};
