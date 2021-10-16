import sha256 from 'crypto-js/sha256';
import { createISODate } from '@/helpers/dates';
import {
  socketConnect,
  socketDisconnect,
  socketEmit,
  socketOn,
} from '@/services/ws';

const actions = {
  initApp({ dispatch }) {
    dispatch('initUser');
    dispatch('initGame');
    dispatch('initStats');
    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('checkVersion');
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);
    });

    socketDisconnect(() => {
      dispatch('setIsOnline', false);
    });

    socketOn('checkVersion', (version) => {
      dispatch('setVersion', version);
    });
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  setIsOnline({ commit }, isOnline) {
    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    commit('SET_IS_CONNECTING', isConnecting);
  },
  checkVersion() {
    const version = localStorage.getItem('appVersion');

    socketEmit('checkVersion', version);
  },
  setVersion({ commit }, { version, matches }) {
    localStorage.setItem('appVersion', version);

    commit('SET_VERSION_MATCH', matches);
  },
  newGame({ dispatch }) {
    dispatch('saveGame');
    dispatch('restartApp');
    dispatch('restartGame');
  },
  setGameHash({ commit }, hash) {
    commit('SET_GAME_HASH', hash);
  },
  setGameOutcome({ commit }, hasWon) {
    commit('SET_GAME_OUTCOME', hasWon);
  },
  saveGame({ getters }) {
    const { uid, game } = getters;

    socketEmit('saveGame', { uid, game });
  },
  setGamePaused({ commit }, isGamePaused) {
    commit('SET_GAME_PAUSED', isGamePaused);
  },
  updateTimer({ commit, getters }) {
    const { gameHash, prevHash } = getters;
    const date = createISODate();
    const hash = sha256(prevHash + date + gameHash).toString();

    commit('UPDATE_GAME_TIME', { date, hash });
  },
  toggleOverlayVisibility({ commit }) {
    commit('SET_OVERLAY_VISIBLE');
  },
  saveMove({ commit, getters }, move) {
    const { selectedCardId, prevHash } = getters;
    const date = createISODate();

    commit('SET_MOVES', {
      selectedCardId,
      ...move,
      date,
      hash: prevHash,
    });
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
};

export default actions;
