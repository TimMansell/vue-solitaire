import {
  setupValidation,
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidKing,
  isFoundationMoveValidPosition,
  isFoundationMoveValidSuit,
  isFoundationMoveValidOrder,
  isFoundationMoveValidAce,
} from './validation';

export const validateCard = (card, compareTo) => {
  const validate = setupValidation(card, compareTo);

  // Relaxed validation for K to empty column
  if (!compareTo) {
    return validate(isMoveValidKing);
  }

  // General validation.
  const isValidCard = validate(isMoveValidCard);
  const isValidSuit = validate(isMoveValidSuit);
  const isValidOrder = validate(isMoveValidOrder);

  return isValidCard && isValidSuit && isValidOrder;
};

export const validateColumn = (card, compareTo) =>
  setupValidation(card, compareTo)(isMoveValidColumn);

export const validateFoundationMove = (card, compareTo) => {
  const validate = setupValidation(card, compareTo);

  // Relaxed validation for A to empty foundation.
  if (!compareTo.length) {
    return validate(isFoundationMoveValidAce);
  }

  const isValidFoundationSuit = validate(isFoundationMoveValidSuit);
  const isValidFoundationOrder = validate(isFoundationMoveValidOrder);

  return isValidFoundationSuit && isValidFoundationOrder;
};

export const validateFoundationPosition = (card, compareTo) =>
  setupValidation(card, compareTo)(isFoundationMoveValidPosition);
