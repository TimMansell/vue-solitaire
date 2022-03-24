import { getVersion, setVersion, checkVersion } from '@/services/version';
import { createToast } from '@/services/toast';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initConnection');
    dispatch('updateApp');
  },
  restart({ dispatch }) {
    dispatch('restartApp');
    dispatch('restartGame');

    dispatch('emit', {
      name: 'newGame',
    });
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
      dispatch('restart');
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
    dispatch('restart');
  },
  setGameOutcome({ commit, dispatch }, hasWon) {
    dispatch('saveGame');
    dispatch('createUser');

    commit('SET_GAME_OUTCOME', hasWon);
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
