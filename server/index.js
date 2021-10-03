const { Server } = require('socket.io');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;

const io = new Server(3000, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  console.log('Client connected.');

  const db = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  socket.on('saveGame', async (uid) => {
    const getUserCompleted = await db
      .db(MONGODB_DB)
      .collection('games')
      .find({ uid, completed: true }, { projection: { completed: 1 } })
      .count();

    const getGlobalCompleted = await db
      .db(MONGODB_DB)
      .collection('games')
      .find({ completed: true }, { projection: { completed: 1 } })
      .count();

    const getPlayers = await db
      .db(MONGODB_DB)
      .collection('users')
      .find({}, { projection: {} })
      .count();

    const [userCompleted, globalCompleted, players] = await Promise.all([
      getUserCompleted,
      getGlobalCompleted,
      getPlayers,
    ]);

    socket.emit('getUserGameCount', { completed: userCompleted });
    io.emit('getGlobalCounts', { completed: globalCompleted, players });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');

    socket.removeAllListeners();

    db.close();
  });
});
