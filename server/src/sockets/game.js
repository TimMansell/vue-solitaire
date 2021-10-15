import { emitNewGame, emitSavedGame } from './emit/game';
import { emitGetUserCounts, emitGetGlobalCounts } from './emit/stats';
import { emitSetUser } from './emit/user';

export const newGame = ({ socket, db }) => {
  socket.on('newGame', (uid) => {
    emitNewGame({ socket, db, uid });
  });
};

export const saveGame = ({ socket, db, io }) => {
  socket.on('saveGame', async ({ uid, game, gameOutcome }) => {
    await emitSavedGame({ socket, db, uid, game, gameOutcome });

    await Promise.all([
      emitNewGame({ socket, db, uid }),
      emitSetUser({ socket, db, uid, create: true }),
    ]);

    emitGetUserCounts({ socket, db, uid });
    emitGetGlobalCounts({ io, socket, db });
  });
};
