import {
  checkVisibleMoves,
  checkKingMoves,
  checkFoundationMoves,
  moveCardsFromBoard,
  moveCardsToBoard,
  moveCardsToFoundation,
} from './moves';
import { getSelectedCard, getLastCard, getCardPosition } from '../cards';
import {
  validateCardMove,
  validateCardMoveColumn,
  validateFoundationMove,
  validateFoundationMovePosition,
} from '../validation';
import { displayMoves } from './helpers';

export const checkValidCardMove = (
  { boardCards, selectedCardId },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);
  const lastColumnCard = getLastCard(boardCards, selectedColumn);
  const selectedColumnCards = boardCards[selectedColumn];

  const isValidCard = validateCardMove(selectedCard, lastColumnCard);
  const isValidColumn = validateCardMoveColumn(
    selectedCard,
    selectedColumnCards
  );

  return isValidCard && isValidColumn;
};

export const checkHasMoves = ({ boardCards, foundationCards }) => {
  const hasVisibleMoves = checkVisibleMoves(boardCards);
  const hasKingMoves = checkKingMoves(boardCards);
  const hasFoundationMoves = checkFoundationMoves(boardCards, foundationCards);

  const moves = [...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves];

  if (process.env.NODE_ENV === 'development') {
    displayMoves(moves);
  }

  return moves.length > 0;
};

export const moveBoardCards = (state, selectedColumn) => {
  const cardsFrom = moveCardsFromBoard(state);
  const cardsTo = moveCardsToBoard(state, selectedColumn);

  return {
    cardsFrom,
    cardsTo,
  };
};

export const checkValidFoundationMove = (
  { boardCards, selectedCardId, foundationCards },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);
  const selectedFoundationCards = foundationCards[selectedColumn];

  const isValidFoundationMove = validateFoundationMove(
    selectedCard,
    selectedFoundationCards
  );
  const isValidCardPosition = validateFoundationMovePosition(
    selectedCard,
    boardCards
  );

  return isValidFoundationMove && isValidCardPosition;
};

export const moveFoundationCards = (state, selectedColumn) => {
  const cardsFrom = moveCardsFromBoard(state);
  const foundationCardsTo = moveCardsToFoundation(state, selectedColumn);

  return {
    cardsFrom,
    foundationCardsTo,
  };
};

export const getCardsToDrag = ({ boardCards }, selectedCardId) => {
  const { columnNo, cardPosition } = getCardPosition(
    boardCards,
    selectedCardId
  );

  const cards = boardCards[columnNo].slice(cardPosition);

  return cards;
};
