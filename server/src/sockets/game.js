import { newGame, saveGame } from './helpers/game';
import { getUser, createUser } from './helpers/user';
import { getCounts } from './helpers/stats';

export const newGameSocket = ({ socket, db }) => {
  socket.on('newGame', async (uid) => {
    try {
      const cards = await newGame(db, uid);

      socket.emit('newGame', cards);
    } catch (error) {
      console.log({ error });
    }
  });
};

export const saveGameSocket = ({ socket, db, io }) => {
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
};
