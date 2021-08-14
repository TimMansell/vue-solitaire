import db from '@/services/db';

import { version } from '../../../package.json';

const actions = {
  async initApp({ dispatch }) {
    await Promise.all([
      dispatch('initGame'),
      dispatch('initUser'),
      dispatch('getUser'),
      dispatch('checkAppVersion', version),
    ]);

    dispatch('getStatsCount');
  },
  restartApp({ dispatch, commit }) {
    commit('RESTART_APP');

    dispatch('restartGame');
    dispatch('initApp');
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
  setNewGame({ dispatch }, isCompleted) {
    if (!isCompleted) {
      dispatch('setGameResult', { quit: true });
    }

    dispatch('restartApp');
  },
  setGameState({ commit, dispatch }, hasWon) {
    if (hasWon) {
      dispatch('setGameResult', { won: true });
    } else {
      dispatch('setGameResult', { lost: true });
    }

    commit('SET_GAME_WON', hasWon);
    commit('SET_GAME_LOST', !hasWon);
  },
  async setGameResult({ dispatch }, gameStatus) {
    const newGame = dispatch('saveGame', gameStatus);
    const newUser = dispatch('createUser');

    await Promise.all([newGame, newUser]);

    dispatch('getStatsCount');
  },
  async saveGame({ state, rootState }, gameStatus) {
    const { luid } = rootState.user;
    const { game } = state;
    const { won, lost } = gameStatus;

    if (won) {
      return db.gameWon({ luid, ...game });
    }

    if (lost) {
      return db.gameLost({ luid, ...game });
    }

    return db.gameQuit({ luid, ...game });
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
