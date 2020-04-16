import {
  shuffleCards,
  setBoard,
  isBothCardsSelected,
  checkValidCardMove,
  moveCards,
  revealHiddenCard,
  moveCardToFoundation,
  checkValidFoundationMove,
  moveKingToColumn,
  checkValidKingMove,

} from '@/services/solitaire';

const actions = {
  initGame({ commit, state }) {
    const { cards } = state;

    const shuffledCards = shuffleCards(cards);
    commit('shuffleCards', shuffledCards);

    const board = setBoard(state);
    commit('setBoard', board);
  },
  moveCard({ commit, state }, card) {
    commit('selectCard', card);

    const areBothCardsSelected = isBothCardsSelected(state);
    if (areBothCardsSelected) {
      const isValidMove = checkValidCardMove(state);

      if (isValidMove) {
        const cardsToMove = moveCards(state);
        commit('moveCards', cardsToMove);

        const hiddenCard = revealHiddenCard(state);
        commit('revealHiddenCard', hiddenCard);
      } else {
        commit('invalidMove');
      }
    }
  },
  moveCardToFoundation({ commit, state }, column) {
    const isValidMove = checkValidFoundationMove(state, column);

    if (isValidMove) {
      const cardToMove = moveCardToFoundation(state, column);
      commit('moveCardToFoundation', cardToMove);

      const hiddenCard = revealHiddenCard(state);
      commit('revealHiddenCard', hiddenCard);
    } else {
      commit('invalidMove');
    }
  },
  moveKingToColumn({ commit, state }, column) {
    const isValidMove = checkValidKingMove(state, column);

    if (isValidMove) {
      const cardsToMove = moveKingToColumn(state, column);
      commit('moveKingToColumn', cardsToMove);

      const hiddenCard = revealHiddenCard(state);
      commit('revealHiddenCard', hiddenCard);
    } else {
      commit('invalidMove');
    }
  },
  dealTestCards({ commit, state }, deck) {
    commit('setDeck', deck);

    const board = setBoard(state);
    commit('setBoard', board);
  },
  setTestBoard({ commit }, deck) {
    commit('setBoard', deck);
  },
};

export default actions;
