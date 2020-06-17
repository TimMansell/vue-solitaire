import { getSelectedCard } from './cards';
import {
  isMoveValidFoundationSuit,
  isMoveValidFoundationOrder,
  isMoveValidPosition,
} from './validation';

const initFoundations = ({ rules }) => rules.foundationColumns.map(() => []);

const getEmptyFoundationColumn = (foundationCards, boardCards, selectedCardId) => {
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

const checkValidFoundationMove = (selectedColumn, boardCards, selectedCardId, foundationCards) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);
  const selectedFoundationCards = foundationCards[selectedColumn];

  if (!selectedCardId) {
    return false;
  }

  const isValidFoundationSuit = isMoveValidFoundationSuit(selectedCard, selectedFoundationCards);
  const isValidFoundationOrder = isMoveValidFoundationOrder(selectedCard, selectedFoundationCards);
  const isValidPosition = isMoveValidPosition(selectedCard, boardCards);

  return isValidFoundationSuit && isValidFoundationOrder && isValidPosition;
};

export { initFoundations, getEmptyFoundationColumn, checkValidFoundationMove };