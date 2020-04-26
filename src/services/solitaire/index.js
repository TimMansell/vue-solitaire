import {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isValidKingMove,
  isMoveValidFoundationSuit,
  isMoveValidFoundationOrder,
} from './validation';
import {
  shuffleCards,
  showHideCards,
  getSelectedCard,
  getLastCard,
  isValidRemainingCard,
  moveCardsFrom,
  moveCardsTo,
} from './helpers';

export default class Solitaire {
  constructor() {
    this.cards = {
      values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      suits: ['c', 's', 'h', 'd'],
    };

    this.rules = {
      columns: [7, 7, 7, 7, 6, 6, 6, 6],
      foundationColumns: [1, 1, 1, 1],
    };

    this.boardCards = [];
    this.deck = [];

    this.init();
  }

  init() {
    this.setFoundations();
    this.setDeck();
    this.setBoard();
  }

  setDeck(deck) {
    if (deck) {
      this.deck = deck;
    } else {
      this.deck = shuffleCards(this.cards);
    }
  }

  setBoard() {
    const { columns } = this.rules;
    const { deck } = this;

    const dealtCards = columns.map((column, columnIndex, array) => {
      const startArray = array.slice(0, columnIndex);
      const endArray = array.slice(0, columnIndex + 1);

      const calcOffset = (accumulator, currentValue) => accumulator + currentValue;

      const startIndex = startArray.reduce(calcOffset, 0);
      const endIndex = endArray.reduce(calcOffset, 0);

      const cards = deck.slice(startIndex, endIndex).map((shuffledCard, index) => {
        const card = {
          ...shuffledCard,
          position: [columnIndex, index],
        };

        return card;
      });

      // Offset by one.
      if (columnIndex > 3) {
        return showHideCards(cards, 1);
      }

      return showHideCards(cards);
    });

    this.boardCards = dealtCards;
  }

  setFoundations() {
    this.foundationCards = this.rules.foundationColumns.map(() => []);
  }

  setSelectedCard(id) {
    this.selectedCardId = id;
  }

  removeSelectedCard() {
    this.selectedCardId = null;
  }

  setMoveCards(selectedColumn) {
    const { selectedCardId, boardCards } = this;

    const cardFromColumn = moveCardsFrom(selectedCardId, boardCards);
    const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, boardCards, boardCards);

    this.boardCards[cardFromColumn.column] = cardFromColumn.cards;
    this.boardCards[cardsToColumn.column] = cardsToColumn.cards;
  }

  isValidCardMove(selectedColumn) {
    const { selectedCardId, boardCards } = this;

    const selectedCard = getSelectedCard(boardCards, selectedCardId);
    const lastColumnCard = getLastCard(boardCards, selectedColumn);

    // Relaxed validation for K to empty column
    if (!lastColumnCard) {
      const isValidKing = isValidKingMove(selectedCard, lastColumnCard);

      return isValidKing;
    }

    // General validation.
    const isValidCard = isMoveValidCard(selectedCard, lastColumnCard);
    const isValidSuit = isMoveValidSuit(selectedCard, lastColumnCard);
    const isValidOrder = isMoveValidOrder(selectedCard, lastColumnCard);
    const isValidColumn = isMoveValidColumn(selectedCard, lastColumnCard);

    return isValidCard && isValidSuit && isValidOrder && isValidColumn;
  }

  findEmptyFoundationColumn() {
    const { selectedCardId, boardCards, foundationCards } = this;

    const selectedCard = getSelectedCard(boardCards, selectedCardId);

    const foundationColumnToUse = foundationCards.findIndex((foundationCard) => {
      // Column is empty && we're moving an Ace.
      if (!foundationCard.length && selectedCard.order === 1) {
        return true;
      }

      // Otherwise, check suit is the same as this column
      const foundationSuit = foundationCard.filter((card) => card.suit === selectedCard.suit);

      return foundationSuit.length;
    });

    // No cards at all in foundation, so use 1st column.
    if (foundationColumnToUse === -1) {
      return 0;
    }

    return foundationColumnToUse;
  }

  moveCardsToFoundation(selectedColumn) {
    const { selectedCardId, boardCards, foundationCards } = this;

    const cardFromColumn = moveCardsFrom(selectedCardId, boardCards);
    const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, boardCards, foundationCards);

    this.boardCards[cardFromColumn.column] = cardFromColumn.cards;
    this.foundationCards[cardsToColumn.column] = cardsToColumn.cards;
  }

  isValidFoundationMove(selectedColumn) {
    const { selectedCardId, boardCards, foundationCards } = this;

    const selectedCard = getSelectedCard(boardCards, selectedCardId);

    const isValidFoundationSuit = isMoveValidFoundationSuit(
      selectedCard,
      selectedColumn,
      foundationCards
    );
    const isValidFoundationOrder = isMoveValidFoundationOrder(
      selectedCard,
      selectedColumn,
      foundationCards,
      boardCards
    );

    return isValidFoundationSuit && isValidFoundationOrder;
  }

  isEmptyBoard() {
    const { boardCards } = this;

    return !boardCards.flat().length;
  }

  hasNoMoves() {
    const { boardCards } = this;
    // console.log('boardCards', boardCards);

    // const bottomCards = boardCards
    //   .map((cards) => {
    //     console.log('a');
    //     return cards.slice(-1);
    //   })
    //   .flat();

    // TODO:
    // - [x] A to foundation
    // - [x] K to empty column
    // - [ ] 2,3 etc to foundation
    // - [x] K already at top should not be a move.

    const bottomCards = boardCards.map((cards) => cards.slice(-1)).flat();

    // const visibleCards = boardCards.flat().filter((cards) => {
    //   console.log('a', cards);
    //   return cards.visible;
    // });

    console.log('bottom cards length', bottomCards.length);

    const visibleCards = boardCards.flat().filter((cards) => cards.visible);

    // console.log('visibleCards', visibleCards);
    // console.log('bottomCards', bottomCards);
    console.log('--------------------');

    const hasMoves = bottomCards.filter((card) => {
      // console.log('--------------------');
      // console.log('card', `${card.value}${card.suit}`);

      // If bottom card in an A then there is a possible move.
      if (card.order === 1) {
        console.log('has A move', `${card.value}${card.suit}`);
        return true;
      }

      // if (card.order === 13 && bottomCards.length < 8) {
      //   console.log('has K move', `${card.order}${card.suit}`);
      //   return true;
      // }

      const hasMove = visibleCards.filter((vcard, index) => {
        // console.log('v', `${vcard.value}${vcard.suit}`);
        if (vcard.order === 13 && bottomCards.length < 8 && vcard.position[1] !== 0) {
          console.log(`has K${vcard.suit} move at index ${index} and ${vcard.position}`);

          return true;
        }

        return isValidRemainingCard(vcard, card);
      });
      // console.log('hasMove', hasMove, `${hasMove.value}${hasMove.order}`);

      hasMove.forEach((move) => {
        console.log('hasMove', `${move.value}${move.suit}`);
      });

      return hasMove.length;
    });

    // hasMoves.forEach((move) => {
    //   console.log('hasMove', `${move.value}${move.suit}`);
    // });

    return !hasMoves.length;
  }

  getBoardCards() {
    return this.boardCards;
  }

  getFoundationCards() {
    return this.foundationCards;
  }

  setTestBoard({ board, foundation }) {
    if (board) {
      this.boardCards = [...board];
    }

    if (foundation) {
      this.foundationCards = [...foundation];
    }
  }
}
