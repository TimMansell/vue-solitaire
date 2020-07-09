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

  const isValidKing = validate(isMoveValidKing);
  const isValidCard = validate(isMoveValidCard);
  const isValidSuit = validate(isMoveValidSuit);
  const isValidOrder = validate(isMoveValidOrder);

  return isValidKing || (isValidCard && isValidSuit && isValidOrder);
};

export const validateColumn = (card, compareTo) =>
  setupValidation(card, compareTo)(isMoveValidColumn);

export const validateFoundationMove = (card, compareTo) => {
  const validate = setupValidation(card, compareTo);

  const isValidFoundationAce = validate(isFoundationMoveValidAce);
  const isValidFoundationSuit = validate(isFoundationMoveValidSuit);
  const isValidFoundationOrder = validate(isFoundationMoveValidOrder);

  return isValidFoundationAce || (isValidFoundationSuit && isValidFoundationOrder);
};

export const validateFoundationPosition = (card, compareTo) =>
  setupValidation(card, compareTo)(isFoundationMoveValidPosition);
