import {
  checkValidCardMove,
  checkHasMoves,
  moveBoardCards,
  checkValidFoundationMove,
  moveFoundationCards,
  getCardsToDrag,
} from './moves';
import {
  initFoundation,
  updateFoundation,
  getEmptyFoundationColumn,
} from './foundation';
import { initBoard, updateBoard } from './board';

const solitaire = () => {
  const moveCards = (state, selectedColumn) => {
    const cardsToMove = moveBoardCards(state, selectedColumn);

    const cards = updateBoard(state, cardsToMove);

    return { cards };
  };

  const isValidCardMove = (state, selectedColumn) =>
    checkValidCardMove(state, selectedColumn);

  const findEmptyFoundationColumn = (state) => getEmptyFoundationColumn(state);

  const moveCardsToFoundation = (state, selectedColumn) => {
    const cardsToMove = moveFoundationCards(state, selectedColumn);

    const cards = updateBoard(state, cardsToMove);
    const foundation = updateFoundation(state, cardsToMove);

    return {
      foundation,
      cards,
    };
  };

  const isValidFoundationMove = (state, selectedColumn) =>
    checkValidFoundationMove(state, selectedColumn);

  const isEmptyBoard = ({ cards }) => !cards.flat().length;

  const hasMoves = (state) => checkHasMoves(state);

  const getDraggedCards = (state, selectedCardId) =>
    getCardsToDrag(state, selectedCardId);

  return {
    initBoard,
    initFoundation,
    isEmptyBoard,
    hasMoves,
    isValidCardMove,
    isValidFoundationMove,
    moveCards,
    moveCardsToFoundation,
    findEmptyFoundationColumn,
    getDraggedCards,
  };
};

export default solitaire();
