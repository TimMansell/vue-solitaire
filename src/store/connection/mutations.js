const mutations = {
  SET_IS_ONLINE(state, isOnline) {
    state.isOnline = isOnline;
  },
  SET_IS_CONNECTING(state, isConnecting) {
    state.isConnecting = isConnecting;
  },
  SET_CONNECTION(state, socket) {
    state.socket = socket;
  },
};

export default mutations;
