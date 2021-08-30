import { checkAppVersion, saveGame } from '@/services/db';
import { version } from '../../../package.json';

const actions = {
  async initApp({ dispatch }, hasAppRestarted = false) {
    await Promise.all([
      dispatch('initGame'),
      dispatch('initUser'),
      dispatch('getUser'),
      dispatch('checkAppVersion'),
    ]);

    if (!hasAppRestarted) {
      dispatch('getStatsCount');
    }
  },
  restartApp({ dispatch, commit }) {
    const hasAppRestarted = true;

    commit('RESTART_APP');

    dispatch('restartGame');
    dispatch('initApp', hasAppRestarted);
  },
  async checkAppVersion({ commit }) {
    const versionMatch = await checkAppVersion(version);

    commit('SET_VERSION_MATCH', versionMatch);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
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

    return saveGame(luid, game, gameStatus);
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
