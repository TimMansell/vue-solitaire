import { visibleMoves, kingMoves, foundationMoves } from './moves';
import { getSelectedCard, getLastCard, getLastCards, getVisibleCards } from '../cards';
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
  const topFoundationCards = getLastCards(foundationCards);
  const bottomCards = getLastCards(boardCards);
  const visibleCards = getVisibleCards(boardCards);

  // No more cards so game is finished.
  if (!bottomCards.length) {
    return false;
  }

  const hasVisibleMoves = visibleMoves(visibleCards, bottomCards, boardCards);

  // If card is king and there is an empty column then we have a possible move.
  const hasKingMoves = kingMoves(visibleCards, bottomCards, boardCards);

  // Can we move any cards to the foundation?
  const hasFoundationMoves = foundationMoves(bottomCards, topFoundationCards);

  if (process.env.NODE_ENV === 'development') {
    console.log('---');
    [...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves].forEach((move) => {
      console.log('hasMove', `${move.value}${move.suit}`);
    });
  }

  return ![...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves].length;
};
