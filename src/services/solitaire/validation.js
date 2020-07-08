import {
  validate,
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidKing,
  isFoundationMoveValidPosition,
  isFoundationMoveValidSuit,
  isFoundationMoveValidOrder,
  isFoundationMoveValidAce,
} from './helpers/validation';

export const validateCard = (card, compareTo) => {
  const v = validate(card, compareTo);

  // Relaxed validation for K to empty column
  if (!compareTo) {
    return v(isMoveValidKing);
  }

  // General validation.
  const isValidCard = v(isMoveValidCard);
  const isValidSuit = v(isMoveValidSuit);
  const isValidOrder = v(isMoveValidOrder);

  return isValidCard && isValidSuit && isValidOrder;
};

export const validateColumn = (selectedCard, selectedColumnCards) =>
  isMoveValidColumn(selectedCard, selectedColumnCards);

export const validateFoundationMove = (card, compareTo) => {
  const v = validate(card, compareTo);

  // Relaxed validation for A to empty foundation.
  if (!compareTo.length) {
    return v(isFoundationMoveValidAce);
  }

  const isValidFoundationSuit = v(isFoundationMoveValidSuit);
  const isValidFoundationOrder = v(isFoundationMoveValidOrder);

  return isValidFoundationSuit && isValidFoundationOrder;
};

export const validateFoundationPosition = (card, compareTo) =>
  isFoundationMoveValidPosition(card, compareTo);
