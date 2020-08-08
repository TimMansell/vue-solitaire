import { differenceInSeconds } from 'date-fns';
import graphql from '@/services/graphql';

const actions = {
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  incrementMoves({ commit }) {
    commit('INCREMENT_MOVES');
  },
  async newGame({ commit }) {
    const { error, response } = await graphql.newGame();

    if (!error) {
      const { id, gameNumber } = response;

      commit('SET_GAME', {
        id,
        start: new Date(),
      });

      commit('SET_TOTAL_GAMES', gameNumber);
    }
  },
  lostGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    graphql.updateGame(id, { lost: true, time, moves, completed: true });
  },
  wonGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    graphql.updateGame(id, { won: true, time, moves, completed: true });
  },
  completedGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    graphql.updateGame(id, { time, moves });
  },
};

export default actions;
