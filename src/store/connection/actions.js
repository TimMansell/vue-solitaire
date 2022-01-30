import { socketConnect, socketDisconnect, socketError } from '@/services/ws';

const actions = {
  initConnection({ dispatch }) {
    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);
      dispatch('setHasConnected', true);
    });

    socketDisconnect(() => {
      dispatch('setIsOnline', false);
    });

    socketError(() => {
      dispatch('setIsOnline', false);
      dispatch('setIsConnecting', false);
    });
  },
  setIsOnline({ commit }, isOnline) {
    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    commit('SET_IS_CONNECTING', isConnecting);
  },
  setHasConnected({ commit }, hasConnected) {
    commit('SET_HAS_CONNECTED', hasConnected);
  },
};

export default actions;
