import db from '@/services/db';

const actions = {
  async initGame({ dispatch, state }) {
    const { isNewGame } = state;

    dispatch('init', isNewGame);

    if (isNewGame) {
      await dispatch('newGame', true);
    }

    dispatch('getStatsCount');
    // commit('NEW_GAME', false);
  },
  restartGame({ dispatch, commit, state }, completed) {
    const { game } = state;

    if (!completed) {
      db.gameAbandoned(game);
    }

    dispatch('restart');
    // dispatch('newGame', true);

    commit('RESTART');
  },
  async newGame({ dispatch, commit }, isNewGame) {
    if (isNewGame) {
      await dispatch('trackNewGame');
    }
    // } else {
    //   commit('NEW_GAME', completed);
    // }
    commit('NEW_GAME', false);
  },
  async trackNewGame({ commit, rootState }) {
    const { suid } = rootState.user;
    const { error, response } = await db.gameNew(suid);

    if (!error) {
      const {
        newGame: { _id: id },
      } = response;

      commit('SET_GAME', { id });
    }
  },
  setGameState({ commit, state }, isBoardEmpty) {
    const { game } = state;

    if (isBoardEmpty) {
      db.gameWon(game);
    } else {
      db.gameLost(game);
    }

    commit('SET_GAME_WON', isBoardEmpty);
    commit('SET_GAME_LOST', !isBoardEmpty);
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
