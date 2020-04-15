import size from 'lodash.size';

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

const isCardValidSize = (toMove) => {
  if (!size(toMove)) {
    return false;
  }

  return true;
};

const isValidKingMove = (toMove = [], board, column) => {
  if (toMove.order === 13 && !board.cards[column].length) {
    return true;
  }

  return false;
};

const isValidFoundationMove = (toMove = [], board) => {
  const currentValue = board.aces[toMove.suit] || [];

  if (toMove.order === currentValue.length + 1) {
    const isLastItem = board.cards[toMove.position[0]].length - 1 === toMove.position[1];

    return isLastItem;
  }

  return false;
};

export {
  isMoveValidVisible,
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidPosition,
  isMoveValidColumn,
  isCardValidSize,
  isValidKingMove,
  isValidFoundationMove,
};
