import Vue from 'vue';
import { socketConnect, socketDisconnect, socketError } from '@/services/ws';

const actions = {
  initConnection({ dispatch }) {
    dispatch('setIsConnecting', true);

    const toastId = Vue.$toast('Connecting to game server');

    socketConnect(() => {
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);

      Vue.$toast.update(toastId, { content: 'Connected to game server' }, true);
    });

    socketDisconnect(() => {
      dispatch('setIsOnline', false);
      dispatch('setIsConnecting', false);
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
};

export default actions;
