import { saveGame, getInitialData } from '@/services/db';
import { createISODate } from '@/helpers/dates';
import { version as localVersion } from '../../../package.json';

const actions = {
  async initApp({ dispatch }) {
    const uid = await dispatch('initUser');

    const { user, userStats, globalStats, version } = await getInitialData(
      uid,
      localVersion
    );

    dispatch('initGame');
    dispatch('setUser', user);
    dispatch('setStatsCount', { userStats, globalStats });
    dispatch('setAppVersion', version);
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  setAppVersion({ commit }, { matches }) {
    commit('SET_VERSION_MATCH', matches);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
    commit('SET_GAME_PAUSED', isGameLoading);
  },
  async newGame({ dispatch }) {
    await Promise.all([
      dispatch('saveGame'),
      dispatch('restartApp'),
      dispatch('restartGame'),
    ]);

    dispatch('initApp');
  },
  setGameStartTime({ commit }, startTime) {
    commit('SET_GAME_START_TIME', startTime);
  },
  setGameOutcome({ commit }, hasWon) {
    commit('SET_GAME_OUTCOME', hasWon);
  },
  async saveGame({ dispatch, state, rootState }) {
    const { luid } = rootState.user;
    const { game } = state;

    await Promise.all([saveGame(luid, game), dispatch('createUser')]);
  },
  setGamePaused({ commit, state }, isGamePaused) {
    const { isGameLoading } = state;
    const date = createISODate();

    if (!isGameLoading) {
      commit('SET_MOVES', {
        date,
        isGamePaused,
      });
    }

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  updateTimer({ commit }) {
    const date = createISODate();

    commit('UPDATE_GAME_TIME', date);
  },
  toggleOverlayVisibility({ commit }) {
    commit('SET_OVERLAY_VISIBLE');
  },
  saveMove({ commit, state }, move) {
    const [{ date }] = state.game.times.slice(-1);

    commit('SET_MOVES', {
      date,
      ...move,
    });
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
};

export default actions;
