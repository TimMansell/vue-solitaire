import {
  checkVisibleMoves,
  checkKingMoves,
  checkFoundationMoves,
  getMoveCardsFromBoard,
  getMoveCardsToBoard,
  getMoveCardsToFoundation,
} from './moves';
import { initFoundation, updateFoundation } from '../foundation';
import { initBoard, updateBoard, isBoardEmpty } from '../board';
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

  displayMoves(moves);

  return moves.length > 0;
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
  const { columnNo, cardPosition } = getCardPosition(cards, selectedCardId);

  const draggedCards = cards[columnNo].slice(cardPosition);

  return draggedCards;
};

export const checkGameState = (moves, deck) => {
  const { cards: cardsInDeck } = deck;

  let foundationCards = initFoundation();
  let boardCards = initBoard(cardsInDeck);

  const cardMoves = moves.filter(
    ({ isBoard, isFoundation }) => isBoard || isFoundation
  );

  const isGameFinished = cardMoves.reduce(
    (_, { selectedCardId, selectedColumn, isBoard, isFoundation }) => {
      if (isBoard) {
        const isValidMove = checkValidCardMove(
          { cards: boardCards, selectedCardId },
          selectedColumn
        );

        if (isValidMove) {
          const { cards } = moveCards(
            { cards: boardCards, selectedCardId },
            selectedColumn
          );

          boardCards = cards;
        }
      }

      if (isFoundation) {
        const isValidFoundationMove = checkValidFoundationMove(
          { cards: boardCards, selectedCardId, foundation: foundationCards },
          selectedColumn
        );

        if (isValidFoundationMove) {
          const { cards, foundation } = moveCardsToFoundation(
            { cards: boardCards, selectedCardId, foundation: foundationCards },
            selectedColumn
          );
          boardCards = cards;
          foundationCards = foundation;
        }
      }

      return isBoardEmpty({ cards: boardCards });
    },
    false
  );

  const hasMoves = checkHasMoves({
    cards: boardCards,
    foundation: foundationCards,
  });

  return { isGameFinished, hasMoves };
};
