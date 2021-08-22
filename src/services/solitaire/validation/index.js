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
import { columns } from '../settings.json';

export const validateCardMove = (card, compareTo) => {
  const validate = setupValidation(card, compareTo);

  const isValidKing = validate(isMoveValidKing);
  const isValidCard = validate(isMoveValidCard);
  const isValidSuit = validate(isMoveValidSuit);
  const isValidOrder = validate(isMoveValidOrder);

  return isValidKing || (isValidCard && isValidSuit && isValidOrder);
};

export const validateCardMoveColumn = (card, compareTo) =>
  setupValidation(card, compareTo)(isMoveValidColumn);

export const validateFoundationMove = (card, compareTo) => {
  const validate = setupValidation(card, compareTo);

  const isValidFoundationAce = validate(isFoundationMoveValidAce);
  const isValidFoundationSuit = validate(isFoundationMoveValidSuit);
  const isValidFoundationOrder = validate(isFoundationMoveValidOrder);

  return (
    isValidFoundationAce || (isValidFoundationSuit && isValidFoundationOrder)
  );
};

export const validateFoundationMovePosition = (card, compareTo) =>
  setupValidation(card, compareTo)(isFoundationMoveValidPosition);

export const validateEmptyColumn = (cards) => cards.length < columns.length;
