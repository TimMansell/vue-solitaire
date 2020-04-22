const isMoveValidCard = (selectedCard, lastColumnCard) => {
  if (
    `${selectedCard.order}${selectedCard.suit}` === `${lastColumnCard.order}${lastColumnCard.suit}`
  ) {
    return false;
  }

  return true;
};

const isMoveValidSuit = (selectedCard, lastColumnCard) => {
  if (selectedCard.suit !== lastColumnCard.suit) {
    return false;
  }

  return true;
};

const isMoveValidOrder = (selectedCard, lastColumnCard) => {
  if (selectedCard.order !== lastColumnCard.order - 1) {
    return false;
  }

  return true;
};

// Check card isn't being moved to same column.
const isMoveValidColumn = (selectedCard, lastColumnCard) => {
  if (lastColumnCard.position[0] === selectedCard.position[0]) {
    return false;
  }

  return true;
};

const isValidKingMove = (selectedCard, lastColumnCard) => {
  if (selectedCard.order === 13 && !lastColumnCard) {
    return true;
  }

  return false;
};

const isMoveValidFoundationSuit = (selectedCard, selectedColumn, foundationCards) => {
  const { suit } = selectedCard;

  const foundationSuit = foundationCards[selectedColumn].filter((ace) => ace.suit === suit);

  if (!foundationSuit.length && foundationCards[selectedColumn].length) {
    return false;
  }

  return true;
};

const isMoveValidFoundationOrder = (selectedCard, selectedColumn, foundationCards, boardCards) => {
  const { order, position } = selectedCard;

  if (order === foundationCards[selectedColumn].length + 1) {
    const isLastItem = boardCards[position[0]].length - 1 === position[1];

    return isLastItem;
  }

  return false;
};

export {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isValidKingMove,
  isMoveValidFoundationSuit,
  isMoveValidFoundationOrder,
};
