import { getSelectedCard, getSelectedCardPosition } from './cards';
import { validateFoundationMove, validateFoundationPosition } from './validation';

const initFoundations = ({ rules }) => rules.foundationColumns.map(() => []);

const updateFoundation = ({ foundationCards }, cardsTo) => {
  return foundationCards.map((cards, index) => {
    if (index === cardsTo.column) {
      return cardsTo.cards;
    }

    return cards;
  });
};

const getEmptyFoundationColumn = ({ foundationCards, boardCards, selectedCardId }) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);

  const foundationColumnToUse = foundationCards.findIndex((foundationCard) => {
    // Column is empty && we're moving an Ace.
    if (!foundationCard.length && selectedCard.order === 1) {
      return true;
    }

    // Otherwise, check suit is the same as this column
    const foundationSuit = foundationCard.filter((card) => card.suit === selectedCard.suit);

    return foundationSuit.length;
  });

  // No cards at all in foundation, so use 1st column.
  if (foundationColumnToUse === -1) {
    return 0;
  }

  return foundationColumnToUse;
};

const checkValidFoundationMove = (
  { boardCards, selectedCardId, foundationCards },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);
  const selectedFoundationCards = foundationCards[selectedColumn];

  if (!selectedCardId) {
    return false;
  }

  const isValidFoundationMove = validateFoundationMove(selectedCard, selectedFoundationCards);
  const isValidCardPosition = validateFoundationPosition(selectedCard, boardCards);

  return isValidFoundationMove && isValidCardPosition;
};

const moveFoundationCardsTo = ({ selectedCardId, boardCards, foundationCards }, selectedColumn) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const columnCards = foundationCards[selectedColumn];
  const moveCards = boardCards[columnNo].slice(cardPosition);

  const newColumn = [...columnCards, ...moveCards];

  return {
    column: selectedColumn,
    cards: newColumn,
  };
};

export {
  initFoundations,
  updateFoundation,
  getEmptyFoundationColumn,
  checkValidFoundationMove,
  moveFoundationCardsTo,
};
