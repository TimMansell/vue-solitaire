import shuffle from 'lodash.shuffle';

export const shuffleCards = ({ values, suits }) => {
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

export const showHideCards = (cards, offset = 0) =>
  cards.map((card, index) => {
    if ((index + offset) % 2 === 0) {
      return {
        ...card,
        visible: true,
      };
    }

    return card;
  });

export const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards.flat().filter((card) => card.id === selectedCardId);

  return selectedCard;
};

export const getSelectedCardPosition = (boardCards, selectedCardId) => {
  const columnNo = boardCards.findIndex((cards) =>
    cards.find((card) => card.id === selectedCardId)
  );

  const cardPosition = boardCards[columnNo].findIndex((card) => card.id === selectedCardId);

  return {
    columnNo,
    cardPosition,
  };
};

export const getVisibleCards = (cards) => {
  const visibleCards = cards.flat().filter((card) => card.visible);

  return visibleCards;
};

export const getLastCard = (board, selectedColumn) => {
  const [selectedCard] = board[selectedColumn].slice(-1);

  return selectedCard;
};

export const getLastCards = (cards) => {
  const lastCards = cards.map((card) => card.slice(-1)).flat();

  return lastCards;
};

// export const moveCardsFrom = (selectedCardId, cards) => {
//   const { columnNo, cardPosition } = getSelectedCardPosition(cards, selectedCardId);

//   const columnCards = cards[columnNo].slice(0, cardPosition);

//   const remainingCards = columnCards.map((card, index) => {
//     if (index === columnCards.length - 1 && !card.visible) {
//       const newValues = {
//         ...card,
//         visible: true,
//       };
//       return newValues;
//     }

//     return card;
//   });

//   return {
//     column: columnNo,
//     cards: remainingCards,
//   };
// };

// export const moveCardsTo = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
//   const { columnNo, cardPosition } = getSelectedCardPosition(cardsFrom, selectedCardId);

//   const columnCards = cardsTo[selectedColumn];
//   const moveCards = cardsFrom[columnNo].slice(cardPosition);

//   const newColumn = [...columnCards, ...moveCards];

//   return {
//     column: selectedColumn,
//     cards: newColumn,
//   };
// };
