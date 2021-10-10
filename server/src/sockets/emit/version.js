import { checkVersion } from '../db/version';

// eslint-disable-next-line import/prefer-default-export
export const emitCheckVersion = ({ socket, localVersion }) => {
  const version = checkVersion(localVersion);

  socket.emit('checkVersion', version);
};
