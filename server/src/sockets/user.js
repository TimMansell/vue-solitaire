import { getUser, getUserGames } from './helpers/user';

export const setUserSocket = ({ socket, db }) => {
  socket.on('setUser', async (uid) => {
    try {
      const user = await getUser(db, uid);

      socket.emit('setUser', user);
    } catch (error) {
      console.log({ error });
    }
  });
};

export const getUserGamesSocket = ({ socket, db }) => {
  socket.on('getUserGames', async ({ uid, offset, limit }) => {
    try {
      const games = await getUserGames(db, uid, offset, limit);

      socket.emit('getUserGames', games);
    } catch (error) {
      console.log({ error });
    }
  });
};
