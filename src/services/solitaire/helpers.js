const moveCardsFrom = (moveCards, { cards }) => {
  const { position } = moveCards;

  return cards[position[0]].slice(position[1]);
};

const removeCardsFrom = (removeCards, { cards }) => {
  const { position } = removeCards;

  return cards[position[0]].slice(0, position[1]);
};

const moveCardsTo = ({ cards }, cardsToMove, position) => {
  const moveCardsToColumn = [
    ...cards[position],
    ...cardsToMove,
  ].map((moveCards, index) => {
    const newValues = {
      ...moveCards,
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
