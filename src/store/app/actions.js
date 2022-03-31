import { createToast } from '@/services/toast';

const actions = {
  initApp({ dispatch }) {
    dispatch('checkVersion');
    dispatch('initUser');
    dispatch('initConnection');
  },
  restartApp({ commit, dispatch }) {
    dispatch('restartGame');

    commit('RESTART_APP');
  },
  checkVersion({ commit, dispatch, getters }) {
    const { version, latestVersion } = getters;

    if (version === latestVersion) return;

    createToast({
      id: 'updated',
      content: 'Game has been updated to latest version',
      icon: 'check-circle',
      timeout: 3000,
    });

    dispatch('restartApp');

    commit('SET_VERSION', latestVersion);
  },
  setVersion({ commit }, { latestVersion, isOutdated }) {
    commit('SET_LATEST_VERSION', latestVersion);
    commit('SET_IS_OUTDATED_VERSION', isOutdated);
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
