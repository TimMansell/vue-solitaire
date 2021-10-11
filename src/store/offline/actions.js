import { initCards } from '@/services/solitaire';

const actions = {
  async initNewOfflineGame({ dispatch, rootState }) {
    const { cards } = rootState.solitaire;

    if (cards.flat().length === 0) {
      dispatch('setGameLoading', true);
      dispatch('newOfflineGame');
    }
  },
  newOfflineGame({ dispatch }) {
    const deck = initCards();

    dispatch('restartApp', false);
    dispatch('restartGame');
    dispatch('initBoard', deck);
    dispatch('initFoundation');
    dispatch('setOfflineGame', true);

    console.log('newOfflineGame');
  },
};

export default actions;
