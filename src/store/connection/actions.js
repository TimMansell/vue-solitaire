import { connect } from '@/services/ws';
import { createToast, updateToast, dismissToast } from '@/services/toast';

const actions = {
  initConnection({ commit, dispatch, getters }) {
    const { uid, userGameCount, timer } = getters;
    const socket = connect({ uid, userGameCount, timer });

    socket.onConnect(() => dispatch('connected'));
    socket.onDisconnect(() => dispatch('disconnected'));
    socket.on('checkVersion', (version) => dispatch('checkVersion', version));
    socket.on('userPlayed', (games) => dispatch('setUserPlayed', games));
    socket.on('globalPlayed', (games) => dispatch('setGlobalPlayed', games));
    socket.on('playerCount', (players) => dispatch('setPlayerCount', players));
    socket.on('onlineCount', (players) => dispatch('setOnlineCount', players));
    socket.on('user', (user) => dispatch('setUser', user));
    socket.on('newGame', (deck) => dispatch('initGame', deck));
    socket.on('stats', (stats) => dispatch('setStats', stats));
    socket.on('userGames', (games) => dispatch('setUserGames', games));
    socket.on('leaderboards', (games) => dispatch('setLeaderboards', games));

    createToast({
      id: 'connection',
      content: 'Connecting to game server',
      icon: 'clock',
    });

    commit('SET_CONNECTION', socket);
  },
  emit({ state }, { name, params }) {
    const { socket } = state;

    socket.emit(`${name}`, params);
  },
  connected({ dispatch }) {
    updateToast({
      id: 'connection',
      content: 'Connected to game server',
      icon: 'check-circle',
      timeout: 2000,
    });

    dispatch('setIsOnline', true);
    dispatch('setIsConnecting', false);
  },
  disconnected({ dispatch }) {
    dismissToast({ id: 'connection' });

    dispatch('setIsOnline', false);
    dispatch('setIsConnecting', false);
  },
  setIsOnline({ commit }, isOnline) {
    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    commit('SET_IS_CONNECTING', isConnecting);
  },
};

export default actions;
