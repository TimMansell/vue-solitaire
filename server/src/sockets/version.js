import { checkVersion } from './helpers/version';

// eslint-disable-next-line import/prefer-default-export
export const checkVersionSocket = ({ socket }) => {
  socket.on('checkVersion', (localVersion) => {
    const version = checkVersion(localVersion);

    socket.emit('checkVersion', version);
  });
};
