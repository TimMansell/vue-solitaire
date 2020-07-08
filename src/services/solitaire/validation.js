import {
  validate,
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidPosition,
  isValidKingMove,
  isMoveValidFoundationSuit,
  isMoveValidFoundationOrder,
} from './helpers/validation';

export const checkValidCard = (card, compareTo) => {
  const v = validate(card, compareTo);

  // Relaxed validation for K to empty column
  if (!compareTo) {
    return v(isValidKingMove);
  }

  // General validation.
  const isValidCard = v(isMoveValidCard);
  const isValidSuit = v(isMoveValidSuit);
  const isValidOrder = v(isMoveValidOrder);

  return isValidCard && isValidSuit && isValidOrder;
};

export const checkValidColumn = (selectedCard, selectedColumnCards) =>
  isMoveValidColumn(selectedCard, selectedColumnCards);

export const checkValidFoundationCard = (card, compareTo) => {
  const v = validate(card, compareTo);

  const isValidFoundationSuit = v(isMoveValidFoundationSuit);
  const isValidFoundationOrder = v(isMoveValidFoundationOrder);

  return isValidFoundationSuit && isValidFoundationOrder;
};

export const checkValidCardPosition = (card, compareTo) => isMoveValidPosition(card, compareTo);
