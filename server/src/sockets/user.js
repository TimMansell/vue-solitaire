import { emitSetUser, emitGetUserHistory } from './emit/user';

export const setUser = ({ socket, db }) => {
  socket.on('setUser', (uid) => {
    emitSetUser({ socket, db, uid });
  });
};

export const getUserHistory = ({ socket, db }) => {
  socket.on('getUserHistory', ({ uid, offset, limit }) => {
    emitGetUserHistory({ socket, db, uid, offset, limit });
  });
};
