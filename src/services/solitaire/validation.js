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
const isMoveValidColumn = (selectedCard, columnCards) => {
  const cardExistsInColumn = columnCards.filter(
    (card) => card.value === selectedCard.value && card.suit === selectedCard.suit
  );

  if (!cardExistsInColumn.length) {
    return true;
  }

  return false;
};

const isMoveValidPosition = (selectedCard, boardCards) => {
  const isCardValidPosition = boardCards.some((cards) => {
    const cardPosition = cards.findIndex((card) => card.id === selectedCard.id);

    if (cardPosition === cards.length - 1) {
      return true;
    }

    return false;
  });

  return isCardValidPosition;
};

const isValidKingMove = (selectedCard, lastColumnCard) => {
  if (selectedCard.order === 13 && !lastColumnCard) {
    return true;
  }

  return false;
};

const isMoveValidFoundationSuit = (selectedCard, selectedFoundationCards) => {
  const { suit } = selectedCard;

  const foundationSuit = selectedFoundationCards.filter((ace) => ace.suit === suit);

  if (!foundationSuit.length && selectedFoundationCards.length) {
    return false;
  }

  return true;
};

const isMoveValidFoundationOrder = (selectedCard, selectedFoundationCards) => {
  const { order } = selectedCard;

  if (order === selectedFoundationCards.length + 1) {
    return true;
  }

  return false;
};

export {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidPosition,
  isValidKingMove,
  isMoveValidFoundationSuit,
  isMoveValidFoundationOrder,
};
