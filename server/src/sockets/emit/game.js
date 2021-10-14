import { newDeck, saveGame } from '../db/game';

export const emitNewGame = async ({ socket, db, uid }) => {
  const isMocked = process.env.NODE_ENV === 'test';

  try {
    const cards = await newDeck(db, uid, isMocked);

    socket.emit('newGame', cards);
  } catch (error) {
    console.log({ error });
  }
};

export const emitSavedGame = async ({ socket, db, uid, game }) => {
  try {
    await saveGame(db, uid, game);

    socket.emit('savedGame');
  } catch (error) {
    console.log({ error });
  }
};
