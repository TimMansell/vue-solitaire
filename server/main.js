import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

import { getCounts } from './stats';
import { newGame, saveGame } from './game';
import { getUser, createUser } from './user';

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
    console.log('Client connected.', socket.id);

    socket.on('initCounts', async () => {
      const { uid } = socket;
      const { userStats, globalStats } = await getCounts(db, uid);

      socket.emit('getUserGameCount', userStats);
      socket.emit('getGlobalCounts', globalStats);
    });

    socket.on('newGame', async () => {
      const { uid } = socket;

      const cards = await newGame(db, uid);

      socket.emit('newGame', cards);
    });

    socket.on('saveGame', async ({ moves }) => {
      const { uid } = socket;
      const [userExists] = await Promise.all([
        getUser(db, uid),
        saveGame(db, { uid, moves }),
      ]);

      if (!userExists) {
        const user = await createUser(db, uid);

        socket.emit('setUser', user);
      }

      const cards = await newGame(db, uid);
      socket.emit('newGame', cards);

      const { userStats, globalStats } = await getCounts(db, uid);

      socket.emit('getUserGameCount', userStats);
      io.emit('getGlobalCounts', globalStats);
    });

    socket.on('setUser', async (uid) => {
      // eslint-disable-next-line no-param-reassign
      socket.uid = uid;

      const user = await getUser(db, uid);

      socket.emit('setUser', user);
    });

    socket.on('disconnect', () => {
      socket.removeAllListeners();

      console.log('Client disconnected.', socket.uid);
    });
  });
};

main();
