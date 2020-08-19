import db from '@/services/db';

const actions = {
  async newGame({ dispatch }, suid) {
    const { error, response } = await db.newGame(suid);

    if (!error) {
      const { _id, gameNumber } = response;

      dispatch('setGame', _id, { root: true });
      dispatch('user/setGameStats', gameNumber, { root: true });
    }
  },
  lostGame(_, { id, moves }) {
    db.gameLost(id, { moves });
  },
  wonGame(_, { id, moves }) {
    db.gameWon(id, { moves });
  },
  completedGame(_, { id, moves }) {
    db.gameCompleted(id, { moves });
  },
};

export default actions;
