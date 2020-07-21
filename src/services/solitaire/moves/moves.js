import { getSelectedCardPosition, checkCardValue, checkCardTopPosition } from '../cards';
import { checkEmptyColumns } from '../board';
import { validateCardMove, validateCardMoveColumn } from '../validation';
import { displayMoves } from './helpers';

export const checkVisibleMoves = (visibleCards, lastCards, boardCards) => {
  const hasMoves = visibleCards.filter((visibleCard) => {
    const cardHasMove = lastCards.filter((lastCard) => {
      const { columnNo } = getSelectedCardPosition(boardCards, lastCard.id);

      const isCardKing = checkCardValue(visibleCard, 'K');
      const isValidCard = validateCardMove(visibleCard, lastCard);
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

export const checkKingMoves = (visibleCards, lastCards, boardCards) => {
  const hasMoves = visibleCards.filter((visibleCard) => {
    const isCardTopPosition = checkCardTopPosition(boardCards, visibleCard.id);
    const isCardKing = checkCardValue(visibleCard, 'K');
    const hasEmptyColumns = checkEmptyColumns(lastCards);

    return isCardKing && hasEmptyColumns && !isCardTopPosition;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(hasMoves);
  }

  return hasMoves;
};

export const checkFoundationMoves = (lastCards, lastFoundationCards) => {
  const hasMoves = lastCards.filter((lastCard) => {
    const isCardAce = checkCardValue(lastCard, 'A');
    const hasFoundationMove = lastFoundationCards.filter((lastFoundationCard) =>
      validateCardMove(lastFoundationCard, lastCard)
    );

    return isCardAce || hasFoundationMove.length > 0;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(hasMoves);
  }

  return hasMoves;
};
