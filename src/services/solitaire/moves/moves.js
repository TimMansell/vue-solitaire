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
import { displayMove } from './helpers';

const isDev = process.env.NODE_ENV === 'development';

export const checkVisibleMoves = (cards) => {
  const lastCards = getLastCards(cards);
  const visibleCards = getVisibleCards(cards);

  if (isDev) console.group('Moves');

  const hasMoves = visibleCards.some((visibleCard) => {
    const cardHasMove = lastCards.some((lastCard) => {
      const columnCards = getColumnCardsContaining(cards, lastCard.id);

      const isValidCard = validateCardMove(visibleCard, lastCard);
      const isValidColumn = validateCardMoveColumn(visibleCard, columnCards);

      displayMove({
        card: visibleCard,
        otherCard: lastCard,
        hasMove: isValidCard && isValidColumn,
      });

      return isValidCard && isValidColumn;
    });

    return cardHasMove;
  });

  return hasMoves;
};

export const checkKingMoves = (cards) => {
  const lastCards = getLastCards(cards);
  const visibleCards = getVisibleCards(cards);

  const hasMoves = visibleCards.some((visibleCard) => {
    const isCardTopPosition = checkCardTopPosition(cards, visibleCard.id);
    const isCardKing = checkCardValue(visibleCard, 'K');
    const hasEmptyColumns = validateEmptyColumn(lastCards);

    displayMove({
      card: visibleCard,
      isColumn: true,
      hasMove: isCardKing && hasEmptyColumns && !isCardTopPosition,
    });

    return isCardKing && hasEmptyColumns && !isCardTopPosition;
  });

  return hasMoves;
};

export const checkFoundationMoves = (cards, foundation) => {
  const lastFoundationCards = getLastCards(foundation);
  const lastCards = getLastCards(cards);

  const hasMoves = lastCards.some((lastCard) => {
    const isCardAce = checkCardValue(lastCard, 'A');
    const hasFoundationMove = lastFoundationCards.some((lastFoundationCard) =>
      validateCardMove(lastFoundationCard, lastCard)
    );

    displayMove({
      card: lastCard,
      isFoundation: true,
      hasMove: isCardAce || hasFoundationMove,
    });

    return isCardAce || hasFoundationMove;
  });

  if (isDev) console.groupEnd();

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
