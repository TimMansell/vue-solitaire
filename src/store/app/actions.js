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
  restartApp({ commit }, hasConnection) {
    commit('RESTART_APP', hasConnection);
  },
  hasConnection({ commit }, hasConnection) {
    commit('SET_HAS_CONNECTION', hasConnection);
  },
  checkVersion() {
    const appVersion = localStorage.getItem('appVersion');

    socketEmit('checkVersion', appVersion);
  },
  setVersion({ commit }, { version, matches }) {
    localStorage.setItem('appVersion', version);

    commit('SET_VERSION_MATCH', matches);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
  },
  newGame({ dispatch, state }) {
    const { hasOfflineMove, hasConnection, isOfflineGame } = state;

    if (!hasOfflineMove && hasConnection && !isOfflineGame) {
      dispatch('saveOnlineGame');
      return;
    }

    if (!hasConnection) {
      dispatch('newOfflineGame');
      return;
    }

    if (hasConnection && (hasConnection || isOfflineGame)) {
      dispatch('newOnlineGame');
    }
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
  saveMove({ commit, dispatch, rootState, state }, move) {
    const { hasConnection } = state;
    const { selectedCardId } = rootState.solitaire;

    if (!hasConnection) {
      dispatch('setOfflineMove', true);
    }

    commit('SET_MOVES', {
      selectedCardId,
      ...move,
    });
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
  setOfflineMove({ commit }, hasMove) {
    commit('SET_OFFLINE_MOVE', hasMove);
  },
  setOfflineGame({ commit }, isOfflineGame) {
    commit('SET_OFFLINE_GAME', isOfflineGame);
  },
};

export default actions;
