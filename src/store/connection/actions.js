import { socketConnect, socketDisconnect, socketError } from '@/services/ws';
import { toast } from '@/services/toast';

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
      toast.update('connecting', { content: 'Connected to game server' }, true);
    }

    commit('SET_IS_ONLINE', isOnline);
  },
  setIsConnecting({ commit }, isConnecting) {
    if (isConnecting) {
      toast('Connecting to game server', {
        id: 'connecting',
        bodyClassName: ['toast-connection-alert'],
      });
    }

    commit('SET_IS_CONNECTING', isConnecting);
  },
};

export default actions;
