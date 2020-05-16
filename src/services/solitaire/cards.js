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

const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards.flat().filter((card) => card.id === selectedCardId);

  return selectedCard;
};

const getSelectedCardPosition = (boardCards, selectedCardId) => {
  const columnNo = boardCards.findIndex((cards) =>
    cards.find((card) => card.id === selectedCardId)
  );

  const cardPosition = boardCards[columnNo].findIndex((card) => card.id === selectedCardId);

  return {
    columnNo,
    cardPosition,
  };
};

const getVisibleCards = (cards) => {
  const visibleCards = cards.flat().filter((card) => card.visible);

  return visibleCards;
};

const getLastCard = (board, selectedColumn) => {
  const [selectedCard] = board[selectedColumn].slice(-1);

  return selectedCard;
};

const getLastCards = (cards) => {
  const lastCards = cards.map((card) => card.slice(-1)).flat();

  return lastCards;
};

const moveCardsFrom = (selectedCardId, cards) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(cards, selectedCardId);

  const columnCards = cards[columnNo].slice(0, cardPosition);

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
    column: columnNo,
    cards: remainingCards,
  };
};

const moveCardsTo = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(cardsFrom, selectedCardId);

  const columnCards = cardsTo[selectedColumn];
  const moveCards = cardsFrom[columnNo].slice(cardPosition);

  const newColumn = [...columnCards, ...moveCards];

  return {
    column: selectedColumn,
    cards: newColumn,
  };
};

const initCards = ({ cards }) => shuffleCards(cards);

const getCardsFom = (selectedCardId, boardCards) => {
  const cardsFromColumn = moveCardsFrom(selectedCardId, boardCards);

  return cardsFromColumn;
};

const getCardsTo = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
  const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, cardsFrom, cardsTo);

  return cardsToColumn;
};

export {
  initCards,
  getCardsFom,
  getCardsTo,
  getSelectedCard,
  getLastCard,
  getLastCards,
  getVisibleCards,
  getSelectedCardPosition,
};
