import { createConnection, connect, on, disconnect } from '@/services/ws';
import { createToast, updateToast, dismissToast } from '@/services/toast';

const actions = {
  initConnection({ dispatch, getters }) {
    createConnection(getters.uid);

    dispatch('setIsConnecting', true);
    dispatch('initWatchers');
  },
  initWatchers({ dispatch }) {
    connect(() => {
      dispatch('connected');
      // dispatch('initNewGame');
    });

    disconnect(() => {
      dispatch('disconnected');
    });

    on('checkVersion', (version) => {
      dispatch('checkVersion', version);
    });

    on('setUserGamesPlayed', (games) => {
      dispatch('setUserGamesPlayed', games);
    });

    on('setGlobalGamesPlayed', (games) => {
      dispatch('setGlobalGamesPlayed', games);
    });

    on('setPlayerCount', (players) => {
      dispatch('setPlayerCount', players);
    });

    on('setOnlinePlayerCount', (players) => {
      dispatch('setOnlinePlayerCount', players);
    });

    on('getUser', (user) => {
      dispatch('setUser', user);
    });

    on('newGame', (deck) => {
      dispatch('initBoard', deck);
      dispatch('initFoundation');
    });

    on('setStats', (stats) => {
      dispatch('setStats', stats);
    });

    on('setLeaderboards', (leaderboards) => {
      dispatch('setLeaderboards', leaderboards);
    });

    on('setUserGames', (games) => {
      dispatch('setUserGames', games);
    });
  },
  connected({ dispatch }) {
    dispatch('setIsOnline', true);
    dispatch('setIsConnecting', false);
  },
  disconnected({ dispatch }) {
    dispatch('setIsOnline', false);
    dispatch('setIsConnecting', false);

    dismissToast({ id: 'connection' });
  },
  setIsOnline({ commit }, isOnline) {
    if (isOnline) {
      updateToast({
        id: 'connection',
        content: 'Connected to game server',
        icon: 'check-circle',
        timeout: 2000,
      });
    }

    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    if (isConnecting) {
      createToast({
        id: 'connection',
        content: 'Connecting to game server',
        icon: 'clock',
      });
    }

    commit('SET_IS_CONNECTING', isConnecting);
  },
};

export default actions;
