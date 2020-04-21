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

    this.settings = {
      autoRevealCards: false,
      showHiddenCards: false,
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
    const { autoRevealCards } = this.settings;

    const cardFromColumn = moveCardsFrom(selectedCardId, boardCards, autoRevealCards);
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

  moveCardsToFoundation(selectedColumn) {
    const { selectedCardId, boardCards, foundationCards } = this;
    const { autoRevealCards } = this.settings;

    const cardFromColumn = moveCardsFrom(selectedCardId, boardCards, autoRevealCards);
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

  updateSettings(setting) {
    const settings = {
      ...this.settings,
      ...setting,
    };

    this.settings = settings;

    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || this.settings;

    // console.log('getSettings', settings);
    this.settings = settings;

    return settings;
  }

  revealCard(selectedCardId) {
    const { boardCards } = this;
    const selectedCard = getSelectedCard(boardCards, selectedCardId);
    const columnNo = selectedCard.position[0];

    const columnCards = boardCards[columnNo].map((card) => {
      if (card.id === selectedCardId) {
        const newValues = {
          ...card,
          visible: true,
        };
        return newValues;
      }

      return card;
    });

    this.boardCards[columnNo] = columnCards;
  }

  getBoardCards() {
    return this.boardCards;
  }

  getFoundationCards() {
    return this.foundationCards;
  }

  setTestBoard(boardCards) {
    this.boardCards = [...boardCards];
  }
}
