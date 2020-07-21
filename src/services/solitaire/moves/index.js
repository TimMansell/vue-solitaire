import { checkVisibleMoves, checkKingMoves, checkFoundationMoves } from './moves';
import {
  getSelectedCard,
  getLastCard,
  getLastCards,
  getVisibleCards,
  getSelectedCardPosition,
  showLastCard,
} from '../cards';
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
  const lastFoundationCards = getLastCards(foundationCards);
  const lastCards = getLastCards(boardCards);
  const visibleCards = getVisibleCards(boardCards);

  const hasVisibleMoves = checkVisibleMoves(visibleCards, lastCards, boardCards);

  // If card is king and there is an empty column then we have a possible move.
  const hasKingMoves = checkKingMoves(visibleCards, lastCards, boardCards);

  // Can we move any cards to the foundation?
  const hasFoundationMoves = checkFoundationMoves(lastCards, lastFoundationCards);

  return ![...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves].length;
};

export const moveCardsFrom = ({ selectedCardId, boardCards }) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const remainingCards = boardCards[columnNo].slice(0, cardPosition);
  const cards = showLastCard(remainingCards);

  return {
    column: columnNo,
    cards,
  };
};

export const moveCardsTo = ({ selectedCardId, boardCards }, selectedColumn) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const columnCards = boardCards[selectedColumn];
  const moveCards = boardCards[columnNo].slice(cardPosition);

  const cards = [...columnCards, ...moveCards];

  return {
    column: selectedColumn,
    cards,
  };
};
