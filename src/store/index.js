import Vue from 'vue';
import Vuex from 'vuex';
import shuffle from 'lodash.shuffle';
import size from 'lodash.size';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: {
      values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      suits: ['c', 's', 'h', 'd'],
    },
    shuffledCards: [],
    board: {
      cards: [],
    },
    rules: {
      columns: [7, 7, 7, 7, 6, 6, 6, 6],
    },
    selected: {
      toMove: null,
      moveTo: null,
    },
  },
  mutations: {
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

      // console.log('toMove', toMove.visible);
      // console.log('moveTo', moveTo);

      if (toMove && moveTo) {
        if (!toMove.visible || !moveTo.visible) {
          state.selected.toMove = null;
          state.selected.moveTo = null;

          return;
        }
        // console.log('both cards');

        if (`${toMove.order}${toMove.suit}` !== `${moveTo.order}${moveTo.suit}`) {
          // console.log('cards are diff');
          // console.log('board cards', state.board.cards);

          const moveCards = state.board.cards[toMove.position[0]].slice(toMove.position[1]);
          const moveCardsToColumn = [
            ...state.board.cards[moveTo.position[0]],
            ...moveCards,
          ];

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
      }
    },
  },
  actions: {
    initGame({ commit }) {
      commit('shuffleCards');
      commit('dealCards');
    },
    moveCard({ commit }, card) {
      commit('moveCard', card);
      commit('checkValidCardMove');
    },
  },
  getters: {
    shuffledCards: (state) => state.shuffledCards,
    boardCards: (state) => state.board.cards,
    rules: (state) => state.rules,
  },
  modules: {
  },
});
