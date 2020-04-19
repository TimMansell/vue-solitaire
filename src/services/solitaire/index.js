import shuffle from 'lodash.shuffle';
import {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isValidKingMove,
  isValidFoundationMove,
} from './validation';
import {
  getSelectedCard,
  getLastCard,
  moveCardsFrom,
  moveCardsTo,
} from './helpers';

const cardsArray = {
  values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  suits: ['c', 's', 'h', 'd'],
};

const rules = {
  columns: [7, 7, 7, 7, 6, 6, 6, 6],
  foundationColumns: [1, 1, 1, 1],
};

const getFoundations = () => rules.foundationColumns;

const shuffleCards = () => {
  const { values, suits } = cardsArray;

  const deck = values.flatMap((value, index) => suits.map((suit) => {
    const card = {
      id: `${index}${suit}`,
      value,
      order: index + 1,
      suit,
      visible: false,
    };

    return card;
  }));

  const shuffledDeck = shuffle(deck);

  return shuffledDeck;
};

const setBoard = (shuffledCards) => {
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

  return dealtCards;
};

const checkValidCardMove = (selectedCardId, selectedColumn, board) => {
  const selectedCard = getSelectedCard(board, selectedCardId);
  const lastColumnCard = getLastCard(board, selectedColumn);

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
};

const moveCards = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
  const cardFromColumn = moveCardsFrom(selectedCardId, cardsFrom);
  const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, cardsFrom, cardsTo);

  return {
    cardFromColumn,
    cardsToColumn,
  };
};

const checkValidFoundationMove = (selectedCardId, selectedColumn, board) => {
  const selectedCard = getSelectedCard(board.cards, selectedCardId);
  const isValidFoundation = isValidFoundationMove(selectedCard, selectedColumn, board);

  return isValidFoundation;
};

export {
  shuffleCards,
  getFoundations,
  setBoard,
  checkValidCardMove,
  moveCards,
  checkValidFoundationMove,
};
