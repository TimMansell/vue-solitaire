import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

import { getUserCounts, getGlobalCounts } from './stats/index';

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;
const URI = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;
const APP_PORT = process.env.PORT || 5000;

const main = async () => {
  const app = express();

  app.use(express.static(`${__dirname}/`));

  const server = http.createServer(app);
  server.listen(APP_PORT);

  console.log('http server listening on %d', APP_PORT);

  const connection = await MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = connection.db(MONGODB_DB);

  const io = socketIO(server);

  io.on('connection', async (socket) => {
    console.log('Client connected.');

    socket.on('initCounts', async (uid) => {
      const getUserCount = getUserCounts(db, uid);
      const getGlobalCount = getGlobalCounts(db);

      const [{ userCompleted }, { globalCompleted, players }] =
        await Promise.all([getUserCount, getGlobalCount]);

      socket.emit('getUserGameCount', { completed: userCompleted });
      socket.emit('getGlobalCounts', { completed: globalCompleted, players });
    });

    socket.on('saveGame', async () => {
      const { globalCompleted, players } = await getGlobalCounts(db);

      io.emit('getGlobalCounts', { completed: globalCompleted, players });
    });

    socket.on('disconnect', () => {
      socket.removeAllListeners();

      console.log('Client disconnected.');
    });
  });
};

main();
