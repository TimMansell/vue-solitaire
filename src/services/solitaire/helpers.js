const moveCardsFrom = (moveCards, boardCards) => {
  const { position } = moveCards;

  return boardCards[position[0]].slice(position[1]);
};

const removeCardsFrom = (removeCards, boardCards) => {
  const { position } = removeCards;

  return boardCards[position[0]].slice(0, position[1]);
};

const moveCardsTo = (boardCards, cardsToMove, position) => {
  const moveCardsToColumn = [
    ...boardCards[position],
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
