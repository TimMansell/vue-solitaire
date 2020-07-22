import {
  checkVisibleMoves,
  checkKingMoves,
  checkFoundationMoves,
  moveCardsFromBoard,
  moveCardsToBoard,
  moveCardsToFoundation,
} from './moves';
import { getSelectedCard, getLastCard } from '../cards';
import { validateCardMove, validateCardMoveColumn } from '../validation';

export const checkValidCardMove = ({ boardCards, selectedCardId }, selectedColumn) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);
  const lastColumnCard = getLastCard(boardCards, selectedColumn);
  const selectedColumnCards = boardCards[selectedColumn];

  const isValidCard = validateCardMove(selectedCard, lastColumnCard);
  const isValidColumn = validateCardMoveColumn(selectedCard, selectedColumnCards);

  return isValidCard && isValidColumn;
};

export const checkHasMoves = ({ boardCards, foundationCards }) => {
  const hasVisibleMoves = checkVisibleMoves(boardCards);
  const hasKingMoves = checkKingMoves(boardCards);
  const hasFoundationMoves = checkFoundationMoves(boardCards, foundationCards);

  return [...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves].length > 0;
};

export const moveBoardCards = (state, selectedColumn) => {
  const cardsFrom = moveCardsFromBoard(state);
  const cardsTo = moveCardsToBoard(state, selectedColumn);

  return {
    cardsFrom,
    cardsTo,
  };
};

export const moveFoundationCards = (state, selectedColumn) => {
  const cardsFrom = moveCardsFromBoard(state);
  const foundationCardsTo = moveCardsToFoundation(state, selectedColumn);

  return {
    cardsFrom,
    foundationCardsTo,
  };
};
