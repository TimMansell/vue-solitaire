import { socketEmit, socketOn } from '@/services/ws';
import { getVersion, setVersion, checkVersion } from '@/services/version';
import { createToast } from '@/services/toast';

const actions = {
  initApp({ dispatch }) {
    dispatch('initConnection');
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');
    dispatch('updateApp');

    socketOn('checkVersion', (version) => {
      dispatch('checkVersion', version);
    });

    socketOn('gameSaved', () => {
      dispatch('createUser');
    });
  },
  restart({ dispatch }) {
    dispatch('restartApp');
    dispatch('restartGame');
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
  newGame({ dispatch, getters }) {
    const { isCompletedGame } = getters;

    if (!isCompletedGame) {
      dispatch('saveGame');
    }

    dispatch('restart');
    dispatch('initNewGame');
  },
  setGameOutcome({ commit, dispatch }, hasWon) {
    dispatch('saveGame');

    commit('SET_GAME_OUTCOME', hasWon);
  },
  saveGame({ getters }) {
    const { uid, game } = getters;

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
