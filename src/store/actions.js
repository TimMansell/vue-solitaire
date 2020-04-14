import {
  shuffleCards,
  dealCards,
  isBothCardsSelected,
  checkValidCardMove,
  moveCard,
  revealExposedHiddenCards,
  moveCardToAce,
  checkValidAceMove,
  moveKingToColumn,
  checkValidKingMove,

} from '@/services/solitaire';

const actions = {
  initGame({ commit, state }) {
    const { cards } = state;
    const shuffledCards = shuffleCards(cards);
    commit('shuffleCards', shuffledCards);

    const board = dealCards(state);
    commit('dealCards', board);
  },
  moveCard({ commit, state }, card) {
    commit('selectCard', card);

    const areBothCardsSelected = isBothCardsSelected(state);
    if (areBothCardsSelected) {
      const isValidMove = checkValidCardMove(state);

      if (isValidMove) {
        const moveCards = moveCard(state);
        commit('moveCards', moveCards);

        const exposedCards = revealExposedHiddenCards(state);
        commit('revealExposedHiddenCards', exposedCards);
      } else {
        commit('invalidMove');
      }
    }
  },
  moveCardToAce({ commit, state }) {
    const isValidMove = checkValidAceMove(state);

    if (isValidMove) {
      const moveCards = moveCardToAce(state);
      commit('moveCardToAce', moveCards);

      const exposedCards = revealExposedHiddenCards(state);
      commit('revealExposedHiddenCards', exposedCards);
    } else {
      commit('invalidMove');
    }
  },
  moveKingToColumn({ commit, state }, column) {
    const isValidMove = checkValidKingMove(state, column);

    if (isValidMove) {
      const moveCards = moveKingToColumn(state, column);
      commit('moveKingToColumn', moveCards);

      const exposedCards = revealExposedHiddenCards(state);
      commit('revealExposedHiddenCards', exposedCards);
    } else {
      commit('invalidMove');
    }
  },
  dealTestCards({ commit, state }, deck) {
    commit('setDeck', deck);

    const board = dealCards(state);
    commit('dealCards', board);
  },
  setTestBoard({ commit }, deck) {
    commit('setBoard', deck);
  },
};

export default actions;
