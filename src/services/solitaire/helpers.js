const moveCardsFrom = (moveCards, board) => {
  const { cards } = board;
  const { position } = moveCards;

  return cards[position[0]].slice(position[1]);
};

const removeCardsFrom = (removeCards, board) => {
  const { cards } = board;
  const { position } = removeCards;

  return cards[position[0]].slice(0, position[1]);
};

const moveCardsTo = (board, cardsToMove, position) => {
  const moveCardsToColumn = [
    ...board.cards[position],
    ...cardsToMove,
  ].map((cards, index) => {
    const newValues = {
      ...cards,
      position: [position, index],
    };

    return newValues;
  });

  return moveCardsToColumn;
};

export {
  moveCardsFrom,
  removeCardsFrom,
  moveCardsTo,
};
