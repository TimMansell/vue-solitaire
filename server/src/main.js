import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { MongoClient } from 'mongodb';

import 'dotenv/config';

import { checkVersion } from './version';
import {
  getCounts,
  getPlayerStats,
  getGlobalStats,
  getLeaderboards,
} from './stats';
import { newGame, saveGame } from './game';
import { getUser, createUser, getUserGames } from './user';

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;
const URI = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;
const APP_PORT = process.env.PORT || 5000;

const main = async () => {
  const app = express();

  app.use(express.static(`${__dirname}/`));

  const server = createServer(app);
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

    socket.on('checkVersion', (localVersion) => {
      const version = checkVersion(localVersion);

      socket.emit('checkVersion', version);
    });

    socket.on('initCounts', async (uid) => {
      try {
        const { userStats, globalStats } = await getCounts(db, uid);

        socket.emit('getUserGameCount', userStats);
        socket.emit('getGlobalCounts', globalStats);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('newGame', async (uid) => {
      try {
        const cards = await newGame(db, uid);

        socket.emit('newGame', cards);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('saveGame', async ({ uid, moves }) => {
      try {
        const [userExists] = await Promise.all([
          getUser(db, uid),
          saveGame(db, { uid, moves }),
        ]);

        if (!userExists) {
          try {
            const user = await createUser(db, uid);

            socket.emit('setUser', user);
          } catch (error) {
            console.log({ error });
          }
        }
      } catch (error) {
        console.log({ error });
      }

      try {
        const cards = await newGame(db, uid);
        socket.emit('newGame', cards);

        const { userStats, globalStats } = await getCounts(db, uid);

        socket.emit('getUserGameCount', userStats);
        io.emit('getGlobalCounts', globalStats);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('setUser', async (uid) => {
      try {
        const user = await getUser(db, uid);

        socket.emit('setUser', user);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('getStats', async (uid) => {
      try {
        const [userStats, globalStats] = await Promise.all([
          getPlayerStats(db, uid),
          getGlobalStats(db),
        ]);

        socket.emit('getStats', { userStats, globalStats });
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('getUserGames', async ({ uid, offset, limit }) => {
      try {
        const games = await getUserGames(db, uid, offset, limit);

        socket.emit('getUserGames', games);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('getLeaderboards', async ({ showBest, limit }) => {
      try {
        const games = await getLeaderboards(db, showBest, limit);

        socket.emit('getLeaderboards', games);
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on('disconnect', () => {
      socket.removeAllListeners();

      console.log('Client disconnected.', socket.id);
    });
  });
};

main();
