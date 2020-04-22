import shuffle from 'lodash.shuffle';

const shuffleCards = ({ values, suits }) => {
  const deck = values.flatMap((value, index) =>
    suits.map((suit) => {
      const card = {
        id: `${index}${suit}`,
        value,
        order: index + 1,
        suit,
        visible: false,
      };

      return card;
    })
  );

  const shuffledDeck = shuffle(deck);

  return shuffledDeck;
};

const showHideCards = (cards, offset = 0) =>
  cards.map((card, index) => {
    if ((index + offset) % 2 === 0) {
      return {
        ...card,
        visible: true,
      };
    }

    return card;
  });

const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards.flat().filter((card) => card.id === selectedCardId);

  return selectedCard;
};

const getLastCard = (board, selectedColumn) => {
  const [selectedCard] = board[selectedColumn].slice(-1);

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

  const columnCards = cards[cardPosition[0]].slice(0, cardPosition[1]);

  const remainingCards = columnCards.map((card, index) => {
    if (index === columnCards.length - 1 && !card.visible) {
      const newValues = {
        ...card,
        visible: true,
      };
      return newValues;
    }

    return card;
  });

  return {
    column: cardPosition[0],
    cards: remainingCards,
  };
};

const moveCardsTo = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
  const selectedCard = getSelectedCard(cardsFrom, selectedCardId);
  const cardPosition = selectedCard;

  const columnCards = cardsTo[selectedColumn];
  const moveCards = cardsFrom[cardPosition.position[0]].slice(cardPosition.position[1]);

  const newColumn = mapPositions([...columnCards, ...moveCards], selectedColumn);

  return {
    column: selectedColumn,
    cards: newColumn,
  };
};

export { shuffleCards, showHideCards, getSelectedCard, getLastCard, moveCardsFrom, moveCardsTo };
