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
import { version } from '../../../package.json';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');
    dispatch('checkVersion');
    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('getLatestVersion');
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);
    });

    socketDisconnect(() => {
      dispatch('setIsOnline', false);
    });

    socketOn('getLatestVersion', (latestVersion) => {
      dispatch('setVersion', latestVersion);
    });
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  updateApp({ dispatch }) {
    dispatch('restartApp');
    dispatch('restartGame');
    dispatch('initNewGame');
  },
  setIsOnline({ commit }, isOnline) {
    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    commit('SET_IS_CONNECTING', isConnecting);
  },
  checkVersion({ commit }) {
    const appVersion = getVersion();
    const isVersionOutdated = checkVersionIsOutdated(appVersion, version);

    setVersion(version);

    commit('SET_IS_OUTDATED_VERSION', isVersionOutdated);
  },
  getLatestVersion() {
    socketEmit('getLatestVersion');
  },
  setVersion({ commit }, { latestVersion }) {
    const appVersion = getVersion();
    const isVersionLatest = checkVersionIsLatest(appVersion, latestVersion);

    commit('SET_IS_LATEST_VERSION', isVersionLatest);
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
