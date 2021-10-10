import { emitCheckVersion } from './emit/version';

// eslint-disable-next-line import/prefer-default-export
export const checkVersion = ({ socket }) => {
  socket.on('checkVersion', (localVersion) => {
    emitCheckVersion({ socket, localVersion });
  });
};
