import { differenceInSeconds } from 'date-fns';
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

      commit('SET_GAME', {
        id: _id,
        start: new Date(),
      });

      commit('SET_USER_GAMES', gameNumber);
    }
  },
  lostGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    db.gameLost(id, { time, moves });
  },
  wonGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    db.gameWon(id, { time, moves });
  },
  completedGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    db.gameCompleted(id, { time, moves });
  },
};

export default actions;
