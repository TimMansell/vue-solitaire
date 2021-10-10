import { emitCounts, emitGetStats, emitGetLeaderboards } from './emit/stats';

export const getAllCounts = ({ socket, db }) => {
  socket.on('getAllCounts', (uid) => {
    emitCounts({ socket, db, uid });
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
