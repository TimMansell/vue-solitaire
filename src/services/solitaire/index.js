import { moveBoardCards, moveFoundationCards } from './moves';
import { updateFoundation } from './foundation';
import { updateBoard } from './board';

export {
  checkValidCardMove,
  checkHasMoves,
  checkValidFoundationMove,
  getDraggedCards,
} from './moves';
export { initFoundation, getEmptyFoundationColumn } from './foundation';
export { initBoard, isBoardEmpty } from './board';

export const moveCards = (state, selectedColumn) => {
  const cardsToMove = moveBoardCards(state, selectedColumn);

  const cards = updateBoard(state, cardsToMove);

  return { cards };
};

export const moveCardsToFoundation = (state, selectedColumn) => {
  const cardsToMove = moveFoundationCards(state, selectedColumn);

  const cards = updateBoard(state, cardsToMove);
  const foundation = updateFoundation(state, cardsToMove);

  return {
    foundation,
    cards,
  };
};
