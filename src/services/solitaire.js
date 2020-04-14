import shuffle from 'lodash.shuffle';
import size from 'lodash.size';

// Private functions
const isMoveValidVisible = (toMove, moveTo) => {
  if (!toMove.visible || !moveTo.visible) {
    return false;
  }

  return true;
};

const isMoveValidCard = (toMove, moveTo) => {
  if (`${toMove.order}${toMove.suit}` === `${moveTo.order}${moveTo.suit}`) {
    return false;
  }

  return true;
};

const isMoveValidSuit = (toMove, moveTo) => {
  if (toMove.suit !== moveTo.suit) {
    return false;
  }

  return true;
};

const isMoveValidOrder = (toMove, moveTo) => {
  if (toMove.order !== moveTo.order - 1) {
    return false;
  }

  return true;
};

// Check card being moved to is at the bottom of the column
const isMoveValidPosition = (moveTo, board) => {
  if (moveTo.position[1] !== board.cards[moveTo.position[0]].length - 1) {
    return false;
  }

  return true;
};

// Check card isn't being moved to same column.
const isMoveValidColumn = (toMove, moveTo) => {
  if (moveTo.position[0] === toMove.position[0]) {
    return false;
  }

  return true;
};

// Public functions
const shuffleCards = ({ values, suits }) => {
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

  return shuffledDeck;
};

const setBoard = ({ rules, shuffledCards }) => {
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

const checkValidCardMove = ({ board, selectedCards }) => {
  const [toMove, moveTo] = selectedCards;

  const isValidVisible = isMoveValidVisible(toMove, moveTo);
  const isValidCard = isMoveValidCard(toMove, moveTo);
  const isValidSuit = isMoveValidSuit(toMove, moveTo);
  const isValidOrder = isMoveValidOrder(toMove, moveTo);
  const isValidPosition = isMoveValidPosition(moveTo, board);
  const isValidColumn = isMoveValidColumn(toMove, moveTo);

  return isValidVisible && isValidCard && isValidSuit && isValidOrder && isValidPosition && isValidColumn;
};

const isBothCardsSelected = ({ selectedCards }) => {
  if (selectedCards.length === 2) {
    return true;
  }

  return false;
};

const moveCards = ({ board, selectedCards }) => {
  const [toMove, moveTo] = selectedCards;

  const cardsToMove = board.cards[toMove.position[0]].slice(toMove.position[1]);
  const moveCardsToColumn = [
    ...board.cards[moveTo.position[0]],
    ...cardsToMove,
  ].map((cards, index) => {
    const newValues = {
      ...cards,
      position: [moveTo.position[0], index],
    };

    return newValues;
  });

  const removeCardsFromColumn = board.cards[toMove.position[0]].slice(0, toMove.position[1]);

  const colsToMove = {
    from: toMove.position[0],
    to: moveTo.position[0],
  };

  return {
    colsToMove,
    moveCardsToColumn,
    removeCardsFromColumn,
  };
};

const revealHiddenCard = ({ board }) => {
  const { cards } = board;

  const updatedDeck = cards.map((column) => {
    const updatedCards = column.map((updatedCard, index) => {
      if (index === column.length - 1) {
        return {
          ...updatedCard,
          visible: true,
        };
      }

      return updatedCard;
    });

    return updatedCards;
  });

  return updatedDeck;
};

const moveCardToFoundation = ({ board, selectedCards }) => {
  const [toMove] = selectedCards;

  const removeCardsFromColumn = board.cards[toMove.position[0]].slice(0, toMove.position[1]);

  return {
    toMove,
    removeCardsFromColumn,
  };
};

const checkValidFoundationMove = ({ board, selectedCards }) => {
  const [toMove] = selectedCards;

  if (!size(toMove)) {
    return false;
  }

  const currentValue = board.aces[toMove.suit] || [];

  if (toMove.order === currentValue.length + 1) {
    const isLastItem = board.cards[toMove.position[0]].length - 1 === toMove.position[1];

    return isLastItem;
  }

  return false;
};

const moveKingToColumn = ({ board, selectedCards }, column) => {
  const [toMove] = selectedCards;

  const cardsToMove = board.cards[toMove.position[0]].slice(toMove.position[1]);
  const moveCardsToColumn = [
    ...board.cards[column],
    ...cardsToMove,
  ].map((cards, index) => {
    const newValues = {
      ...cards,
      position: [column, index],
    };

    return newValues;
  });

  const removeCardsFromColumn = board.cards[toMove.position[0]].slice(0, toMove.position[1]);

  return {
    toMove,
    column,
    moveCardsToColumn,
    removeCardsFromColumn,
  };
};

const checkValidKingMove = ({ board, selectedCards }, column) => {
  const [toMove] = selectedCards;

  if (!size(toMove)) {
    return false;
  }

  if (toMove.order === 13 && !board.cards[column].length) {
    return true;
  }

  return false;
};

export {
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
};
