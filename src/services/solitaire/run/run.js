import { initFoundation } from '../foundation';
import { initBoard } from '../board';
import {
  checkValidCardMove,
  checkValidFoundationMove,
  moveCards,
  moveCardsToFoundation,
} from '../moves';

// eslint-disable-next-line import/prefer-default-export
export const runGameMoves = (moves, deck) => {
  const initialFoundation = initFoundation();
  const initialBoard = initBoard(deck);

  const [boardCards, foundationCards] = moves.reduce(
    (
      [prevCards, prevFoundation],
      { selectedCardId, selectedColumn, isBoard, isFoundation }
    ) => {
      const state = {
        cards: prevCards,
        foundation: prevFoundation,
        selectedCardId,
      };

      if (isBoard) {
        const isValidMove = checkValidCardMove(state, selectedColumn);

        if (isValidMove) {
          const { cards } = moveCards(state, selectedColumn);

          return [cards, prevFoundation];
        }
      }

      if (isFoundation) {
        const isValidFoundationMove = checkValidFoundationMove(
          state,
          selectedColumn
        );

        if (isValidFoundationMove) {
          const { cards, foundation } = moveCardsToFoundation(
            state,
            selectedColumn
          );

          return [cards, foundation];
        }
      }

      return [prevCards, prevFoundation];
    },
    [initialBoard, initialFoundation]
  );

  return {
    cards: boardCards,
    foundation: foundationCards,
  };
};
