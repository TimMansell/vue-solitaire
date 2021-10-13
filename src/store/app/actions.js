import {
  socketConnect,
  socketDrop,
  socketEmit,
  socketOn,
} from '@/services/websockets';

const actions = {
  async initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');

    socketConnect(() => {
      dispatch('checkVersion');
      dispatch('hasConnection', true);
    });

    socketDrop(() => {
      dispatch('hasConnection', false);
    });

    socketOn('checkVersion', (version) => {
      dispatch('setVersion', version);
    });
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  hasConnection({ commit }, hasConnection) {
    localStorage.setItem('hasConnection', hasConnection);

    commit('SET_HAS_CONNECTION', hasConnection);
  },
  checkVersion() {
    const version = localStorage.getItem('appVersion');

    socketEmit('checkVersion', version);
  },
  setVersion({ commit }, { version, matches }) {
    localStorage.setItem('appVersion', version);

    commit('SET_VERSION_MATCH', matches);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
  },
  newGame({ dispatch }) {
    dispatch('saveGame');
    dispatch('restartApp');
    dispatch('restartGame');
  },
  setGameOutcome({ commit }, hasWon) {
    commit('SET_GAME_OUTCOME', hasWon);
  },
  async saveGame({ dispatch, state }) {
    const { game } = state;
    const uid = await dispatch('getUser');

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
