import { connect } from '@/services/ws';
import { createToast, updateToast, dismissToast } from '@/services/toast';

const actions = {
  initConnection({ commit, dispatch, getters }) {
    const { uid, version } = getters;

    const socket = connect({ uid, version });

    socket.on('connect', () => dispatch('connected'));
    socket.on('disconnect', () => dispatch('disconnected'));
    socket.on('newUpdate', (update) => dispatch('newUpdate', update));
    socket.on('userPlayed', (games) => dispatch('setUserPlayed', games));
    socket.on('globalPlayed', (games) => dispatch('setGlobalPlayed', games));
    socket.on('playerCount', (players) => dispatch('setPlayerCount', players));
    socket.on('onlineCount', (players) => dispatch('setOnlineCount', players));
    socket.on('newGame', ({ cards }) => dispatch('initGame', cards));
    socket.on('stats', (stats) => dispatch('setStats', stats));
    socket.on('userGames', (games) => dispatch('setUserGames', games));
    socket.on('leaderboards', (games) => dispatch('setLeaderboards', games));
    socket.on('user', ({ cards, name }) => {
      dispatch('setUser', name);
      dispatch('initGame', cards);
    });

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
