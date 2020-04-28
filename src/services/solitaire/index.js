import {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidPosition,
  isValidKingMove,
  isMoveValidFoundationSuit,
  isMoveValidFoundationOrder,
} from './validation';
import {
  shuffleCards,
  showHideCards,
  getSelectedCard,
  getLastCard,
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

      const cards = deck.slice(startIndex, endIndex);

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
    const selectedColumnCards = boardCards[selectedColumn];

    // Relaxed validation for K to empty column
    if (!lastColumnCard) {
      const isValidKing = isValidKingMove(selectedCard, lastColumnCard);

      return isValidKing;
    }

    // General validation.
    const isValidCard = isMoveValidCard(selectedCard, lastColumnCard);
    const isValidSuit = isMoveValidSuit(selectedCard, lastColumnCard);
    const isValidOrder = isMoveValidOrder(selectedCard, lastColumnCard);
    const isValidColumn = isMoveValidColumn(selectedCard, selectedColumnCards);

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
    const selectedFoundationCards = foundationCards[selectedColumn];

    const isValidFoundationSuit = isMoveValidFoundationSuit(selectedCard, selectedFoundationCards);
    const isValidFoundationOrder = isMoveValidFoundationOrder(
      selectedCard,
      selectedFoundationCards
    );
    const isValidPosition = isMoveValidPosition(selectedCard, boardCards);

    return isValidFoundationSuit && isValidFoundationOrder && isValidPosition;
  }

  isEmptyBoard() {
    const { boardCards } = this;

    return !boardCards.flat().length;
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
