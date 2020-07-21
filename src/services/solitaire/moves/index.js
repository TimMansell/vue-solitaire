import { checkVisibleMoves, checkKingMoves, checkFoundationMoves } from './moves';
import { getSelectedCard, getLastCard, getSelectedCardPosition, showLastCard } from '../cards';
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

export const moveCardsFrom = ({ selectedCardId, boardCards }) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const remainingCards = boardCards[columnNo].slice(0, cardPosition);
  const cards = showLastCard(remainingCards);

  return {
    cards,
    columnNo,
  };
};

export const moveCardsTo = ({ selectedCardId, boardCards }, selectedColumn) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const columnCards = boardCards[selectedColumn];
  const moveCards = boardCards[columnNo].slice(cardPosition);

  const cards = [...columnCards, ...moveCards];

  return {
    cards,
    columnNo: selectedColumn,
  };
};
