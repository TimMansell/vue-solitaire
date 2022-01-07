import {
  socketConnect,
  socketDisconnect,
  socketEmit,
  socketOn,
} from '@/services/ws';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');
    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('checkVersion');
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);
    });

    socketDisconnect(() => {
      dispatch('setIsOnline', false);
    });

    socketOn('checkVersion', (version) => {
      dispatch('setVersion', version);
    });
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  setIsOnline({ commit }, isOnline) {
    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    commit('SET_IS_CONNECTING', isConnecting);
  },
  checkVersion() {
    const version = localStorage.getItem('appVersion');

    socketEmit('checkVersion', version);
  },
  setVersion({ commit }, { version, matches }) {
    localStorage.setItem('appVersion', version);

    commit('SET_VERSION_MATCH', matches);
  },
  async newGame({ dispatch, getters }) {
    const { uid, isCompletedGame } = getters;

    dispatch('restartApp');
    dispatch('restartGame');

    if (!isCompletedGame) {
      await dispatch('saveGame');
    }

    socketEmit('newGame', uid);
  },
  setGameOutcome({ commit, dispatch }, hasWon) {
    dispatch('saveGame');

    commit('SET_GAME_OUTCOME', hasWon);
  },
  saveGame({ dispatch, getters }) {
    const { uid, game, gameOutcome } = getters;

    socketEmit('saveGame', { uid, game, gameOutcome });

    dispatch('createUser');
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
  saveMove({ commit, getters }, move) {
    const { selectedCardId } = getters;

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
