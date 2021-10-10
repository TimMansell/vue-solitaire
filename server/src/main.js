import { Server } from 'socket.io';

import { setupServer, setupDB } from './setup';
import {
  setupOnSocket,
  checkVersionSocket,
  newGameSocket,
  saveGameSocket,
  setUserSocket,
  getUserGamesSocket,
  initCountsSocket,
  getStatsSocket,
  getLeaderboardsSocket,
  disconnectSocket,
} from './sockets';

const main = async () => {
  const [server, db] = await Promise.all([setupServer(), setupDB()]);
  const io = new Server(server);

  io.on('connection', async (socket) => {
    const on = setupOnSocket({ socket, db, io });

    on(checkVersionSocket);
    on(newGameSocket);
    on(saveGameSocket);
    on(setUserSocket);
    on(getUserGamesSocket);
    on(initCountsSocket);
    on(getStatsSocket);
    on(getLeaderboardsSocket);
    on(disconnectSocket);

    console.log('Client connected.', socket.id);
  });
};

main();
