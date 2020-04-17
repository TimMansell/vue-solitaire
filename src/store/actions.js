import {
  shuffleCards,
  getFoundations,
  setBoard,
  // isBothCardsSelected,
  // checkValidCardMove,
  moveCards,
  // moveCards2,
  revealHiddenCard,
  // moveCardToFoundation,
  // checkValidFoundationMove,
  // moveKingToColumn,
  // checkValidKingMove,

} from '@/services/solitaire';

const actions = {
  initGame({ commit }) {
    const shuffledCards = shuffleCards();
    const board = setBoard(shuffledCards);
    commit('setBoard', board);

    const foundationColumns = getFoundations();
    commit('setFoundations', foundationColumns);
  },
  restartGame({ commit }) {
    commit('restartGame');
  },
  selectCard({ commit, state }, id) {
    const { selectedCard } = state;

    if (selectedCard === id) {
      commit('unSelectCard');
    } else {
      commit('selectCard', id);
    }
  },
  setColumn({ commit }, columnNo) {
    commit('setColumn', columnNo);
  },
  // validateColumnMove({ commit }, columnNo) {
  //   commit('setColumn', columnNo);
  // },
  moveCardsToColumn({ commit, state }) {
    // console.log('sta', state);
    const { selectedCardId, selectedColumn, board } = state;
    const cardsToMove = moveCards(selectedCardId, selectedColumn, board.cards, board.cards);
    commit('moveCardsToColumn', cardsToMove);
  },
  // moveCard({ commit, state }, card) {
  //   commit('selectCard', card);

  //   const areBothCardsSelected = isBothCardsSelected(state);
  //   if (areBothCardsSelected) {
  //     const isValidMove = checkValidCardMove(state);

  //     if (isValidMove) {
  //       const cardsToMove = moveCards(state);
  //       commit('moveCards', cardsToMove);

  //       const hiddenCard = revealHiddenCard(state);
  //       commit('revealHiddenCard', hiddenCard);
  //     } else {
  //       commit('invalidMove');
  //     }
  //   }
  // },
  // moveCardToFoundation({ commit, state }, column) {
  //   const isValidMove = checkValidFoundationMove(state, column);

  //   if (isValidMove) {
  //     const cardToMove = moveCardToFoundation(state, column);
  //     commit('moveCardToFoundation', cardToMove);

  //     const hiddenCard = revealHiddenCard(state);
  //     commit('revealHiddenCard', hiddenCard);
  //   } else {
  //     commit('invalidMove');
  //   }
  // },
  setFoundationColumn({ commit }, columnNo) {
    commit('setColumn', columnNo);
  },
  moveCardToFoundation({ commit, state }) {
    // const isValidMove = checkValidFoundationMove(state, column);
    const { selectedCardId, selectedColumn, board } = state;
    const cardsToMove = moveCards(selectedCardId, selectedColumn, board.cards, board.foundation);
    commit('moveCardToFoundation', cardsToMove);

    // if (isValidMove) {
    //   const cardToMove = moveCardToFoundation(state, column);
    //   commit('moveCardToFoundation', cardToMove);

    const hiddenCard = revealHiddenCard(state);
    commit('revealHiddenCard', hiddenCard);
    // } else {
    //   commit('invalidMove');
    // }
  },
  // moveKingToColumn({ commit, state }, column) {
  //   const isValidMove = checkValidKingMove(state, column);

  //   if (isValidMove) {
  //     const cardsToMove = moveKingToColumn(state, column);
  //     commit('moveKingToColumn', cardsToMove);

  //     const hiddenCard = revealHiddenCard(state);
  //     commit('revealHiddenCard', hiddenCard);
  //   } else {
  //     commit('invalidMove');
  //   }
  // },
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
