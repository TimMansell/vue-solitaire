import { createToast } from '@/services/toast';
import { checkIsOldVersion, updateVersion } from '@/services/version';

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

    const hasUpdated = updateVersion();

    commit('SET_HAS_UPDATED', hasUpdated);
  },
  checkUpdate({ dispatch }) {
    const isOldVersion = checkIsOldVersion();

    if (!isOldVersion) return;

    dispatch('update');
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
