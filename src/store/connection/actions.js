import { connect } from '@/services/ws';
import { createToast, updateToast, dismissToast } from '@/services/toast';

const actions = {
  initConnection({ commit, dispatch, getters }) {
    const socket = connect({ uid: getters.uid });

    commit('SET_CONNECTION', socket);

    dispatch('initConnectionEvents');
    dispatch('initOnEvents');
  },
  initConnectionEvents({ state, dispatch }) {
    const { socket } = state;

    dispatch('setIsConnecting', true);

    socket.onConnect(() => dispatch('connected'));
    socket.onDisconnect(() => dispatch('disconnected'));
  },
  initOnEvents({ state, dispatch }) {
    const { socket } = state;

    socket.on('checkVersion', (version) => dispatch('checkVersion', version));

    socket.on('setUserGamesPlayed', (games) =>
      dispatch('setUserGamesPlayed', games)
    );

    socket.on('setGlobalGamesPlayed', (games) =>
      dispatch('setGlobalGamesPlayed', games)
    );

    socket.on('setPlayerCount', (players) =>
      dispatch('setPlayerCount', players)
    );

    socket.on('setOnlinePlayerCount', (players) =>
      dispatch('setOnlinePlayerCount', players)
    );

    socket.on('getUser', (user) => dispatch('setUser', user));

    socket.on('newGame', (deck) => dispatch('newBoard', deck));

    socket.on('setStats', (stats) => dispatch('setStats', stats));

    socket.on('setLeaderboards', (leaderboards) =>
      dispatch('setLeaderboards', leaderboards)
    );

    socket.on('setUserGames', (games) => dispatch('setUserGames', games));
  },
  emit({ state }, { name, params }) {
    const { socket } = state;

    socket.emit(`${name}`, params);
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
