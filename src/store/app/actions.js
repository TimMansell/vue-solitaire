import { createToast } from '@/services/toast';

const actions = {
  initApp({ dispatch }) {
    dispatch('checkUpdate');
    dispatch('initUser');
    dispatch('initConnection');
  },
  update({ dispatch }) {
    createToast({
      id: 'updated',
      content: 'Game has been updated to latest version',
      icon: 'check-circle',
      timeout: 3000,
    });

    dispatch('restartGame');
  },
  checkUpdate({ commit, dispatch, state }) {
    const { version } = state;

    commit('RESTART_APP');

    if (state.version === version) return;

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
