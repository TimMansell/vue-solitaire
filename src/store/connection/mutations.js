const mutations = {
  SET_IS_ONLINE(state, isOnline) {
    state.isOnline = isOnline;
  },
  SET_IS_CONNECTING(state, isConnecting) {
    state.isConnecting = isConnecting;
  },
  SET_HAS_CONNECTED(state, hasConnected) {
    state.hasConnected = hasConnected;
  },
};

export default mutations;
