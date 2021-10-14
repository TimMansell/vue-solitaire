import { createUser, getUser, getGames } from '../db/user';

export const emitSetUser = async ({ socket, db, uid, create = false }) => {
  try {
    const user = await getUser(db, uid);

    if (user) {
      socket.emit('setUser', user);
      return;
    }

    if (create) {
      const newUser = await createUser(db, uid);

      socket.emit('setUser', newUser);
    }
  } catch (error) {
    console.log({ error });
  }
};

export const emitGetUserHistory = async ({
  socket,
  db,
  uid,
  offset,
  limit,
}) => {
  try {
    const games = await getGames(db, uid, offset, limit);

    socket.emit('getUserHistory', games);
  } catch (error) {
    console.log({ error });
  }
};
