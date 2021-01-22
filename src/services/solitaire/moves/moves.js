import {
  getCardPosition,
  checkCardValue,
  checkCardTopPosition,
  getLastCards,
  getVisibleCards,
  showLastCard,
} from '../cards';
import { checkEmptyColumns } from '../board';
import { validateCardMove, validateCardMoveColumn } from '../validation';
import { getColumnCards } from './helpers';

export const checkVisibleMoves = (boardCards) => {
  const lastCards = getLastCards(boardCards);
  const visibleCards = getVisibleCards(boardCards);

  const hasMoves = visibleCards.filter((visibleCard) => {
    const cardHasMove = lastCards.filter((lastCard) => {
      const { columnNo } = getCardPosition(boardCards, lastCard.id);

      const isValidCard = validateCardMove(visibleCard, lastCard);
      const isValidColumn = validateCardMoveColumn(
        visibleCard,
        boardCards[columnNo]
      );

      return isValidCard && isValidColumn;
    });

    return cardHasMove.length > 0;
  });

  return hasMoves;
};

export const checkKingMoves = (boardCards) => {
  const lastCards = getLastCards(boardCards);
  const visibleCards = getVisibleCards(boardCards);

  const hasMoves = visibleCards.filter((visibleCard) => {
    const isCardTopPosition = checkCardTopPosition(boardCards, visibleCard.id);
    const isCardKing = checkCardValue(visibleCard, 'K');
    const hasEmptyColumns = checkEmptyColumns(lastCards);

    return isCardKing && hasEmptyColumns && !isCardTopPosition;
  });

  return hasMoves;
};

export const checkFoundationMoves = (boardCards, foundationCards) => {
  const lastFoundationCards = getLastCards(foundationCards);
  const lastCards = getLastCards(boardCards);

  const hasMoves = lastCards.filter((lastCard) => {
    const isCardAce = checkCardValue(lastCard, 'A');
    const hasFoundationMove = lastFoundationCards.filter((lastFoundationCard) =>
      validateCardMove(lastFoundationCard, lastCard)
    );

    return isCardAce || hasFoundationMove.length > 0;
  });

  return hasMoves;
};

export const moveCardsFromBoard = ({ selectedCardId, boardCards }) => {
  const { columnNo, cardPosition } = getCardPosition(
    boardCards,
    selectedCardId
  );

  const remainingCards = boardCards[columnNo].slice(0, cardPosition);
  const cards = showLastCard(remainingCards);

  return {
    cards,
    columnNo,
  };
};

export const moveCardsToBoard = (
  { selectedCardId, boardCards },
  selectedColumn
) => {
  const { columnNo, cardPosition } = getCardPosition(
    boardCards,
    selectedCardId
  );

  const cards = getColumnCards({
    toCards: boardCards,
    fromCards: boardCards,
    selectedColumn,
    columnNo,
    cardPosition,
  });

  return {
    cards,
    columnNo: selectedColumn,
  };
};

export const moveCardsToFoundation = (
  { selectedCardId, boardCards, foundationCards },
  selectedColumn
) => {
  const { columnNo, cardPosition } = getCardPosition(
    boardCards,
    selectedCardId
  );

  const cards = getColumnCards({
    toCards: foundationCards,
    fromCards: boardCards,
    selectedColumn,
    columnNo,
    cardPosition,
  });

  return {
    cards,
    columnNo: selectedColumn,
  };
};
