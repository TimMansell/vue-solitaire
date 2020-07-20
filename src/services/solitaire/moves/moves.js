import { getSelectedCardPosition } from '../cards';
import { validateCardMove, validateCardMoveColumn } from '../validation';

export const visibleMoves = (visibleCards, bottomCards, boardCards) =>
  visibleCards.filter((visibleCard) => {
    const hasMove =
      visibleCard.value !== 'K' &&
      bottomCards.filter((bottomCard) => {
        const { columnNo } = getSelectedCardPosition(boardCards, bottomCard.id);

        const isValidCard = validateCardMove(visibleCard, bottomCard);
        const isValidColumn = validateCardMoveColumn(visibleCard, boardCards[columnNo]);

        return isValidCard && isValidColumn;
      });

    return hasMove.length;
  });

export const kingMoves = (visibleCards, bottomCards, boardCards) =>
  visibleCards.filter((visibleCard) => {
    const { cardPosition } = getSelectedCardPosition(boardCards, visibleCard.id);

    if (visibleCard.value === 'K' && bottomCards.length < 8 && cardPosition !== 0) {
      return true;
    }

    return false;
  });

export const foundationMoves = (bottomCards, topFoundationCards) =>
  bottomCards.filter((bottomCard) => {
    // If bottom card in an A then there is a possible move.
    if (bottomCard.order === 1) {
      return true;
    }

    const hasFoundationMove = topFoundationCards.filter((topFoundationCard) =>
      validateCardMove(topFoundationCard, bottomCard)
    );

    return hasFoundationMove.length;
  });
