import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

import { getUserCounts, getGlobalCounts } from './stats';
import { newGame, saveGame } from './game';

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

  const io = new Server(server);

  io.on('connection', async (socket) => {
    console.log('Client connected.');

    socket.on('initCounts', async (uid) => {
      const getUserCount = getUserCounts(db, uid);
      const getGlobalCount = getGlobalCounts(db);

      const [userStats, globalStats] = await Promise.all([
        getUserCount,
        getGlobalCount,
      ]);

      socket.emit('getUserGameCount', userStats);
      socket.emit('getGlobalCounts', globalStats);
    });

    socket.on('newGame', async (uid) => {
      const cards = await newGame(db, uid);

      socket.emit('newGame', cards);
    });

    socket.on('saveGame', async ({ uid, moves }) => {
      await saveGame(db, { uid, moves });

      const getNewGame = await newGame(db, uid);
      const getGlobalStats = await getGlobalCounts(db);

      const [cards, globalStats] = await Promise.all([
        getNewGame,
        getGlobalStats,
      ]);

      socket.emit('newGame', cards);
      io.emit('getGlobalCounts', globalStats);
    });

    socket.on('disconnect', () => {
      socket.removeAllListeners();

      console.log('Client disconnected.');
    });
  });
};

main();
