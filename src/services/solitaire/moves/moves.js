import {
  getCardPosition,
  checkCardValue,
  checkCardTopPosition,
  getLastCards,
  getVisibleCards,
  showLastCard,
  getColumnCardsContaining,
  getColumnCardsToMove,
} from '../cards';
import {
  validateCardMove,
  validateCardMoveColumn,
  validateEmptyColumn,
} from '../validation';

export const checkVisibleMoves = (cards) => {
  const lastCards = getLastCards(cards);
  const visibleCards = getVisibleCards(cards);

  const hasMoves = visibleCards.filter((visibleCard) => {
    const cardHasMove = lastCards.filter((lastCard) => {
      const columnCards = getColumnCardsContaining(cards, lastCard.id);

      const isValidCard = validateCardMove(visibleCard, lastCard);
      const isValidColumn = validateCardMoveColumn(visibleCard, columnCards);

      return isValidCard && isValidColumn;
    });

    return cardHasMove.length > 0;
  });

  return hasMoves;
};

export const checkKingMoves = (cards) => {
  const lastCards = getLastCards(cards);
  const visibleCards = getVisibleCards(cards);

  const hasMoves = visibleCards.filter((visibleCard) => {
    const isCardTopPosition = checkCardTopPosition(cards, visibleCard.id);
    const isCardKing = checkCardValue(visibleCard, 'K');
    const hasEmptyColumns = validateEmptyColumn(lastCards);

    return isCardKing && hasEmptyColumns && !isCardTopPosition;
  });

  return hasMoves;
};

export const checkFoundationMoves = (cards, foundation) => {
  const lastFoundationCards = getLastCards(foundation);
  const lastCards = getLastCards(cards);

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
  const columnCards = getColumnCardsContaining(cards, selectedCardId);
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const remainingCards = columnCards.slice(0, cardPosition);
  const newColumnCards = showLastCard(remainingCards);

  return {
    columnCards: newColumnCards,
    columnNo,
  };
};

export const getMoveCardsToBoard = (
  { selectedCardId, cards },
  selectedColumn
) => {
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const columnCards = getColumnCardsToMove({
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

  const columnCards = getColumnCardsToMove({
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
