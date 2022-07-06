import {
  checkVisibleMoves,
  checkKingMoves,
  checkFoundationMoves,
  getMoveCardsFromBoard,
  getMoveCardsToBoard,
  getMoveCardsToFoundation,
} from './moves';
import { initFoundation, updateFoundation } from '../foundation';
import { initBoard, updateBoard } from '../board';
import {
  getSelectedCard,
  getLastCard,
  getCardPosition,
  getCardsFromColumn,
  getColumnCardsContaining,
} from '../cards';
import {
  validateCardMove,
  validateCardMoveColumn,
  validateFoundationMove,
  validateFoundationMovePosition,
} from '../validation';

export const checkValidCardMove = (
  { cards, selectedCardId },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(cards, selectedCardId);
  const lastColumnCard = getLastCard(cards, selectedColumn);
  const selectedColumnCards = getCardsFromColumn(cards, selectedColumn);

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

  return hasVisibleMoves || hasKingMoves || hasFoundationMoves;
};

export const checkInitialBoardMoves = (deck) => {
  const foundation = initFoundation();
  const cards = initBoard(deck);

  const board = {
    foundation,
    cards,
  };

  const hasBoardMoves = checkHasMoves(board);

  return hasBoardMoves;
};

export const moveCards = (state, selectedColumn) => {
  const cardsFrom = getMoveCardsFromBoard(state);
  const cardsTo = getMoveCardsToBoard(state, selectedColumn);

  const cards = updateBoard(state, { cardsFrom, cardsTo });

  return { cards };
};

export const checkValidFoundationMove = (
  { cards, selectedCardId, foundation },
  selectedColumn
) => {
  const selectedCard = getSelectedCard(cards, selectedCardId);
  const selectedFoundationCards = getCardsFromColumn(
    foundation,
    selectedColumn
  );

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

export const moveCardsToFoundation = (state, selectedColumn) => {
  const cardsFrom = getMoveCardsFromBoard(state);
  const cardsTo = getMoveCardsToFoundation(state, selectedColumn);

  const cards = updateBoard(state, { cardsFrom });
  const foundation = updateFoundation(state, { cardsFrom, cardsTo });

  return {
    cards,
    foundation,
  };
};

export const getDraggedCards = ({ cards }, selectedCardId) => {
  const columnCards = getColumnCardsContaining(cards, selectedCardId);
  const { cardPosition } = getCardPosition(cards, selectedCardId);

  const draggedCards = columnCards.slice(cardPosition);

  return draggedCards;
};
