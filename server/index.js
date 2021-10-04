const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;
const URI = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;
const APP_PORT = process.env.PORT || 5000;

const getUserCounts = async (db, uid) => {
  const userCompleted = await db
    .db(MONGODB_DB)
    .collection('games')
    .find({ uid, completed: true }, { projection: { completed: 1 } })
    .count();

  return { userCompleted };
};

const getGlobalCounts = async (db) => {
  const getGlobalCompleted = db
    .db(MONGODB_DB)
    .collection('games')
    .find({ completed: true }, { projection: { completed: 1 } })
    .count();

  const getPlayers = db
    .db(MONGODB_DB)
    .collection('users')
    .find({}, { projection: {} })
    .count();

  const [globalCompleted, players] = await Promise.all([
    getGlobalCompleted,
    getPlayers,
  ]);

  return { globalCompleted, players };
};

const main = async () => {
  const app = express();

  app.use(express.static(`${__dirname}/`));

  const server = http.createServer(app);
  server.listen(APP_PORT);

  console.log('http server listening on %d', APP_PORT);

  const db = await MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
