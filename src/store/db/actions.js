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
    // const { userModule } = rootState;
    // const { uid } = userModule;
    const suid = await user.createServerUser();

    console.log({ suid });

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
  async getGlobalStats({ commit }) {
    const { error, response } = await db.getTotalGames();

    if (!error) {
      const { count } = response;

      commit('SET_TOTAL_GAMES', count);
    }
  },
};

export default actions;
