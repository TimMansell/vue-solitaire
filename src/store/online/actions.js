import { socketEmit } from '@/services/websockets';

const actions = {
  async initNewOnlineGame({ dispatch, rootState }) {
    const uid = await dispatch('getUser');
    const { cards } = rootState.solitaire;

    if (cards.flat().length === 0) {
      dispatch('setGameLoading', true);
      socketEmit('newGame', uid);
    }
  },
  newOnlineGame({ dispatch }) {
    dispatch('restartApp', true);
    dispatch('restartGame');
    dispatch('initNewOnlineGame');

    console.log('newOnlineGame');
  },
  saveOnlineGame({ dispatch }) {
    dispatch('saveGame');
    dispatch('restartApp', true);
    dispatch('restartGame');

    console.log('saveOnlineGame');
  },
};

export default actions;
