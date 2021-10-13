import {
  getUserCounts,
  getGlobalCounts,
  getPlayerStats,
  getGlobalStats,
  getLeaderboards,
} from '../db/stats';

export const emitGetUserCounts = async ({ socket, db, uid }) => {
  try {
    const counts = await getUserCounts(db, uid);

    socket.emit('getUserCounts', counts);
  } catch (error) {
    console.log({ error });
  }
};

export const emitGetGlobalCounts = async ({ io, socket, db }) => {
  try {
    const counts = await getGlobalCounts(db);

    if (io) {
      io.emit('getGlobalCounts', counts);
      return;
    }

    socket.emit('getGlobalCounts', counts);
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
