import db from '@/services/db';
import user from '@/services/user';

const actions = {
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  incrementMoves({ commit }) {
    commit('INCREMENT_MOVES');
  },
  async newGame({ commit }) {
    const suid = await user.getUser();
    const { error, response } = await db.newGame(suid);

    if (!error) {
      const { _id, gameNumber } = response;

      commit('SET_GAME', { id: _id });
      commit('SET_USER_GAMES', gameNumber);
    }
  },
  lostGame({ state }) {
    const { id, moves } = state.game;

    db.gameLost(id, { moves });
  },
  wonGame({ state }) {
    const { id, moves } = state.game;

    db.gameWon(id, { moves });
  },
  completedGame({ state }) {
    const { id, moves } = state.game;

    db.gameCompleted(id, { moves });
  },
};

export default actions;
