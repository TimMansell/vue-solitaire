import { Server } from 'socket.io';

import { setupServer, setupDB } from './db';
import {
  setupSocket,
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
  const server = await setupServer();
  const db = await setupDB();
  const io = new Server(server);

  io.on('connection', async (socket) => {
    const onSocket = setupSocket({ socket, db, io });

    onSocket(checkVersionSocket);
    onSocket(newGameSocket);
    onSocket(saveGameSocket);
    onSocket(setUserSocket);
    onSocket(getUserGamesSocket);
    onSocket(initCountsSocket);
    onSocket(getStatsSocket);
    onSocket(getLeaderboardsSocket);
    onSocket(disconnectSocket);

    console.log('Client connected.', socket.id);
  });
};

main();
