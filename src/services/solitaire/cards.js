import { getSelectedCardPosition } from './helpers';

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

export const getCardsFom = (selectedCardId, boardCards) => {
  const cardsFromColumn = moveCardsFrom(selectedCardId, boardCards);

  return cardsFromColumn;
};

export const getCardsTo = (selectedCardId, selectedColumn, cardsFrom, cardsTo) => {
  const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, cardsFrom, cardsTo);

  return cardsToColumn;
};
