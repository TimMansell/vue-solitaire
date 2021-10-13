import {
  emitGetUserCounts,
  emitGetGlobalCounts,
  emitGetStats,
  emitGetLeaderboards,
} from './emit/stats';

export const getUserCounts = ({ socket, db }) => {
  socket.on('getUserCounts', (uid) => {
    emitGetUserCounts({ socket, db, uid });
  });
};

export const getGlobalCounts = ({ socket, db }) => {
  socket.on('getGlobalCounts', () => {
    emitGetGlobalCounts({ socket, db });
  });
};

export const getStats = ({ socket, db }) => {
  socket.on('getStats', (uid) => {
    emitGetStats({ socket, db, uid });
  });
};

export const getLeaderboards = ({ socket, db }) => {
  socket.on('getLeaderboards', ({ showBest, limit }) => {
    emitGetLeaderboards({ socket, db, showBest, limit });
  });
};
