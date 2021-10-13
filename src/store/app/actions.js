import {
  socketConnect,
  socketDrop,
  socketEmit,
  socketOn,
} from '@/services/websockets';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');

    socketConnect(() => {
      dispatch('checkVersion');
      dispatch('setIsOnline', true);
    });

    socketDrop(() => {
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
    localStorage.setItem('isOnline', isOnline);

    commit('SET_IS_ONLINE', isOnline);
  },
  checkVersion() {
    const version = localStorage.getItem('appVersion');

    socketEmit('checkVersion', version);
  },
  setVersion({ commit }, { version, matches }) {
    localStorage.setItem('appVersion', version);

    commit('SET_VERSION_MATCH', matches);
  },
  newGame({ dispatch }) {
    dispatch('saveGame');
    dispatch('restartApp');
    dispatch('restartGame');
  },
  setGameOutcome({ commit }, hasWon) {
    commit('SET_GAME_OUTCOME', hasWon);
  },
  saveGame({ getters }) {
    const { uid, game } = getters;

    socketEmit('saveGame', { uid, game });
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
