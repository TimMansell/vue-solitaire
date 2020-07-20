import { getSelectedCardPosition } from '../cards';
import { validateCardMove, validateCardMoveColumn } from '../validation';

const displayMoves = (moves) => {
  if (moves.length) {
    console.log('---------------');
    [...moves].forEach((move) => {
      console.log('hasMove', `${move.value}${move.suit}`);
    });
  }
};

export const visibleMoves = (visibleCards, bottomCards, boardCards) => {
  const moves = visibleCards.filter((visibleCard) => {
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

  if (process.env.NODE_ENV === 'development') {
    displayMoves(moves);
  }

  return moves;
};

export const kingMoves = (visibleCards, bottomCards, boardCards) => {
  const moves = visibleCards.filter((visibleCard) => {
    const { cardPosition } = getSelectedCardPosition(boardCards, visibleCard.id);

    return visibleCard.value === 'K' && bottomCards.length < 8 && cardPosition !== 0;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(moves);
  }

  return moves;
};

export const foundationMoves = (bottomCards, topFoundationCards) => {
  const moves = bottomCards.filter((bottomCard) => {
    // If bottom card in an A then there is a possible move.
    if (bottomCard.value === 'A') {
      return true;
    }

    const hasFoundationMove = topFoundationCards.filter((topFoundationCard) =>
      validateCardMove(topFoundationCard, bottomCard)
    );

    return hasFoundationMove.length;
  });

  if (process.env.NODE_ENV === 'development') {
    displayMoves(moves);
  }

  return moves;
};
