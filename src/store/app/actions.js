import { checkAppVersion, saveGame } from '@/services/db';
import { version } from '../../../package.json';

const actions = {
  async initApp({ dispatch }, { getStats }) {
    await Promise.all([
      dispatch('initUser'),
      dispatch('initGame'),
      dispatch('getUser'),
      dispatch('checkAppVersion', version),
    ]);

    if (getStats) {
      dispatch('getStatsCount');
    }
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  async checkAppVersion({ commit }, localVersionNumber) {
    const { matches } = await checkAppVersion(localVersionNumber);

    commit('SET_VERSION_MATCH', matches);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
    commit('SET_TIMER_PAUSED', isGameLoading);
  },
  async newGame({ dispatch }) {
    await Promise.all([
      dispatch('saveGame'),
      dispatch('restartApp'),
      dispatch('restartGame'),
    ]);

    dispatch('initApp', { getStats: false });
  },
  setGameState({ commit }, hasWon) {
    commit('SET_GAME_WON', hasWon);
    commit('SET_GAME_LOST', !hasWon);
  },
  async saveGame({ dispatch, state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    const newGame = saveGame(luid, game);
    const newUser = dispatch('createUser');

    await Promise.all([newGame, newUser]);

    dispatch('getStatsCount');
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
  saveMove({ commit, rootState }, move) {
    const { selectedCardId } = rootState.solitaire;

    commit('SET_MOVES', {
      selectedCardId,
      ...move,
    });
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
};

export default actions;
