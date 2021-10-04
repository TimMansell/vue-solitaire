import { getInitialData } from '@/services/db';
import { emitSocket } from '@/services/websockets';
import { version as localVersion } from '../../../package.json';

const actions = {
  async initApp({ dispatch }) {
    const uid = await dispatch('initUser');

    const { user, version } = await getInitialData(uid, localVersion);

    dispatch('initGame');
    dispatch('setUser', user);
    dispatch('initStats');
    dispatch('setAppVersion', version);
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  setAppVersion({ commit }, { matches }) {
    commit('SET_VERSION_MATCH', matches);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
    commit('SET_GAME_PAUSED', isGameLoading);
  },
  async newGame({ dispatch }) {
    dispatch('saveGame');
    dispatch('restartApp');
    dispatch('restartGame');
  },
  setGameOutcome({ commit }, hasWon) {
    commit('SET_GAME_OUTCOME', hasWon);
  },
  async saveGame({ state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    // await Promise.all([saveGame(luid, game), dispatch('createUser')]);

    emitSocket('saveGame', { uid: luid, ...game });
  },
  setGamePaused({ commit }, isGamePaused) {
    commit('SET_GAME_PAUSED', isGamePaused);
  },
  updateTimer({ commit }) {
    commit('UPDATE_GAME_TIME');
  },
  toggleOverlayVisibility({ commit }) {
    commit('SET_OVERLAY_VISIBLE');
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
