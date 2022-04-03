import { createToast } from '@/services/toast';
import { version } from '../../../package.json';

const actions = {
  initApp({ dispatch }) {
    dispatch('checkUpdate');
    dispatch('initUser');
    dispatch('initConnection');
  },
  update({ commit }) {
    createToast({
      id: 'updated',
      content: 'Game has been updated to latest version',
      icon: 'check-circle',
      timeout: 3000,
    });

    commit('SET_HAS_UPDATED', true);
  },
  checkUpdate({ dispatch }) {
    const olderVersions = Object.keys(localStorage).filter(
      (key) =>
        key !== `v${version}` && (key.includes('.') || key.includes('vuex'))
    );

    if (!olderVersions.length) return;

    olderVersions.forEach((olderVersion) =>
      localStorage.removeItem(olderVersion)
    );

    dispatch('update');
    dispatch('restartGame');
  },
  newUpdate({ commit }, isOutdated) {
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
