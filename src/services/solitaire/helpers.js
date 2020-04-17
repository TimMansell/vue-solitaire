const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards.flat().filter((card) => card.id === selectedCardId);

  return selectedCard;
};

const mapPositions = (cards, position) => {
  const updatedCards = cards.map((moveCards, index) => {
    const newValues = {
      ...moveCards,
      position: [position, index],
    };
    return newValues;
  });

  return updatedCards;
};

const moveCardsFrom = (selectedCardId, cards) => {
  const selectedCard = getSelectedCard(cards, selectedCardId);
  const cardPosition = selectedCard.position;

  console.log('selectedCard', selectedCard);

  const a = {
    column: cardPosition[0],
    cards: cards[cardPosition[0]].slice(0, cardPosition[1]),
  };

  console.log('a', a);
  return a;
};

const moveCardsTo = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
  console.log('cardsFrom', cardsFrom);
  console.log('cardsTo', cardsTo);
  const selectedCard = getSelectedCard(cardsFrom, selectedCardId);
  const cardPosition = selectedCard;

  console.log('co', cardPosition);

  const columnCards = cardsTo[selectedColumn];
  const moveCards = cardsFrom[cardPosition.position[0]].slice(cardPosition.position[1]);

  const newColumn = mapPositions([
    ...columnCards,
    ...moveCards,
  ], selectedColumn);

  return {
    column: selectedColumn,
    cards: newColumn,
  };
};

export {
  moveCardsFrom,
  moveCardsTo,
};
