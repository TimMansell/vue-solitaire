import {
  getCardPosition,
  checkCardValue,
  checkCardTopPosition,
  getLastCards,
  getVisibleCards,
  showLastCard,
  getColumnCards,
} from '../cards';
import {
  validateCardMove,
  validateCardMoveColumn,
  validateEmptyColumn,
} from '../validation';

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
    const hasEmptyColumns = validateEmptyColumn(lastCards);

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

export const getMoveCardsFromBoard = ({ selectedCardId, cards }) => {
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const remainingCards = cards[columnNo].slice(0, cardPosition);
  const columnCards = showLastCard(remainingCards);

  return {
    columnCards,
    columnNo,
  };
};

export const getMoveCardsToBoard = (
  { selectedCardId, cards },
  selectedColumn
) => {
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const columnCards = getColumnCards({
    toCards: cards,
    fromCards: cards,
    selectedColumn,
    columnNo,
    cardPosition,
  });

  return {
    columnCards,
    columnNo: selectedColumn,
  };
};

export const getMoveCardsToFoundation = (
  { selectedCardId, cards, foundation },
  selectedColumn
) => {
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const columnCards = getColumnCards({
    toCards: foundation,
    fromCards: cards,
    selectedColumn,
    columnNo,
    cardPosition,
  });

  return {
    columnCards,
    columnNo: selectedColumn,
  };
};
