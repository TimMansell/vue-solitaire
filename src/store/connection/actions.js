import { socketConnect, socketDisconnect, socketError } from '@/services/ws';
import { toast } from '@/services/toast';

const actions = {
  initConnection({ dispatch }) {
    toast('Connecting to game server', {
      id: 'connecting',
      bodyClassName: ['toast-connection-alert'],
    });

    dispatch('setIsConnecting', true);

    socketConnect(() => {
      dispatch('setIsOnline', true);
      dispatch('setIsConnecting', false);

      toast.update('connecting', { content: 'Connected to game server' }, true);
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
