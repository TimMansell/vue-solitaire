import { socketConnect, socketDisconnect, socketError } from '@/services/ws';
import { createToast, updateToast } from '@/services/toast';

const actions = {
  initConnection({ dispatch }) {
    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);
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
    if (isOnline) {
      updateToast({
        id: 'connection',
        content: 'Connected to game server',
      });
    }

    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    if (isConnecting) {
      createToast({
        id: 'connection',
        content: 'Connecting to game server',
      });
    }

    commit('SET_IS_CONNECTING', isConnecting);
  },
};

export default actions;
