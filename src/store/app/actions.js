import db from '@/services/db';

const actions = {
  async init({ dispatch, state }) {
    const { isNewGame } = state;

    dispatch('initGame', isNewGame);

    if (isNewGame) {
      await dispatch('create', true);
    }

    dispatch('getStatsCount');
  },
  restart({ dispatch, commit, state }, isCompleted) {
    const { game } = state;

    if (!isCompleted) {
      db.gameAbandoned(game);
    }

    dispatch('restartGame');

    commit('RESTART');
  },
  async create({ commit, rootState }) {
    const { suid } = rootState.user;
    const { error, response } = await db.gameNew(suid);

    if (!error) {
      const {
        newGame: { _id: id },
      } = response;

      commit('SET_GAME', { id });
      commit('NEW_GAME', false);
    }
  },
  setGameState({ commit, dispatch }, isBoardEmpty) {
    if (isBoardEmpty) {
      dispatch('setGameWon');
    } else {
      dispatch('setGameLost');
    }

    commit('SET_GAME_WON', isBoardEmpty);
    commit('SET_GAME_LOST', !isBoardEmpty);
  },
  setGameWon({ state }) {
    const { game } = state;

    db.gameWon(game);
  },
  setGameLost({ state }) {
    const { game } = state;

    db.gameLost(game);
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
