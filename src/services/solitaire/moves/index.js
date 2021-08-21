import {
  checkVisibleMoves,
  checkKingMoves,
  checkFoundationMoves,
  moveCardsFromBoard,
  moveCardsToBoard,
  moveCardsToFoundation,
} from './moves';
import { initFoundation } from '../foundation';
import { getSelectedCard, getLastCard, getCardPosition } from '../cards';
import {
  validateCardMove,
  validateCardMoveColumn,
  validateFoundationMove,
  validateFoundationMovePosition,
} from '../validation';
import { displayMoves } from './helpers';

export const checkValidCardMove = (
  { cards, selectedCardId },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(cards, selectedCardId);
  const lastColumnCard = getLastCard(cards, selectedColumn);
  const selectedColumnCards = cards[selectedColumn];

  const isValidCard = validateCardMove(selectedCard, lastColumnCard);
  const isValidColumn = validateCardMoveColumn(
    selectedCard,
    selectedColumnCards
  );

  return isValidCard && isValidColumn;
};

export const checkHasMoves = ({ cards, foundation }) => {
  const hasVisibleMoves = checkVisibleMoves(cards);
  const hasKingMoves = checkKingMoves(cards);
  const hasFoundationMoves = checkFoundationMoves(cards, foundation);

  const moves = [...hasVisibleMoves, ...hasFoundationMoves, ...hasKingMoves];

  if (process.env.NODE_ENV === 'development') {
    displayMoves(moves);
  }

  return moves.length > 0;
};

export const checkInitialBoardMoves = (cards) => {
  const foundation = initFoundation();

  const board = {
    foundation,
    cards,
  };

  const hasBoardMoves = checkHasMoves(board);

  return hasBoardMoves;
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
  { cards, selectedCardId, foundation },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(cards, selectedCardId);
  const selectedFoundationCards = foundation[selectedColumn];

  const isValidFoundationMove = validateFoundationMove(
    selectedCard,
    selectedFoundationCards
  );
  const isValidCardPosition = validateFoundationMovePosition(
    selectedCard,
    cards
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

export const getDraggedCards = ({ cards }, selectedCardId) => {
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const draggedCards = cards[columnNo].slice(cardPosition);

  return draggedCards;
};
