import db from '@/services/db';

import { version } from '../../../package.json';

const actions = {
  async initApp({ dispatch }) {
    await Promise.all([dispatch('initGame'), dispatch('initUser')]);

    dispatch('getStatsCount');
    dispatch('checkAppVersion', version);
  },
  async restartApp({ dispatch, commit }, isCompleted) {
    if (!isCompleted) {
      await dispatch('setGameQuit');
    }

    dispatch('restartGame');
    dispatch('initApp');

    commit('RESTART_APP');
  },
  async checkAppVersion({ commit }, localVersion) {
    const {
      error,
      response: {
        version: { number: serverVersion },
      },
    } = await db.getAppVersion();

    if (!error) {
      const versionMatch = localVersion === serverVersion;

      commit('SET_VERSION_MATCH', versionMatch);
    }
  },
  setGameState({ dispatch }, hasWon) {
    if (hasWon) {
      dispatch('setGameWon');
    } else {
      dispatch('setGameLost');
    }
  },
  async setGameWon({ commit, state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    await db.gameWon({ luid, ...game });

    commit('SET_GAME_WON', true);
  },
  async setGameLost({ commit, state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    await db.gameLost({ luid, ...game });

    commit('SET_GAME_LOST', true);
  },
  async setGameQuit({ state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    await db.gameQuit({ luid, ...game });
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
  toggleOverlayVisibility({ commit, state }) {
    const isOverlayVisible = !state.isOverlayVisible;

    commit('SET_OVERLAY_VISIBLE', isOverlayVisible);
  },
  toggleHistory({ commit }) {
    commit('SHOW_HISTORY');
  },
  incrementMoves({ commit }) {
    commit('INCREMENT_MOVES');
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
};

export default actions;
