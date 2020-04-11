import Vue from 'vue';
import shuffle from 'lodash.shuffle';
import size from 'lodash.size';

const mutations = {
  shuffleCards(state) {
    const { values, suits } = state.cards;

    const deck = values.flatMap((value, index) => suits.map((suit) => {
      const card = {
        value,
        order: index + 1,
        suit,
        visible: false,
      };

      return card;
    }));

    const shuffledDeck = shuffle(deck);

    state.shuffledCards = shuffledDeck;
  },
  dealCards(state) {
    const { rules, shuffledCards } = state;

    const showCards = (cards, offset = 0) => cards.map((card, index) => {
      if ((index + offset) % 2 === 0) {
        return {
          ...card,
          visible: true,
        };
      }

      return card;
    });

    const dealtCards = rules.columns.map((column, columnIndex, array) => {
      const startArray = array.slice(0, columnIndex);
      const endArray = array.slice(0, columnIndex + 1);

      const calcOffset = (accumulator, currentValue) => accumulator + currentValue;

      const startIndex = startArray.reduce(calcOffset, 0);
      const endIndex = endArray.reduce(calcOffset, 0);

      const cards = shuffledCards.slice(startIndex, endIndex).map((shuffledCard, index) => {
        const card = {
          ...shuffledCard,
          position: [columnIndex, index],
        };

        return card;
      });

      // Offset by one.
      if (columnIndex > 3) {
        return showCards(cards, 1);
      }

      return showCards(cards);
    });

    console.log('dealt cards', dealtCards);

    dealtCards.forEach((cards, index) => {
      Vue.set(state.board.cards, index, dealtCards[index]);
    });
  },
  moveCard(state, card) {
    const { toMove, moveTo } = state.selected;

    // console.log('toMove.length', toMove.length);
    // console.log('moveTo.length', moveTo.length);

    if (!size(toMove)) {
      // console.log('no to move');
      state.selected.toMove = card;
    } else if (!size(moveTo)) {
      // console.log('no move to');
      state.selected.moveTo = card;
    }

    // console.log('toMove', state.selected.toMove);
    // console.log('moveTo', state.selected.moveTo);
    // console.log('card', card);
  },
  checkValidCardMove(state) {
    const { toMove, moveTo } = state.selected;

    // console.log('toMove', toMove);
    // console.log('moveTo', moveTo);

    if (toMove && moveTo) {
      if (!toMove.visible || !moveTo.visible) {
        state.selected.toMove = null;
        state.selected.moveTo = null;

        return;
      }
      // console.log('both cards');

      // Make sure different cards have been selected.
      if (`${toMove.order}${toMove.suit}` === `${moveTo.order}${moveTo.suit}`) {
        // console.log('cards are diff');
        // console.log('board cards', state.board.cards);

        state.selected.toMove = null;
        state.selected.moveTo = null;

        return;
      }

      // Check if both suits are the same.
      if (toMove.suit !== moveTo.suit) {
        state.selected.toMove = null;
        state.selected.moveTo = null;

        return;
      }

      // Check that moving card is one value lower value than card being moved to.
      if (toMove.order !== moveTo.order - 1) {
        state.selected.toMove = null;
        state.selected.moveTo = null;

        return;
      }

      const moveCards = state.board.cards[toMove.position[0]].slice(toMove.position[1]);
      const moveCardsToColumn = [
        ...state.board.cards[moveTo.position[0]],
        ...moveCards,
      ].map((cards, index) => {
        const newValues = {
          ...cards,
          position: [moveTo.position[0], index],
        };

        return newValues;
      });

      const removeCardsFromColumn = state.board.cards[toMove.position[0]].slice(0, toMove.position[1]);

      // console.log('moveCards', moveCards);
      // console.log('moveCardsToColumn', moveCardsToColumn);
      // console.log('removeCardsFromColumn', removeCardsFromColumn);

      // state.board.cards[0] = [];

      Vue.set(state.board.cards, toMove.position[0], removeCardsFromColumn);
      Vue.set(state.board.cards, moveTo.position[0], moveCardsToColumn);

      state.selected.toMove = null;
      state.selected.moveTo = null;
    }
  },
  revealExposedHiddenCards(state) {
    const { cards } = state.board;

    const updatedDeck = cards.map((column) => {
      // console.log('index', index, deck.length - 1);
      const updatedCards = column.map((updatedCard, index) => {
        if (index === column.length - 1) {
          // console.log('index', index, column.length - 1);
          return {
            ...updatedCard,
            visible: true,
          };
        }

        return updatedCard;
      });

      return updatedCards;
    });

    // console.log('nd', updatedDeck);

    updatedDeck.forEach((card, index) => {
      Vue.set(state.board.cards, index, updatedDeck[index]);
    });
  },
};

export default mutations;
