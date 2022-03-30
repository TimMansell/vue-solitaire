import { getVersion, setVersion, checkVersion } from '@/services/version';
import { createToast } from '@/services/toast';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initConnection');
    dispatch('updateApp');
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  updateApp({ commit, dispatch, getters }) {
    const { version, isEmptyBoard } = getters;

    const appVersion = getVersion();
    const isVersionOutdated = checkVersion(appVersion, version);
    const showUpdated = isVersionOutdated && !isEmptyBoard;

    if (isVersionOutdated) {
      dispatch('restartApp');
    }

    setVersion(version);

    dispatch('setHasUpdated', showUpdated);

    commit('SET_VERSION', version);
  },
  setHasUpdated({ commit }, showUpdated) {
    if (showUpdated) {
      createToast({
        id: 'updated',
        content: 'Game has been updated to latest version',
        icon: 'check-circle',
      });
    }

    commit('SET_HAS_UPDATED', showUpdated);
  },
  checkVersion({ commit }, version) {
    const appVersion = getVersion();
    const isVersionOutdated = checkVersion(appVersion, version);

    commit('SET_IS_OUTDATED_VERSION', isVersionOutdated);
  },
  newGame({ dispatch }) {
    dispatch('saveGame');
    dispatch('createUser');
    dispatch('restartGame');
  },
  saveGame({ dispatch, getters }) {
    const { game } = getters;

    dispatch('emit', {
      name: 'saveGame',
      params: game,
    });
  },
  setGamePaused({ commit }, isGamePaused) {
    commit('SET_GAME_PAUSED', isGamePaused);
  },
  toggleOverlayVisibility({ commit }) {
    commit('SET_OVERLAY_VISIBLE');
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
};

export default actions;
