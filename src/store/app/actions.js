import db from '@/services/db';

const actions = {
  async initApp({ dispatch, state }) {
    const { isNewGame } = state;

    dispatch('initGame', isNewGame);

    // if (isNewGame) {
    //   await dispatch('createGame', true);
    // }

    dispatch('getStatsCount');
  },
  restartApp({ dispatch, commit, state, rootState }, isCompleted) {
    const { luid } = rootState.user;
    const { game } = state;

    if (!isCompleted) {
      db.gameAbandoned({ luid, ...game });
    }

    dispatch('restartGame');

    commit('RESTART');
  },
  // async createGame({ commit, rootState }) {
  //   const { suid } = rootState.user;
  //   const { error, response } = await db.gameNew(suid);

  //   if (!error) {
  //     const {
  //       newGame: { _id: id },
  //     } = response;

  //     commit('SET_GAME', { id });
  //     commit('NEW_GAME', false);
  //   }
  // },
  setGameState({ commit, dispatch }, hasWon) {
    if (hasWon) {
      dispatch('setGameWon');
    } else {
      dispatch('setGameLost');
    }

    commit('SET_GAME_WON', hasWon);
    commit('SET_GAME_LOST', !hasWon);
  },
  setGameWon({ state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    db.gameWon({ luid, ...game });
  },
  setGameLost({ state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    db.gameLost({ luid, ...game });
  },
  setGameInactive({ commit }) {
    const isGamePaused = {
      isPaused: true,
      isActive: false,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  toggleGamePaused({ commit, state }) {
    const { isPaused } = state.isGamePaused;

    const isGamePaused = {
      isPaused: !isPaused,
      isActive: true,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  setTimerPaused({ commit }, isPaused) {
    commit('SET_TIMER_PAUSED', isPaused);
  },
  updateTimer({ commit }) {
    commit('UPDATE_GAME_TIME');
  },
  toggleRules({ commit, state }) {
    const showRules = !state.showRules;

    commit('SHOW_RULES', showRules);
  },
  toggleNewGame({ commit, state }) {
    const showNewGame = !state.showNewGame;

    commit('SHOW_NEW_GAME', showNewGame);
  },
  incrementMoves({ commit }) {
    commit('INCREMENT_MOVES');
  },
};

export default actions;
