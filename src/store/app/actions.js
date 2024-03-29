import router from '@/router';
import { createToast } from '@/services/toast';
import { getOldVersion, updateVersion } from '@/services/version';
import { formatRoute } from '@/helpers/route';

const actions = {
  initApp({ dispatch }) {
    dispatch('checkUpdate');
    dispatch('initUser');
    dispatch('initConnection');
  },
  update({ commit }) {
    const hasUpdated = updateVersion();

    createToast({
      id: 'updated',
      content: 'Game has been updated to latest version',
      position: 'top-center',
      icon: 'check-circle',
      timeout: 3000,
    });

    commit('SET_HAS_UPDATED', hasUpdated);
  },
  checkUpdate({ dispatch }) {
    const isOldVersion = getOldVersion();

    if (!isOldVersion) return;

    dispatch('update');
  },
  newUpdate({ commit }, isOutdated) {
    commit('SET_IS_OUTDATED_VERSION', isOutdated);
  },
  newGame({ dispatch }) {
    dispatch('saveGame');
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
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
  goToRoute(_, route) {
    const formattedRoute = formatRoute(route);

    router.replace(formattedRoute).catch((e) => console.log({ e }));
  },
  updateRoute(_, params) {
    router.replace({ params }).catch((e) => console.log({ e }));
  },
};

export default actions;
