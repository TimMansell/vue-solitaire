import { checkVisibleMoves, checkKingMoves, checkFoundationMoves } from './moves';
import {
  getSelectedCard,
  getLastCard,
  getLastCards,
  getVisibleCards,
  getSelectedCardPosition,
} from '../cards';
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

  const hasVisibleMoves = checkVisibleMoves(visibleCards, bottomCards, boardCards);

  // If card is king and there is an empty column then we have a possible move.
  const hasKingMoves = checkKingMoves(visibleCards, bottomCards, boardCards);

  // Can we move any cards to the foundation?
  const hasFoundationMoves = checkFoundationMoves(bottomCards, topFoundationCards);

  return ![...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves].length;
};

export const moveCardsFrom = ({ selectedCardId, boardCards }) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const columnCards = boardCards[columnNo].slice(0, cardPosition);

  const remainingCards = columnCards.map((card, index) => {
    if (index === columnCards.length - 1 && !card.visible) {
      const newValues = {
        ...card,
        visible: true,
      };
      return newValues;
    }

    return card;
  });

  return {
    column: columnNo,
    cards: remainingCards,
  };
};

export const moveCardsTo = ({ selectedCardId, boardCards }, selectedColumn) => {
  const { columnNo, cardPosition } = getSelectedCardPosition(boardCards, selectedCardId);

  const columnCards = boardCards[selectedColumn];
  const moveCards = boardCards[columnNo].slice(cardPosition);

  const newColumn = [...columnCards, ...moveCards];

  return {
    column: selectedColumn,
    cards: newColumn,
  };
};
