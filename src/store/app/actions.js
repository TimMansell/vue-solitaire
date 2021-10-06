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
      dispatch('hasConnection', true);
    });

    socketDrop(() => {
      dispatch('hasConnection', false);
    });

    socketOn('version', (version) => {
      dispatch('checkVersion', version);
    });
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  hasConnection({ commit }, hasConnection) {
    commit('SET_HAS_CONNECTION', hasConnection);
  },
  checkVersion({ commit }, version) {
    const localVersion = localStorage.getItem('version');
    const matches = localVersion === version;

    localStorage.setItem('version', version);

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
  async saveGame({ state }) {
    const { game } = state;

    socketEmit('saveGame', { ...game });
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
