import { checkAppVersion, saveGame, moveCard, pauseGame } from '@/services/db';
import { getSelectedCard } from '@/services/solitaire';
import { version } from '../../../package.json';

const actions = {
  async initApp({ dispatch }, { getStats }) {
    await Promise.all([
      dispatch('initGame'),
      dispatch('initUser'),
      dispatch('getUser'),
      dispatch('checkAppVersion', version),
    ]);

    if (getStats) {
      dispatch('getStatsCount');
    }
  },
  restartApp({ commit }) {
    commit('RESTART_APP');
  },
  async checkAppVersion({ commit }, localVersionNumber) {
    const { matches } = await checkAppVersion(localVersionNumber);

    commit('SET_VERSION_MATCH', matches);
  },
  setGameLoading({ commit }, isGameLoading) {
    commit('SET_GAME_LOADING', isGameLoading);
    commit('SET_TIMER_PAUSED', isGameLoading);
  },
  async newGame({ dispatch }, isCompleted) {
    if (!isCompleted) {
      dispatch('setGameResult', { quit: true });
    }

    await Promise.all([dispatch('restartApp'), dispatch('restartGame')]);

    dispatch('initApp', { getStats: false });
  },
  setGameState({ commit, dispatch }, hasWon) {
    if (hasWon) {
      dispatch('setGameResult', { won: true });
    } else {
      dispatch('setGameResult', { lost: true });
    }

    commit('SET_GAME_WON', hasWon);
    commit('SET_GAME_LOST', !hasWon);
  },
  async setGameResult({ dispatch }, gameStatus) {
    const newGame = dispatch('saveGame', gameStatus);
    const newUser = dispatch('createUser');

    await Promise.all([newGame, newUser]);

    dispatch('getStatsCount');
  },
  async saveGame({ state, rootState }, gameStatus) {
    const { luid } = rootState.user;
    const { game } = state;

    return saveGame(luid, game, gameStatus);
  },
  setGameInactive({ commit }) {
    const isGamePaused = {
      isPaused: true,
      isActive: false,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  toggleGamePaused({ commit, state }) {
    const { isPaused } = state.isGamePaused;

    const isGamePaused = {
      isPaused: !isPaused,
      isActive: true,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  async setTimerPaused({ commit, rootState }, isPaused) {
    const { luid } = rootState.user;

    pauseGame(luid);

    commit('SET_TIMER_PAUSED', isPaused);
  },
  updateTimer({ commit }) {
    commit('UPDATE_GAME_TIME');
  },
  toggleRules({ commit, state }) {
    const showRules = !state.showRules;

    commit('SHOW_RULES', showRules);
  },
  toggleNewGame({ commit, state }) {
    const showNewGame = !state.showNewGame;

    commit('SHOW_NEW_GAME', showNewGame);
  },
  toggleOverlayVisibility({ commit, state }) {
    const isOverlayVisible = !state.isOverlayVisible;

    commit('SET_OVERLAY_VISIBLE', isOverlayVisible);
  },
  toggleHistory({ commit }) {
    commit('SHOW_HISTORY');
  },
  async saveMove({ commit, rootState }, { selectedColumn, type }) {
    const { cards, selectedCardId } = rootState.solitaire;
    const { luid } = rootState.user;

    const card = getSelectedCard(cards, selectedCardId);

    const movedCard = await moveCard(luid, card, {
      selectedCardId,
      selectedColumn,
      type,
    });

    commit('SET_MOVES', movedCard);
  },
  setTableHelper({ commit }, showHelper) {
    commit('SHOW_TABLE_HELPER', showHelper);
  },
};

export default actions;
