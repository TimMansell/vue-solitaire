import {
  getSelectedCard,
  getLastCard,
  getLastCards,
  getVisibleCards,
  getSelectedCardPosition,
} from './cards';
import { checkValidCard, checkValidColumn } from './validation';

const checkValidCardMove = ({ boardCards, selectedCardId }, selectedColumn) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);
  const lastColumnCard = getLastCard(boardCards, selectedColumn);
  const selectedColumnCards = boardCards[selectedColumn];

  const isValidCard = checkValidCard(selectedCard, lastColumnCard);
  const isValidColumn = checkValidColumn(selectedCard, selectedColumnCards);

  return isValidCard && isValidColumn;
};

const visibleMoves = (visibleCards, bottomCards, boardCards) =>
  visibleCards.filter((visibleCard) => {
    const hasMove = bottomCards.filter((bottomCard) => {
      const { columnNo } = getSelectedCardPosition(boardCards, bottomCard.id);

      const isValidCard = checkValidCard(visibleCard, bottomCard);
      const isValidColumn = checkValidColumn(visibleCard, boardCards[columnNo]);

      return isValidCard && isValidColumn;
    });

    return hasMove.length;
  });

const kingMoves = (visibleCards, bottomCards, boardCards) =>
  visibleCards.filter((visibleCard) => {
    const { cardPosition } = getSelectedCardPosition(boardCards, visibleCard.id);

    if (visibleCard.order === 13 && bottomCards.length < 8 && cardPosition !== 0) {
      return true;
    }

    return false;
  });

const foundationMoves = (bottomCards, topFoundationCards) =>
  bottomCards.filter((bottomCard) => {
    // If bottom card in an A then there is a possible move.
    if (bottomCard.order === 1) {
      return true;
    }

    const hasFoundationMove = topFoundationCards.filter((topFoundationCard) =>
      checkValidCard(topFoundationCard, bottomCard)
    );

    return hasFoundationMove.length;
  });

const checkHasMoves = ({ boardCards, foundationCards }) => {
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

export { checkValidCardMove, checkHasMoves };
