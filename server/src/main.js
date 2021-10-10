import { Server } from 'socket.io';

import { setupServer, setupDB } from './setup';
import {
  setupOnSocket,
  checkVersion,
  newGame,
  saveGame,
  setUser,
  getUserHistory,
  getAllCounts,
  getStats,
  getLeaderboards,
  disconnect,
} from './sockets';

const main = async () => {
  const [server, db] = await Promise.all([setupServer(), setupDB()]);
  const io = new Server(server);

  io.on('connection', async (socket) => {
    const on = setupOnSocket({ socket, db, io });

    on(checkVersion);
    on(newGame);
    on(saveGame);
    on(setUser);
    on(getUserHistory);
    on(getAllCounts);
    on(getStats);
    on(getLeaderboards);
    on(disconnect);

    console.log('Client connected.', socket.id);
  });
};

main();
