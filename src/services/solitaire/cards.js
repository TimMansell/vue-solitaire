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
  const [lastCard] = board[selectedColumn].slice(-1);

  if (!lastCard) {
    return {};
  }

  return lastCard;
};

const getLastCards = (cards) => {
  const lastCards = cards.map((card) => card.slice(-1)).flat();

  return lastCards;
};

const showLastCard = (cards) =>
  cards.map((card, index) => {
    if (index === cards.length - 1) {
      return {
        ...card,
        visible: true,
      };
    }

    return card;
  });

const checkCardValue = (card, value) => card.value === value;

const checkCardTopPosition = (cards, selectedCardId) => {
  const { cardPosition } = getSelectedCardPosition(cards, selectedCardId);

  return cardPosition === 0;
};

const initCards = ({ cards }) => shuffleCards(cards);

export {
  initCards,
  showHideCards,
  getSelectedCard,
  getLastCard,
  getLastCards,
  showLastCard,
  getVisibleCards,
  getSelectedCardPosition,
  checkCardValue,
  checkCardTopPosition,
};
