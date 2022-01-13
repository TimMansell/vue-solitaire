import {
  socketConnect,
  socketDisconnect,
  socketEmit,
  socketOn,
} from '@/services/ws';
import {
  getVersion,
  setVersion,
  checkVersionIsOutdated,
  checkVersionIsLatest,
} from '@/services/version';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');
    dispatch('updateApp');
    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);
    });

    socketDisconnect(() => {
      dispatch('setIsOnline', false);
    });

    socketOn('getLatestVersion', (latestVersion) => {
      dispatch('checkVersion', latestVersion);
    });
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  updateApp({ commit, dispatch, getters }) {
    const { version, isEmptyBoard } = getters;

    const appVersion = getVersion();
    const isVersionOutdated = checkVersionIsOutdated(appVersion, version);
    const showUpdated = isVersionOutdated && !isEmptyBoard;

    if (isVersionOutdated) {
      dispatch('restartApp');
      dispatch('restartGame');
    }

    dispatch('setVersion', version);

    commit('SET_HAS_UPDATED', showUpdated);
  },
  setIsOnline({ commit }, isOnline) {
    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    commit('SET_IS_CONNECTING', isConnecting);
  },
  checkVersion({ commit }, latestVersion) {
    const appVersion = getVersion();
    const isVersionLatest = checkVersionIsLatest(appVersion, latestVersion);

    commit('SET_IS_LATEST_VERSION', isVersionLatest);
  },
  setVersion({ commit }, version) {
    setVersion(version);

    commit('SET_VERSION', version);
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
    const { uid, game } = getters;

    socketEmit('saveGame', { uid, game });

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
