import { getSelectedCardPosition, checkCardValue, checkCardTopPosition } from '../cards';
import { checkEmptyColumns } from '../board';
import { validateCardMove, validateCardMoveColumn } from '../validation';
import { displayMoves, checkFoundationMove } from './helpers';

export const checkVisibleMoves = (visibleCards, bottomCards, boardCards) => {
  const hasMoves = visibleCards.filter((visibleCard) => {
    const cardHasMove = bottomCards.filter((bottomCard) => {
      const { columnNo } = getSelectedCardPosition(boardCards, bottomCard.id);

      const isCardKing = checkCardValue(visibleCard, 'K');
      const isValidCard = validateCardMove(visibleCard, bottomCard);
      const isValidColumn = validateCardMoveColumn(visibleCard, boardCards[columnNo]);

      return !isCardKing && isValidCard && isValidColumn;
    });

    return cardHasMove.length > 0;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(hasMoves);
  }

  return hasMoves;
};

export const checkKingMoves = (visibleCards, bottomCards, boardCards) => {
  const hasMoves = visibleCards.filter((visibleCard) => {
    const isCardTopPosition = checkCardTopPosition(boardCards, visibleCard.id);
    const isCardKing = checkCardValue(visibleCard, 'K');
    const hasEmptyColumns = checkEmptyColumns(bottomCards);

    return isCardKing && hasEmptyColumns && !isCardTopPosition;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(hasMoves);
  }

  return hasMoves;
};

export const checkFoundationMoves = (bottomCards, topFoundationCards) => {
  const hasMoves = bottomCards.filter((bottomCard) => {
    const isCardAce = checkCardValue(bottomCard, 'A');
    const hasFoundationMove = checkFoundationMove(topFoundationCards, bottomCard);

    return isCardAce || hasFoundationMove;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(hasMoves);
  }

  return hasMoves;
};
